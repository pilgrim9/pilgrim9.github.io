export function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    toggle?.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let newTheme;
        if (currentTheme === 'dark' || (!currentTheme && systemDark)) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (!toggle) return;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = theme === 'dark' || (!theme && systemDark);
        toggle.textContent = isDark ? '☀️' : '🌙';
    }
}
