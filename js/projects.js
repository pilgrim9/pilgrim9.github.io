const projects = [
    {
        title: 'The Tavern at the End of the Road: A Soulslike Deckbuilder',
        url: 'https://store.steampowered.com/app/3933280/The_Tavern_at_the_End_of_the_Road'
    },
    {
        title: 'Magic: The Gathering Cubes',
        url: 'https://cubecobra.com/user/view/629d0c143862010fea62561f'
    },
    {
        title: 'Magic: The Gathering Brews',
        url: 'https://moxfield.com/users/irreverentFox'
    }
];

export function loadProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    const initialCount = 5;
    let showingAll = false;

    const renderProjects = () => {
        const projectsToShow = showingAll ? projects : projects.slice(0, initialCount);
        const showButton = projects.length > initialCount;

        container.innerHTML = projectsToShow
            .map(project => {
                return `<div class="project-item"><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.title}</a></div>`;
            })
            .join('');

        if (showButton && !showingAll) {
            const seeMoreBtn = document.createElement('button');
            seeMoreBtn.className = 'see-more-btn';
            seeMoreBtn.textContent = 'See More';
            seeMoreBtn.addEventListener('click', () => {
                showingAll = true;
                renderProjects();
            });
            container.appendChild(seeMoreBtn);
        }
    };

    renderProjects();
}
