// Contact form -> automatic: Android => Gmail, Desktop => Outlook (fallback to mailto)
(function(){
  function onReady(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function(){
    var form = document.getElementById('contact-form');
    if(!form) return;

    var TO = 'michaelq280@gmail.com';
    function build(){
      var name = (document.getElementById('name')||{}).value || '';
      var email = (document.getElementById('email')||{}).value || '';
      var message = (document.getElementById('message')||{}).value || '';
      var subject = 'Consulta desde el portafolio';
      var body = 'Nombre: ' + name + '\n' +
                 'Email: ' + email + '\n\n' +
                 'Mensaje:\n' + message + '\n';
      return { subject: subject, body: body };
    }

    function openGmail(subject, body){
      var url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(TO) +
                '&su=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);
      var w = window.open(url, '_blank');
      if(!w){ window.location.href = url; }
    }
    function openOutlook(subject, body){
      var urlLive = 'https://outlook.live.com/owa/?path=/mail/action/compose&to=' + encodeURIComponent(TO) +
                    '&subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(body);
      var w = window.open(urlLive, '_blank');
      if(!w){
        var urlOffice = 'https://outlook.office.com/mail/deeplink/compose?to=' + encodeURIComponent(TO) +
                        '&subject=' + encodeURIComponent(subject) +
                        '&body=' + encodeURIComponent(body);
        w = window.open(urlOffice, '_blank');
      }
      if(!w){
        var href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.location.href = href;
      }
    }

    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var d = build();
      var ua = navigator.userAgent || navigator.vendor || '';
      if(/android/i.test(ua)){
        openGmail(d.subject, d.body);
      } else {
        openOutlook(d.subject, d.body);
      }
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
