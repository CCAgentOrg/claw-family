// AI Agent Frameworks Microsite
// Auto-updates from GitHub API with caching

// Framework configurations with real GitHub repos
const frameworks = [
    {
        id: 'swarm',
        name: 'OpenAI Swarm',
        description: 'Lightweight multi-agent orchestration by OpenAI',
        language: 'Python',
        size: '499',
        repo: 'openai/swarm',
        website: 'https://github.com/openai/swarm',
        bestFor: 'Simple multi-agent coordination',
        icon: '🐝'
    },
    {
        id: 'nanobot',
        name: 'nanobot',
        description: 'Personal AI assistant for chat platforms',
        language: 'Python',
        size: '33',
        repo: 'nanobot-ai/nanobot',
        website: 'https://github.com/nanobot-ai/nanobot',
        bestFor: 'Personal assistants, WhatsApp bots',
        icon: '🤖'
    },
    {
        id: 'gptscript',
        name: 'GPTScript',
        description: 'Go-based AI scripting framework',
        language: 'Go',
        size: '5234',
        repo: 'gptscript-ai/gptscript',
        website: 'https://github.com/gptscript-ai/gptscript',
        bestFor: 'Enterprise scripting, Go developers',
        icon: '⚡'
    },
    {
        id: 'autogen',
        name: 'AutoGen',
        description: 'Multi-agent conversation framework by Microsoft',
        language: 'Python',
        size: '148202',
        repo: 'microsoft/autogen',
        website: 'https://github.com/microsoft/autogen',
        bestFor: 'Complex multi-agent workflows',
        icon: '🤝'
    },
    {
        id: 'langgraph',
        name: 'LangGraph',
        description: 'Stateful multi-actor applications',
        language: 'Python',
        size: '507812',
        repo: 'langchain-ai/langgraph',
        website: 'https://github.com/langchain-ai/langgraph',
        bestFor: 'Graph-based workflows',
        icon: '🔗'
    },
    {
        id: 'interpreter',
        name: 'Open Interpreter',
        description: 'Code execution agent',
        language: 'Python',
        size: '100533',
        repo: 'openinterpreter/open-interpreter',
        website: 'https://github.com/openinterpreter/open-interpreter',
        bestFor: 'Code execution, data analysis',
        icon: '💻'
    }
];

// Fallback stats for offline mode
const fallbackStats = {
    'openai/swarm': { stars: 20976, forks: 2235 },
    'nanobot-ai/nanobot': { stars: 1014, forks: 148 },
    'gptscript-ai/gptscript': { stars: 3268, forks: 292 },
    'microsoft/autogen': { stars: 54648, forks: 8229 },
    'langchain-ai/langgraph': { stars: 24844, forks: 4342 },
    'openinterpreter/open-interpreter': { stars: 62251, forks: 5354 }
};

// Cache duration: 1 hour
const CACHE_DURATION = 60 * 60 * 1000;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    updateLastUpdated();
    
    try {
        const stats = await fetchStats();
        renderFrameworks(stats);
        renderComparisonTable(stats);
        updateLiveIndicator(true, stats);
    } catch (error) {
        console.warn('Using fallback stats:', error.message);
        renderFrameworks(fallbackStats);
        renderComparisonTable(fallbackStats);
        updateLiveIndicator(false, fallbackStats);
    }
});

// Update last updated time
function updateLastUpdated() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleString();
}

// Fetch stats from GitHub API with caching
async function fetchStats() {
    // Check cache first
    const cached = localStorage.getItem('frameworkStats');
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('Using cached stats from', new Date(timestamp).toLocaleString());
            updateLiveIndicator(true, data, true);
            return data;
        }
    }

    // Fetch from GitHub API
    const stats = {};
    const errors = [];

    for (const framework of frameworks) {
        try {
            const response = await fetch(`https://api.github.com/repos/${framework.repo}`);
            if (response.ok) {
                const data = await response.json();
                stats[framework.repo] = {
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    language: data.language
                };
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.warn(`Failed to fetch ${framework.repo}:`, error);
            errors.push(framework.repo);
            // Use fallback for failed repos
            if (fallbackStats[framework.repo]) {
                stats[framework.repo] = fallbackStats[framework.repo];
            }
        }
    }

    // Cache the results
    localStorage.setItem('frameworkStats', JSON.stringify({
        data: stats,
        timestamp: Date.now()
    }));

    return stats;
}

// Render framework cards
function renderFrameworks(stats) {
    const grid = document.getElementById('frameworkGrid');
    
    grid.innerHTML = frameworks.map(fw => {
        const stat = stats[fw.repo] || { stars: 'N/A', forks: 'N/A' };
        const formattedSize = formatSize(fw.size);
        
        return `
            <div class="framework-card" id="${fw.id}">
                <div class="framework-icon">${fw.icon}</div>
                <h3 class="framework-name">${fw.name}</h3>
                <p class="framework-description">${fw.description}</p>
                <div class="framework-stats">
                    <div class="stat">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-value">${formatNumber(stat.stars)}</span>
                        <span class="stat-label">stars</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">🔱</span>
                        <span class="stat-value">${formatNumber(stat.forks)}</span>
                        <span class="stat-label">forks</span>
                    </div>
                </div>
                <div class="framework-details">
                    <span class="framework-language">${fw.language}</span>
                    <span class="framework-size">${formattedSize}</span>
                </div>
                <a href="${fw.website}" target="_blank" class="framework-link">
                    View on GitHub →
                </a>
            </div>
        `;
    }).join('');
}

// Render comparison table
function renderComparisonTable(stats) {
    const tbody = document.querySelector('#comparisonTable tbody');
    
    tbody.innerHTML = frameworks.map(fw => {
        const stat = stats[fw.repo] || { stars: 'N/A', forks: 'N/A' };
        const formattedSize = formatSize(fw.size);
        
        return `
            <tr>
                <td><strong>${fw.icon} ${fw.name}</strong></td>
                <td>${formatNumber(stat.stars)}</td>
                <td>${formatNumber(stat.forks)}</td>
                <td><span class="language-badge ${fw.language.toLowerCase()}">${fw.language}</span></td>
                <td>${formattedSize}</td>
                <td>${fw.bestFor}</td>
            </tr>
        `;
    }).join('');
}

// Update live indicator
function updateLiveIndicator(isLive, stats, isCached = false) {
    const indicator = document.getElementById('liveIndicator');
    const statusText = indicator.querySelector('.status-text');
    
    if (isCached) {
        statusText.textContent = 'Live data (cached)';
    } else if (isLive) {
        statusText.textContent = 'Live data';
    } else {
        statusText.textContent = 'Offline mode';
    }
}

// Format large numbers
function formatNumber(num) {
    if (typeof num !== 'number') return num;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Format repository size
function formatSize(kb) {
    const num = parseInt(kb, 10);
    if (num >= 1024 * 1024) return (num / (1024 * 1024)).toFixed(1) + ' GB';
    if (num >= 1024) return (num / 1024).toFixed(1) + ' MB';
    return num + ' KB';
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { frameworks, fetchStats, formatNumber, formatSize };
}