// Menu Toggle functionality for Mobile Devices
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
    });
}

// Hide mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// Scroll Reveal Animation (using Intersection Observer)
const revealElements = document.querySelectorAll('.section, .project__card, .skill__card, .timeline__item');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return; 
        } else {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Set initial styling before revealing them via scroll
revealElements.forEach(el => {
    // Only apply if it's not the hero section, since hero has its own CSS keyframe animation
    if(el.id !== 'home' && !el.classList.contains('hero')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealOnScroll.observe(el);
    }
});

// Active nav link highlight on scroll
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav__link');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    allSections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const matchingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        if (matchingLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => link.classList.remove('active-link'));
            matchingLink.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);