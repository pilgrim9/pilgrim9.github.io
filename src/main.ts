import './style.css';
import { loadMediumArticles } from './medium';
import { loadProjects } from './projects';
import { initTheme } from './theme';

initTheme();
loadMediumArticles();
loadProjects();
