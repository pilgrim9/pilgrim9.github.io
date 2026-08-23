export const projects = [
    {
        id: 'tavern',
        title: 'The Tavern at the End of the Road',
        subtitle: 'A Soulslike Deckbuilder',
        role: 'Director & Producer',
        type: 'Game',
        description: 'SOULS-LIKE Deckbuilder. Every run is the final tale of an Errant. Battle through a cursed road, slay mythical creatures and corrupted heroes, discover forgotten keepsakes, and reach the end to decide the fate of the world.',
        media: [
            {
                type: 'image',
                url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3933280/0cba8edcb97339944512bfc1af5f5f1ef34d5f8e/capsule_616x353.jpg?t=1786419545',
                alt: 'The Tavern at the End of the Road - Steam Capsule'
            }
        ],
        links: [
            {
                label: 'View on Steam',
                url: 'https://store.steampowered.com/app/3933280/The_Tavern_at_the_End_of_the_Road',
                type: 'steam',
                isExternal: true
            },
            {
                label: 'Game Pitch',
                url: '#',
                type: 'pitch',
                isPlaceholder: true,
                note: 'Pitch deck available on request'
            }
        ],
        tags: ['Soulslike', 'Deckbuilder', 'Roguelike', 'Production', 'Direction']
    },
    {
        id: 'yo-fire',
        title: "Yo! This Gameplay's Fire",
        subtitle: 'Fast-Paced Indie Action',
        role: 'Solo Developer',
        type: 'Game',
        description: 'A solo-developed action title pushing crisp gameplay feel, responsive mechanics, and explosive aesthetics.',
        media: [
            {
                type: 'placeholder',
                label: 'Gameplay GIFs & Trailer Coming Soon'
            }
        ],
        links: [
            {
                label: 'Game Pitch',
                url: '#',
                type: 'pitch',
                isPlaceholder: true,
                note: 'Pitch deck coming soon'
            }
        ],
        tags: ['Action', 'Solo Development', 'Game Design', 'Combat Mechanics']
    },
    {
        id: 'crestfallen',
        title: 'Crestfallen Game Studio',
        subtitle: 'Independent Game Studio',
        role: 'Co-Founder',
        type: 'Game Studio',
        description: 'Independent game development studio founded to craft evocative worlds, tactical card systems, and distinct narrative-driven experiences.',
        media: [
            {
                type: 'placeholder',
                label: 'Studio Showcase & Project Reel'
            }
        ],
        links: [
            {
                label: 'Visit Studio Website',
                url: 'https://crestfallen.games/',
                type: 'primary',
                isExternal: true
            }
        ],
        tags: ['Studio Management', 'Card Games', 'Creative Direction']
    },
    {
        id: 'indie-space',
        title: 'Indie Game Space @ Crack Bang Boom',
        subtitle: 'Convention Showcase & Booth',
        role: 'Co-Producer',
        type: 'Event / Showcase',
        description: 'Curated and co-produced an interactive showcase space spotlighting independent game creators, playable demos, and tabletop designers at Crack Bang Boom.',
        media: [
            {
                type: 'placeholder',
                label: 'Event Gallery & Highlights'
            }
        ],
        links: [
            {
                label: 'Showcase Overview',
                url: '#',
                type: 'secondary',
                isPlaceholder: true,
                note: 'Event documentation'
            }
        ],
        tags: ['Event Production', 'Indie Showcase', 'Curation']
    }
];

