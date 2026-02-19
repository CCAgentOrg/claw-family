#!/bin/bash
# Check Cloudflare Pages domain availability

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Checking Cloudflare Pages domain availability..."
echo ""

# Domains to check
domains=(
  "claw-family.pages.dev"
  "claw-microsite.pages.dev"
  "claw-agents.pages.dev"
  "claws.pages.dev"
  "claw-frameworks.pages.dev"
  "openclaw-family.pages.dev"
  "ai-claws.pages.dev"
  "clawbot.pages.dev"
)

echo "Domains available for Cloudflare Pages:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for domain in "${domains[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://$domain" 2>/dev/null)

  if [ "$status" = "521" ] || [ "$status" = "200" ] || [ "$status" = "301" ] || [ "$status" = "302" ]; then
    echo -e "${RED}❌ $domain - TAKEN (HTTP $status)${NC}"
  elif [ "$status" = "404" ] || [ "$status" = "000" ] || [ "$status" = "0000" ]; then
    echo -e "${GREEN}✅ $domain - AVAILABLE${NC}"
  else
    echo -e "${YELLOW}⚠️  $domain - Unknown (HTTP $status)${NC}"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Note: Cloudflare Pages subdomains are assigned automatically when you deploy."
echo "   You can also set a custom domain during or after deployment."
echo ""
