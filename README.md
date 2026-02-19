# 🦞 The Claw Family - AI Agent Frameworks Guide

A comprehensive guide to the open-source AI agent frameworks known collectively as "The Claw Family."

![GitHub stars](https://img.shields.io/badge/OpenClaw-211%2C390%20⭐-ffcd3c?logo=github)
![GitHub stars](https://img.shields.io/badge/PicoClaw-16%2C333%20⭐-9e9e9e?logo=github)
![GitHub stars](https://img.shields.io/badge/ZeroClaw-14%2C911%20⭐-ff5722?logo=github)

## 🚀 Live Demo

Visit the microsite: [https://ccagentorg.github.io/ai-agent-frameworks/](https://ccagentorg.github.io/ai-agent-frameworks/)

The site features:
- **Auto-updating GitHub stats** via GitHub API
- **Animated infographics** visualizing comparisons
- **Quick start guides** for each framework
- **Security advisories** with real incident documentation

## 📊 The Claw Family

| Framework | Stars | Language | Size | Best For |
|-----------|-------|----------|------|----------|
| [OpenClaw](https://github.com/openclaw/openclaw) | 211,406 ⭐ | TypeScript | 208 MB | Full-featured personal AI |
| [PicoClaw](https://github.com/sipeed/picoclaw) | 16,338 ⭐ | Go | 17 MB | Running on $10 hardware |
| [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw) | 14,920 ⭐ | Rust | 7.4 MB | Production security |
| [nanobot](https://github.com/nanobot-ai/nanobot) | 1,014 ⭐ | Go | 3 MB | Building MCP agents |
| [ClawHub](https://github.com/openclaw/clawhub) | 2,353 ⭐ | TypeScript | 1.9 MB | Finding AI skills |

## 🎯 Quick Start

### OpenClaw - Full-Featured Personal AI

```bash
# Install (requires Node >= 22)
npm install -g openclaw@latest

# Run onboarding wizard
openclaw onboard --install-daemon

# Start the gateway
openclaw gateway --port 18789
```

**Best for:** Complete personal AI setup with multi-channel support (WhatsApp, Telegram, Discord, Slack, etc.)

### PicoClaw - Ultra-Lightweight Go Agent

```bash
# Download binary
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw-linux-arm64
chmod +x picoclaw-linux-arm64
./picoclaw-linux-arm64
```

**Best for:** Running on Raspberry Pi Zero, old phones, embedded devices (<10MB RAM)

### ZeroClaw - Security-First Rust Runtime

```bash
# Clone and bootstrap
git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw
./bootstrap.sh

# Or install with cargo
cargo install zeroclaw

# Run onboarding
zeroclad onboard
```

**Best for:** Production, security-critical deployments (<5MB RAM, 400x faster startup)

### nanobot - MCP Host for AI Agents

```bash
# Install via Homebrew
brew install nanobot-ai/tap/nanobot

# Create configuration
nanobot run ./nanobot.yaml

# Web UI available at http://localhost:8080
```

**Best for:** Building MCP agents and hosts for AI applications

### ClawHub - Skill Registry

```bash
# Search skills
clawhub search "weather forecast"

# Install
clawhub install weather-skill

# List installed
clawhub list
```

**Best for:** Extending any Claw framework with 5,700+ community skills

## 🛡️ Security Considerations

### Moltbook Database Exposure (January 2026)
A public Moltbook instance exposed user data due to misconfigured database settings.

**Mitigation:** Always use `openclaw doctor` to audit configuration before deployment.

### "What Would Elon Do?" Malicious Skill
A skill in ClawHub was found to silently collect user data.

**Mitigation:** Review skill code before installing, especially from untrusted authors.

### General Security Tips
- Review tool permissions carefully
- Use sandboxed environments for code execution
- Store API keys in environment variables
- Audit agent logs regularly
- Install security updates promptly

## 📜 History Timeline

- **2024 Q4** - Clawd created by Peter Steinberger
- **2025 January** - Clawd renamed to Moltbot (lobster theme)
- **2025 January 27** - Moltbot goes viral (100K+ stars in weeks)
- **2025 January 29** - Anthropic trademark claim → renamed to OpenClaw
- **2025 February 15** - Peter Steinberger joins OpenAI (Reuters, CNBC)
- **2025 Q2** - PicoClaw launches (Go-based, <10MB)
- **2025 Q3** - ZeroClaw launches (Rust-based, security-first)
- **2025 Q4** - ClawHub reaches 5,000+ skills
- **2026** - OpenClaw reaches 200K+ stars, ecosystem continues to grow

## 🧩 ClawHub Skills

ClawHub hosts **5,700+ community-built skills** for the Claw family:

```bash
# Popular skills
clawhub install weather-skill          # Weather forecasts
clawhub install calendar-skill         # Calendar management
clawhub install github-skill           # GitHub operations
clawhub install spotify-skill          # Music control
clawhub install code-review-skill      # Code review assistance
```

Visit [ClawHub](https://clawhub.ai) to browse all skills.

## 🔗 Resources

### Official Documentation
- [OpenClaw](https://openclaw.ai) - Full-featured personal AI
- [PicoClaw](https://picoclaw.ai) - Ultra-lightweight agent
- [ZeroClaw](https://zeroclaw.net) - Security-first runtime
- [nanobot](https://github.com/nanobot-ai/nanobot) - Minimalist assistant
- [ClawHub](https://clawhub.ai) - Skill registry

### GitHub Repositories
- [openclaw/openclaw](https://github.com/openclaw/openclaw)
- [sipeed/picoclaw](https://github.com/sipeed/picoclaw)
- [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [nanobot-ai/nanobot](https://github.com/nanobot-ai/nanobot)
- [openclaw/clawhub](https://github.com/openclaw/clawhub)

### Community
- [OpenClaw Discussions](https://github.com/openclaw/openclaw/discussions)
- [OpenClaw Discord](https://discord.gg/openclaw)
- [ClawHub Skills](https://clawhub.ai/skills)

## 💻 Development

### Local Development

```bash
# Clone repository
git clone https://github.com/CCAgentOrg/ai-agent-frameworks.git
cd ai-agent-frameworks

# Serve locally (Python 3)
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open http://localhost:8000
```

### Project Structure

```
claw-microsite/
├── index.html              # Main site
├── styles.css              # Dark theme CSS
├── script.js               # GitHub API integration
├── llm.txt                 # AI context file
├── stats.json              # Fallback GitHub stats
├── README.md               # This file
├── .nojekyll               # GitHub Pages fix
└── *-verified.gif          # Animated infographics (5 files)
```

### NPM Scripts

```bash
# Check domain availability
npm run check:domains

# Generate infographics
bash generate-infographics.sh

# Test GitHub API
npm run test:api
```

## 📦 Deployment

The site is deployed to GitHub Pages:

**URL:** https://ccagentorg.github.io/ai-agent-frameworks/

### Deploy to GitHub Pages

```bash
# Push to main branch - auto-deploys via GitHub Actions
git add .
git commit -m "Update site"
git push origin main
```

### Alternative Deployment Platforms

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Cloudflare Pages
```bash
npm install -g wrangler
wrangler pages deploy . --project-name=claw-microsite
```

## 🤖 AI Context

This project includes an `llm.txt` file for AI assistants. When contributing or maintaining this project:

- Always verify GitHub stats using the GitHub API
- Security incidents are documented in the site's Security section
- The Claw family includes OpenClaw, PicoClaw, ZeroClaw, nanobot, and ClawHub
- All frameworks share the "personal AI ownership" philosophy

## 📄 License

This microsite content is licensed under MIT License.

The Claw family frameworks are open-source with various licenses:
- OpenClaw: MIT License
- PicoClaw: MIT License  
- ZeroClaw: MIT License
- nanobot: MIT License
- ClawHub: MIT License

## 🙏 Acknowledgments

- The Claw family community for building amazing open-source AI tools
- [x-gif-maker](https://github.com/nanobot-ai/x-gif-maker) for animated infographics
- GitHub API for live statistics

---

**Built with ❤️ for the AI agent community**

🦞 The Claw Family - Open-Source AI Agent Frameworks
