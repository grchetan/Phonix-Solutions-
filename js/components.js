// ============================================================
// PHONIX IT SOLUTIONS — MODERN ENTERPRISE UI COMPONENT ENGINE
// Header, Footer, Bento Grid, Tech Ecosystem, Metrics & Animations
// ============================================================

// ============================================================
// AUTOMATIC CLEAN URL ENGINE (Removes .html from Address Bar)
// ============================================================
(function () {
  if (typeof window === 'undefined' || window.location.protocol === 'file:') return;

  // 1. Immediately clean address bar if loaded with .html
  const path = window.location.pathname;
  if (path.endsWith('.html')) {
    let cleanPath = path.slice(0, -5);
    if (cleanPath.endsWith('/index')) {
      cleanPath = cleanPath.slice(0, -6) || '/';
    }
    const cleanUrl = cleanPath + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
  }

  // 2. Seamless Local Development Fallback:
  // When running on local static servers (127.0.0.1 / localhost) where mod_rewrite
  // is absent, handle clicks on clean relative links without 404.
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return;
    }

    const isLocalDev =
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === 'localhost';

    if (isLocalDev && !href.includes('.') && !href.endsWith('/')) {
      e.preventDefault();
      const parts = href.split('?');
      const cleanTarget = parts[0];
      const queryAndHash = parts.length > 1 ? '?' + parts.slice(1).join('?') : '';
      const [pathOnly, hashOnly] = cleanTarget.split('#');
      let targetFile = pathOnly === '' || pathOnly === '/' ? 'index.html' : pathOnly + '.html';
      if (hashOnly) targetFile += '#' + hashOnly;
      if (queryAndHash) targetFile += queryAndHash;
      window.location.href = targetFile;
    }
  });
})();

// High-fidelity SVG icons for tech stack and UI
const icons = {
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.338c0-1.243.987-2.25 2.206-2.25h.672c.628 0 1.193.377 1.449.96l1.07 2.462a1.574 1.574 0 01-.354 1.812l-.654.583a13.32 13.32 0 005.514 5.514l.583-.654a1.574 1.574 0 011.812-.354l2.462 1.07c.583.257.96.821.96 1.449v.672A2.228 2.228 0 0117.663 21.75C9.135 21.75 2.25 14.865 2.25 6.338z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
  code: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>`,
  smartphone: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>`,
  cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>`,
  layout: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>`,
  shieldCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
};

// Tech Logo Vector Mapping
const techIcons = {
  react: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#06b6d4"><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(30 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(90 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(150 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/></svg>`,
  nextjs: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" fill="#0f172a"/><path d="M15.5 8v8M9 8v8l7-8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  nodejs: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#22c55e"><path d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2zm0 2.3L5.5 8.1v7.9L12 19.7l6.5-3.7V8.1L12 4.3z"/></svg>`,
  typescript: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#3178c6"><rect width="24" height="24" rx="4"/><path d="M4 10h6m-3 0v9M14 13c1-1 3.5-1 3.5 1s-3.5 2-3.5 4 2.5 2 3.5 1" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>`,
  python: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M11.8 2c-3.5 0-3.3 1.5-3.3 1.5l.04 1.6H12v.5H5.4S2 5.2 2 8.8s3 3.4 3 3.4h1.8v-1.5s-.1-1.8 1.8-1.8h5.3s1.7.1 1.7-1.6V3.8S15.4 2 11.8 2zm-1.8 1.2a.6.6 0 110 1.2.6.6 0 010-1.2zm2 20.8c3.5 0 3.3-1.5 3.3-1.5l-.04-1.6H12v-.5h6.6s3.4.4 3.4-3.2-3-3.4-3-3.4h-1.8v1.5s.1 1.8-1.8 1.8H10.1s-1.7-.1-1.7 1.6v3.4s.2 1.8 3.8 1.8zm1.8-1.2a.6.6 0 110-1.2.6.6 0 010 1.2z" fill="#38bdf8"/></svg>`,
  fastapi: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#059669"><circle cx="12" cy="12" r="10"/><path d="M12 6l-4 7h4l-1 5 6-8h-4l1-4z" fill="#ffffff"/></svg>`,
  flutter: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0284c7"><path d="M14.5 2L5 11.5l2.8 2.8L17.3 4.8M14.5 13.5l-4.5 4.5 4.5 4.5h5.5l-7.3-7.3 2.8-2.8z"/></svg>`,
  reactnative: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#38bdf8"><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  aws: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M6 15c4 3 9 3 13 0" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/><path d="M18 13l2 2-2 2" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/><text x="4" y="11" font-family="sans-serif" font-size="7" font-weight="900" fill="#2563eb">AWS</text></svg>`,
  docker: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0284c7"><path d="M4 11h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm0-3h2v2h-2zM2 13c0 4 3 7 10 7s10-3 10-7H2z"/></svg>`,
  kubernetes: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#326ce5"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3" stroke="currentColor" stroke-width="2"/></svg>`,
};

