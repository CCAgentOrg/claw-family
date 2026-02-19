# 🚀 Deployment Guide

The Claw Family Microsite can be deployed to multiple platforms. Cloudflare Pages is recommended for its free tier, global CDN, and custom `.pages.dev` subdomains.

## ✅ Available Platforms

| Platform | Cost | Features | Domain |
|----------|------|----------|--------|
| **Cloudflare Pages** | Free | Global CDN, instant deploys, SSL | `.pages.dev` subdomain |
| Vercel | Free tier | Edge functions, analytics | `.vercel.app` subdomain |
| Netlify | Free tier | Form handling, functions | `.netlify.app` subdomain |
| GitHub Pages | Free | Simple static hosting | `.github.io` subdomain |

---

## ☁️ Cloudflare Pages (Recommended)

### Method 1: GitHub Auto-Deploy (Best)

1. **Push your code to GitHub**

2. **Get Cloudflare credentials:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - My Profile > API Tokens > Create Token
   - Use "Edit Cloudflare Workers" template
   - Save token as `CLOUDFLARE_API_TOKEN` secret

3. **Add GitHub Secrets:**
   ```
   Settings > Secrets and variables > Actions > New repository secret

   CLOUDFLARE_API_TOKEN = your_api_token
   CLOUDFLARE_ACCOUNT_ID = your_account_id (found in URL: dash.cloudflare.com/ACCOUNT_ID)
   ```

4. **Push to main branch**
   - GitHub Actions will auto-deploy to Cloudflare Pages
   - Site will be at: `https://claw-microsite.pages.dev`

### Method 2: Direct Deploy via Wrangler

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create project
wrangler pages project create claw-microsite --production-branch=main

# Deploy
cd claw-microsite
wrangler pages deploy . --project-name=claw-microsite
```

### Method 3: Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your GitHub repository
4. Build settings: Leave empty (static site, no build command)
5. Click "Save and Deploy"

### Custom Domain

1. Go to Pages > claw-microsite > Custom Domains
2. Click "Set up a custom domain"
3. Enter domain (e.g., `clawfamily.dev`)
4. Update DNS at your registrar
5. Free SSL certificate automatically issued

---

## 📦 Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel link
vercel --prod

# Or connect via Vercel dashboard:
# vercel.com/new > Import from Git > Deploy
```

---

## 🌐 Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Or drag-drop folder to app.netlify.com
```

---

## 📖 GitHub Pages

```bash
# Enable GitHub Pages in repo settings
# Settings > Pages > Source: Deploy from a branch
# Branch: main / root
```

---

## 🔍 Domain Availability Check

```bash
# Check available .pages.dev subdomains
npm run check:domains

# Or run directly:
./scripts/check-pages-domains.sh
```

### Currently Available (as of Feb 2026):

| Domain | Status |
|--------|--------|
| `claw-family.pages.dev` | ✅ Available |
| `claw-microsite.pages.dev` | ✅ Available |
| `claw-agents.pages.dev` | ✅ Available |
| `claw-frameworks.pages.dev` | ✅ Available |
| `openclaw-family.pages.dev` | ✅ Available |
| `ai-claws.pages.dev` | ✅ Available |
| `clawbot.pages.dev` | ✅ Available |

---

## 🎯 Recommended Setup

### Quick Start (5 minutes):

```bash
# 1. Fork this repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/claw-microsite.git
cd claw-microsite

# 3. Check domain availability
npm run check:domains

# 4. Push to GitHub (if making changes)
git add .
git commit -m "Initial setup"
git push

# 5. Connect to Cloudflare Pages
# Go to dash.cloudflare.com/pages > Create > Connect GitHub
# Done! Your site will be live at: https://YOUR-PROJECT.pages.dev
```

### Production Ready:

1. Set up custom domain
2. Add analytics (Cloudflare Web Analytics)
3. Set up GitHub Actions auto-deploy
4. Enable HSTS in `_headers`
5. Add robots.txt for SEO

---

## 🔧 Environment Variables

| Platform | Variable | Purpose |
|----------|----------|---------|
| Cloudflare | `CLOUDFLARE_API_TOKEN` | API access |
| Cloudflare | `CLOUDFLARE_ACCOUNT_ID` | Account identification |
| Vercel | `VERCEL_TOKEN` | API access |
| Netlify | `NETLIFY_AUTH_TOKEN` | API access |

---

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Infographics present (4 GIF files)
- [ ] `stats.json` updated with latest data
- [ ] Domain name chosen and available
- [ ] Platform connected (Cloudflare Pages recommended)
- [ ] Auto-deploy configured (GitHub Actions)
- [ ] Custom domain set up (optional)
- [ ] Analytics configured (optional)
- [ ] SEO meta tags reviewed
- [ ] Security headers set (`_headers` file)

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Run build locally first
npm run build

# Check for missing files
./scripts/check-infographics.sh
```

### Stats Not Updating
```bash
# Test GitHub API
npm run test

# Manually fetch stats
node scripts/fresh-stats.js > stats.json
```

### Domain Already Taken
```bash
# Check alternatives
npm run check:domains

# Use custom domain instead
# Cloudflare Pages allows custom domains for free
```

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/claw-microsite/issues)
- **Documentation**: See `README.md`
- **Cloudflare Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)

---

**Deployed with ☁️ Cloudflare Pages**
