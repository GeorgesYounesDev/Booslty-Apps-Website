// ============================================
// Theme Toggle Functionality
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-mode', currentTheme === 'light');
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');
    const theme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Mobile menu closing is now handled in the smooth scroll function below

// ============================================
// Enhanced Smooth Scrolling for Anchor Links
// ============================================
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - navbarHeight;
    
    // Smooth scroll with easing
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Apply smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" (empty hash)
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = document.querySelector('.mobile-menu-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Smooth scroll to target
        smoothScrollTo(href);
    });
});

// Enhanced smooth scroll with custom easing (fallback for older browsers)
function smoothScrollToWithEasing(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 800; // milliseconds
    let start = null;
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Use enhanced scrolling if smooth behavior is not supported
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            smoothScrollToWithEasing(href);
        });
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 20px var(--shadow)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.service-card, .benefit-card, .portfolio-card, .testimonial-card, .process-step, .pricing-card'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            company: document.getElementById('company')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message (you can replace this with actual form submission)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #004D40, #00695C)';
            submitButton.disabled = true;
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// ============================================
// CTA Button Click Handlers
// ============================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // If button is in hero or nav, scroll to contact
        if (button.textContent.includes('Get Started') || 
            button.textContent.includes('Explore')) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Explore Apps Button Handler
// ============================================
const exploreAppsButton = document.querySelector('.btn-explore-apps');
if (exploreAppsButton) {
    exploreAppsButton.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#apps');
    });
}

// ============================================
// 3D Scroll Background Element Movement
// (Replaced by Three.js implementation in threejs-scene.js)
// ============================================

// ============================================
// Parallax Effect for Hero Section
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// ============================================
// Add Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Counter Animation for Stats
// ============================================
const animateCounter = (element, target, suffix = '', duration = 2000) => {
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (isDecimal) {
                element.textContent = target.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(target) + suffix;
            }
            clearInterval(timer);
        } else {
            if (isDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }
    }, duration / steps);
};

// Observe stats section
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    if (stat.dataset.animated) return;
                    
                    const text = stat.textContent.trim();
                    let number, suffix = '';
                    
                    // Extract number and suffix
                    if (text.includes('%')) {
                        number = parseFloat(text.replace('%', ''));
                        suffix = '%';
                    } else if (text.includes('+')) {
                        number = parseFloat(text.replace('+', ''));
                        suffix = '+';
                    } else {
                        number = parseFloat(text);
                    }
                    
                    if (number && !isNaN(number)) {
                        stat.dataset.animated = 'true';
                        stat.textContent = '0' + suffix;
                        animateCounter(stat, number, suffix, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// Animate benefit stats
const benefitStats = document.querySelectorAll('.benefit-stat .stat-value');
if (benefitStats.length > 0) {
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                if (stat.dataset.animated) return;
                
                const text = stat.textContent.trim();
                let number, suffix = '';
                
                // Skip non-numeric values like "24/7"
                if (text.includes('/')) {
                    stat.dataset.animated = 'true';
                    benefitObserver.unobserve(entry.target);
                    return;
                }
                
                if (text.includes('M+')) {
                    number = parseFloat(text.replace('M+', ''));
                    suffix = 'M+';
                } else if (text.includes('-') && !text.includes(' ')) {
                    // Handle ranges like "2-4" (but not "2-4 Weeks")
                    const parts = text.split('-');
                    const firstNum = parseFloat(parts[0]);
                    const secondNum = parseFloat(parts[1]);
                    if (!isNaN(firstNum) && !isNaN(secondNum)) {
                        // Animate to first number, then show range
                        number = firstNum;
                        suffix = '-' + secondNum;
                    } else {
                        stat.dataset.animated = 'true';
                        benefitObserver.unobserve(entry.target);
                        return;
                    }
                } else if (text.includes('%')) {
                    number = parseFloat(text.replace('%', ''));
                    suffix = '%';
                } else {
                    const parsed = parseFloat(text);
                    if (!isNaN(parsed)) {
                        number = parsed;
                    } else {
                        stat.dataset.animated = 'true';
                        benefitObserver.unobserve(entry.target);
                        return;
                    }
                }
                
                if (number && !isNaN(number)) {
                    stat.dataset.animated = 'true';
                    stat.textContent = '0' + suffix;
                    animateCounter(stat, number, suffix, 2000);
                }
                
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    benefitStats.forEach(stat => benefitObserver.observe(stat));
}

// ============================================
// Add Hover Effects to Cards
// ============================================
const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .benefit-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// Keyboard Navigation Support
// ============================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ============================================
// Performance Optimization: Lazy Load Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

