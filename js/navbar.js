(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu ? menu.querySelectorAll('.nav-link') : [];

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) closeMenu(); else openMenu();
  }

  toggle.addEventListener('click', toggleMenu);

  // Cerrar al seleccionar un enlace y marcar activo
  links.forEach((a) => {
    a.addEventListener('click', () => {
      links.forEach((l) => l.classList.remove('active'));
      a.classList.add('active');
      closeMenu();
    });
  });

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Cerrar al hacer clic fuera (en móviles)
  document.addEventListener('click', (e) => {
    const withinMenu = menu.contains(e.target);
    const withinToggle = toggle.contains(e.target);
    if (!withinMenu && !withinToggle) closeMenu();
  });
})();