// ============================================================
// 1. RENDER HEADER
// ============================================================
function renderHeader() {
  const currentPage = getCurrentPage();
  const nav = [
    { href: '/', label: 'Home', page: 'home' },
    { href: 'about', label: 'About', page: 'about' },
    { href: 'services', label: 'Services', page: 'services' },
    { href: 'why-us', label: 'Why Us', page: 'why-us' },
    { href: 'process', label: 'Process', page: 'process' },
    { href: 'faq', label: 'FAQ', page: 'faq' },
    { href: 'contact', label: 'Contact', page: 'contact' },
  ];

  const navLinks = nav
    .map(
      (n) => `
    <a href="${n.href}" class="nav-link ${currentPage === n.page ? 'active' : ''}">${n.label}</a>
  `,
    )
    .join('');

  const mobileLinks = nav
    .map(
      (n) => `
    <a href="${n.href}" class="mobile-nav-link ${currentPage === n.page ? 'active' : ''}">
      <span>${n.label}</span>
      ${icons.arrowRight}
    </a>
  `,
    )
    .join('');

  const html = `
    <header class="site-header" id="site-header">
      <div class="container-page header-inner">
        <a href="/" class="logo" aria-label="Phonix IT Solutions Home">
          <img src="assets/logo.svg" alt="Phonix IT Solutions" class="logo-brand-img" />
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">${navLinks}</nav>

        <div class="header-cta">
          <a href="contact" class="btn btn-primary btn-sm">
            <span>Get Free Consultation</span>
            ${icons.arrowRight}
          </a>
        </div>

        <button class="hamburger" id="hamburger-btn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span id="hamburger-icon">${icons.menu}</span>
        </button>
      </div>

      <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <nav class="mobile-nav">${mobileLinks}</nav>
        
        <div class="mobile-cta-box">
          <a href="contact" class="btn btn-primary btn-md" style="width:100%">
            <span>Get a Free Consultation</span>
            ${icons.arrowRight}
          </a>
        </div>
      </div>
    </header>
  `;

  const target = document.getElementById('header-placeholder');
  if (target) target.innerHTML = html;

  // Header scroll detection for background blur
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 15);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  const iconEl = document.getElementById('hamburger-icon');
  let open = false;

  if (btn && menu && iconEl) {
    btn.addEventListener('click', () => {
      open = !open;
      menu.classList.toggle('open', open);
      iconEl.innerHTML = open ? icons.close : icons.menu;
      btn.setAttribute('aria-expanded', open);
    });

    menu.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        open = false;
        menu.classList.remove('open');
        iconEl.innerHTML = icons.menu;
        btn.setAttribute('aria-expanded', false);
      });
    });
  }
}

