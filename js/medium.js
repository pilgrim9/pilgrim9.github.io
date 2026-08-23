const fallbackArticles = [
    {
        title: '8 Prototypes in 1 Semester',
        link: './8-games-in-1-semester/',
        pubDate: '2023-01-15',
        description: 'Reflections and core design lessons from shipping eight distinct game prototypes in a single semester.'
    },
    {
        title: 'Simplifying a Tabletop RPG',
        link: './simplifying-a-tabletop-rpg/',
        pubDate: '2022-11-20',
        description: 'How removing friction and streamlining resolution mechanics can make tabletop games dramatically more engaging.'
    }
];

export async function loadMediumArticles() {
    const container = document.getElementById('articles-list');
    if (!container) {
        throw new Error('Articles list container "#articles-list" was not found in DOM.');
    }

    try {
        const username = 'gorostiagamanuel';
        const rssUrl = `https://medium.com/feed/@${username}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            renderArticleCards(container, data.items.slice(0, 6));
        } else {
            renderArticleCards(container, fallbackArticles);
        }
    } catch {
        renderArticleCards(container, fallbackArticles);
    }
}

function renderArticleCards(container, articles) {
    container.innerHTML = articles.map(post => {
        const formattedDate = formatDate(post.pubDate);
        const snippet = cleanSnippet(post.description || post.content);

        return `
            <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="article-card">
                <div class="article-card-header">
                    <span class="article-date">${formattedDate}</span>
                    <span class="article-arrow">↗</span>
                </div>
                <h4 class="article-title">${post.title}</h4>
                ${snippet ? `<p class="article-snippet">${snippet}</p>` : ''}
            </a>
        `;
    }).join('');
}

function formatDate(dateString) {
    if (!dateString) return 'Article';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
}

function cleanSnippet(rawHtml) {
    if (!rawHtml) return '';
    const temp = document.createElement('div');
    temp.innerHTML = rawHtml;
    const text = temp.textContent || temp.innerText || '';
    const trimmed = text.trim().replace(/\s+/g, ' ');
    if (trimmed.length > 130) {
        return trimmed.substring(0, 127) + '...';
    }
    return trimmed;
}
