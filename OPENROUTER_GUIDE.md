# OpenRouter Setup Guide for NovaAI

## What is OpenRouter?

OpenRouter is an API gateway that provides access to multiple AI models through a single API. You can use it to access:

- Free models (no credit card needed!)
- GPT-4, GPT-3.5
- Claude (Anthropic)
- Llama models
- And many more!

## Why OpenRouter?

✅ **Free tier available** - Use `openrouter/free` model at no cost
✅ **Multiple models** - Switch between different AI models easily
✅ **Unified API** - One API key for all models
✅ **Pay-as-you-go** - Only pay for what you use (for premium models)
✅ **No commitment** - No monthly subscriptions required

---

## Quick Setup (5 Minutes)

### 1. Create OpenRouter Account

1. Go to: **https://openrouter.ai**
2. Click "Sign In" or "Sign Up"
3. Choose your preferred method:
   - Sign in with Google
   - Sign in with GitHub
   - Sign up with Email

### 2. Get Your API Key

1. After logging in, go to: **https://openrouter.ai/keys**
2. Click "Create Key"
3. Give it a name (e.g., "NovaAI")
4. Click "Create"
5. **Copy your API key** (starts with `sk-or-v1-...`)

⚠️ **Important**: Save this key! You won't be able to see it again.

### 3. Configure NovaAI

Open your `.env` file and add:

```env
OPENROUTER_API_KEY=sk-or-v1-your_key_here
OPENROUTER_MODEL=openrouter/free
PORT=3001
```

### 4. Restart Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Test

Open http://localhost:5173 and send: "Salom"

You should get a response! 🎉

---

## Available Models

### Free Models

#### openrouter/free (Default in NovaAI)
- **Cost**: FREE
- **Good for**: Testing, development, personal projects
- **Limitations**: Rate limits apply

### Premium Models (Require credits)

To use premium models:
1. Add credits to your OpenRouter account
2. Change `OPENROUTER_MODEL` in `.env`
3. Restart the server

#### Popular Options:

**OpenAI Models:**
```env
OPENROUTER_MODEL=openai/gpt-3.5-turbo
OPENROUTER_MODEL=openai/gpt-4-turbo
```

**Anthropic Claude:**
```env
OPENROUTER_MODEL=anthropic/claude-2
OPENROUTER_MODEL=anthropic/claude-instant
```

**Meta Llama:**
```env
OPENROUTER_MODEL=meta-llama/llama-2-70b-chat
```

**Google:**
```env
OPENROUTER_MODEL=google/palm-2-chat-bison
```

See full list: https://openrouter.ai/models

---

## Pricing

### Free Tier
- **openrouter/free**: Completely FREE
- No credit card required
- Reasonable rate limits
- Perfect for development and personal use

### Premium Models
- Pay only for what you use
- Pricing varies by model
- Add credits starting from $5
- Check current prices: https://openrouter.ai/models

### Example Costs:
- GPT-3.5-Turbo: ~$0.002 per 1K tokens
- GPT-4: ~$0.03 per 1K tokens
- Claude: ~$0.01 per 1K tokens

Most conversations cost less than $0.01!

---

## Features

### Multi-Model Support

Switch models easily:

```env
# Use free model
OPENROUTER_MODEL=openrouter/free

# Use GPT-3.5
OPENROUTER_MODEL=openai/gpt-3.5-turbo

# Use Claude
OPENROUTER_MODEL=anthropic/claude-2
```

No code changes needed!

### Model Routing

OpenRouter can automatically choose the best available model:

```env
OPENROUTER_MODEL=openrouter/auto
```

### Rate Limits

Free tier includes:
- Generous rate limits
- Automatic retry logic
- Fair usage policy

Premium models:
- Higher rate limits
- Priority processing
- Better availability

---

## Best Practices

### Security

✅ **DO:**
- Keep API key in `.env` file
- Add `.env` to `.gitignore`
- Never commit API keys to Git
- Regenerate keys if exposed

❌ **DON'T:**
- Put API key in frontend code
- Share API keys publicly
- Commit `.env` to repositories
- Post keys in forums/Discord

### Cost Management

For premium models:

1. **Set Credit Limits**: Configure in OpenRouter dashboard
2. **Monitor Usage**: Check usage at https://openrouter.ai/activity
3. **Start Small**: Test with cheap models first
4. **Use Free Tier**: Use `openrouter/free` for development

### Performance

- **Free model**: Good for most use cases
- **GPT-3.5**: Fast and affordable
- **GPT-4**: Best quality, slower, more expensive
- **Claude**: Great for longer conversations

---

## Troubleshooting

### Invalid API Key

**Problem**: "Invalid API key" error

