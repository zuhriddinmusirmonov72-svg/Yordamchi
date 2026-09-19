# NovaAI Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2024 - Intelligence & UX Improvements

### ✨ Added
- **System Instruction**: Comprehensive AI behavior guidelines
  - Natural conversation understanding
  - Automatic language detection
  - Context-aware responses
  - Honest and accurate answers
- **Edit Messages**: Edit user messages and continue conversation from that point
- **Regenerate Response**: Get new AI responses with one click
- **Copy Messages**: Copy any message (user or AI) to clipboard
- **Smart Titles**: Better conversation title generation from first message
- **Loading Text**: "NovaAI is thinking..." instead of just spinner
- **Action Buttons**: Hover to see Edit, Regenerate, Copy buttons

### 🔄 Changed
- **System Prompt**: Added comprehensive instruction for AI behavior
- **Error Messages**: Now in Uzbek and more user-friendly
- **Input Placeholder**: Changed to "Savolni yozing..." (Uzbek)
- **Loading Indicator**: Shows text with animated spinner
- **Title Generation**: Uses first sentence instead of first 50 chars
- **Context Management**: Better conversation flow handling

### 🎨 UI/UX Improvements
- Action buttons appear on hover
- Smooth hover animations
- Edit mode with textarea and save/cancel buttons
- Better message spacing
- Cleaner message bubbles
- More professional appearance
- Improved button visibility

### 🐛 Fixed
- Conversation context now properly maintained
- Messages after edit are correctly removed
- Regenerate only shows on last AI message
- Better state management for edits and regenerations

### 📝 Documentation
- Added `IMPROVEMENTS_V1.2.md` - Complete improvement overview
- Added `TEST_IMPROVEMENTS.md` - Comprehensive testing guide
- Updated `CHANGELOG.md` with detailed changes

---

## [1.1.0] - 2024 - OpenRouter Migration

### 🔄 Changed
- **BREAKING**: Migrated from Google Gemini API to OpenRouter API
- Updated environment variables:
  - `GEMINI_API_KEY` → `OPENROUTER_API_KEY`
  - `GEMINI_MODEL` → `OPENROUTER_MODEL`
- Updated backend API integration (server/index.ts)
- Removed `@google/generative-ai` dependency

### ✨ Added
- OpenRouter API integration with multiple model support
- New documentation: `OPENROUTER_GUIDE.md`
- New documentation: `MIGRATION_NOTES.md`
- Support for multiple AI models through one API
- Free model option: `openrouter/free`

### 📝 Documentation
- Updated `README.md` for OpenRouter
- Updated `API_KEY_GUIDE.md` with OpenRouter instructions
- Updated `SETUP.md` with new setup steps
- Updated `QUICKSTART.md` for faster onboarding
- Updated all references from Gemini to OpenRouter

### 🔧 Technical
- Simplified backend: no external SDK needed
- Using native `fetch` for API calls
- Maintained same message format and error handling
- All frontend code unchanged (backward compatible)

### ✅ Maintained
- All existing UI features
- Multi-language support (Uzbek, Russian, English)
- Conversation history
- Dark/Light themes
- Code syntax highlighting
- Search functionality
- All user-facing features

---

## [1.0.0] - 2024 - Initial Release

### ✨ Features
- Full-stack AI chatbot application
- Google Gemini API integration
- Modern React + TypeScript frontend
- Express backend with secure API key handling
- Multi-language support (Uzbek, Russian, English)
- Conversation history with localStorage
- Dark/Light/System theme support
- Responsive design for all devices
- Markdown rendering in AI responses
- Code syntax highlighting with copy button
- Search conversations
- Delete conversations
- Settings panel
- Welcome screen with example prompts
- Message timestamps
- Conversation grouping (Today, Yesterday, etc.)

### 🎨 UI/UX
- Clean, modern interface
- Purple/blue gradient branding
- Smooth animations
- Loading indicators
- Error messages
- Message bubbles
- Sidebar navigation
- Mobile-responsive design

### 🔒 Security
- API key stored server-side only
- Environment variables for configuration
- `.env` file gitignored
- No sensitive data in frontend
- CORS configured
- Input validation

### 📚 Documentation
- Comprehensive README (6,000+ words)
- Setup guide (SETUP.md)
- API key guide (API_KEY_GUIDE.md)
- FAQ (50+ questions)
- Test prompts guide
- Deployment guide (5 platforms)
- Contributing guidelines
- Project roadmap
- Quick start guide

### 🛠️ Technical Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Markdown**: react-markdown
- **Syntax Highlighting**: react-syntax-highlighter
- **Icons**: lucide-react

---

## Migration Guide

### From v1.0.0 (Gemini) to v1.1.0 (OpenRouter)

1. **Get OpenRouter API key**: https://openrouter.ai/keys
2. **Update .env file**:
   ```env
   OPENROUTER_API_KEY=your_new_key
   OPENROUTER_MODEL=openrouter/free
   ```
3. **Restart server**: `npm run dev`
4. **Done!** All features work the same

See `MIGRATION_NOTES.md` for detailed information.

---

## Future Versions

See `ROADMAP.md` for planned features:
- v1.2: Message editing, voice input
- v1.3: Image support, file upload
- v2.0: Code IDE features
- v2.1: Desktop application
- v3.0: Enterprise features

---

## Version History Summary

- **v1.1.0**: OpenRouter integration, multiple model support
- **v1.0.0**: Initial release with Gemini API

---

*Keep this file updated with each release!*
