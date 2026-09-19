# NovaAI Deployment Guide

This guide covers deploying NovaAI to production.

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] API key is stored securely (not in code)
- [ ] .env file is in .gitignore
- [ ] All features tested locally
- [ ] Build process works: `npm run build`
- [ ] Backend builds: `npm run build:server`
- [ ] No console errors or warnings
- [ ] Mobile responsive design verified
- [ ] All dependencies in package.json

## Deployment Options

### Option 1: Vercel (Recommended for Full-Stack)

**Pros**: Easy, fast, free tier, automatic HTTPS, great DX
**Cons**: Serverless functions (not traditional Node server)

#### Steps for Vercel:

1. **Prepare for Vercel**

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

2. **Install Vercel CLI**
```bash
npm install -g vercel
```

3. **Login to Vercel**
```bash
vercel login
```

4. **Deploy**
```bash
vercel
```

5. **Set Environment Variables**
```bash
vercel env add GEMINI_API_KEY
vercel env add GEMINI_MODEL
vercel env add PORT
```

6. **Deploy to Production**
```bash
vercel --prod
```

### Option 2: Railway

**Pros**: Traditional server deployment, database support, easy setup
**Cons**: Paid after trial

#### Steps for Railway:

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Create Railway Project**
- Go to https://railway.app
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository

3. **Configure Environment Variables**
In Railway dashboard, add:
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `PORT`

4. **Configure Build**
Railway should auto-detect, but verify:
- Build Command: `npm run build && npm run build:server`
- Start Command: `npm start`

5. **Deploy**
Railway will automatically deploy on push to main branch.

### Option 3: Render

**Pros**: Free tier available, simple setup
**Cons**: Slower cold starts

#### Steps for Render:

1. **Push to GitHub** (same as Railway)

2. **Create Web Service**
- Go to https://render.com
- Click "New +" → "Web Service"
- Connect your GitHub repo

3. **Configure Service**
- Name: `nova-ai-chatbot`
- Environment: `Node`
- Build Command: `npm install && npm run build && npm run build:server`
- Start Command: `npm start`

4. **Add Environment Variables**
In Render dashboard, add:
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `PORT`

5. **Deploy**
Click "Create Web Service"

### Option 4: DigitalOcean App Platform

**Pros**: Full control, scalable
**Cons**: Requires more configuration

#### Steps for DigitalOcean:

1. **Push to GitHub**

2. **Create App**
- Go to DigitalOcean App Platform
- Click "Create App"
- Connect GitHub

3. **Configure**
- Detected as Node.js app
- Build Command: `npm run build && npm run build:server`
- Run Command: `npm start`

4. **Environment Variables**
Add in App settings:
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `PORT`

5. **Deploy**

### Option 5: Traditional VPS (DigitalOcean, Linode, AWS EC2)

**Pros**: Full control, traditional hosting
**Cons**: Requires server management

#### Steps for VPS:

1. **Create VPS**
- Choose Ubuntu 22.04
- At least 1GB RAM
- Open ports 80, 443

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2**
```bash
sudo npm install -g pm2
```

4. **Clone Repository**
```bash
git clone your-repo-url
cd nova-ai-chatbot
```

5. **Install Dependencies**
```bash
npm install
npm run build
npm run build:server
```

6. **Create .env File**
```bash
nano .env
```
Add your environment variables

7. **Start with PM2**
```bash
pm2 start dist/server/index.js --name nova-ai
pm2 startup
pm2 save
```

8. **Configure Nginx**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/nova-ai
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/nova-ai-chatbot/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/nova-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables for Production

Make sure to set these in your deployment platform:

```env
GEMINI_API_KEY=your_actual_api_key
GEMINI_MODEL=gemini-1.5-flash
PORT=3001
NODE_ENV=production
```

## Post-Deployment

### 1. Test Deployment

Visit your deployed URL and test:
- [ ] Homepage loads
- [ ] Can send messages
- [ ] AI responds correctly
- [ ] Theme switching works
- [ ] Mobile responsive
- [ ] HTTPS working
- [ ] No console errors

### 2. Monitor

Set up monitoring:
- **Vercel**: Built-in analytics
- **Railway**: Built-in metrics
- **VPS**: Use PM2 logs (`pm2 logs`)

### 3. Custom Domain

#### Vercel:
```bash
vercel domains add your-domain.com
```

#### Railway:
- Go to Settings → Domains
- Add custom domain

#### Others:
Update DNS A record to point to your server IP

## Continuous Deployment

### GitHub Actions (for VPS)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/nova-ai-chatbot
            git pull
            npm install
            npm run build
            npm run build:server
            pm2 restart nova-ai
```

## Scaling Considerations

### For High Traffic:

1. **API Rate Limits**
   - Monitor Gemini API usage
   - Implement request queuing
   - Consider upgrading API tier

2. **Caching**
   - Cache common responses
   - Use Redis for session storage

3. **Load Balancing**
   - Multiple server instances
   - PM2 cluster mode
   - Reverse proxy

4. **Database**
   - Move from localStorage to PostgreSQL/MongoDB
   - Store conversation history server-side

## Troubleshooting Production Issues

### API Key Not Working

- Verify environment variables are set correctly
- Check variable names match exactly
- Restart the service after setting variables

### Build Failures

- Check Node.js version (should be 18+)
- Verify all dependencies installed
- Check build logs for specific errors

### App Not Loading

- Check server logs
- Verify port configuration
- Check firewall settings (VPS)
- Verify DNS configuration

### Slow Response Times

- Check API rate limits
- Monitor server resources
- Optimize bundle size
- Enable compression

## Security Best Practices

1. **Never commit .env file**
2. **Use HTTPS only** (enforce SSL)
3. **Implement rate limiting**
4. **Validate all inputs**
5. **Keep dependencies updated**
6. **Monitor for vulnerabilities**: `npm audit`

## Backup Strategy

### Code:
- Keep Git repository as backup
- Multiple remotes (GitHub + GitLab)

### User Data:
- Regular database backups (if using DB)
- Export conversation history periodically

### Environment Variables:
- Document all required variables
- Keep secure backup of production configs

## Cost Estimates

### Free Tier Options:
- **Vercel**: Free with limits (good for personal projects)
- **Railway**: $5 trial credit
- **Render**: Free tier available
- **Gemini API**: Free tier (1500 requests/day)

### Paid Options:
- **Railway**: ~$5-10/month
- **DigitalOcean**: $6/month (basic droplet)
- **Vercel Pro**: $20/month
- **Gemini API**: Pay-as-you-go (very affordable)

## Production Checklist

Before going live:

- [ ] Domain name registered
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] Monitoring configured
- [ ] Error tracking setup
- [ ] Analytics added (optional)
- [ ] API rate limits checked
- [ ] Security audit done
- [ ] Mobile tested
- [ ] Performance optimized
- [ ] SEO basics (meta tags)
- [ ] Privacy policy (if collecting data)
- [ ] Terms of service

---

Choose the deployment option that best fits your needs and follow the steps carefully. Good luck! 🚀
