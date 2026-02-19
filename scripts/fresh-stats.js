#!/usr/bin/env node

/**
 * Fetch fresh GitHub stats and output as JSON
 * Usage: node fresh-stats.js > stats.json
 */

const REPOSITORIES = {
    openclaw: { owner: 'openclaw', repo: 'openclaw' },
    nanobot: { owner: 'nanobot-ai', repo: 'nanobot' },
    picoclaw: { owner: 'picoclaw', repo: 'picoclaw' },
    zeroclaw: { owner: 'zeroclaw', repo: 'zeroclaw' }
};

async function fetchRepoStats(owner, repo) {
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'claw-microsite-stats-fetcher'
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch ${owner}/${repo}: ${response.status}`);
    }

    return response.json();
}

async function main() {
    const stats = {};

    for (const [key, config] of Object.entries(REPOSITORIES)) {
        try {
            const data = await fetchRepoStats(config.owner, config.repo);
            stats[key] = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                updated_at: data.updated_at
            };
            console.error(`✓ Fetched ${key}: ${data.stargazers_count} stars, ${data.forks_count} forks`);
        } catch (error) {
            console.error(`✗ Error fetching ${key}:`, error.message);
            stats[key] = null;
        }
    }

    console.log(JSON.stringify(stats, null, 2));
}

main().catch(console.error);