// ============================================================
// 2. RENDER FOOTER
// ============================================================
function renderFooter() {
  const year = new Date().getFullYear();
  const html = `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="container-page footer-grid">

          <!-- Brand Column -->
          <div>
            <a href="/" class="footer-logo" aria-label="Phonix IT Solutions Home">
              <img src="assets/logo-white.svg" alt="Phonix IT Solutions" class="footer-logo-img" />
            </a>
            <p class="footer-desc">
              ${siteConfig.description}
            </p>
            <div class="footer-socials">
              ${siteConfig.social.linkedin ? `<a href="${siteConfig.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-btn">${icons.linkedin}</a>` : ''}
              ${siteConfig.social.instagram ? `<a href="${siteConfig.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-btn">${icons.instagram}</a>` : ''}
            </div>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="footer-heading">Navigation</h4>
            <ul class="footer-links">
              <li><a href="/" class="footer-link">Home</a></li>
              <li><a href="about" class="footer-link">About Us</a></li>
              <li><a href="services" class="footer-link">Services</a></li>
              <li><a href="why-us" class="footer-link">Why Choose Us</a></li>
              <li><a href="process" class="footer-link">Our Process</a></li>
              <li><a href="faq" class="footer-link">FAQ</a></li>
              <li><a href="contact" class="footer-link">Contact Us</a></li>
            </ul>
          </div>

          <!-- Services Links -->
          <div>
            <h4 class="footer-heading">Capabilities</h4>
            <ul class="footer-links">
              <li><a href="services#web-development" class="footer-link">Web Development</a></li>
              <li><a href="services#mobile-app-development" class="footer-link">Mobile Applications</a></li>
              <li><a href="services#cloud-devops" class="footer-link">Cloud & DevOps</a></li>
              <li><a href="services#ai-automation" class="footer-link">AI & Automation</a></li>
              <li><a href="services#ui-ux-engineering" class="footer-link">UI/UX Engineering</a></li>
              <li><a href="services#custom-software-development" class="footer-link">Custom Software</a></li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div>
            <h4 class="footer-heading">Contact Details</h4>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                ${icons.mapPin}
                <div>
                  <div class="footer-contact-lbl">Headquarters</div>
                  <span>${siteConfig.address}</span>
                </div>
              </li>
              <li class="footer-contact-item">
                ${icons.phone}
                <div>
                  <div class="footer-contact-lbl">Phone & WhatsApp</div>
                  <a href="tel:${siteConfig.phone}">${siteConfig.phoneDisplay}</a>
                </div>
              </li>
              <li class="footer-contact-item">
                ${icons.mail}
                <div>
                  <div class="footer-contact-lbl">Email Inquiries</div>
                  <a href="mailto:${siteConfig.email}" style="word-break:break-all">${siteConfig.email}</a>
                </div>
              </li>
              <li class="footer-contact-item">
                ${icons.globe}
                <div>
                  <div class="footer-contact-lbl">Official Domain</div>
                  <a href="${siteConfig.website}" target="_blank" rel="noopener noreferrer">${siteConfig.domain}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="footer-bottom">
        <div class="container-page footer-bottom-inner">
          <p>© ${year} Phonix IT Solutions. All Rights Reserved. Building Solutions. Driving Growth.</p>
          <div class="footer-bottom-links">
            <a href="contact">Privacy Policy</a>
            <a href="contact">Terms of Service</a>
            <a href="contact">Security Overview</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const target = document.getElementById('footer-placeholder');
  if (target) target.innerHTML = html;
}

// ============================================================
// 3. RENDER TECH ECOSYSTEM (Horizontal Cards)
// ============================================================
function renderTechEcosystem(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = techEcosystem
    .map(
      (t) => `
    <div class="tech-card">
      <div class="tech-icon-wrap">
        ${techIcons[t.icon] || icons.code}
      </div>
      <div class="tech-name">${t.name}</div>
      <div class="tech-category-tag">${t.category}</div>
    </div>
  `
    )
    .join('');
}

// ============================================================
// 4. RENDER SCROLL-DRIVEN SERVICE SHOWCASE
// ============================================================
function renderServicesShowcase(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = services
    .map((s, index) => {
      // 01 -> image RIGHT (layout-normal)
      // 02 -> image LEFT (layout-reverse)
      // 03 -> image RIGHT (layout-normal)
      // 04 -> image LEFT (layout-reverse)
      // 05 -> image RIGHT (layout-normal)
      // 06 -> image LEFT (layout-reverse)
      const isReverse = s.layout === 'image-left';
      const layoutClass = isReverse ? 'layout-reverse' : 'layout-normal';

      return `
        <div class="service-showcase-item ${layoutClass}" id="${s.slug}" data-service-index="${index}">
          <div class="container-page">
            <div class="showcase-grid">

              <!-- Service Information Column -->
              <div class="showcase-info-col">
                <div class="showcase-intro">
                  <div class="showcase-eyebrow-wrap">
                    <span class="showcase-eyebrow">${escapeHtml(s.eyebrow)}</span>
                  </div>
                  <h3 class="showcase-title">${escapeHtml(s.title)}</h3>
                  <p class="showcase-desc">
                    ${escapeHtml(s.description)}
                  </p>
                </div>

                <div class="showcase-details">
                  <div class="showcase-features-list">
                    ${s.benefits
                      .slice(0, 3)
                      .map(
                        (b) => `
                      <div class="showcase-feature-item">
                        <div class="showcase-feature-icon">
                          ${icons.check}
                        </div>
                        <span>${escapeHtml(b)}</span>
                      </div>
                    `
                      )
                      .join('')}
                  </div>

                  <div class="showcase-tech-tags">
                    ${s.tech
                      .map(
                        (t) => `
                      <span class="showcase-tech-tag">${escapeHtml(t)}</span>
                    `
                      )
                      .join('')}
                  </div>

                  <div class="showcase-cta-wrap">
                    <a href="services#${s.slug}" class="showcase-link-btn">
                      <span>Explore Capability</span>
                      ${icons.arrowRight}
                    </a>
                    ${s.metric ? `<span class="showcase-metric-pill">${escapeHtml(s.metric)}</span>` : ''}
                  </div>
                </div>
              </div>

              <!-- Large Visual Showcase Column -->
              <div class="showcase-visual-col">
                <div class="showcase-visual-wrap">
                  <div class="showcase-visual-glow" aria-hidden="true"></div>
                  <div class="showcase-visual-inner">
                    <img 
                      src="${s.image}" 
                      alt="Phonix IT Solutions ${escapeHtml(s.title)} Engineering Visual" 
                      class="showcase-img"
                      loading="lazy"
                    />
                    <div class="showcase-visual-overlay"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    })
    .join('');

  // Trigger scroll-driven scaling animations
  setTimeout(initShowcaseScrollAnimations, 60);
}

// Backward-compatibility alias
function renderBentoServices(containerId) {
  renderServicesShowcase(containerId);
}

