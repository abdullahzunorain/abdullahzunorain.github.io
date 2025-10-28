const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');

function toggleNav() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  body.classList.toggle('nav-open');
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 680 && body.classList.contains('nav-open')) toggleNav();
  });
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#' || targetId === '#0') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

// Contact form validation (client-side only)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let isValid = true;

    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailPattern.test(emailValue)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    if (!message.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      isValid = false;
    } else {
      messageError.textContent = '';
    }

    if (!isValid) return;

    alert('Thanks for your message! This demo only validates locally.');
    form.reset();
  });
}

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Theme toggle with persistence
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') root.classList.add('light');
  else root.classList.remove('light');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
});

// Set initial icon state
if (themeToggle) {
  const isLight = document.documentElement.classList.contains('light');
  themeToggle.textContent = isLight ? '🌙' : '☀️';
}

// Back to top behavior
window.addEventListener('scroll', () => {
  if (!backToTop) return;
  const show = window.scrollY > 600;
  backToTop.classList.toggle('visible', show);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scrollspy + section reveal
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#site-nav a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute('id');
    if (!id) return;

    // Reveal animation
    if (entry.isIntersecting) entry.target.classList.add('visible');

    // Scrollspy active state
    const link = document.querySelector(`#site-nav a[href="#${id}"]`);
    if (entry.isIntersecting && link) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach((sec) => {
  sec.classList.add('reveal');
  observer.observe(sec);
});

// Project filter tabs
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.filter;
    projectCards.forEach(card => {
      if (tag === 'all' || (card.dataset.tags && card.dataset.tags.includes(tag))) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
// Project modals
function setupModal(id) {
  const modal = document.getElementById('modal-' + id);
  document.querySelectorAll(`[data-modal="${id}"]`).forEach(btn => btn.addEventListener('click', () => { modal.showModal(); }));
  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
    modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  }
}
setupModal('pea-cnn');
setupModal('weather-outfit');
// Animate skill bars
function animateBars() {
  document.querySelectorAll('.bar span').forEach(bar => {
    bar.style.width = bar.style.getPropertyValue('--val') || '80%';
  });
}
window.addEventListener('DOMContentLoaded', animateBars);


