// Navegación: hamburguesa + smooth scroll específico para #fortalezas
(function () {
  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav a[href^="#"]');

    function closeMenu() {
      if (!nav) return;
      nav.classList.remove('open');
      if (burger) {
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    }

    // Toggle menú móvil
    if (burger && nav) {
      burger.addEventListener('click', function () {
        const willOpen = !nav.classList.contains('open');
        nav.classList.toggle('open', willOpen);
        burger.classList.toggle('is-open', willOpen);
        burger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    // Smooth scroll genérico para cualquier ancla interna (#...) y cierre del menú
    const header = document.querySelector('.site-header');

    function setActiveLink(hash){
      if(!hash) return;
      const href = hash.startsWith('#') ? hash : `#${hash}`;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === href));
    }

    // Smooth scroll for nav links + set active
    links.forEach((a) => {
      a.addEventListener('click', (ev) => {
        const href = a.getAttribute('href');
        if (!href || href.length <= 1) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        ev.preventDefault();
        const headerOffset = header ? header.offsetHeight + 8 : 0;
        const rect = target.getBoundingClientRect();
        const y = rect.top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveLink(href);
        closeMenu();
      });
    });

    // Smooth scroll for any element with .js-scroll (e.g., +4 Certificados)
    document.querySelectorAll('a.js-scroll[href^="#"]').forEach(a => {
      a.addEventListener('click', (ev) => {
        const href = a.getAttribute('href');
        if (!href || href.length <= 1) return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        ev.preventDefault();
        const headerOffset = header ? header.offsetHeight + 8 : 0;
        const rect = target.getBoundingClientRect();
        const y = rect.top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });

    // Scroll spy: highlight active section
    const sections = Array.from(links)
      .map(a => a.getAttribute('href'))
      .filter(h => h && h.startsWith('#'))
      .map(h => document.querySelector(h))
      .filter(Boolean);

    try {
      const observer = new IntersectionObserver((entries) => {
        // pick the entry nearest to the top and intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if(visible.length){
          setActiveLink('#' + visible[0].target.id);
        }
      }, {
        rootMargin: `-${(header ? header.offsetHeight : 0) + 20}px 0px -60% 0px`,
        threshold: [0.15, 0.4, 0.6]
      });
      sections.forEach(sec => observer.observe(sec));
    } catch(e){ /* ignore if IntersectionObserver not supported */ }
  });
})();