// ============================================================
// 5. RENDER WHY US SPLIT & METRICS
// ============================================================
function renderWhyUsSplit(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="why-split-grid">
      <!-- Left Typography Column -->
      <div class="why-typography-box">
        <span class="section-eyebrow">WHY LEADING TECH TEAMS CHOOSE US</span>
        <h2 class="editorial-title">Architected for Scale. Engineered for Long-Term Impact.</h2>
        <p>
          We operate as your high-velocity engineering arm. Our team merges modern architectural patterns with deep business acumen to build software that accelerates customer acquisition, eliminates operational downtime, and handles massive traffic spikes effortlessly.
        </p>

        <div class="why-check-list">
          <div class="why-check-item">
            ${icons.check}
            <span>100% Proprietary Code Ownership & Zero Vendor Lock-In</span>
          </div>
          <div class="why-check-item">
            ${icons.check}
            <span>Rigorous Zero-Trust Security & Standard Mutual NDA Signed</span>
          </div>
          <div class="why-check-item">
            ${icons.check}
            <span>Weekly Demos with Transparent Live Staging Environments</span>
          </div>
          <div class="why-check-item">
            ${icons.check}
            <span>Dedicated SLA Maintenance & Proactive Telemetry Monitoring</span>
          </div>
        </div>

        <a href="why-us" class="btn btn-secondary btn-md">
          <span>Read Engineering Standards</span>
          ${icons.arrowRight}
        </a>
      </div>

      <!-- Right Interactive Metric Cards -->
      <div class="metric-cards-grid">
        ${whyUsMetrics
          .map(
            (m) => `
          <div class="metric-card-interactive">
            <div class="metric-indicator-dot"></div>
            <div class="metric-card-value">${m.value}</div>
            <div class="metric-card-title">${m.label}</div>
            <p class="metric-card-desc">${m.desc}</p>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// ============================================================
// 6. RENDER HORIZONTAL PROCESS TIMELINE
// ============================================================
function renderProcessTimeline(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="timeline-horizontal-wrap">
      <div class="timeline-connecting-line"></div>
      <div class="timeline-steps-grid">
        ${processTimeline
          .map(
            (p) => `
          <div class="timeline-step-card">
            <div class="timeline-step-badge">${p.step}</div>
            <h3 class="timeline-step-title">${p.title}</h3>
            <p class="timeline-step-desc">${p.desc}</p>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// ============================================================
// 7. RENDER FAQ ACCORDIONS
// ============================================================
function renderFaqAccordions(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="faq-accordion-list">
      ${faqs
        .map(
          (f, idx) => `
        <div class="faq-item ${idx === 0 ? 'open' : ''}">
          <button class="faq-trigger" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${f.q}</span>
            <div class="faq-icon">${icons.chevronDown}</div>
          </button>
          <div class="faq-content">
            <p>${f.a}</p>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  initAccordions(`#${containerId}`);
}

// ============================================================
// 8. RENDER DARK POWERFUL CTA & CONTACT SECTION
// ============================================================
function renderDarkCtaSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const serviceOpts = services
    .map((s) => `<option value="${s.title}">${s.title}</option>`)
    .join('');

  container.innerHTML = `
    <div class="contact-cta-dark">
      <div class="cta-dark-grid">
        
        <!-- Left Column: Copy & Architectural Telemetry -->
        <div class="cta-dark-info">
          <span class="cta-editorial-eyebrow">LET'S ENGINEER YOUR VISION</span>
          <h2 class="cta-editorial-title">Have an Idea? Let's Build It.</h2>
          <p class="cta-editorial-desc">
            Partner with Phonix IT Solutions to design, develop, and deploy enterprise-grade digital systems. We evaluate your requirements and deliver a comprehensive architecture proposal within 1 business day.
          </p>

          <!-- Telemetry Engine Card (Ready for Launch removed) -->
          <div class="cta-architecture-card">
            <div class="cta-arch-header">
              <span class="cta-arch-title">Project Telemetry Engine</span>
            </div>
            <div class="cta-arch-item">
              <span class="cta-arch-bullet"></span>
              <span>Architecture Assessment &amp; Cloud Topology Plan</span>
            </div>
            <div class="cta-arch-item">
              <span class="cta-arch-bullet"></span>
              <span>Mutual Non-Disclosure Agreement (NDA) Protected</span>
            </div>
            <div class="cta-arch-item">
              <span class="cta-arch-bullet"></span>
              <span>Direct Discovery Call with a Senior Software Architect</span>
            </div>
          </div>

          <!-- Direct Phone/WhatsApp & Address Demo Badges -->
          <div class="cta-contact-badges-grid">
            <div class="cta-contact-badge">
              <div class="cta-contact-badge-icon">${icons.phone}</div>
              <div>
                <div class="cta-contact-badge-label">Direct Phone / WhatsApp (Demo)</div>
                <a href="tel:${siteConfig.phone}" class="cta-contact-badge-val">${siteConfig.phoneDisplay}</a>
              </div>
            </div>

            <div class="cta-contact-badge">
              <div class="cta-contact-badge-icon">${icons.mapPin}</div>
              <div>
                <div class="cta-contact-badge-label">Headquarters Address (Demo)</div>
                <span class="cta-contact-badge-val cta-contact-badge-address">${siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Form -->
        <div class="cta-dark-form-card">
          <h3 class="cta-form-title">
            Send Project Inquiry
          </h3>
          <p class="cta-form-desc">
            Fill out your details below and our technical leads will reach out directly.
          </p>

          <form id="cta-inquiry-form" novalidate>
            <div class="form-grid-2">
              <div class="form-field">
                <label class="form-label" for="inp-cta-name">Your Name *</label>
                <input type="text" id="inp-cta-name" class="form-input" placeholder="e.g. Alex Rivera" required autocomplete="name" />
                <span class="form-error" id="err-cta-name" style="display:none"></span>
              </div>

              <div class="form-field">
                <label class="form-label" for="inp-cta-email">Business Email *</label>
                <input type="email" id="inp-cta-email" class="form-input" placeholder="e.g. alex@company.com" required autocomplete="email" />
                <span class="form-error" id="err-cta-email" style="display:none"></span>
              </div>

              <div class="form-field">
                <label class="form-label" for="inp-cta-company">Company Name</label>
                <input type="text" id="inp-cta-company" class="form-input" placeholder="e.g. Acme Tech Corp" />
              </div>

              <div class="form-field">
                <label class="form-label" for="inp-cta-service">Interested Service</label>
                <select id="inp-cta-service" class="form-select">
                  <option value="">Select a service category</option>
                  ${serviceOpts}
                </select>
              </div>

              <div class="form-field full">
                <label class="form-label" for="inp-cta-msg">Project Details *</label>
                <textarea id="inp-cta-msg" class="form-textarea" placeholder="Briefly describe what technology or software system you want to build..." required></textarea>
                <span class="form-error" id="err-cta-msg" style="display:none"></span>
              </div>
            </div>

            <div style="margin-top:1.5rem">
              <button type="submit" id="btn-submit-cta" class="btn btn-primary btn-lg" style="width:100%">
                <span>Send Inquiry &amp; Schedule Discovery Call</span>
                ${icons.arrowRight}
              </button>
              <p class="cta-form-disclaimer">
                All discussions protected under standard mutual NDA confidentiality.
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  `;

  // Attach Form Submit Handler
  const form = document.getElementById('cta-inquiry-form');
  if (form) {
    form.addEventListener('submit', handleCtaFormSubmit);
  }
}

// CTA Form Submission Handler
function handleCtaFormSubmit(e) {
  e.preventDefault();
  const nameInp = document.getElementById('inp-cta-name');
  const emailInp = document.getElementById('inp-cta-email');
  const compInp = document.getElementById('inp-cta-company');
  const serviceInp = document.getElementById('inp-cta-service');
  const msgInp = document.getElementById('inp-cta-msg');

  const name = (nameInp?.value || '').trim();
  const email = (emailInp?.value || '').trim();
  const company = (compInp?.value || '').trim();
  const service = (serviceInp?.value || '').trim();
  const msg = (msgInp?.value || '').trim();

  let hasError = false;

  if (name.length < 2) {
    showInputError('inp-cta-name', 'err-cta-name', 'Please enter your name.');
    hasError = true;
  } else {
    clearInputError('inp-cta-name', 'err-cta-name');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showInputError('inp-cta-email', 'err-cta-email', 'Please enter a valid work email.');
    hasError = true;
  } else {
    clearInputError('inp-cta-email', 'err-cta-email');
  }

  if (msg.length < 10) {
    showInputError('inp-cta-msg', 'err-cta-msg', 'Please provide project details (at least 10 characters).');
    hasError = true;
  } else {
    clearInputError('inp-cta-msg', 'err-cta-msg');
  }

  if (hasError) return;

  const btn = document.getElementById('btn-submit-cta');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Transmitting Inquiry...</span>`;
  }

  const onSuccess = () => {
    const card = document.querySelector('.cta-dark-form-card');
    if (card) {
      card.innerHTML = `
        <div style="text-align:center;padding:3rem 1.5rem">
          <div style="display:inline-grid;place-items:center;width:3.5rem;height:3.5rem;border-radius:50%;background:rgba(16, 185, 129, 0.12);color:#059669;margin-bottom:1.25rem">
            ${icons.check}
          </div>
          <h3 style="font-size:1.5rem;font-weight:700;color:#0a1128;font-family:'Playfair Display',serif;margin-bottom:0.5rem">
            Inquiry Transmitted!
          </h3>
          <p style="font-size:0.9375rem;color:#475569;font-family:'Plus Jakarta Sans',sans-serif;max-width:28rem;margin:0 auto 1.5rem;line-height:1.6">
            Thank you for contacting <strong>Phonix IT Solutions</strong>. A software architect will review your project requirements and follow up within 1 business day.
          </p>
          <a href="services" class="btn btn-primary btn-md">
            <span>Explore All Capabilities</span>
            ${icons.arrowRight}
          </a>
        </div>
      `;
    }
    showToast('Inquiry sent! We will connect with you shortly.', 'success');
  };

  if (siteConfig.googleSheetAppUrl && siteConfig.googleSheetAppUrl.trim() !== '') {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('service', service);
    formData.append('message', msg);

    fetch(siteConfig.googleSheetAppUrl, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(() => onSuccess())
      .catch(() => onSuccess());
  } else {
    setTimeout(onSuccess, 600);
  }
}

function showInputError(inputId, errorId, msg) {
  const el = document.getElementById(inputId);
  const errEl = document.getElementById(errorId);
  if (el) el.style.borderColor = '#ef4444';
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
}

function clearInputError(inputId, errorId) {
  const el = document.getElementById(inputId);
  const errEl = document.getElementById(errorId);
  if (el) el.style.borderColor = '';
  if (errEl) errEl.style.display = 'none';
}

// ============================================================
// 9. UTILITIES & ACCORDIONS
// ============================================================
function initAccordions(selector = '.faq-accordion-list') {
  document.querySelectorAll(selector).forEach((acc) => {
    acc.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        acc.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}

function renderInnerHero(badge, title, subtitle) {
  return `
    <section class="inner-page-hero">
      <div class="container-page">
        <div class="inner-hero-content center">
          ${badge ? `<div class="hero-eyebrow-wrap"><span class="section-eyebrow">${escapeHtml(badge.toUpperCase())}</span></div>` : ''}
          <h1 class="inner-hero-title editorial-title">${title}</h1>
          ${subtitle ? `<p class="inner-hero-desc">${subtitle}</p>` : ''}
        </div>
      </div>
    </section>
  `;
}

function showToast(message, type = 'success') {
  let box = document.getElementById('toast-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-box';
    box.style.position = 'fixed';
    box.style.top = '1.25rem';
    box.style.left = '50%';
    box.style.transform = 'translateX(-50%)';
    box.style.zIndex = '10000';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '0.5rem';
    box.style.pointerEvents = 'none';
    document.body.appendChild(box);
  }

  const toast = document.createElement('div');
  toast.style.background = type === 'success' ? '#10b981' : '#ef4444';
  toast.style.color = '#ffffff';
  toast.style.padding = '0.75rem 1.25rem';
  toast.style.borderRadius = 'var(--radius-full)';
  toast.style.fontSize = '0.8125rem';
  toast.style.fontWeight = '700';
  toast.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '0.5rem';
  toast.innerHTML = `${type === 'success' ? '✓' : '✕'} ${message}`;

  box.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index';
  if (file === 'index.html' || file === 'index' || file === '') return 'home';
  return file.replace('.html', '');
}

// ============================================================
// 10. RENDER CONSULTATION FORM (Used in contact.html / inner pages)
// ============================================================
function renderConsultationForm(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const serviceOpts = services
    .map((s) => `<option value="${s.title}">${s.title}</option>`)
    .join('');

  container.innerHTML = `
    <div class="consultation-form-card" style="background:#ffffff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:2.25rem 2rem;box-shadow:var(--shadow-card)">
      <h3 style="font-size:1.35rem;font-weight:800;color:var(--navy-900);margin-bottom:0.35rem">
        Project Discovery Inquiry
      </h3>
      <p style="color:var(--foreground-muted);font-size:0.875rem;margin-bottom:1.5rem">
        Tell us about your project requirements and technical stack. We will reply with an architectural proposal within 1 business day.
      </p>

      <form id="contact-inner-form" novalidate>
        <div class="form-grid-2">
          <div class="form-field">
            <label class="form-label" for="inp-inner-name" style="color:var(--navy-900)">Your Name *</label>
            <input type="text" id="inp-inner-name" class="form-input" style="background:var(--surface-subtle);border-color:var(--border);color:var(--navy-900)" placeholder="e.g. Alex Rivera" required autocomplete="name" />
            <span class="form-error" id="err-inner-name" style="display:none"></span>
          </div>

          <div class="form-field">
            <label class="form-label" for="inp-inner-email" style="color:var(--navy-900)">Business Email *</label>
            <input type="email" id="inp-inner-email" class="form-input" style="background:var(--surface-subtle);border-color:var(--border);color:var(--navy-900)" placeholder="e.g. alex@company.com" required autocomplete="email" />
            <span class="form-error" id="err-inner-email" style="display:none"></span>
          </div>

          <div class="form-field">
            <label class="form-label" for="inp-inner-company" style="color:var(--navy-900)">Company Name</label>
            <input type="text" id="inp-inner-company" class="form-input" style="background:var(--surface-subtle);border-color:var(--border);color:var(--navy-900)" placeholder="e.g. Acme Tech Corp" />
          </div>

          <div class="form-field">
            <label class="form-label" for="inp-inner-service" style="color:var(--navy-900)">Interested Service</label>
            <select id="inp-inner-service" class="form-select" style="background:var(--surface-subtle);border-color:var(--border);color:var(--navy-900)">
              <option value="">Select a service category</option>
              ${serviceOpts}
            </select>
          </div>

          <div class="form-field full">
            <label class="form-label" for="inp-inner-msg" style="color:var(--navy-900)">Project Details *</label>
            <textarea id="inp-inner-msg" class="form-textarea" style="background:var(--surface-subtle);border-color:var(--border);color:var(--navy-900)" placeholder="Briefly describe what technology or software system you want to build..." required></textarea>
            <span class="form-error" id="err-inner-msg" style="display:none"></span>
          </div>
        </div>

        <div style="margin-top:1.5rem">
          <button type="submit" id="btn-submit-inner" class="btn btn-primary btn-lg" style="width:100%">
            <span>Submit Project Details</span>
            ${icons.arrowRight}
          </button>
          <p style="font-size:0.75rem;color:var(--foreground-subtle);text-align:center;margin-top:0.75rem">
            All project details are protected under standard mutual NDA confidentiality.
          </p>
        </div>
      </form>
    </div>
  `;

  const form = document.getElementById('contact-inner-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inp-inner-name')?.value.trim() || '';
      const email = document.getElementById('inp-inner-email')?.value.trim() || '';
      const company = document.getElementById('inp-inner-company')?.value.trim() || '';
      const service = document.getElementById('inp-inner-service')?.value.trim() || '';
      const msg = document.getElementById('inp-inner-msg')?.value.trim() || '';

      let hasError = false;
      if (name.length < 2) {
        showInputError('inp-inner-name', 'err-inner-name', 'Please enter your name.');
        hasError = true;
      } else {
        clearInputError('inp-inner-name', 'err-inner-name');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showInputError('inp-inner-email', 'err-inner-email', 'Please enter a valid work email.');
        hasError = true;
      } else {
        clearInputError('inp-inner-email', 'err-inner-email');
      }

      if (msg.length < 10) {
        showInputError('inp-inner-msg', 'err-inner-msg', 'Please provide project details (min 10 characters).');
        hasError = true;
      } else {
        clearInputError('inp-inner-msg', 'err-inner-msg');
      }

      if (hasError) return;

      const btn = document.getElementById('btn-submit-inner');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span>Transmitting Inquiry...</span>`;
      }

      const onSuccess = () => {
        container.innerHTML = `
          <div style="background:#ffffff;border:1px solid var(--border);border-radius:var(--radius-xl);padding:3.5rem 2rem;text-align:center;box-shadow:var(--shadow-card)">
            <div style="display:inline-grid;place-items:center;width:3.5rem;height:3.5rem;border-radius:50%;background:rgba(52, 211, 153, 0.15);color:#10b981;margin-bottom:1.25rem">
              ${icons.check}
            </div>
            <h3 style="font-size:1.5rem;font-weight:800;color:var(--navy-900);margin-bottom:0.5rem">
              Inquiry Received!
            </h3>
            <p style="font-size:0.9375rem;color:var(--foreground-muted);max-width:28rem;margin:0 auto 1.5rem;line-height:1.6">
              Thank you for contacting <strong>Phonix IT Solutions</strong>. A technical architect will review your submission and reply within 1 business day.
            </p>
            <a href="services" class="btn btn-secondary btn-md">
              <span>Explore Capabilities</span>
              ${icons.arrowRight}
            </a>
          </div>
        `;
        showToast('Inquiry sent! We will connect with you shortly.', 'success');
      };

      if (siteConfig.googleSheetAppUrl && siteConfig.googleSheetAppUrl.trim() !== '') {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('company', company);
        formData.append('service', service);
        formData.append('message', msg);

        fetch(siteConfig.googleSheetAppUrl, { method: 'POST', body: formData, mode: 'no-cors' })
          .then(() => onSuccess())
          .catch(() => onSuccess());
      } else {
        setTimeout(onSuccess, 600);
      }
    });
  }
}

