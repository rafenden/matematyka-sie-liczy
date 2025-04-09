// Image modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImage = modal.querySelector('.modal__image');
  const modalClose = modal.querySelector('.modal__close');
  
  // Find all elements with data-modal-image attribute
  const modalTriggers = document.querySelectorAll('[data-modal-image]');
  
  // Add click event to each trigger
  modalTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const imageSrc = this.getAttribute('data-modal-image');
      const imageAlt = this.getAttribute('data-modal-alt') || '';
      
      // Set image source and alt text
      modalImage.src = imageSrc;
      modalImage.alt = imageAlt;
      
      // Show modal
      modal.classList.add('modal--visible');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  // Close modal when clicking the close button
  modalClose.addEventListener('click', function() {
    closeModal();
  });
  
  // Close modal when clicking outside the image or on the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target === modalImage) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('modal--visible')) {
      closeModal();
    }
  });
  
  // Function to close the modal
  function closeModal() {
    modal.classList.remove('modal--visible');
    document.body.style.overflow = ''; // Restore scrolling
  }
});
