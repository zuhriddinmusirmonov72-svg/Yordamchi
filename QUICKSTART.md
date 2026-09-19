# 🚀 NovaAI - Quick Start (5 Minutes)

Get NovaAI running in just 5 minutes!

## Step 1: Get Your API Key (2 minutes)

1. Open: **https://openrouter.ai/keys**
2. Sign in (Google/GitHub/Email)
3. Click **"Create Key"**
4. **Copy** the key (looks like: `sk-or-v1-...`)

## Step 2: Configure (1 minute)

Open the `.env` file in this folder and paste your API key:

```env
OPENROUTER_API_KEY=paste_your_key_here
OPENROUTER_MODEL=openrouter/free
PORT=3001
```

**Save the file!**

## Step 3: Start the App (1 minute)

Open terminal in this folder and run:

```bash
npm run dev
```

Wait for:
```
🚀 Server running on http://localhost:3001
  ➜  Local:   http://localhost:5173/
```

## Step 4: Open in Browser (30 seconds)

Visit: **http://localhost:5173**

## Step 5: Test (30 seconds)

Type and send:
```
Salom
```

You should get a response in Uzbek! 🎉

---

## ✅ Success Checklist

If everything works, you should see:
- [x] Welcome screen with "Salom! 👋"
- [x] Example prompt cards
- [x] Chat input at bottom
- [x] AI responds when you send a message
- [x] Dark/light theme toggle works
- [x] Sidebar shows "New Chat"

---

## ❌ Something Wrong?

### "Invalid API Key" Error
- Check `.env` file exists
- Verify API key is correct (no spaces)
- Restart: Stop server (Ctrl+C), run `npm run dev` again

### App Won't Load
- Make sure you see "Server running" in terminal
- Check you're visiting http://localhost:5173 (not 5174)
- Try refreshing the page

### Port Already in Use
Change port in `.env`:
```env
PORT=3002
```
Then restart the server

---

## 🎯 What's Next?

### Test More Features
Try these prompts:
- `Write a Python hello world program`
- `Explain JavaScript promises`
- `Menga o'zing haqida ayt`

### Explore Features
- Click "New Chat" to start fresh conversation
- Try dark/light theme toggle
- Search your conversations
- Click Settings to explore options

### Read Full Docs
- [README.md](./README.md) - Complete documentation
- [FAQ.md](./FAQ.md) - Common questions
- [TEST_PROMPTS.md](./TEST_PROMPTS.md) - Test scenarios

---

## 📚 Full Documentation

If you want more details:

1. **[README.md](./README.md)** - Main documentation
2. **[SETUP.md](./SETUP.md)** - Detailed setup guide
3. **[API_KEY_GUIDE.md](./API_KEY_GUIDE.md)** - API key help
4. **[FAQ.md](./FAQ.md)** - Frequently asked questions

---

## 🆘 Need Help?

1. Check [FAQ.md](./FAQ.md) first
2. Read [SETUP.md](./SETUP.md) for troubleshooting
3. Open an issue on GitHub

---

**That's it! You're ready to chat with NovaAI! 🎉**

Enjoy your AI assistant! 🤖
