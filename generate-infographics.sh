#!/bin/bash
# Generate infographics for the real Claw Family

# Use x-gif-maker skill to create animated infographics

# 1. GitHub Stars Comparison
python -m x_gif_maker \
  --style typewriter \
  --bg-color "#1a1a2e" \
  --text-color "#ffffff" \
  --accent-color "#e94560" \
  --duration 5000 \
  --output claw-stars-verified.gif \
  --width 800 \
  --height 400 \
  --headline "GitHub Stars Comparison" \
  --lines "OpenClaw: 211,390 ⭐" "PicoClaw: 16,333 ⭐" "ZeroClaw: 14,911 ⭐" "nanobot: 1,014 ⭐" "ClawHub: 2,351 ⭐"

# 2. Repository Size Comparison
python -m x_gif_maker \
  --style typewriter \
  --bg-color "#1a1a2e" \
  --text-color "#ffffff" \
  --accent-color "#16213e" \
  --duration 5000 \
  --output claw-size-verified.gif \
  --width 800 \
  --height 400 \
  --headline "Repository Size (Smaller = Better)" \
  --lines "nanobot: 3 MB" "ZeroClaw: 7.4 MB" "ClawHub: 1.9 MB" "PicoClaw: 17 MB" "OpenClaw: 208 MB"

# 3. Timeline
python -m x_gif_maker \
  --style typewriter \
  --bg-color "#1a1a2e" \
  --text-color "#ffffff" \
  --accent-color "#0f3460" \
  --duration 6000 \
  --output claw-timeline-verified.gif \
  --width 800 \
  --height 400 \
  --headline "Claw Family Timeline" \
  --lines "2024 Q4: Clawd created" "2025 Jan: Moltbot viral (100K+ stars)" "2025 Jan 29: Renamed to OpenClaw" "2025 Q2: PicoClaw launches" "2025 Q3: ZeroClaw launches" "2026: 200K+ OpenClaw stars"

# 4. Features Comparison
python -m x_gif_maker \
  --style typewriter \
  --bg-color "#1a1a2e" \
  --text-color "#ffffff" \
  --accent-color "#e94560" \
  --duration 6000 \
  --output claw-features-verified.gif \
  --width 800 \
  --height 400 \
  --headline "Feature Comparison" \
  --lines "OpenClaw: Full-featured, Multi-channel" "PicoClaw: <10MB RAM, Embedded" "ZeroClaw: Rust, Security-first" "nanobot: WhatsApp/Telegram ready" "ClawHub: 5,700+ skills"

# 5. Decision Guide
python -m x_gif_maker \
  --style typewriter \
  --bg-color "#1a1a2e" \
  --text-color "#ffffff" \
  --accent-color "#0f3460" \
  --duration 6000 \
  --output claw-decision-verified.gif \
  --width 800 \
  --height 400 \
  --headline "Choose Your Claw 🦞" \
  --lines "Full AI Assistant → OpenClaw" "Run on $10 hardware → PicoClaw" "Production security → ZeroClaw" "WhatsApp/Telegram bot → nanobot" "Find skills → ClawHub"

echo "Infographics generated!"
