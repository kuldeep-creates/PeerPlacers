// Theme Toggle Functionality
const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));
    updateLogo();
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateLogo();
};

const updateLogo = () => {
    const logo = document.querySelector('.logo img');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (logo) {
        logo.src = isDark ? '/logos & img/black peer-Photoroom1.png' : '/logos & img/logo.png';
    }
};

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Create and append theme toggle buttony
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `<img src="/logos & img/theme-toggle.svg" alt="Toggle theme">`;
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', toggleTheme);
});

// Enhanced card animations
const createParticles = (x, y, container) => {
    const particlesCount = 8;
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (i / particlesCount) * 360;
        const velocity = 2;
        const rad = angle * Math.PI / 180;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        container.appendChild(particle);
        
        gsap.to(particle, {
            x: Math.cos(rad) * 100,
            y: Math.sin(rad) * 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
};

// Modern card interactions with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('section div');
    
    cards.forEach(card => {
        // Mouse movement effect with parallax items
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            
            // Enhanced 3D rotation with smooth transition
            const rotateX = (y - 50) * 0.1;
            const rotateY = (x - 50) * 0.1;
            
            gsap.to(card, {
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Parallax effect for card contents
            const items = card.querySelectorAll('img, a');
            items.forEach(item => {
                const depth = item.dataset.depth || 0.1;
                gsap.to(item, {
                    x: (x - 50) * depth,
                    y: (y - 50) * depth,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                transform: 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
                duration: 0.5,
                ease: 'power3.out'
            });
            
            const items = card.querySelectorAll('img, a');
            items.forEach(item => {
                gsap.to(item, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });
        });
        
        // Click effect with particles
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createParticles(x, y, this);
            
            gsap.from(this, {
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Modern smooth scroll with easing
const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Enhanced smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) smoothScroll(target);
    });
});

// Parallax scroll effect for header
const header = document.querySelector('header');
const headerContent = header.querySelector('div');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = `${scrolled * 0.5}px`;
    headerContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    headerContent.style.opacity = 1 - (scrolled * 0.003);
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Add stagger effect for grid items
            if (entry.target.parentElement.classList.contains('grid')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all animated elements
document.querySelectorAll('section div, header div, footer div').forEach(el => {
    observer.observe(el);
    el.classList.add('fade-up');
});

// Navbar scroll effect
const navbar = document.querySelector('.white-blur');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});