// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initFeatureCards();
    initScrollAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.nav-bar');
    const navLinks = document.querySelectorAll('.nav-links a');
    let lastScroll = 0;

    // Handle navbar visibility and style on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hash) {
                e.preventDefault();
                const target = document.querySelector(link.hash);
                if (target) {
                    smoothScroll(target);
                }
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroStats = document.querySelectorAll('.stat-number');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    // Animate stats when in view
    if (heroStats.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats(heroStats);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heroStats.forEach(stat => observer.observe(stat));
    }

    // Parallax effect for hero image
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
}

// Feature cards functionality
function initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        // Add hover animations
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Add scroll reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .benefits-section, .footer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navBar = document.querySelector('.nav-bar');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navBar.classList.toggle('active');
        document.body.style.overflow = navBar.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navBar.contains(e.target) && navBar.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navBar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
                navBar.classList.remove('active');
                document.body.style.overflow = '';
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effect to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.querySelector('i').style.transform = 'translateY(-4px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.querySelector('i').style.transform = 'translateY(0)';
        });
    });
}

// Utility Functions
function smoothScroll(target) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function animateStats(stats) {
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        let current = 0;
        const increment = value / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                clearInterval(timer);
                stat.textContent = stat.textContent.includes('+') ? `${value}+` : value;
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    });
} 