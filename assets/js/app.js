// Contact form -> open mail client via mailto
(function(){
  function onReady(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function(){
    var form = document.getElementById('contact-form');
    if(!form) return;
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = (document.getElementById('name')||{}).value || '';
      var email = (document.getElementById('email')||{}).value || '';
      var message = (document.getElementById('message')||{}).value || '';

      var subject = 'Consulta desde el portafolio';
      var body = 'Nombre: ' + name + '\n' +
                 'Email: ' + email + '\n\n' +
                 'Mensaje:\n' + message + '\n';
      var href = 'mailto:michaelq280@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = href;
    });
  });
})();

// Global scroll-reveal animations
(function(){
  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var groups = [
      // Hero
      '.hero-left .badge, .hero-left .hero-title, .hero-left .hero-sub, .hero-left .highlights li, .hero-left .hero-actions .btn, .social-icons .icon-btn',
      // Skills + Process + Stack
      '.skills-section h2, .skills-grid .skill-card',
      '.process-section h2, .process-grid .process-card',
      '.stack-title, .stack-sub, .stack-card, .tech-tags .tag',
      // Projects
      '.project-card, .projects-more',
      // Certifications
      '.cert-title, .cert-sub, .cert-card, .cert-note',
      // Education
      '.edu-title, .edu-sub, .edu-card, .courses-title, .courses-grid .course-pill',
      // Contact
      '.contact-title, .contact-sub, .contact-card, .contact-side .info-card, .contact-side .social-card, .contact-side .availability-card, .cta-card',
      // Footer
      '.site-footer .footer-col, .site-footer .footer-copy'
    ];

    var revealEls = [];
    groups.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        if (!el.classList.contains('reveal-up')) el.classList.add('reveal-up');
        revealEls.push(el);
      });
    });

    // stagger per group: assign delays within each selector group
    groups.forEach(function(sel){
      var i = 0;
      document.querySelectorAll(sel).forEach(function(el){
        el.style.setProperty('--reveal-delay', (i * 90 + 80) + 'ms');
        i++;
      });
    });

    try {
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting) entry.target.classList.add('is-inview');
          else entry.target.classList.remove('is-inview');
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
      revealEls.forEach(function(el){ observer.observe(el); });
    } catch(e){ /* ignore if not supported */ }
  });
})();
