// GitHub repository configuration
const REPOSITORIES = {
    openclaw: { owner: 'openclaw', repo: 'openclaw' },
    nanobot: { owner: 'nanobot-ai', repo: 'nanobot' },
    picoclaw: { owner: 'picoclaw', repo: 'picoclaw' },
    zeroclaw: { owner: 'zeroclaw', repo: 'zeroclaw' }
};

// Cache configuration
const CACHE_KEY = 'claw-stats';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// DOM Elements
const statCards = document.querySelectorAll('.stat-card');
const liveIndicator = document.getElementById('live-indicator');
const statusDot = liveIndicator.querySelector('.status-dot');
const statusText = liveIndicator.querySelector('.status-text');
const lastUpdatedEl = document.getElementById('last-updated');
const dataSourceEl = document.getElementById('data-source');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initStats();
    updateLastUpdated();
});

// Initialize stats display
async function initStats() {
    const cached = getCachedStats();

    if (cached && !isCacheExpired(cached.timestamp)) {
        // Use cached data
        displayStats(cached.data);
        updateStatus('cached', `Using cached data (${getCacheAge(cached.timestamp)})`);
        dataSourceEl.textContent = 'Source: Cache (GitHub API)';
        dataSourceEl.className = 'data-source cached';
    } else {
        // Fetch fresh data
        try {
            const stats = await fetchStats();
            if (stats) {
                displayStats(stats);
                cacheStats(stats);
                updateStatus('live', 'Live data from GitHub API');
                dataSourceEl.textContent = 'Source: GitHub API';
                dataSourceEl.className = 'data-source live';
            } else {
                throw new Error('Failed to fetch stats');
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            if (cached) {
                displayStats(cached.data);
                updateStatus('cached', `Using expired cache (${getCacheAge(cached.timestamp)})`);
                dataSourceEl.textContent = 'Source: Expired cache (API unavailable)';
                dataSourceEl.className = 'data-source cached';
            } else {
                loadFallbackStats();
                updateStatus('offline', 'Using fallback data (API unavailable)');
                dataSourceEl.textContent = 'Source: Fallback data';
                dataSourceEl.className = 'data-source offline';
            }
        }
    }
}

// Fetch stats from GitHub API
async function fetchStats() {
    const stats = {};

    for (const [key, config] of Object.entries(REPOSITORIES)) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${config.owner}/${config.repo}`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                stats[key] = {
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    updated_at: data.updated_at
                };
            } else {
                console.warn(`Failed to fetch ${key}: ${response.status}`);
                stats[key] = null;
            }
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            stats[key] = null;
        }
    }

    return stats;
}

// Display stats in the UI
function displayStats(stats) {
    statCards.forEach(card => {
        const framework = card.dataset.framework;
        const frameworkStats = stats[framework];

        if (frameworkStats) {
            const starsEl = card.querySelector('[data-type="stars"]');
            const forksEl = card.querySelector('[data-type="forks"]');

            starsEl.textContent = formatNumber(frameworkStats.stars);
            forksEl.textContent = formatNumber(frameworkStats.forks);
            starsEl.classList.remove('loading', 'error');
            forksEl.classList.remove('loading', 'error');
        } else {
            const starsEl = card.querySelector('[data-type="stars"]');
            const forksEl = card.querySelector('[data-type="forks"]');

            starsEl.textContent = 'N/A';
            forksEl.textContent = 'N/A';
            starsEl.classList.add('error');
            forksEl.classList.add('error');
        }
    });
}

// Format large numbers
function formatNumber(num) {
    if (num === null || num === undefined) return 'Loading...';

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Cache functions
function cacheStats(data) {
    const cache = {
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function getCachedStats() {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
}

function isCacheExpired(timestamp) {
    return Date.now() - timestamp > CACHE_DURATION;
}

function getCacheAge(timestamp) {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) {
        return `${minutes}m ago`;
    } else {
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    }
}

// Update status indicator
function updateStatus(status, message) {
    liveIndicator.className = `live-indicator ${status}`;
    statusText.textContent = message;
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    lastUpdatedEl.textContent = now.toLocaleString();
}

// Load fallback stats from stats.json
async function loadFallbackStats() {
    try {
        const response = await fetch('stats.json');
        if (response.ok) {
            const data = await response.json();
            displayStats(data);
        }
    } catch (error) {
        console.error('Error loading fallback stats:', error);
        // Hardcoded fallback
        displayStats({
            openclaw: { stars: 211358, forks: 39123 },
            nanobot: { stars: 21846, forks: 3352 },
            picoclaw: { stars: 16330, forks: 1861 },
            zeroclaw: { stars: 14901, forks: 1559 }
        });
    }
}

// Refresh stats (can be called manually)
async function refreshStats() {
    updateStatus('live', 'Fetching fresh data...');
    try {
        const stats = await fetchStats();
        displayStats(stats);
        cacheStats(stats);
        updateStatus('live', 'Live data from GitHub API');
        dataSourceEl.textContent = 'Source: GitHub API';
        dataSourceEl.className = 'data-source live';
        updateLastUpdated();
    } catch (error) {
        console.error('Error refreshing stats:', error);
        updateStatus('offline', 'Failed to fetch fresh data');
        dataSourceEl.textContent = 'Source: Error';
        dataSourceEl.className = 'data-source offline';
    }
}

// Make refresh available globally
window.refreshStats = refreshStats;
