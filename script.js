// The Claw Family - Real GitHub repositories
const frameworks = [
    {
        id: 'openclaw',
        name: 'OpenClaw',
        owner: 'openclaw',
        repo: 'openclaw',
        description: 'Full-featured personal AI assistant with multi-channel support',
        language: 'TypeScript',
        bestFor: 'Complete personal AI setup',
        url: 'https://github.com/openclaw/openclaw',
        docs: 'https://openclaw.ai'
    },
    {
        id: 'picoclaw',
        name: 'PicoClaw',
        owner: 'sipeed',
        repo: 'picoclaw',
        description: 'Ultra-lightweight Go agent for embedded devices',
        language: 'Go',
        bestFor: 'Running on low-cost hardware',
        url: 'https://github.com/sipeed/picoclaw',
        docs: 'https://picoclaw.ai'
    },
    {
        id: 'zeroclaw',
        name: 'ZeroClaw',
        owner: 'zeroclaw-labs',
        repo: 'zeroclaw',
        description: 'Rust-based, security-first AI agent runtime',
        language: 'Rust',
        bestFor: 'Production, security-critical deployments',
        url: 'https://github.com/zeroclaw-labs/zeroclaw',
        docs: 'https://zeroclaw.net'
    },
    {
        id: 'nanobot',
        name: 'nanobot',
        owner: 'HKUDS',
        repo: 'nanobot',
        description: 'Ultra-lightweight personal AI assistant (~4,000 LOC)',
        language: 'Python',
        bestFor: 'Quick prototyping and research',
        url: 'https://github.com/HKUDS/nanobot',
        docs: 'https://github.com/HKUDS/nanobot'
    },
    {
        id: 'clawhub',
        name: 'ClawHub',
        owner: 'openclaw',
        repo: 'clawhub',
        description: 'Skill registry for Claw family agents',
        language: 'TypeScript',
        bestFor: 'Finding and managing skills',
        url: 'https://github.com/openclaw/clawhub',
        docs: 'https://clawhub.ai'
    }
];

// Fallback stats (for offline mode)
const fallbackStats = {
    openclaw: { stars: 211390, forks: 39138, size: 208130 },
    picoclaw: { stars: 16333, forks: 1864, size: 17059 },
    zeroclaw: { stars: 14911, forks: 1559, size: 7400 },
    nanobot: { stars: 0, forks: 0, size: 4000 },
    clawhub: { stars: 2351, forks: 541, size: 1881 }
};

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format size in KB/MB/GB
function formatSize(kb) {
    if (kb >= 1048576) {
        return (kb / 1048576).toFixed(1) + ' GB';
    } else if (kb >= 1024) {
        return (kb / 1024).toFixed(1) + ' MB';
    }
    return kb + ' KB';
}

// Get color based on star count
function getStarColor(stars) {
    if (stars >= 100000) return '#FFD700'; // Gold
    if (stars >= 10000) return '#C0C0C0'; // Silver
    if (stars >= 1000) return '#CD7F32'; // Bronze
    return '#4CAF50'; // Green
}

// Fetch stats from GitHub API
async function fetchGitHubStats() {
    const stats = {};
    const errors = [];
    
    for (const framework of frameworks) {
        try {
            const response = await fetch(`https://api.github.com/repos/${framework.owner}/${framework.repo}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            stats[framework.id] = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                size: data.size,
                updated: data.updated_at
            };
        } catch (error) {
            console.warn(`Failed to fetch ${framework.id}:`, error.message);
            errors.push(framework.id);
            stats[framework.id] = fallbackStats[framework.id];
        }
    }
    
    return { stats, errors };
}

// Update framework grid
function updateFrameworkGrid(stats) {
    const grid = document.getElementById('frameworkGrid');
    grid.innerHTML = frameworks.map(f => {
        const s = stats[f.id];
        return `
            <div class="framework-card" id="${f.id}">
                <div class="framework-header">
                    <h3>${f.name}</h3>
                    <span class="framework-lang">${f.language}</span>
                </div>
                <p class="framework-desc">${f.description}</p>
                <div class="framework-stats">
                    <div class="stat">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-value">${formatNumber(s.stars)}</span>
                        <span class="stat-label">stars</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🍴</span>
                        <span class="stat-value">${formatNumber(s.forks)}</span>
                        <span class="stat-label">forks</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">📦</span>
                        <span class="stat-value">${formatSize(s.size)}</span>
                        <span class="stat-label">size</span>
                    </div>
                </div>
                <div class="framework-links">
                    <a href="${f.url}" target="_blank" class="btn btn-primary">GitHub</a>
                    <a href="${f.docs}" target="_blank" class="btn btn-secondary">Docs</a>
                </div>
            </div>
        `;
    }).join('');
}

// Update comparison table
function updateComparisonTable(stats) {
    const table = document.getElementById('comparisonTable');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = frameworks.map(f => {
        const s = stats[f.id];
        return `
            <tr>
                <td><a href="${f.url}" target="_blank">${f.name}</a></td>
                <td><span style="color: ${getStarColor(s.stars)}">${formatNumber(s.stars)}</span></td>
                <td>${formatNumber(s.forks)}</td>
                <td>${f.language}</td>
                <td>${formatSize(s.size)}</td>
                <td>${f.bestFor}</td>
            </tr>
        `;
    }).join('');
}

// Update live indicator
function updateLiveIndicator(errors, isLive) {
    const indicator = document.getElementById('liveIndicator');
    const dot = indicator.querySelector('.status-dot');
    const text = indicator.querySelector('.status-text');
    
    if (isLive && errors.length === 0) {
        dot.style.background = '#4CAF50';
        text.textContent = 'Live from GitHub';
    } else if (errors.length > 0) {
        dot.style.background = '#FFC107';
        text.textContent = 'Partial (cached)';
    } else {
        dot.style.background = '#9E9E9E';
        text.textContent = 'Cached (offline)';
    }
}

// Update last updated time
function updateLastUpdated() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdated').textContent = formatted;
}

// Check cache and fetch stats
async function init() {
    const cacheKey = 'clawFamilyStats';
    const cacheAgeKey = 'clawFamilyStatsAge';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds
    
    let stats = fallbackStats;
    let isLive = false;
    let errors = [];
    
    // Check cache
    const cachedStats = localStorage.getItem(cacheKey);
    const cachedAge = localStorage.getItem(cacheAgeKey);
    const now = Date.now();
    
    if (cachedStats && cachedAge && (now - parseInt(cachedAge) < CACHE_DURATION)) {
        console.log('Using cached stats');
        stats = JSON.parse(cachedStats);
        isLive = false;
        
        // Fetch in background
        fetchGitHubStats().then(({ stats: freshStats, errors: freshErrors }) => {
            if (freshErrors.length === 0) {
                localStorage.setItem(cacheKey, JSON.stringify(freshStats));
                localStorage.setItem(cacheAgeKey, now.toString());
                updateFrameworkGrid(freshStats);
                updateComparisonTable(freshStats);
                updateLiveIndicator(freshErrors, true);
            }
        });
    } else {
        console.log('Fetching fresh stats');
        try {
            const result = await fetchGitHubStats();
            stats = result.stats;
            errors = result.errors;
            isLive = errors.length === 0;
            
            if (errors.length < frameworks.length) {
                localStorage.setItem(cacheKey, JSON.stringify(stats));
                localStorage.setItem(cacheAgeKey, now.toString());
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            errors = frameworks.map(f => f.id);
            isLive = false;
        }
    }
    
    updateFrameworkGrid(stats);
    updateComparisonTable(stats);
    updateLiveIndicator(errors, isLive);
    updateLastUpdated();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
