import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Validate environment variables
if (!process.env.OPENROUTER_API_KEY) {
  console.error('ERROR: OPENROUTER_API_KEY is not set in environment variables');
  process.exit(1);
}

const modelName = process.env.OPENROUTER_MODEL || 'openrouter/free';

interface Attachment {
  type: string;
  data?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
}

interface ChatRequest {
  message: string;
  history: Message[];
  attachments?: Attachment[];
  telegramId?: number;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, attachments, telegramId }: ChatRequest = req.body;

    if (!message && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ error: 'Message or attachment is required' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const channel = process.env.TELEGRAM_CHANNEL;

    if (token && channel) {
      if (!telegramId) {
        return res.status(403).json({ error: 'SUBSCRIPTION_REQUIRED' });
      }
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${telegramId}`);
      const tgData = await tgRes.json();
      if (!tgData.ok || !['creator', 'administrator', 'member'].includes(tgData.result.status)) {
        return res.status(403).json({ error: 'SUBSCRIPTION_REQUIRED' });
      }
    }

    const systemInstruction = `You are NovaAI, a helpful, intelligent, and friendly AI assistant. Follow these guidelines:

LANGUAGE: Automatically detect and respond in the user's language (Uzbek, Russian, or English). Match their language exactly.

CONVERSATION: Remember context from previous messages. Build on what was discussed. Never treat messages as independent.

IMAGE GENERATION AND EDITING:
- If the user asks you to generate, create, draw, or edit an image, you MUST respond with a highly detailed description of the final desired image enclosed in exactly this tag format: [IMAGE: detailed description here]
- If they uploaded an image and asked to edit it, describe what the final edited image should look like in detail.
- Example: [IMAGE: A futuristic city at night with flying cars and neon lights, highly detailed, 4k, cyberpunk style]
- Only output ONE [IMAGE: ...] tag per request. You can add regular text before or after it to explain what you did.

RESPONSES:
- Be clear, concise, and natural
- Give short answers to simple questions
- Provide detailed explanations when asked
- Use bullet points, numbered lists, and formatting when helpful
- Be honest when you don't know something

CODE:
- Provide working, practical code examples
- Use proper syntax and formatting
- Explain important parts briefly
- Specify filenames when relevant

TONE:
- Friendly and conversational
- Professional but approachable
- Patient and understanding
- Never condescending

ACCURACY:
- Never invent information
- Admit when uncertain
- Stick to facts

Remember: You're having a conversation, not answering isolated questions. Build naturally on the discussion.`;

    const buildContent = (contentStr: string, atts?: Attachment[]) => {
      if (!atts || atts.length === 0) return contentStr;
      
      const contentArray: any[] = [];
      if (contentStr) {
        contentArray.push({ type: 'text', text: contentStr });
      }
      
      for (const att of atts) {
        if (att.type === 'image' && att.data) {
          contentArray.push({
            type: 'image_url',
            image_url: { url: att.data }
          });
        }
      }
      
      // If there are no valid image attachments but the array was populated, fallback to string if text only
      if (contentArray.length === 1 && contentArray[0].type === 'text') return contentStr;
      
      return contentArray.length > 0 ? contentArray : contentStr;
    };

    const messages = [
      { role: 'system', content: systemInstruction },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: buildContent(msg.content, msg.attachments)
      })),
      { role: 'user', content: buildContent(message, attachments) }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3001",
        "X-Title": "NovaAI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: messages,
        stream: true // Enable streaming
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      
      if (response.status === 401) {
         return res.status(401).json({ error: 'Invalid API key. Please check your OPENROUTER_API_KEY.' });
      }
      if (response.status === 429) {
         return res.status(429).json({ error: 'AI hozir juda ko\'p so\'rov qabul qilmoqda. Birozdan keyin qayta urinib ko\'ring.' });
      }
      
      throw new Error(`OpenRouter API responded with status: ${response.status}`);
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response directly to the client
    if (response.body) {
      const body = response.body as any;
      if (body.getReader) {
        // Web Streams API (Node 18+ native fetch)
        const reader = body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      } else {
        // Node.js stream
        for await (const chunk of body) {
          res.write(chunk);
        }
      }
    }
    res.end();
  } catch (error: any) {
    console.error('Error in /api/chat:', error);

    // If headers have already been sent (streaming started), we can't send a 500 status code
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'AI bilan bog\'lanishda muammo yuz berdi. Iltimos, qayta urinib ko\'ring.' 
      });
    } else {
      res.end();
    }
  }
});

// --- Persistent Telegram Users Map ---
const TG_USERS_FILE = path.join(process.cwd(), 'server', 'tg_users.json');

// Load saved users from file on startup
const loadTelegramUsers = (): Map<string, number> => {
  try {
    if (fs.existsSync(TG_USERS_FILE)) {
      const raw = fs.readFileSync(TG_USERS_FILE, 'utf-8');
      const obj = JSON.parse(raw);
      const map = new Map<string, number>(Object.entries(obj).map(([k, v]) => [k, v as number]));
      console.log(`✅ Loaded ${map.size} Telegram users from file.`);
      return map;
    }
  } catch (e) {
    console.error('Failed to load tg_users.json:', e);
  }
  return new Map();
};

const saveTelegramUsers = (map: Map<string, number>) => {
  try {
    const obj = Object.fromEntries(map);
    fs.writeFileSync(TG_USERS_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save tg_users.json:', e);
  }
};

const telegramUsersMap = loadTelegramUsers();

// Telegram Bot Polling to resolve usernames to IDs
const startTelegramPolling = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  let lastUpdateId = 0;
  
  const poll = async () => {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`);
      const data = await res.json();
      
      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          lastUpdateId = update.update_id;
          
          const message = update.message || update.callback_query?.message;
          if (message && message.from) {
            const user = message.from;
            if (user.username) {
              const usernameLower = user.username.toLowerCase();
              if (!telegramUsersMap.has(usernameLower)) {
                telegramUsersMap.set(usernameLower, user.id);
                saveTelegramUsers(telegramUsersMap);
                console.log(`✅ Saved new user: @${usernameLower} -> ID ${user.id}`);
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Telegram polling error:', e);
    }
    setTimeout(poll, 1000);
  };
  
  poll();
};

startTelegramPolling();

app.post('/api/check-subscription', async (req, res) => {
  try {
    const { telegramId, username } = req.body;
    
    let resolvedId = telegramId;

    if (!resolvedId && username) {
      // Clean username
      const cleanUsername = username.replace('@', '').toLowerCase();
      resolvedId = telegramUsersMap.get(cleanUsername);
      if (!resolvedId) {
         return res.status(400).json({ 
           error: `Botingizga kirmagansiz! Avval Telegramga kirib @InstagramtgNakrutka_bot ga /start bosing, so'ngra bu yerda tekshiring.` 
         });
      }
    }

    if (!resolvedId) {
      return res.status(400).json({ error: 'Telegram ID yoki Username kiritilishi shart' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const channel = process.env.TELEGRAM_CHANNEL;

    if (!token || !channel) {
      return res.json({ isSubscribed: true }); 
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/getChatMember?chat_id=${channel}&user_id=${resolvedId}`);
    const data = await response.json();

    if (!data.ok) {
      return res.json({ isSubscribed: false, resolvedId });
    }

    const status = data.result.status;
    const isSubscribed = ['creator', 'administrator', 'member'].includes(status);

    res.json({ isSubscribed, resolvedId });
  } catch (error: any) {
    console.error('Subscription check error:', error);
    res.status(500).json({ error: 'Failed to check subscription' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', model: modelName, provider: 'OpenRouter' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Using OpenRouter model: ${modelName}`);
});
