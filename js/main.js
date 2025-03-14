// DOM Elements
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');
const navbar = document.querySelector('.nav-bar');
const heroStats = document.querySelectorAll('.stat-number');
const featureCards = document.querySelectorAll('.feature-card');
const ctaButtons = document.querySelectorAll('.cta-button');
const searchInput = document.getElementById('search-input');
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-box button');

// Scroll variables
let lastScroll = 0;

// Initialize Search Functionality
function initSearchFunctionality() {
    if (!searchInput || !searchBox) {
        console.warn('Search elements not found');
        return;
    }

    // Clear search on load
    searchInput.value = '';

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        console.log('Searching for:', searchTerm);
        
        let hasResults = false;
        const allCards = [...document.querySelectorAll('.feature-card'), ...document.querySelectorAll('.secondary-card')];

        allCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                hasResults = true;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Handle no results message
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (!hasResults && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = '<h3>No results found</h3><p>Try different keywords or browse our features below.</p>';
                const featuresSection = document.querySelector('.features-section');
                if (featuresSection) {
                    featuresSection.insertBefore(noResultsMsg, featuresSection.firstChild);
                }
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }

        // Scroll to features section
        if (searchTerm !== '') {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Event Listeners for Search
    searchInput.addEventListener('input', performSearch);
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            this.value = '';
            performSearch();
        }
    });

    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    // Focus and blur events for search box
    searchInput.addEventListener('focus', () => searchBox.classList.add('focused'));
    searchInput.addEventListener('blur', () => {
        setTimeout(() => searchBox.classList.remove('focused'), 200);
    });
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality
    initSearchFunctionality();

    // Mobile Menu Toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            navActions.classList.toggle('active');
            
            // Animate menu icon
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'transform 0.3s ease';
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.click();
                }
                
                // Smooth scroll with easing
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
        });
    });

    // Animate Stats
    const animateStats = () => {
        heroStats.forEach(stat => {
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
    };

    // Intersection Observer for Stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelector('.hero-stats')?.forEach(stat => statsObserver.observe(stat));

    // Feature Cards Animation
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow and background when scrolling down
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/Show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // CTA Buttons Loading State
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });

    // Parallax Effect for Hero Image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // Mouse Move Effect for Feature Cards
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
