# NovaAI - AI Chatbot Application

NovaAI is a modern, conversational AI assistant powered by OpenRouter API. It supports multilingual conversations in Uzbek, Russian, and English with a beautiful, responsive interface.

## Features

✨ **Core Features**
- 💬 Natural conversational AI powered by OpenRouter
- 🌍 Multi-language support (Uzbek, Russian, English)
- 💾 Conversation history with localStorage
- 🎨 Dark/Light/System theme support
- 📱 Fully responsive design
- 🔒 Secure API key handling (server-side only)

🎯 **Chat Features**
- New chat creation
- Conversation search
- Message timestamps
- Markdown rendering in responses
- Code syntax highlighting with copy button
- Conversation grouping (Today, Yesterday, Last 7 Days, Older)
- Delete conversations

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API key (FREE!)

## Getting Your OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in
3. Click "Create Key"
4. Copy your API key (keep it secure!)

## Installation

1. **Clone or download this repository**

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenRouter API key:
```env
OPENROUTER_API_KEY=your_actual_api_key_here
OPENROUTER_MODEL=openrouter/free
PORT=3001
```

⚠️ **IMPORTANT**: Never commit your `.env` file to version control!

## Running the Application

### Development Mode

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend API on http://localhost:3001

The app uses OpenRouter's free model by default (`openrouter/free`).

### Production Build

1. Build the application:
```bash
npm run build
```

2. Build the server:
```bash
npm run build:server
```

3. Start the production server:
```bash
npm start
```

## Project Structure

```
nova-ai-chatbot/
├── server/              # Backend Express server
│   └── index.ts        # API routes and OpenRouter integration
├── src/
│   ├── components/     # React components
│   │   ├── ChatArea.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageList.tsx
│   │   ├── Settings.tsx
│   │   ├── Sidebar.tsx
│   │   └── WelcomeScreen.tsx
│   ├── context/        # React context providers
│   │   ├── ChatContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/       # API services
│   │   └── api.ts
│   ├── types/          # TypeScript types
│   │   └── index.ts
│   ├── utils/          # Helper functions
│   │   └── helpers.ts
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # React entry point
│   └── index.css       # Global styles
├── .env.example        # Example environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Usage

### Starting a Chat

1. Click "New Chat" button in the sidebar
2. Type your message in the input box at the bottom
3. Press Enter or click the Send button
4. AI will respond in the same language you use

### Example Prompts

Try these prompts:
- "Salom" (Uzbek greeting)
- "Menga o'zing haqida ayt" (Tell me about yourself)
- "Write a Python hello world program"
- "Как дела?" (Russian: How are you?)
- "Explain async/await in JavaScript"

### Settings

Click the Settings button to:
- Change theme (Light/Dark/System)
- View AI model information
- Clear current conversation
- Clear all conversation history

## Security

🔒 **Security Best Practices**

- ✅ API key is stored server-side only
- ✅ Never exposed in frontend code
- ✅ Environment variables used for configuration
- ✅ `.env` file excluded from git
- ✅ CORS enabled for API security

⚠️ **What NOT to do:**
- Never hardcode API keys in frontend code
- Never commit `.env` file to git
- Never expose API keys in client-side JavaScript
- Never share your API key publicly

## Deployment

### Deploying to Production

1. Set environment variables on your hosting platform:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL`
   - `PORT`

2. Build the application:
```bash
npm run build
npm run build:server
```

3. Start the server:
```bash
npm start
```

### Recommended Hosting Platforms

- **Vercel** - Easy deployment for React apps
- **Railway** - Full-stack deployment
- **Render** - Backend and frontend hosting
- **Heroku** - Classic hosting platform
- **DigitalOcean** - VPS hosting

## Troubleshooting

### API Key Issues

If you see "Invalid API key" errors:
1. Check that `.env` file exists in root directory
2. Verify `OPENROUTER_API_KEY` is set correctly
3. Restart the development server
4. Check API key validity at OpenRouter dashboard

### Port Already in Use

If port 3001 or 5173 is already in use:
1. Change `PORT` in `.env` for backend
2. Change `port` in `vite.config.ts` for frontend
3. Update proxy configuration in `vite.config.ts`

### Build Errors

If you encounter build errors:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: OpenRouter API (supports multiple AI models)
- **Markdown**: react-markdown
- **Syntax Highlighting**: react-syntax-highlighter
- **Icons**: lucide-react

## Future Enhancements

🚀 Planned features:
- Voice conversation support
- Image understanding
- File upload capability
- Web search integration
- AI memory across sessions
- User accounts and authentication
- Database integration (PostgreSQL/MongoDB)
- Desktop application (Electron)
- Multiple AI model support

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section
2. Review the [OpenRouter API documentation](https://openrouter.ai/docs)
3. Open an issue on GitHub

---

Built with ❤️ using React, TypeScript, and OpenRouter API
