#!/usr/bin/env node

/**
 * Fetch fresh GitHub stats for Claw family frameworks
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Claw family frameworks
const REPOS = [
  { owner: 'openclaw', repo: 'openclaw', name: 'OpenClaw' },
  { owner: 'sipeed', repo: 'picoclaw', name: 'PicoClaw' },
  { owner: 'zeroclaw-labs', repo: 'zeroclaw', name: 'ZeroClaw' },
  { owner: 'nanobot-ai', repo: 'nanobot', name: 'nanobot' },
  { owner: 'openclaw', repo: 'clawhub', name: 'ClawHub' }
];

// Fetch GitHub repo data
function fetchGitHubData(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      method: 'GET',
      headers: {
        'User-Agent': 'nanobot-claw-microsite',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON for ${owner}/${repo}`));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${owner}/${repo}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout for ${owner}/${repo}`));
    });

    req.end();
  });
}

// Main function
async function main() {
  console.log('🔄 Fetching fresh GitHub stats...');
  console.log('');

  const results = {};
  let successCount = 0;
  let failCount = 0;

  for (const framework of REPOS) {
    try {
      const data = await fetchGitHubData(framework.owner, framework.repo);

      results[framework.repo] = {
        name: framework.name,
        owner: framework.owner,
        repo: framework.repo,
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        language: data.language || 'Unknown',
        size: data.size || 0,
        description: data.description || ''
      };

      console.log(`✓ ${framework.owner}/${framework.repo} - ${data.stargazers_count.toLocaleString()} stars`);
      successCount++;
    } catch (err) {
      console.log(`✗ ${framework.owner}/${framework.repo} - ${err.message}`);

      // Keep existing data if fetch fails
      try {
        const existingPath = path.join(__dirname, '..', 'stats.json');
        const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
        if (existing.frameworks && existing.frameworks[framework.repo]) {
          results[framework.repo] = existing.frameworks[framework.repo];
          console.log(`  Using cached data for ${framework.repo}`);
        }
      } catch (e) {
        // If no cached data, create placeholder
        results[framework.repo] = {
          name: framework.name,
          owner: framework.owner,
          repo: framework.repo,
          stars: 0,
          forks: 0,
          language: 'Unknown',
          size: 0,
          description: 'Failed to fetch'
        };
      }
      failCount++;
    }
  }

  console.log('');
  console.log(`📊 Results: ${successCount} succeeded, ${failCount} failed`);

  // Save to stats.json
  const outputPath = path.join(__dirname, '..', 'stats.json');
  const stats = {
    frameworks: results,
    last_updated: new Date().toISOString(),
    source: 'GitHub API'
  };

  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
  console.log(`✅ Updated ${outputPath}`);

  // Print summary table
  console.log('');
  console.log('📈 Summary:');
  console.log('───────────────────────────────────────────────');
  console.log('Framework              Stars      Forks      Lang');
  console.log('───────────────────────────────────────────────');
  for (const [key, framework] of Object.entries(results)) {
    const stars = (framework.stars || 0).toLocaleString().padStart(10);
    const forks = (framework.forks || 0).toLocaleString().padStart(10);
    const lang = (framework.language || 'Unknown').padStart(10);
    console.log(`${framework.name.padEnd(20)} ${stars} ${forks} ${lang}`);
  }
  console.log('───────────────────────────────────────────────');
}

main().catch(console.error);
