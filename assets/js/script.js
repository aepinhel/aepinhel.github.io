(() => {
  const modalButtons = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  let lastTrigger = null;

  function openModal(id, trigger) {
    const modal = document.getElementById(id);
    if (!modal) return;

    lastTrigger = trigger;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = '';

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  modalButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.modal, button));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => closeModal(button.closest('.modal')));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openModalElement = document.querySelector('.modal:not([hidden])');
    if (openModalElement) closeModal(openModalElement);
  });
})();
