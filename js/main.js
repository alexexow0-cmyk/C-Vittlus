document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const currentYear = document.getElementById('currentYear');
  const contactForm = document.getElementById('contactForm');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = contactForm.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // No hay backend configurado. Mostrar mensaje claro al usuario.
      button.textContent = 'Mensaje recibido (sin envío configurado)';
      button.disabled = true;

      console.warn('NOTA: El formulario de contacto no tiene backend. Los datos no se envían a ningún servidor. Para activar esta funcionalidad, configura un servicio backend (Formspree, Netlify Forms, etc.).');

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }
});
