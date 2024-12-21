const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

function setTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDark) {
    setTheme('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(currentTheme);
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'shadow-lg');
    }
});

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const details = card.querySelector('.feature-details');
        details.classList.toggle('hidden');
    });
});

const statistics = document.querySelectorAll('.statistic');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateValue(entry.target, 0, target, 2000);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statistics.forEach(statistic => {
    observer.observe(statistic);
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const testimonialSlider = document.getElementById('testimonialSlider');
const slides = testimonialSlider.children;
const prevButton = document.getElementById('prevTestimonial');
const nextButton = document.getElementById('nextTestimonial');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

let scene, camera, renderer, horizontalPart, verticalPart;

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('heroCanvas'), alpha: true });
    renderer.setSize(600, 600);

    // Create the horizontal part of the plus sign
    const horizontalGeometry = new THREE.BoxGeometry(2, 0.4, 0.4);
    const material = new THREE.MeshBasicMaterial({ color: 0xE60000 }); // Red color
    const horizontalPart = new THREE.Mesh(horizontalGeometry, material);

    // Create the vertical part of the plus sign
    const verticalGeometry = new THREE.BoxGeometry(0.4, 2, 0.4);
    const verticalPart = new THREE.Mesh(verticalGeometry, material);

    // Position the parts to form a plus sign
    horizontalPart.position.set(0, 0, 0); // Horizontal bar
    verticalPart.position.set(0, 0, 0);   // Vertical bar

    // Add parts to the scene
    scene.add(horizontalPart);
    scene.add(verticalPart);

    camera.position.z = 5;
    
    // Make the parts accessible for animation
    this.horizontalPart = horizontalPart;
    this.verticalPart = verticalPart;
}

function animatePlusSign() {
    requestAnimationFrame(animatePlusSign);

    // Apply rotation on all axes for 3D effect
    this.horizontalPart.rotation.x += 0.01;
    this.horizontalPart.rotation.y += 0.01;
    this.horizontalPart.rotation.z += 0.01;

    this.verticalPart.rotation.x += 0.01;
    this.verticalPart.rotation.y += 0.01;
    this.verticalPart.rotation.z += 0.01;

    renderer.render(scene, camera);
}

initScene();
animatePlusSign();




const subscribeForm = document.getElementById('subscribeForm');
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Subscribed with email:', email);
    alert('Thank you for subscribing!');
    e.target.reset();
});



