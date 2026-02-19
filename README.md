# 🦀 The Claw Family Microsite

An auto-updating microsite showcasing the Claw family of AI agent frameworks — OpenClaw, nanobot, PicoClaw, and ZeroClaw.

## ✨ Features

- 🔄 **Auto-Updates** - Live GitHub stats fetched every hour via GitHub API
- 📊 **Comparison Tables** - Side-by-side framework comparison
- 🎯 **Quick Start Guide** - Scenario-based recommendations
- 📈 **Infographics** - Animated GIFs for visual comparisons
- 🔒 **Security Advisory** - Moltbook incident warnings
- 🤖 **AI Context** - `llm.txt` for AI assistant understanding
- 💾 **Offline Mode** - Fallback data when API is unavailable

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/claw-microsite.git
cd claw-microsite

# Start local server
python3 -m http.server 3000
# Or: npx serve

# Open http://localhost:3000
```

## 📁 Project Structure

```
claw-microsite/
├── index.html          # Main site
├── styles.css          # Responsive CSS
├── script.js           # Auto-update logic
├── llm.txt             # AI context file
├── stats.json          # Fallback stats (offline mode)
├── package.json        # NPM config
├── vercel.json         # Vercel config
├── netlify.toml        # Netlify config
├── .gitignore
└── README.md           # This file
```

## 📊 Live Stats

The site fetches live data from the GitHub API:

| Framework | GitHub | Language |
|-----------|--------|----------|
| [OpenClaw](https://github.com/openclaw/openclaw) | openclaw/openclaw | TypeScript |
| [nanobot](https://github.com/nanobot-ai/nanobot) | nanobot-ai/nanobot | Python |
| [PicoClaw](https://github.com/picoclaw/picoclaw) | picoclaw/picoclaw | Go |
| [ZeroClaw](https://github.com/zeroclaw/zeroclaw) | zeroclaw/zeroclaw | Rust |

### Caching Strategy

- **localStorage**: 1-hour cache for stats
- **Fallback**: `stats.json` when API is offline
- **Indicator**: Shows "(live)" or "(cached)"

## 🎨 Infographics

The site includes animated infographics created with x-gif-maker:

- `claw-stars-verified.gif` - GitHub stars comparison
- `claw-size-verified.gif` - Repository size comparison
- `claw-timeline-verified.gif` - Launch timeline
- `claw-features-verified.gif` - Feature comparison

## 🛠️ Development

### Local Testing

```bash
# Check infographics exist
./scripts/check-infographics.sh

# Test GitHub API
node scripts/test-api.js

# Fetch fresh stats
node scripts/fresh-stats.js > stats.json
```

### NPM Scripts

```bash
npm install
npm start          # Start local server
npm run build       # Check infographics + fetch stats
npm run test        # Test GitHub API
```

## 🚀 Deployment

### Vercel

```bash
npm run deploy:vercel
# Or connect via Vercel CLI:
vercel link
vercel --prod
```

### Netlify

```bash
npm run deploy:netlify
# Or drag-drop to Netlify dashboard
```

## 🔐 Security Notes

This site includes information about:

- **Moltbook Database Exposure** (Jan 31, 2026)
  - 2.3 million encrypted messages exposed
  - 404 Media report: https://www.404media.co/

- **"What Would Elon Do?" Skill**
  - Malicious AI injection incident
  - Cisco Blogs analysis: https://blogs.cisco.com/

## 📜 License

MIT License - Feel free to fork, modify, and use for your own agent projects!

## 🤖 LLM.txt

The `llm.txt` file provides context for AI assistants working with this project. It includes:

- Project overview and purpose
- Technical architecture
- API endpoints and caching strategy
- Deployment options
- Security considerations

AI assistants can use this file to understand the project structure and assist with modifications.

## 🙏 Acknowledgments

- [OpenClaw](https://openclaw.ai) - The original AI agent framework
- [nanobot](https://github.com/nanobot-ai/nanobot) - Python minimalism
- [PicoClaw](https://picoclaw.ai) - Go efficiency
- [ZeroClaw](https://zeroclaw.net) - Rust security

## 📞 Contact

For questions or contributions, open an issue on GitHub!

---

**Made with ❤️ for the Claw community**
