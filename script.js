// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay2, .fade-in-delay3, .fade-in-up').forEach(el => {
    observer.observe(el);
});

// === Sci-Fi Line Activation ===
const sciFiLines = document.querySelectorAll('.sci-fi-line');
const heroBanner = document.querySelector('#hero-banner');
const contentContainer = document.querySelector('.container');

// Detect when hero is NOT visible
const bannerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            sciFiLines.forEach(line => line.classList.add('active'));
            contentContainer.classList.add('visible');
            document.body.classList.add('dark-bg'); // <– new
        } else {
            sciFiLines.forEach(line => line.classList.remove('active'));
            contentContainer.classList.remove('visible');
            document.body.classList.remove('dark-bg'); // <– new
        }
    });
}, { threshold: 0.7 });

bannerObserver.observe(heroBanner);


// Immediately activate sci-fi lines if page loads mid-scroll
window.addEventListener('load', () => {
    const heroRect = heroBanner.getBoundingClientRect();
    if (heroRect.bottom <= 0) {
        sciFiLines.forEach(line => line.classList.add('active'));
        contentContainer.classList.add('visible');
    }
});

document.querySelectorAll('.timeline li').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;

        card.style.transform = `rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

const fonts = [
    "'Orbitron', sans-serif",
    "'Playfair Display', serif",
    "'VT323', monospace",
    "'Archivo Black', sans-serif",
    "'Cutive Mono', monospace"
];

const defaultFont = "'Archivo Black', sans-serif";
const fontWords = document.querySelectorAll('.font-word');

let scrollTimeout = null;
let cycling = false;
let cycleInterval = null;

// Randomize each word's font
function cycleFonts() {
    fontWords.forEach(word => {
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        word.style.fontFamily = randomFont;
        word.classList.add('cycling');
    });
}

// Gracefully fade each word back to default font with a random delay
function resetFontsSmooth() {
    fontWords.forEach((word, i) => {
        const delay = Math.random() * 400 + 100;
        setTimeout(() => {
            word.style.fontFamily = defaultFont;
            word.classList.remove('cycling');
        }, delay);
    });
}

// Start cycling
function startFontCycle() {
    if (cycling) return;
    cycling = true;
    cycleInterval = setInterval(cycleFonts, 60);
}

// Stop cycling
function stopFontCycle() {
    cycling = false;
    clearInterval(cycleInterval);
    resetFontsSmooth();
}

// Scroll event handling
window.addEventListener('scroll', () => {
    startFontCycle();

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        stopFontCycle();
    }, 60); // Delay after scrolling stops
});




const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            d: Math.random() * 0.05 + 0.01,
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#01c9c9';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

function moveStars() {
    stars.forEach(star => {
        star.y += star.d;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

function animateStars() {
    moveStars();
    drawStars();
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

resizeCanvas();
initStars();
animateStars();