// ============================================================
// 11. RENDER FLOATING QUICK ACTIONS (WhatsApp Demo)
// ============================================================
function renderFloatingActions() {
  const target = document.getElementById('floating-placeholder');
  if (!target) return;

  target.innerHTML = `
    <div class="floating-quick-actions" style="position:fixed;bottom:1.5rem;right:1.5rem;z-index:99;display:flex;flex-direction:column;gap:0.75rem;align-items:flex-end">
      <a href="https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Phonix%20IT%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project." 
         target="_blank" 
         rel="noopener noreferrer" 
         aria-label="Chat on WhatsApp (Demo)" 
         class="floating-whatsapp-btn"
         style="display:flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:50%;background:#25d366;color:#ffffff;box-shadow:0 6px 18px rgba(37,211,102,0.35);transition:all 0.25s ease;text-decoration:none">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </a>
    </div>
  `;
}

// ============================================================
// 12. EDITORIAL SCROLL REVEAL (IntersectionObserver)
// ============================================================
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .why-typography-box, .cta-dark-info, .tech-ecosystem-header, .inner-hero-content'
  );

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    }
  );

  elements.forEach((el) => {
    el.classList.add('reveal-fade-up');
    observer.observe(el);
  });
}

// Automatically invoke on DOMContentLoaded & window load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollReveal, 50);
    setTimeout(initShowcaseScrollAnimations, 70);
  });
} else {
  setTimeout(initScrollReveal, 50);
  setTimeout(initShowcaseScrollAnimations, 70);
}
window.addEventListener('load', () => {
  setTimeout(initScrollReveal, 100);
  setTimeout(initShowcaseScrollAnimations, 120);
});

