#!/usr/bin/env node

/**
 * Test GitHub API connectivity and rate limits
 * Usage: node test-api.js
 */

const REPOSITORIES = [
    { owner: 'openclaw', repo: 'openclaw' },
    { owner: 'nanobot-ai', repo: 'nanobot' },
    { owner: 'picoclaw', repo: 'picoclaw' },
    { owner: 'zeroclaw', repo: 'zeroclaw' }
];

async function testGitHubAPI() {
    console.log('Testing GitHub API connectivity...\n');

    // Test rate limits first
    try {
        const rateLimitResponse = await fetch('https://api.github.com/rate_limit');
        const rateLimitData = await rateLimitResponse.json();

        console.log('Rate Limit Status:');
        console.log(`  Remaining: ${rateLimitData.resources.core.remaining} / ${rateLimitData.resources.core.limit}`);
        console.log(`  Reset: ${new Date(rateLimitData.resources.core.reset * 1000).toISOString()}\n`);
    } catch (error) {
        console.error('Failed to fetch rate limit:', error.message);
    }

    // Test each repository
    let successCount = 0;

    for (const repo of REPOSITORIES) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${repo.owner}/${repo.repo}`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        'User-Agent': 'claw-microsite-test'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                successCount++;
                console.log(`✓ ${repo.owner}/${repo.repo}`);
                console.log(`  Stars: ${data.stargazers_count.toLocaleString()}`);
                console.log(`  Forks: ${data.forks_count.toLocaleString()}`);
                console.log(`  Updated: ${data.updated_at}\n`);
            } else {
                console.log(`✗ ${repo.owner}/${repo.repo}`);
                console.log(`  Status: ${response.status} ${response.statusText}\n`);
            }
        } catch (error) {
            console.log(`✗ ${repo.owner}/${repo.repo}`);
            console.log(`  Error: ${error.message}\n`);
        }
    }

    // Summary
    console.log('---');
    console.log(`Success: ${successCount}/${REPOSITORIES.length} repositories`);

    if (successCount === REPOSITORIES.length) {
        console.log('All tests passed! ✓');
        process.exit(0);
    } else {
        console.log('Some tests failed! ✗');
        process.exit(1);
    }
}

testGitHubAPI().catch(console.error);
