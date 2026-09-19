(function () {
  const gallery = document.getElementById('roboticsGallery');
  const toggle = document.getElementById('galleryToggle');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('galleryLightboxImage');
  const lightboxCaption = document.getElementById('galleryLightboxCaption');
  const lightboxCounter = document.getElementById('galleryLightboxCounter');
  const closeButton = document.getElementById('galleryClose');
  const prevButton = document.getElementById('galleryPrev');
  const nextButton = document.getElementById('galleryNext');

  if (!gallery || !lightbox) return;

  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  let currentIndex = 0;
  let lastFocusedElement = null;

  function updateLightbox() {
    const item = items[currentIndex];
    const image = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + items.length;
  }

  function openLightbox(index) {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    updateLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-open');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-open');
    lightboxImage.src = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function showPrevious() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateLightbox();
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  if (toggle) {
    toggle.addEventListener('click', function () {
      const expanded = gallery.classList.toggle('show-all');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.textContent = expanded ? 'Mostrar menos fotografias' : 'Ver galeria completa';
    });
  }

  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', showPrevious);
  nextButton.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (event) {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  });
})();