// ============================================================
// 13. ADVANCED SCROLL-DRIVEN SHOWCASE ANIMATIONS (GSAP ScrollTrigger + Fallback)
// ============================================================
function initShowcaseScrollAnimations() {
  const items = document.querySelectorAll('.service-showcase-item');
  if (!items.length) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((item) => {
      const visual = item.querySelector('.showcase-visual-inner');
      if (visual) {
        visual.style.opacity = '1';
        visual.style.transform = 'none';
      }
    });
    return;
  }

  const isMobile = window.innerWidth < 768;
  const startScale = isMobile ? 0.90 : 0.82;
  const startOpacity = isMobile ? 0.75 : 0.65;
  const startY = isMobile ? 25 : 50;
  const exitScale = isMobile ? 0.92 : 0.86;
  const exitY = isMobile ? -20 : -45;

  // Check if GSAP and ScrollTrigger are available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    items.forEach((item) => {
      const visual = item.querySelector('.showcase-visual-inner');
      const glow = item.querySelector('.showcase-visual-glow');
      const isReverse = item.classList.contains('layout-reverse');

      if (!visual) return;

      // Set initial state
      gsap.set(visual, {
        scale: startScale,
        opacity: startOpacity,
        y: startY,
        x: isMobile ? 0 : (isReverse ? 15 : -15),
        force3D: true,
      });

      // Scrubbed timeline tied continuously to scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top bottom', // starts when section enters viewport from below
          end: 'bottom top',   // completes when section leaves viewport at top
          scrub: 0.6,          // continuous fluid scrub in both scroll directions
        },
      });

      // 1. Enter: scales up smoothly to 1.0 at center of viewport
      tl.to(visual, {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
        ease: 'power1.out',
        duration: 1,
      })
      // 2. Active prominent hold while section is centered
      .to(visual, {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.6,
      })
      // 3. Exit: scales down gently as section scrolls past
      .to(visual, {
        scale: exitScale,
        opacity: startOpacity,
        y: exitY,
        x: isMobile ? 0 : (isReverse ? -15 : 15),
        ease: 'power1.in',
        duration: 1,
      });

      // Parallax glow effect
      if (glow) {
        gsap.fromTo(
          glow,
          { y: 35, opacity: 0.4 },
          {
            y: -35,
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    });
  } else {
    // Pure JavaScript requestAnimationFrame Scroll-Scrub Fallback
    initShowcaseScrollFallback();
  }
}

