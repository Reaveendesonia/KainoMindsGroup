// Menu open/close
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');
const empresasToggle = document.getElementById('empresasToggle');
const empresasList = document.getElementById('empresasList');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden','false');
});
closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden','true');
});

// toggle submenu
if (empresasToggle) {
  empresasToggle.addEventListener('click', () => {
    empresasList.classList.toggle('open');
    const expanded = empresasList.classList.contains('open');
    empresasToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

// close menu when clicking a link (smooth mobile experience)
document.querySelectorAll('.side-link').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden','true');
  });
});

// IntersectionObserver for reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {threshold: 0.12});

// observe hero + sections
document.querySelectorAll('.hero, .section').forEach(el => io.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// Close side menu on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden','true');
  }
});
