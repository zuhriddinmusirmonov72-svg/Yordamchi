# NovaAI Setup Guide

## Quick Start

### 1. Install Dependencies
Already done! ✅

### 2. Get Your Gemini API Key

1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the API key (it looks like: `AIzaSyA...`)

### 3. Configure API Key

Open the `.env` file in the root directory and replace `your_api_key_here` with your actual API key:

```env
OPENROUTER_API_KEY=sk-or-v1-your_actual_key_here
OPENROUTER_MODEL=openrouter/free
PORT=3001
```

⚠️ **IMPORTANT**: Never commit this file to Git! It's already in `.gitignore`.

### 4. Start the Application

Run both frontend and backend:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### 5. Open in Browser

Navigate to: **http://localhost:5173**

You should see the NovaAI welcome screen! 🎉

## Testing the Chatbot

Try these test messages:

1. **Uzbek**: "Salom" or "Menga o'zing haqida ayt"
2. **English**: "Hello" or "Write a Python hello world program"
3. **Russian**: "Привет" or "Как дела?"
4. **Code request**: "Write a JavaScript function to sort an array"

## Troubleshooting

### API Key Issues

**Problem**: "Invalid API key" error

**Solution**:
1. Check that `.env` file exists in root directory
2. Verify `OPENROUTER_API_KEY` is set correctly (no extra spaces)
3. Make sure the API key is valid at OpenRouter
4. Restart the dev server after changing `.env`

### Port Already in Use

**Problem**: Port 3001 or 5173 is already in use

**Solution**:
1. Change `PORT=3001` to `PORT=3002` in `.env`
2. Update `vite.config.ts` proxy target to match new port
3. Or kill the process using the port

### Connection Refused

**Problem**: Frontend can't connect to backend

**Solution**:
1. Make sure backend is running (check terminal for "Server running" message)
2. Verify proxy configuration in `vite.config.ts`
3. Check that both frontend and backend are running

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
```

## Project Structure

```
nova-ai-chatbot/
├── server/              # Backend (Express + Gemini API)
│   └── index.ts        # API routes
├── src/
│   ├── components/     # React components
│   ├── context/        # React context (Chat, Theme)
│   ├── services/       # API service layer
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── .env                # Environment variables (DO NOT COMMIT)
├── .env.example        # Example env file
└── package.json        # Dependencies
```

## Features Checklist

✅ **Core Features**
- [x] OpenRouter API integration
- [x] Multilingual support (Uzbek, Russian, English)
- [x] Conversation history
- [x] New chat creation
- [x] Dark/Light/System theme
- [x] Responsive design
- [x] Markdown rendering
- [x] Code syntax highlighting
- [x] Copy code button
- [x] Search conversations
- [x] Delete conversations
- [x] Settings panel

✅ **Security**
- [x] API key on server-side only
- [x] No API key in frontend code
- [x] Environment variables
- [x] .env in .gitignore

## Next Steps

After basic setup works:

1. **Customize Branding**: Update colors, logo, name in code
2. **Add Features**: Voice, image support, file upload
3. **Database**: Add PostgreSQL or MongoDB for persistence
4. **Authentication**: Add user accounts
5. **Deploy**: Deploy to Vercel, Railway, or similar

## Production Deployment

### Build for Production

```bash
# Build frontend
npm run build

# Build backend
npm run build:server

# Start production server
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL`
   - `PORT`
4. Deploy!

### Deploy to Railway

1. Create new project on Railway
2. Connect GitHub repo
3. Add environment variables
4. Deploy automatically

## Support

If you need help:
1. Check this guide first
2. Review `README.md`
3. Check [Google Gemini API Docs](https://ai.google.dev/docs)
4. Open an issue on GitHub

---

Built with ❤️ using React, TypeScript, and Google Gemini API
