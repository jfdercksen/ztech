/* Z-Tech — JS Main */
(function () {
  'use strict';

  /* ── Navbar scroll effect ────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ─────────────────────────────────────────── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Scroll-reveal (Intersection Observer) ───────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Counter animation ───────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur    = 2000;
        const step   = 16;
        const inc    = target / (dur / step);
        let current  = 0;
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            clearInterval(timer);
            el.textContent = target + suffix;
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));
  }

  /* ── Active nav link highlight ───────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });

  /* ── Contact form basic validation ──────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('[type=submit]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--success)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        this.reset();
      }, 4000);
    });
  }

})();