function initShowcaseScrollFallback() {
  const items = document.querySelectorAll('.service-showcase-item');
  if (!items.length) return;

  const isMobile = window.innerWidth < 768;
  const startScale = isMobile ? 0.90 : 0.82;
  const startOpacity = isMobile ? 0.75 : 0.65;
  const startY = isMobile ? 25 : 50;
  const exitScale = isMobile ? 0.92 : 0.86;
  const exitY = isMobile ? -20 : -45;

  let ticking = false;

  function update() {
    const vh = window.innerHeight;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const visual = item.querySelector('.showcase-visual-inner');
      if (!visual) return;

      const totalDist = vh + rect.height;
      const currentDist = vh - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));

      let scale, opacity, y;
      if (progress <= 0.5) {
        // Entering phase (0 -> 0.5): scale up to 1
        const t = progress / 0.5;
        scale = startScale + (1 - startScale) * t;
        opacity = startOpacity + (1 - startOpacity) * t;
        y = startY * (1 - t);
      } else {
        // Exiting phase (0.5 -> 1): scale down gently
        const t = (progress - 0.5) / 0.5;
        scale = 1 - (1 - exitScale) * t;
        opacity = 1 - (1 - startOpacity) * t;
        y = exitY * t;
      }

      visual.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      visual.style.opacity = opacity.toFixed(2);
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}