**Solutions**:
1. Check `.env` file has correct format:
   ```env
   OPENROUTER_API_KEY=sk-or-v1-...
   ```
2. No quotes needed around the key
3. No spaces before/after the key
4. Restart the server after changing `.env`

### Rate Limit Exceeded

**Problem**: "Rate limit exceeded"

**Solutions**:
1. Wait a minute before trying again
2. Free tier has reasonable limits
3. Upgrade to premium model if needed
4. Add credits to account for higher limits

### Model Not Found

**Problem**: Model name not recognized

**Solutions**:
1. Check model name is correct
2. See available models: https://openrouter.ai/models
3. Use exact model ID (e.g., `openai/gpt-3.5-turbo`)
4. Some models require credits

### Network Errors

**Problem**: Can't connect to OpenRouter

**Solutions**:
1. Check internet connection
2. Verify OpenRouter is not down (check status page)
3. Try again in a few seconds
4. Check firewall settings

---

## Comparison with Other Providers

### OpenRouter vs Google Gemini

**OpenRouter**:
✅ Multiple models to choose from
✅ Free tier available
✅ Unified API
✅ Pay-as-you-go pricing
✅ No vendor lock-in

**Google Gemini**:
- Single model family
- Free tier (generous)
- Google-specific API
- Good for Google ecosystem

### OpenRouter vs OpenAI Direct

**OpenRouter**:
✅ Access to multiple providers
✅ Fallback options
✅ Unified billing
✅ Free models available

**OpenAI Direct**:
- Only OpenAI models
- Direct access (potentially faster)
- OpenAI-specific features

---

## Migration from Gemini

NovaAI has been updated to use OpenRouter instead of Google Gemini.

### What Changed?

✅ **API Provider**: Google Gemini → OpenRouter
✅ **Environment Variables**: 
- `GEMINI_API_KEY` → `OPENROUTER_API_KEY`
- `GEMINI_MODEL` → `OPENROUTER_MODEL`

### What Stayed the Same?

✅ All UI features
✅ Conversation history
✅ Multi-language support
✅ Dark/light themes
✅ Code highlighting
✅ All existing functionality

### Migration Steps:

1. Get OpenRouter API key (see above)
2. Update `.env` file with new variables
3. Restart the server
4. Everything else works the same!

---

## Advanced Usage

### Custom Headers

OpenRouter supports custom headers for tracking:

```typescript
// In server/index.ts (already configured)
headers: {
  'HTTP-Referer': 'http://localhost:3001',
  'X-Title': 'NovaAI',
}
```

### Model Fallbacks

Configure fallback models:

```env
OPENROUTER_MODEL=openai/gpt-4,openai/gpt-3.5-turbo,openrouter/free
```

OpenRouter will try models in order if one fails.

### Context Management

OpenRouter automatically handles:
- Message history
- Context windows
- Token counting
- Error recovery

---

## Resources

### Official Links
- **Dashboard**: https://openrouter.ai
- **API Keys**: https://openrouter.ai/keys
- **Models**: https://openrouter.ai/models
- **Documentation**: https://openrouter.ai/docs
- **Activity**: https://openrouter.ai/activity
- **Pricing**: https://openrouter.ai/models (per model)

### Community
- **Discord**: https://discord.gg/openrouter
- **GitHub**: https://github.com/OpenRouterTeam

### Support
- Check docs first
- Join Discord for community help
- Email support for account issues

---

## FAQ

**Q: Is OpenRouter really free?**
A: Yes! The `openrouter/free` model is completely free with reasonable rate limits.

**Q: Do I need a credit card?**
A: No, not for the free model. Only if you want to use premium models.

**Q: Can I switch models anytime?**
A: Yes! Just change `OPENROUTER_MODEL` in `.env` and restart.

**Q: Which model is best?**
A: For free: `openrouter/free`. For quality: GPT-4. For speed: GPT-3.5.

**Q: How much do premium models cost?**
A: Varies by model. Most conversations cost $0.01 or less. Check pricing at https://openrouter.ai/models

**Q: Is my data private?**
A: OpenRouter forwards requests to AI providers. Check their privacy policies. Free model uses various providers.

**Q: Can I use this commercially?**
A: Yes! Check specific model licenses. Most allow commercial use.

---

## Getting Help

### If you have issues:

1. **Check this guide first**
2. **Review the documentation**: https://openrouter.ai/docs
3. **Test API key**: Try it in OpenRouter dashboard
4. **Check server logs**: Look for error messages
5. **Join Discord**: Community support available
6. **Open GitHub issue**: For NovaAI-specific problems

---

**Happy chatting with OpenRouter! 🚀**

Enjoy access to multiple AI models through one simple API!
