/* Certificate-only photo preview, works offline without downloads. */
(() => {
  const popup = document.getElementById('certificatePopup');
  const popupClose = document.getElementById('certificatePopupClose');
  const popupImage = document.getElementById('certificatePopupImage');
  const popupTitle = document.getElementById('certificatePopupTitle');
  let previouslyFocused = null;

  document.querySelectorAll('.all-certificates [data-certificate-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.unified-cert-card');
      if (!card || popup.open) return;
      const image = card.querySelector('.competency-cert-preview img');
      const title = card.querySelector('.competency-cert-body h4');
      if (!image) return;
      previouslyFocused = document.activeElement;
      popupImage.src = image.currentSrc || image.src;
      popupImage.alt = image.alt;
      popupTitle.textContent = title?.textContent.trim() || 'Foto Sertifikat';
      popup.showModal();
      popupClose.focus();
    });
  });

  popupClose.addEventListener('click', () => popup.close());
  popup.addEventListener('click', event => {
    if (event.target === popup) popup.close();
  });
  popup.addEventListener('close', () => {
    popupImage.removeAttribute('src');
    if (previouslyFocused?.isConnected) previouslyFocused.focus();
  });
})();
