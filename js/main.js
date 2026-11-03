'use strict';

(() => {
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('readingProgress');
  const menuButton = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const toast = document.getElementById('toast');
  let toastTimer;

  function updateScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    const available = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu navigasi');
    menuButton.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>';
  }
  menuButton.addEventListener('click', () => {
    const shouldOpen = mobileNav.hidden;
    mobileNav.hidden = !shouldOpen;
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
    menuButton.setAttribute('aria-label', shouldOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    menuButton.innerHTML = shouldOpen
      ? '<svg class="icon" aria-hidden="true"><use href="#i-close"/></svg>'
      : '<svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>';
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !event.composedPath().includes(header)) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2700);
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const temp = document.createElement('textarea');
          temp.value = value;
          temp.style.position = 'fixed';
          temp.style.opacity = '0';
          document.body.appendChild(temp);
          temp.select();
          const success = document.execCommand('copy');
          temp.remove();
          if (!success) throw new Error('Copy unsupported');
        }
        showToast('Alamat email berhasil disalin!');
      } catch (error) {
        showToast('Silakan salin email secara manual.');
      }
    });
  });

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroVisual = document.querySelector('.hero-profile-art');
  if (heroVisual && !reduceMotion) {
    window.addEventListener('mousemove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      heroVisual.style.transform = `translate3d(${x * 0.35}px, ${y * 0.25}px, 0)`;
    }, { passive: true });
  }

  // Show creator social links as an accessible offline-safe modal.
  const creatorCard = document.getElementById('creatorProjectCard');
  const creatorDialog = document.getElementById('creatorLinksDialog');
  const creatorClose = document.getElementById('creatorDialogClose');
  let creatorPreviousFocus = null;
  if (creatorCard && creatorDialog && creatorClose) {
    function openCreatorDialog() {
      if (creatorDialog.open) return;
      creatorPreviousFocus = document.activeElement;
      creatorDialog.showModal();
      creatorClose.focus();
    }
    creatorCard.addEventListener('click', openCreatorDialog);
    creatorCard.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCreatorDialog();
      }
    });
    creatorClose.addEventListener('click', () => creatorDialog.close());
    creatorDialog.addEventListener('click', event => {
      if (event.target === creatorDialog) creatorDialog.close();
    });
    creatorDialog.addEventListener('close', () => {
      if (creatorPreviousFocus && creatorPreviousFocus.isConnected) creatorPreviousFocus.focus();
    });
  }

})();
