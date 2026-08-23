export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const dropdownToggle = document.getElementById('projectsDropdownToggle');
    const dropdownMenu = document.getElementById('projectsDropdown');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinksList = document.querySelector('.nav-links');

    if (!navbar || !dropdownToggle || !dropdownMenu) {
        throw new Error('Required navigation elements are missing from the DOM.');
    }

    let isDropdownOpen = false;

    function toggleDropdown(open) {
        isDropdownOpen = typeof open === 'boolean' ? open : !isDropdownOpen;
        dropdownToggle.setAttribute('aria-expanded', String(isDropdownOpen));
        if (isDropdownOpen) {
            dropdownMenu.classList.add('is-open');
        } else {
            dropdownMenu.classList.remove('is-open');
        }
    }

    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
    });

    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
            toggleDropdown(false);
        }
    });

    dropdownMenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => {
            toggleDropdown(false);
            if (navLinksList?.classList.contains('mobile-active')) {
                navLinksList.classList.remove('mobile-active');
            }
        });
    });

    if (mobileMenuToggle && navLinksList) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('mobile-active');
            const isOpen = navLinksList.classList.contains('mobile-active');
            mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinksList.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('mobile-active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    initActiveSectionObserver();
    initCopyEmail();
}

function initActiveSectionObserver() {
    const sections = document.querySelectorAll('header[id], section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href')?.replace('#', '');
                    if (href === id || (href === 'projects' && entry.target.classList.contains('project-card'))) {
                        link.classList.add('active');
                    } else if (href !== 'projects' || id === 'projects') {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
}

function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const email = copyBtn.getAttribute('data-email') || 'gorostiagamanuel@gmail.com';
        try {
            await navigator.clipboard.writeText(email);
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied to clipboard!</span>
            `;
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('copied');
            }, 2500);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    });
}
