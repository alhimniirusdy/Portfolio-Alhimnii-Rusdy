/* SMA Kartikatama gallery: grouped screenshots work directly from this HTML file. */
(() => {
  const project = document.getElementById('attendanceProjectCard');
  const dialog = document.getElementById('attendanceGalleryDialog');
  if (!project || !dialog) return;
  const closeBtn = document.getElementById('attendanceGalleryClose');
  const tabWeb = document.getElementById('attendanceTabWeb');
  const tabApp = document.getElementById('attendanceTabApp');
  const roleTabs = document.getElementById('attendanceRoleTabs');
  const pane = document.getElementById('attendanceGalleryPane');
  const image = document.getElementById('attendanceGalleryImage');
  const caption = document.getElementById('attendanceGalleryCaption');
  const thumbs = document.getElementById('attendanceGalleryThumbs');
  const stage = document.getElementById('attendanceImageStage');
  const zoomBtn = document.getElementById('attendanceZoomButton');
  const prev = document.getElementById('attendanceGalleryPrev');
  const next = document.getElementById('attendanceGalleryNext');
  let screenshots = null;
  let type = 'website', role = 'Guru', index = 0, previousFocus = null;
  const gallery = () => (screenshots || []).filter(s => type === 'website' ? s.group === role : s.group === 'Aplikasi');

  function setZoom(enabled) {
    stage.classList.toggle('is-zoomed',enabled);
    zoomBtn.setAttribute('aria-pressed',String(enabled));
    zoomBtn.innerHTML = enabled ? '<span aria-hidden="true">⤢</span> Sesuaikan layar' : '<span aria-hidden="true">⤢</span> Perbesar';
    if (!enabled) stage.scrollTo(0,0);
  }
  function render() {
    const items = gallery();
    if (!items.length) return;
    index = ((index % items.length) + items.length) % items.length;
    const item = items[index];
    image.src = item.src;
    image.alt = `Screenshot ${type === 'website' ? 'Website '+role : 'Aplikasi'} SMA Kartikatama Metro, foto ${index + 1} dari ${items.length}`;
    caption.textContent = `${type === 'website' ? 'Website / '+role : 'Aplikasi'} — Foto ${index + 1} dari ${items.length}`;
    document.querySelectorAll('[data-attendance-type]').forEach(b => b.setAttribute('aria-selected',String(b.dataset.attendanceType===type)));
    document.querySelectorAll('[data-attendance-role]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.attendanceRole===role)));
    roleTabs.hidden = type !== 'website';
    thumbs.classList.toggle('is-mobile',type !== 'website');
    pane.setAttribute('aria-labelledby',type === 'website' ? 'attendanceTabWeb' : 'attendanceTabApp');
    setZoom(false);
    thumbs.replaceChildren(...items.map((shot,i) => {
      const button = document.createElement('button');
      button.type='button';button.setAttribute('aria-label',`Lihat foto ${i+1} dari ${items.length}`);
      button.setAttribute('aria-current',String(i===index));
      const thumbnail = document.createElement('img');
      thumbnail.src=shot.src;thumbnail.alt='';thumbnail.loading='lazy';
      button.append(thumbnail);
      button.addEventListener('click',() => { index=i; render(); });
      return button;
    }));
    const selected = thumbs.querySelector('[aria-current="true"]');
    if (selected) selected.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
  }
  function open() {
    if (dialog.open) return;
    if (!screenshots) screenshots=window.portfolioAttendanceScreenshots;
    previousFocus=document.activeElement;
    type='website';role='Guru';index=0;
    dialog.showModal();render();closeBtn.focus();
  }
  project.addEventListener('click',open);
  project.addEventListener('keydown',(event) => {
    if (event.key==='Enter' || event.key===' ') {event.preventDefault();open();}
  });
  closeBtn.addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',(event) => {
    if (event.target===dialog) dialog.close();
  });
  dialog.addEventListener('close',() => {
    image.removeAttribute('src');thumbs.replaceChildren();
    setZoom(false);
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  });
  tabWeb.addEventListener('click',() => {if (type==='website') return;type='website';index=0;render();});
  tabApp.addEventListener('click',() => {if (type==='aplikasi') return;type='aplikasi';index=0;render();});
  roleTabs.addEventListener('click',(event) => {
    const btn=event.target.closest('[data-attendance-role]');
    if (btn && btn.dataset.attendanceRole!==role) {role=btn.dataset.attendanceRole;index=0;render();}
  });
  prev.addEventListener('click',() => {index--;render();});
  next.addEventListener('click',() => {index++;render();});
  zoomBtn.addEventListener('click',() => setZoom(!stage.classList.contains('is-zoomed')));
  dialog.addEventListener('keydown',(event) => {
    if (event.target.closest('button') && ['ArrowLeft','ArrowRight'].includes(event.key) && event.target.closest('.attendance-dialog-nav')) return;
    if (event.key==='ArrowLeft') {event.preventDefault();index--;render();}
    if (event.key==='ArrowRight') {event.preventDefault();index++;render();}
  });
})();