export function renderProjects() {
    const container = document.getElementById('projects-showcase');
    if (!container) {
        throw new Error('Projects showcase container "#projects-showcase" was not found in DOM.');
    }

    container.innerHTML = projects.map((project, index) => {
        const isReversed = index % 2 === 1 ? 'is-reversed' : '';
        const mediaHtml = renderMediaSection(project);
        const linksHtml = renderLinks(project.links);
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

        return `
            <article class="project-card ${isReversed}" id="project-${project.id}" data-project-id="${project.id}">
                <div class="project-card-inner">
                    <div class="project-media-wrapper">
                        ${mediaHtml}
                    </div>
                    <div class="project-content">
                        <div class="project-meta-top">
                            <span class="project-type-badge">${project.type}</span>
                        </div>
                        
                        <h2 class="project-title">${project.title}</h2>
                        <div class="project-role-subtitle">${project.role}</div>

                        <p class="project-description">${project.description}</p>
                        
                        <div class="project-tags">
                            ${tagsHtml}
                        </div>

                        <div class="project-actions">
                            ${linksHtml}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    setupMediaInteractivity();
}

function renderMediaSection(project) {
    if (!project.media || project.media.length === 0) {
        return `
            <div class="media-placeholder">
                <div class="placeholder-icon">🎬</div>
                <p>Media coming soon</p>
            </div>
        `;
    }

    const firstMedia = project.media[0];
    if (firstMedia.type === 'placeholder') {
        return `
            <div class="media-placeholder">
                <div class="placeholder-animated-glow"></div>
                <div class="placeholder-content">
                    <div class="placeholder-icon">🎮</div>
                    <span class="placeholder-label">${firstMedia.label}</span>
                    <span class="placeholder-hint">GIF / Gameplay showcase</span>
                </div>
            </div>
        `;
    }

    if (firstMedia.type === 'image' || firstMedia.type === 'gif') {
        const extraGifs = project.media.length > 1 ? `
            <div class="media-gallery-tabs">
                ${project.media.map((m, i) => `
                    <button class="gallery-tab-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                        ${m.caption || `Clip 0${i + 1}`}
                    </button>
                `).join('')}
            </div>
        ` : '';

        return `
            <div class="media-frame">
                <img src="${firstMedia.url}" alt="${firstMedia.alt || project.title}" class="media-image" loading="lazy" />
                <div class="media-overlay"></div>
                ${extraGifs}
            </div>
        `;
    }

    return '';
}

function renderLinks(links) {
    if (!links || links.length === 0) return '';

    return links.map(link => {
        if (link.isPlaceholder) {
            return `
                <span class="action-btn action-btn-disabled" title="${link.note || 'Coming soon'}">
                    <span>${link.label}</span>
                    <span class="btn-subtext">(Coming Soon)</span>
                </span>
            `;
        }

        const steamIcon = link.type === 'steam' ? `
            <svg class="btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-10 10c0 4.7 3.25 8.64 7.64 9.71l2.5-3.64a3.5 3.5 0 0 1-.14-.98 3.5 3.5 0 0 1 3.5-3.5h.09l3.41-2.43A4.5 4.5 0 1 1 21 14.5a4.49 4.49 0 0 1-4.08 2.62l-3.64 2.5a3.5 3.5 0 0 1-.78 1.88A10 10 0 1 0 12 2zm3.5 8a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 15.5 10z"/>
            </svg>
        ` : '';

        const externalIcon = link.isExternal && link.type !== 'steam' ? `
            <svg class="btn-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
        ` : '';

        const btnClass = link.type === 'steam' ? 'action-btn action-btn-steam' : 'action-btn action-btn-primary';

        return `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${btnClass}">
                ${steamIcon}
                <span>${link.label}</span>
                ${externalIcon}
            </a>
        `;
    }).join('');
}

function setupMediaInteractivity() {
    const tabButtons = document.querySelectorAll('.gallery-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const parent = target.closest('.project-media-wrapper');
            if (!parent) return;
            const projectCard = parent.closest('.project-card');
            const projectId = projectCard?.getAttribute('data-project-id');
            const project = projects.find(p => p.id === projectId);
            if (!project) return;

            const index = parseInt(target.getAttribute('data-index'), 10);
            const mediaItem = project.media[index];
            const img = parent.querySelector('.media-image');
            if (img && mediaItem) {
                img.src = mediaItem.url;
                img.alt = mediaItem.alt || project.title;
            }

            parent.querySelectorAll('.gallery-tab-btn').forEach(b => b.classList.remove('active'));
            target.classList.add('active');
        });
    });
}
