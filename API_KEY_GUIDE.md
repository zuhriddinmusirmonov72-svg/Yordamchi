# How to Get Your OpenRouter API Key

This guide will walk you through getting your FREE OpenRouter API key.

## Step-by-Step Guide

### Step 1: Go to OpenRouter

Open your browser and navigate to:
**https://openrouter.ai/keys**

### Step 2: Sign Up or Log In

You can sign up using:
- Google account
- GitHub account
- Email

### Step 3: Create API Key

1. Click on "Create Key" button
2. Give your key a name (e.g., "NovaAI")
3. (Optional) Set a credit limit if needed
4. Click "Create"

### Step 4: Copy Your API Key

Your API key will be displayed. It looks like:
```
sk-or-v1-1234567890abcdefghijklmnopqrstuvwxyz
```

**IMPORTANT**: 
- Click "Copy" to copy the key
- Save it somewhere safe temporarily
- You can always regenerate it later

### Step 5: Configure NovaAI

1. Open your NovaAI project folder
2. Find the `.env` file in the root directory
3. Open it with a text editor
4. Replace `your_api_key_here` with your actual API key:

```env
OPENROUTER_API_KEY=sk-or-v1-1234567890abcdefghijklmnopqrstuvwxyz
OPENROUTER_MODEL=openrouter/free
PORT=3001
```

5. Save the file

### Step 6: Restart Development Server

If your dev server is already running:
1. Stop it (Ctrl+C)
2. Start it again:
```bash
npm run dev
```

### Step 7: Test

Open http://localhost:5173 and send a test message like "Hello"

If everything works, you'll get a response from the AI! 🎉

## API Key Best Practices

### ✅ DO:
- Keep your API key secret
- Store it in the `.env` file only
- Add `.env` to `.gitignore` (already done)
- Use environment variables
- Regenerate the key if you accidentally expose it

### ❌ DON'T:
- Share your API key publicly
- Commit `.env` to Git
- Put API key in frontend code
- Post API key on forums/Discord/Stack Overflow
- Email API key to others

## Free Tier

OpenRouter offers FREE models:
- **openrouter/free** - Free model (default in NovaAI)
- Multiple AI models to choose from
- No credit card required to start

You can also upgrade to use premium models like:
- GPT-4
- Claude
- Llama
- And many more!

## Upgrading to Premium Models

If you want to use premium models:
1. Add credits to your OpenRouter account
2. Change the model in `.env`:
```env
OPENROUTER_MODEL=openai/gpt-3.5-turbo
# or
OPENROUTER_MODEL=anthropic/claude-2
```

3. Restart the server

## Troubleshooting

### "Invalid API Key" Error

**Problem**: Getting error when sending messages

**Solutions**:
1. Verify API key is copied correctly (no extra spaces)
2. Make sure `.env` file is in the root directory (same level as package.json)
3. Check that you saved the `.env` file after editing
4. Restart the dev server
5. Try creating a new API key

### "API Key Not Found" Error

**Problem**: Server can't find the API key

**Solutions**:
1. Check `.env` file exists
2. Verify it's named exactly `.env` (not `.env.txt`)
3. Check the format: `OPENROUTER_API_KEY=your_key` (no quotes needed)
4. Restart the server

### "Rate Limit Exceeded" Error

**Problem**: Too many requests

**Solutions**:
1. Wait a minute before trying again
2. Free models have reasonable rate limits
3. Consider upgrading to premium models if needed

### Can't Access OpenRouter

**Problem**: Website not loading

**Solutions**:
1. Check your internet connection
2. Try a different browser
3. Disable VPN if using one
4. Clear browser cache
5. Try incognito/private mode

## Security Reminder

🔒 **Your API key is like a password**

If someone gets your API key, they can:
- Use your free tier quota
- Make requests that count against your limits
- If using paid models, incur charges on your account

If you accidentally expose your API key:
1. Go to OpenRouter dashboard
2. Delete the compromised key
3. Create a new one
4. Update your `.env` file

## Support

If you have issues:
1. Check OpenRouter documentation: https://openrouter.ai/docs
2. Review this guide again
3. Check the SETUP.md file
4. Verify all steps were followed correctly

---

Once you have your API key configured, you're ready to use NovaAI! 🚀

## Step-by-Step Guide

### Step 1: Go to Google AI Studio

Open your browser and navigate to:
**https://makersuite.google.com/app/apikey**

