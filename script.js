document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('aethon-theme');
  if (savedTheme === 'dark') body.classList.add('dark');
  updateThemeButton();
  function updateThemeButton() {
    if (!themeToggle) return;
    const dark = body.classList.contains('dark');
    themeToggle.textContent = dark ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('aethon-theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  }));

  document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());

  const backTop = document.getElementById('backToTop');
  const updateBackTop = () => backTop?.classList.toggle('visible', window.scrollY > 350);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const storyToggle = document.getElementById('storyToggle');
  const extraStory = document.getElementById('extraStory');
  storyToggle?.addEventListener('click', () => {
    const show = extraStory.hidden;
    extraStory.hidden = !show;
    storyToggle.setAttribute('aria-expanded', String(show));
    storyToggle.innerHTML = show ? 'Hide note <span>−</span>' : 'A note about my journey <span>＋</span>';
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const projectCount = document.getElementById('projectCount');
  function filterProjects(filter) {
    let visible = 0;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (projectCount) projectCount.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
  }
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    filterProjects(button.dataset.filter);
  }));

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    formStatus.textContent = 'Looks good! This demo form has validated your message, but it does not send it anywhere.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  });

  // A friendly greeting is triggered by the Home page's primary call-to-action.
  document.querySelector('.hero-actions .btn-primary')?.addEventListener('click', () => {
    try { sessionStorage.setItem('aethon-welcome-seen', 'yes'); } catch (_) {}
  });
});
