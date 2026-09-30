// ============================================================
//  วันสำคัญทางพระพุทธศาสนา - Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar: scroll effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ---- Navbar: hamburger toggle ----
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) navMenu.classList.remove('open');
    });
  }

  // ---- Active nav link ----
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item a').forEach(link => {
    const linkFile = link.getAttribute('href');
    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Intersection Observer: fade-in on scroll ----
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach((el, i) => {
      el.style.transitionDelay = (i * 0.07) + 's';
      observer.observe(el);
    });
  }

  // ---- Animated floating particles ----
  spawnParticles();

  // ---- Counter animation ----
  animateCounters();

  // ---- Smooth anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        window.scrollTo({ top: target.offsetTop - offset - 10, behavior: 'smooth' });
      }
    });
  });

});

/* ---- Particle System ---- */
function spawnParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const symbols = ['🪷', '☸️', '🕯️', '✨', '🌸', '🙏', '⭐'];
  const count = 14;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${0.8 + Math.random() * 1.2}rem;
      animation-duration: ${12 + Math.random() * 16}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    container.appendChild(p);
  }
}

/* ---- Counter Animation ---- */
function animateCounters() {
  const counters = document.querySelectorAll('.sig-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---- Utility: format Thai date ---- */
function thaiYear(year) { return year + 543; }
