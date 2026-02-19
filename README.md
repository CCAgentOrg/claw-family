# AI Agent Frameworks Microsite

A modern, auto-updating comparison website for popular AI agent frameworks. Helps developers choose the right framework for building personal AI assistants.

## 🚀 Live Demo

Deploy to Cloudflare Pages: `npm run deploy:cloudflare`

## ✨ Features

- **Auto-updating GitHub stats** - Live stars, forks, and repository sizes
- **Smart caching** - 1-hour localStorage cache with offline fallback
- **Responsive design** - Mobile-first dark theme
- **Interactive comparisons** - Side-by-side framework comparison
- **Quick start guide** - Scenario-based recommendations
- **Animated infographics** - Visual comparisons of metrics
- **Security advisory** - Best practices for AI agent deployment

## 📊 Featured Frameworks

| Framework | Stars | Language | Size | Best For |
|-----------|-------|----------|------|----------|
| OpenAI Swarm | ~21K | Python | 499 KB | Simple multi-agent orchestration |
| nanobot | ~1K | Python | 33 KB | Personal chat assistants |
| GPTScript | ~3K | Go | 5.2 MB | Enterprise scripting |
| AutoGen | ~55K | Python | 148 MB | Complex multi-agent workflows |
| LangGraph | ~25K | Python | 508 MB | Graph-based workflows |
| Open Interpreter | ~62K | Python | 100 MB | Code execution |

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom dark theme, no frameworks
- **JavaScript** - Vanilla JS, GitHub API integration
- **GitHub API** - Live stats fetching
- **Cloudflare Pages** - Recommended deployment

## 📦 Installation

```bash
# Clone or download this repo
cd claw-microsite

# Install dependencies
npm install
```

## 🎯 Quick Start

```bash
# Local development (serves on http://localhost:3000)
npm start

# Check that infographics exist
npm run check:infographics

# Build and verify everything
npm run build

# Test GitHub API connectivity
npm run test
```

## 🚀 Deployment

### Cloudflare Pages (Recommended)

```bash
# Option 1: Direct deploy
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=ai-agent-frameworks

# Option 2: GitHub auto-deploy
# 1. Create repo and push
# 2. Add secrets in Cloudflare: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
# 3. Enable Cloudflare Pages in your repo settings
```

### Vercel

```bash
npm install -g vercel
vercel link
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### GitHub Pages

```bash
# Configure gh-pages in package.json
npm run deploy:gh-pages
```

## 📁 File Structure

```
claw-microsite/
├── index.html              # Main site
├── styles.css              # Responsive dark theme
├── script.js               # Auto-update logic
├── llm.txt                 # AI assistant context
├── stats.json              # Fallback stats (offline mode)
├── package.json            # NPM scripts
├── README.md               # This file
├── DEPLOYMENT.md           # Detailed deployment guide
├── _headers                # Cloudflare headers
├── _redirects              # Cloudflare redirects
├── wrangler.toml           # Cloudflare Workers config
├── vercel.json             # Vercel config
├── netlify.toml            # Netlify config
├── claw-stars-verified.gif     # Stars comparison
├── claw-size-verified.gif      # Size comparison
├── claw-timeline-verified.gif  # Timeline
├── claw-features-verified.gif  # Features
└── scripts/
    ├── check-infographics.js
    ├── check-pages-domains.sh
    ├── fresh-stats.js
    └── test-api.js
```

## 🔧 Configuration

### Adding New Frameworks

Edit `script.js` and add to the `frameworks` array:

```javascript
{
    id: 'myframework',
    name: 'My Framework',
    description: 'Description here',
    language: 'TypeScript',
    size: '10000',
    repo: 'org/myframework',
    website: 'https://github.com/org/myframework',
    bestFor: 'Use case here',
    icon: '🚀'
}
```

### Customizing Theme

Edit `styles.css` and update CSS variables:

```css
:root {
    --primary: #6366f1;
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    /* ... */
}
```

## 📊 GitHub API Limits

The GitHub API has rate limits:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

To use authenticated requests, create a GitHub token and add to `script.js`:

```javascript
const response = await fetch(`https://api.github.com/repos/${framework.repo}`, {
    headers: {
        'Authorization': `token YOUR_GITHUB_TOKEN`
    }
});
```

## 🔒 Security

AI agents execute code and access data. Always:
- Review tool permissions carefully
- Sandbox code execution environments
- Use environment variables for API keys
- Implement rate limiting
- Audit agent logs regularly

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add new frameworks
- Improve documentation
- Fix bugs
- Enhance design

## 📄 License

MIT License - Feel free to use for your own projects!

## 🔗 Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

---

**Made with ❤️ for the AI agent community**