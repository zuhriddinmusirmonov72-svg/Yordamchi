# NovaAI - Frequently Asked Questions (FAQ)

## Table of Contents
- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [API & Configuration](#api--configuration)
- [Features & Usage](#features--usage)
- [Troubleshooting](#troubleshooting)
- [Security & Privacy](#security--privacy)
- [Development](#development)
- [Deployment](#deployment)

---

## General Questions

### What is NovaAI?
NovaAI is a modern, conversational AI assistant powered by Google Gemini API. It supports multi-language conversations in Uzbek, Russian, and English with a beautiful, responsive interface.

### Is NovaAI free to use?
Yes! NovaAI itself is free and open-source (MIT License). However, you need a Google Gemini API key, which has a generous free tier:
- 60 requests per minute
- 1,500 requests per day
- 1 million tokens per day

This is more than enough for personal use!

### What languages does NovaAI support?
NovaAI supports:
- **Uzbek** (O'zbek tili)
- **Russian** (Русский)
- **English**

The AI automatically detects and responds in the language you use.

### What can NovaAI do?
- Answer questions in multiple languages
- Write and explain code
- Help with learning and education
- Assist with writing tasks
- Provide information and explanations
- Support for markdown and code highlighting

### What makes NovaAI different from ChatGPT?
NovaAI is:
- **Open-source**: You can customize everything
- **Self-hosted**: You control your data
- **Multi-language**: Built-in Uzbek support
- **Privacy-focused**: No data sent to third parties (except Gemini API)
- **Customizable**: Change themes, behavior, and more

---

## Installation & Setup

### What do I need to run NovaAI?
- Node.js 18 or higher
- npm (comes with Node.js)
- A Google Gemini API key (free)
- A code editor (VS Code recommended)

### How do I install Node.js?
1. Go to https://nodejs.org
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify installation: `node --version`

### How long does setup take?
About 5-10 minutes:
- 3 minutes: Install dependencies
- 2 minutes: Get API key
- 1 minute: Configure .env file
- Ready to use!

### Do I need programming knowledge?
Basic knowledge helps, but detailed guides are provided. You need to:
- Copy/paste an API key
- Run terminal commands (provided step-by-step)
- Edit a text file (.env)

---

## API & Configuration

### How do I get a Gemini API key?
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Paste into `.env` file

Detailed guide: See [API_KEY_GUIDE.md](./API_KEY_GUIDE.md)

### Is the API key really free?
Yes! Google's free tier includes:
- 1,500 requests per day
- No credit card required
- No expiration

### What if I exceed the free tier?
You'll get a rate limit error. Options:
1. Wait until the next day (limits reset)
2. Upgrade to a paid plan (very affordable)
3. Use a different API key

### Can I use a different AI model?
Yes! Edit `.env` file:
```env
GEMINI_MODEL=gemini-pro
# or
GEMINI_MODEL=gemini-1.5-flash
```

### Where is the API key stored?
In the `.env` file on your server. It's:
- Never sent to the frontend
- Not in Git (protected by .gitignore)
- Only accessible to the backend

---

## Features & Usage

### How do I start a new chat?
Click the "New Chat" button in the sidebar (top left).

### Can I search my chat history?
Yes! Use the search bar at the top of the sidebar. It searches:
- Chat titles
- Message content
- All conversations

### How do I change the theme?
1. Click "Settings" in the sidebar
2. Choose Light, Dark, or System
3. Theme saves automatically

### Can I export my conversations?
Not yet in v1.0, but it's planned for v1.1! See [ROADMAP.md](./ROADMAP.md)

### How do I delete a conversation?
1. Hover over the conversation in the sidebar
2. Click the trash icon
3. Confirm deletion

Or delete all:
1. Open Settings
2. Click "Clear All History"
3. Confirm

### Does NovaAI remember context?
Yes! Within a conversation, the AI remembers:
- Previous messages (last 10 for context)
- Your questions and its answers
- The conversation flow

Context resets when you start a new chat.

### Can I edit my messages?
Not in v1.0, but coming in v1.1! See the roadmap.

### How do I copy code from AI responses?
Click the "Copy" button at the top-right of any code block.

### What markdown features are supported?
- **Bold** and *italic* text
- Headings (H1-H6)
- Lists (bullet and numbered)
- Links
- Code blocks with syntax highlighting
- Inline `code`
- Tables
- Blockquotes

---

## Troubleshooting

### "Invalid API Key" Error
**Cause**: API key is wrong or not set

**Solutions**:
1. Check `.env` file exists in root directory
2. Verify `GEMINI_API_KEY` is correct (no spaces)
3. Try creating a new API key
4. Restart the dev server: `npm run dev`

### "Connection Refused" Error
**Cause**: Backend server not running

**Solutions**:
1. Make sure you ran `npm run dev`
2. Check terminal for "Server running" message
3. Verify port 3001 is not in use
4. Try restarting the server

### Frontend won't load
**Cause**: Vite server not running or port issue

**Solutions**:
1. Check that `npm run dev` is running
2. Visit http://localhost:5173 (not 5174 or other)
3. Check browser console for errors
4. Try clearing browser cache

### AI not responding
**Causes & Solutions**:

1. **No API key**: Set `GEMINI_API_KEY` in `.env`
2. **Rate limit**: Wait a minute and try again
3. **Network error**: Check internet connection
4. **API down**: Check Google AI Studio status

### Chat history not saving
**Cause**: localStorage issue

**Solutions**:
1. Check browser privacy settings
2. Ensure cookies/localStorage enabled
3. Try a different browser
4. Check browser console for errors

### Slow responses
**Causes**:
- Slow internet connection
- Gemini API experiencing high load
- Very long conversation history

**Solutions**:
- Check internet speed
- Try again later
- Start a new chat (shorter context)

### Build errors
**Solutions**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or use cache clear
npm cache clean --force
npm install
```

### TypeScript errors
Make sure you're using:
- Node.js 18 or higher
- Latest dependencies: `npm update`
- Correct TypeScript version in package.json

---

## Security & Privacy

### Is my data private?
Yes! Your data stays on:
1. Your computer (localStorage)
2. Google Gemini API (for AI processing)

NovaAI doesn't have its own servers collecting data.

### Who can see my conversations?
Only you! Unless you:
- Share your device
- Deploy to a server others can access
- Export and share conversations

### Is the API key secure?
Yes, if you follow best practices:
- ✅ API key is server-side only
- ✅ Not in frontend JavaScript
- ✅ `.env` is in `.gitignore`
- ✅ Never committed to Git

### What data does Google collect?
Google may collect:
- Your prompts (messages sent to AI)
- AI responses
- Usage statistics

See Google's privacy policy: https://ai.google.dev/terms

### Can I use NovaAI offline?
No, it requires internet to:
- Connect to Gemini API
- Get AI responses

Future versions may support local AI models.

### Should I share my API key?
**NO!** Never share your API key:
- ❌ Don't post on forums
- ❌ Don't commit to public Git
- ❌ Don't email to others
- ❌ Don't share in Discord/Slack

If leaked, regenerate it immediately!

---

## Development

### How do I contribute?
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions.

Quick start:
1. Fork the repository
2. Create a branch
3. Make your changes
4. Submit a pull request

### What technologies are used?
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Markdown**: react-markdown
- **Syntax Highlighting**: react-syntax-highlighter

### How do I run tests?
Tests are not yet implemented in v1.0. Coming soon!

Future:
```bash
npm test          # Unit tests
npm run test:e2e  # E2E tests
```

### Can I add new features?
Yes! Check the [ROADMAP.md](./ROADMAP.md) for planned features, or suggest your own by opening an issue.

### How do I debug issues?
1. Check browser console (F12)
2. Check server terminal logs
3. Use React DevTools
4. Add `console.log()` statements
5. Use VS Code debugger

---

## Deployment

### Where can I deploy NovaAI?
Recommended platforms:
- **Vercel**: Easy, free tier
- **Railway**: Simple, affordable
- **Render**: Free tier available
- **DigitalOcean**: Full control
- **Your own server**: VPS

See [DEPLOYMENT.md](./DEPLOYMENT.md) for guides.

### How much does deployment cost?
**Free options**:
- Vercel: Free tier (hobby projects)
- Render: Free tier available
- Gemini API: Free tier (1500 req/day)

**Paid options** (if you exceed free tier):
- Railway: ~$5-10/month
- DigitalOcean: $6/month
- Vercel Pro: $20/month

### Do I need a domain name?
No, but recommended for production:
- Free subdomain from hosting platform
- Custom domain: $10-15/year

### How do I set up HTTPS?
Most platforms provide free SSL:
- Vercel: Automatic
- Railway: Automatic
- Render: Automatic
- VPS: Use Let's Encrypt (free)

### Can I deploy to multiple environments?
Yes! Create separate `.env` files:
- `.env.development`
- `.env.staging`
- `.env.production`

---

## Common Issues

### Port already in use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

Or change port in `.env`:
```env
PORT=3002
```

### Node version issues
Check version:
```bash
node --version
```

Should be 18.0.0 or higher.

Update Node:
- Download from https://nodejs.org
- Or use nvm: `nvm install 18`

### npm install fails
Try:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Git issues
```bash
# Reset changes
git reset --hard

# Update from main
git pull origin main

# Fix merge conflicts
git merge --abort
git pull --rebase
```

---

## Still Need Help?

### Resources
- 📖 [README.md](./README.md) - Main documentation
- 🚀 [SETUP.md](./SETUP.md) - Setup guide
- 🔑 [API_KEY_GUIDE.md](./API_KEY_GUIDE.md) - Get your API key
- 🗺️ [ROADMAP.md](./ROADMAP.md) - Future features
- 🤝 [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production

### Get Support
- 🐛 **Bug reports**: Open an issue on GitHub
- 💡 **Feature requests**: Open an issue
- ❓ **Questions**: Start a discussion
- 💬 **Chat**: Join our Discord (coming soon)

### Contact
- GitHub: Open an issue
- Email: [if provided]
- Discord: [if available]

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
npm run build:server

# Start production
npm start

# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

**Don't see your question? Open an issue and we'll add it!** 🙂
