import { initNavigation } from './nav.js';
import { renderProjects } from './projects.js';
import { loadMediumArticles } from './medium.js';

document.documentElement.setAttribute('data-theme', 'dark');

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderProjects();
    loadMediumArticles();
});
