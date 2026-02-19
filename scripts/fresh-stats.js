#!/usr/bin/env node

/**
 * Fetch fresh GitHub stats for AI agent frameworks
 * Updates stats.json with latest data from GitHub API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Real GitHub repos to fetch
const repos = [
    'openai/swarm',
    'nanobot-ai/nanobot',
    'gptscript-ai/gptscript',
    'microsoft/autogen',
    'langchain-ai/langgraph',
    'openinterpreter/open-interpreter'
];

// Stats file path
const statsPath = path.join(__dirname, '..', 'stats.json');

// Fetch from GitHub API
function fetchGitHubStats(repo) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${repo}`,
            method: 'GET',
            headers: {
                'User-Agent': 'ai-agent-frameworks-microsite',
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
                        const json = JSON.parse(data);
                        resolve({
                            repo: repo,
                            stars: json.stargazers_count,
                            forks: json.forks_count,
                            language: json.language,
                            size: json.size
                        });
                    } catch (error) {
                        reject(new Error(`Failed to parse JSON for ${repo}: ${error.message}`));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode} for ${repo}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request failed for ${repo}: ${error.message}`));
        });

        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error(`Timeout for ${repo}`));
        });

        req.end();
    });
}

// Main function
async function main() {
    console.log('🔄 Fetching fresh GitHub stats...\n');

    const stats = {};
    let successCount = 0;
    let failCount = 0;

    for (const repo of repos) {
        try {
            process.stdout.write(`Fetching ${repo}... `);
            const data = await fetchGitHubStats(repo);
            stats[repo] = {
                stars: data.stars,
                forks: data.forks,
                language: data.language,
                size: data.size
            };
            console.log(`✅ ${data.stars.toLocaleString()} stars, ${data.forks.toLocaleString()} forks`);
            successCount++;
        } catch (error) {
            console.log(`❌ ${error.message}`);
            failCount++;
            // Keep existing stats if fetch fails
            if (fs.existsSync(statsPath)) {
                const existingStats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
                if (existingStats[repo]) {
                    stats[repo] = existingStats[repo];
                    console.log(`   Using cached stats for ${repo}`);
                }
            }
        }
    }

    console.log(`\n📊 Results: ${successCount} succeeded, ${failCount} failed`);

    // Write to stats.json
    fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
    console.log(`✅ Updated ${statsPath}`);

    // Summary
    console.log('\n📈 Summary:');
    console.log('───────────────────────────────────────────────');
    console.log('Framework              Stars      Forks      Lang');
    console.log('───────────────────────────────────────────────');
    for (const [repo, data] of Object.entries(stats)) {
        const name = repo.split('/')[1].padEnd(20);
        const stars = data.stars.toLocaleString().padStart(10);
        const forks = data.forks.toLocaleString().padStart(10);
        const lang = (data.language || 'N/A').padStart(10);
        console.log(`${name}${stars}${forks}${lang}`);
    }
    console.log('───────────────────────────────────────────────');
}

// Run
main().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
});