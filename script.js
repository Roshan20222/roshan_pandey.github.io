document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Function to set the theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    // Check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }

    // Add event listener to the toggle button
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.top-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView();
            }
        });
    });

    // Intersection Observer for fade-in sections
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Intersection Observer for active navigation links (Scrollspy)
    const navLinks = document.querySelectorAll('.top-nav nav a[href^="#"]');
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.isIntersecting is true when the element is partially or fully in view
            // We check the intersection ratio to make sure a good portion is visible
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px', // Trigger when the section is in the middle of the viewport
        threshold: 0
    });

    // Observe each section that has an ID
    document.querySelectorAll('section[id]').forEach((section) => {
        scrollSpyObserver.observe(section);
    });

    // "Back to Top" button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // "Copy to Clipboard" for email
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailAddress = document.getElementById('emailAddress').textContent;

    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailAddress).then(() => {
            // Provide user feedback
            copyEmailBtn.textContent = '✅';
            setTimeout(() => {
                copyEmailBtn.textContent = '📋';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            // Fallback for older browsers could be added here
        });
    });

});
