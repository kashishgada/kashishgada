// ===========================
// Initialize AOS (Animate On Scroll)
// ===========================
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: reducedMotion ? 0 : 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        disable: reducedMotion
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===========================
// Typing Animation
// ===========================
const typedTextElement = document.getElementById('typed-output');
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

const textArray = [
    "AI Engineering Intern",
    "Computer Science Student",
    "Software Developer",
    "AI Integration Specialist",
    "Process Optimizer"
];

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Start the typing animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// ===========================
// Active Navigation Link Highlight
// ===========================
const sections = document.querySelectorAll('section[id]');

function activateNavLinks() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLinks);

// ===========================
// Parallax Effect for Hero Background
// ===========================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// ===========================
// Skill Cards Animation on Hover
// ===========================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===========================
// Project Cards 3D Tilt Effect
// ===========================
// const projectCards = document.querySelectorAll('.project-card');

// projectCards.forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
        
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;
        
//         const rotateX = (y - centerY) / 10;
//         const rotateY = (centerX - x) / 10;
        
//         card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
//     });
    
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
//     });
// });

// ===========================
// Counter Animation for Statistics
// ===========================
// function animateCounter(element, target, duration = 2000) {
//     let start = 0;
//     const increment = target / (duration / 16);
    
//     const timer = setInterval(() => {
//         start += increment;
//         if (start >= target) {
//             element.textContent = target + (target > 1 ? '+' : '');
//             clearInterval(timer);
//         } else {
//             element.textContent = Math.floor(start);
//         }
//     }, 16);
// }

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animations if element has data-count attribute
        }
    });
}, observerOptions);

// Observe timeline items and cards
document.querySelectorAll('.timeline-item, .project-card, .education-card').forEach(el => {
    observer.observe(el);
});

// ===========================
// Form Validation (if you add a contact form later)
// ===========================
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    let isValid = true;
    
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }
    
    if (message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
    }
    
    return isValid;
}

// ===========================
// Scroll to Top Button (Optional Enhancement)
// ===========================
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top button
createScrollToTop();

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
});

// Add CSS for fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-to-top:hover {
        background: var(--accent-dark) !important;
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);

// ===========================
// Preloader (Optional)
// ===========================
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0A0F0D;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div class="spinner" style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(244, 162, 97, 0.3);
            border-top-color: #F4A261;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });
};

// Add spin animation for preloader
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

// Initialize preloader
createPreloader();

console.log('Portfolio website loaded successfully! 🚀');