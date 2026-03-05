export async function loadMediumArticles() {
    const container = document.getElementById('articles-list');
    if (!container) return;

    try {
        const username = 'gorostiagamanuel';
        const rssUrl = `https://medium.com/feed/@${username}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const allArticles = data.items.slice(0, 10);
            const initialCount = 5;
            let showingAll = false;

            const renderArticles = () => {
                const articlesToShow = showingAll ? allArticles : allArticles.slice(0, initialCount);
                const showButton = allArticles.length > initialCount;

                container.innerHTML = articlesToShow
                    .map((post) => {
                        const title = post.title;
                        const link = post.link;
                        return `<div class="article-item"><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></div>`;
                    })
                    .join('');

                if (showButton && !showingAll) {
                    const seeMoreBtn = document.createElement('button');
                    seeMoreBtn.className = 'see-more-btn';
                    seeMoreBtn.textContent = 'See More';
                    seeMoreBtn.addEventListener('click', () => {
                        showingAll = true;
                        renderArticles();
                    });
                    container.appendChild(seeMoreBtn);
                }
            };

            renderArticles();
        } else {
            container.innerHTML = '<p>No articles found.</p>';
        }
    } catch (error) {
        console.error('Error loading Medium articles:', error);
        container.innerHTML = '<p>Unable to load articles.</p>';
    }
}