Or search for "Google AI Studio" and click on "Get API Key"

### Step 2: Sign In

Sign in with your Google account (Gmail)

If you don't have a Google account:
1. Go to https://accounts.google.com
2. Click "Create account"
3. Follow the steps to create a new account
4. Return to Google AI Studio

### Step 3: Create API Key

On the Google AI Studio page, you'll see:
- "Create API Key" button (if this is your first time)
- Or "Get API Key" button

Click the button to create your API key.

### Step 4: Choose Project

You may be asked to:
1. **Create a new project**: Choose this if you're starting fresh
2. **Use existing project**: If you have a Google Cloud project

For most users, selecting "Create API key in new project" is the easiest option.

### Step 5: Copy Your API Key

Your API key will be displayed. It looks like:
```
AIzaSyA_1234567890abcdefghijklmnopqrstuvwxyz
```

**IMPORTANT**: 
- Click "Copy" to copy the key
- Save it somewhere safe temporarily
- You can always come back to view it later

### Step 6: Configure NovaAI

1. Open your NovaAI project folder
2. Find the `.env` file in the root directory
3. Open it with a text editor
4. Replace `your_api_key_here` with your actual API key:

```env
GEMINI_API_KEY=AIzaSyA_1234567890abcdefghijklmnopqrstuvwxyz
GEMINI_MODEL=gemini-1.5-flash
PORT=3001
```

5. Save the file

### Step 7: Restart Development Server

If your dev server is already running:
1. Stop it (Ctrl+C)
2. Start it again:
```bash
npm run dev
```

### Step 8: Test

Open http://localhost:5173 and send a test message like "Hello"

If everything works, you'll get a response from the AI! 🎉

## API Key Best Practices

### ✅ DO:
- Keep your API key secret
- Store it in the `.env` file only
- Add `.env` to `.gitignore` (already done)
- Use environment variables
- Regenerate the key if you accidentally expose it

### ❌ DON'T:
- Share your API key publicly
- Commit `.env` to Git
- Put API key in frontend code
- Post API key on forums/Discord/Stack Overflow
- Email API key to others

## Free Tier Limits

Google Gemini API Free Tier includes:
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per day**

This is more than enough for development and personal use!

## Upgrading to Paid Plan

If you need more:
1. Go to Google Cloud Console
2. Enable billing on your project
3. Upgrade to pay-as-you-go pricing

But for this chatbot, free tier is plenty! 👍

## Troubleshooting

### "Invalid API Key" Error

**Problem**: Getting error when sending messages

**Solutions**:
1. Verify API key is copied correctly (no extra spaces)
2. Make sure `.env` file is in the root directory (same level as package.json)
3. Check that you saved the `.env` file after editing
4. Restart the dev server
5. Try creating a new API key

### "API Key Not Found" Error

**Problem**: Server can't find the API key

**Solutions**:
1. Check `.env` file exists
2. Verify it's named exactly `.env` (not `.env.txt`)
3. Check the format: `GEMINI_API_KEY=your_key` (no quotes needed)
4. Restart the server

### "Rate Limit Exceeded" Error

**Problem**: Too many requests

**Solutions**:
1. Wait a minute before trying again
2. You've hit the 60 requests/minute limit
3. Free tier is sufficient for normal use
4. If you need more, consider upgrading

### Can't Access Google AI Studio

**Problem**: Website not loading or blocked

**Solutions**:
1. Check your internet connection
2. Try a different browser
3. Disable VPN if using one
4. Clear browser cache
5. Try incognito/private mode

## Alternative: Using API Key from Existing Project

If you already have a Google Cloud project with Gemini API enabled:

1. Go to Google Cloud Console
2. Navigate to "APIs & Services" > "Credentials"
3. Click "Create Credentials" > "API Key"
4. Copy the key
5. Enable "Generative Language API" if not already enabled

## Security Reminder

🔒 **Your API key is like a password**

If someone gets your API key, they can:
- Use your free tier quota
- Make requests that count against your limits
- If on paid plan, incur charges on your account

If you accidentally expose your API key:
1. Go to Google AI Studio
2. Delete the compromised key
3. Create a new one
4. Update your `.env` file

## Support

If you have issues:
1. Check Google AI Studio documentation: https://ai.google.dev/docs
2. Review this guide again
3. Check the SETUP.md file
4. Verify all steps were followed correctly

---

Once you have your API key configured, you're ready to use NovaAI! 🚀
