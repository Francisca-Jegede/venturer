/* ===========================
   VENTURER — script.js
   Premium Fintech Landing Page
   =========================== */

'use strict';

// ========================
// LOADER
// ========================
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let loadProgress = 0;

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 12 + 4;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initAll();
    }, 400);
  }
  loaderFill.style.width = loadProgress + '%';
}, 80);

document.body.style.overflow = 'hidden';

function initAll() {
  initCursor();
  initNav();
  initParticles('particleCanvas');
  initHeroChart();
  initEquityChart();
  initScrollReveal();
  initCounters();
  initTimeline();
  initFAQ();
  initTestimonialSlider();
  initParallax();
  initCTACanvas();
}

// ========================
// CUSTOM CURSOR
// ========================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  const animateTrail = () => {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  };
  animateTrail();

  // Scale on hover interactive elements
  const interactives = document.querySelectorAll('a, button, .feature-card, .pricing-card, .faq-q');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      trail.style.width = '48px';
      trail.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      trail.style.width = '32px';
      trail.style.height = '32px';
    });
  });
}

// ========================
// NAVIGATION
// ========================
function initNav() {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ========================
// PARTICLES
// ========================
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = [];
  const count = 70;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.1,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.7
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(212, 175, 55, ${p.alpha})`
        : `rgba(138, 148, 166, ${p.alpha * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  };
  animate();
}

// ========================
// HERO CHART
// ========================
function initHeroChart() {
  const canvas = document.getElementById('heroChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  const data = [42, 51, 46, 60, 55, 72, 68, 80, 75, 88, 83, 95, 90, 100];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const pad = 10;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2)
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(212,175,55,0.25)');
  grad.addColorStop(1, 'rgba(212,175,55,0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, h);
  ctx.lineTo(points[0].x, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dot at end
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#D4AF37';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(212,175,55,0.2)';
  ctx.fill();
}

// ========================
// EQUITY CHART (Showcase)
// ========================
function initEquityChart() {
  const canvas = document.getElementById('equityChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  const rawData = [80,75,82,79,88,85,92,89,96,91,98,94,100,97,105,102,110,108,115,112,118,115,122,120,128];
  const max = Math.max(...rawData);
  const min = Math.min(...rawData);
  const range = max - min;
  const pad = 8;

  const points = rawData.map((v, i) => ({
    x: pad + (i / (rawData.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2)
  }));

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(34,197,94,0.2)');
  grad.addColorStop(1, 'rgba(34,197,94,0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, h);
  ctx.lineTo(points[0].x, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Animate a dot scanning
  let scanPos = 0;
  const animateDot = () => {
    // Redraw chart base (no flicker — only add dot overlay)
    const idx = Math.floor(scanPos * (points.length - 1));
    const pt = points[Math.min(idx, points.length - 1)];

    // Glowing dot
    const dotCtx = canvas.getContext('2d');
    // We need to clear only the dot area, which is complex — instead draw dot atop
    dotCtx.clearRect(0, 0, w, h);
    // Redraw fill and line each frame
    const grad2 = dotCtx.createLinearGradient(0, 0, 0, h);
    grad2.addColorStop(0, 'rgba(34,197,94,0.2)');
    grad2.addColorStop(1, 'rgba(34,197,94,0)');

    dotCtx.beginPath();
    dotCtx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2;
      dotCtx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
    }
    dotCtx.lineTo(points[points.length - 1].x, h);
    dotCtx.lineTo(points[0].x, h);
    dotCtx.closePath();
    dotCtx.fillStyle = grad2;
    dotCtx.fill();

    dotCtx.beginPath();
    dotCtx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cpx = (points[i - 1].x + points[i].x) / 2;
      dotCtx.bezierCurveTo(cpx, points[i - 1].y, cpx, points[i].y, points[i].x, points[i].y);
    }
    dotCtx.strokeStyle = '#22c55e';
    dotCtx.lineWidth = 2;
    dotCtx.stroke();

    // Dot
    dotCtx.beginPath();
    dotCtx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
    dotCtx.fillStyle = '#22c55e';
    dotCtx.fill();
    dotCtx.beginPath();
    dotCtx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
    dotCtx.fillStyle = 'rgba(34,197,94,0.2)';
    dotCtx.fill();

    scanPos = (scanPos + 0.003) % 1;
    requestAnimationFrame(animateDot);
  };
  animateDot();
}

// ========================
// SCROLL REVEAL
// ========================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ========================
// COUNTERS
// ========================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimal = parseInt(el.dataset.decimal) || 0;
  const duration = 2000;
  const step = 16;
  const totalSteps = duration / step;
  let current = 0;
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalSteps;
    const eased = 1 - Math.pow(1 - progress, 3);
    current = target * eased;

    el.textContent = current.toFixed(decimal) + suffix;

    if (frame >= totalSteps) {
      clearInterval(timer);
      el.textContent = target.toFixed(decimal) + suffix;
    }
  }, step);
}

// ========================
// TIMELINE ANIMATION
// ========================
function initTimeline() {
  const line = document.getElementById('timelineLine');
  if (!line) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(line.parentElement);
}

// ========================
// FAQ ACCORDION
// ========================
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Open this if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ========================
// TESTIMONIAL SLIDER
// ========================
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (!track) return;

  let current = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let autoplay;

  const isMobile = () => window.innerWidth <= 900;

  const go = (idx) => {
    current = (idx + total) % total;
    if (isMobile()) {
      track.style.transform = `translateX(calc(-${current * 100}% - ${current * 1.5}rem))`;
    } else {
      track.style.transform = `translateX(calc(-${current * 33.333}% - ${current * 0.5}rem))`;
    }
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  prevBtn?.addEventListener('click', () => { go(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { go(current + 1); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); resetAuto(); }));

  const resetAuto = () => {
    clearInterval(autoplay);
    autoplay = setInterval(() => go(current + 1), 5000);
  };
  autoplay = setInterval(() => go(current + 1), 5000);

  window.addEventListener('resize', () => go(current), { passive: true });
}

// ========================
// PARALLAX
// ========================
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

    const mountains = hero.querySelectorAll('.mountain');
    mountains.forEach((m, i) => {
      const depth = (i + 1) * 0.5;
      m.style.transform = `translate(${xPct * depth * 6}px, ${yPct * depth * 3}px)`;
    });

    const dashFloat = hero.querySelector('.dashboard-float');
    if (dashFloat) {
      dashFloat.style.transform = `translate(${-xPct * 8}px, ${-yPct * 4}px)`;
    }
  }, { passive: true });
}

// ========================
// CTA CANVAS (Animated Stars)
// ========================
function initCTACanvas() {
  const canvas = document.getElementById('ctaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const stars = [];
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.008 + 0.003
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(s => {
      const a = (Math.sin(t * s.speed * 20 + s.x) + 1) / 2 * 0.6 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

// ========================
// SMOOTH ANCHOR SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
