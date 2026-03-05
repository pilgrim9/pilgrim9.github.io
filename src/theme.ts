export function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    } else {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemDark) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
    }

    toggle?.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let newTheme: string;
        if (currentTheme === 'dark' || (!currentTheme && systemDark)) {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
