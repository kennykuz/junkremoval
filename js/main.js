// JunkMatter — site interactions

// Photography layer. Each .photo sits over an illustrated panel and covers it
// once loaded. If the image file isn't there yet the element is removed, so
// the illustration below shows instead of a broken-image icon. Both listeners
// are registered outside DOMContentLoaded and in the capture phase, because
// load/error don't bubble and images can settle before the DOM is ready.
document.addEventListener('error', (e) => {
  const el = e.target;
  if (el && el.tagName === 'IMG' && el.classList.contains('photo')) el.remove();
}, true);

document.addEventListener('load', (e) => {
  const el = e.target;
  if (el && el.tagName === 'IMG' && el.classList.contains('photo') && el.parentElement) {
    el.parentElement.classList.add('has-photo');
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq').querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Back to top button
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Quote / contact form handling (client-side only — no backend configured)
  const quoteForm = document.querySelector('#quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }
      const success = document.querySelector('#form-success');
      quoteForm.reset();
      document.querySelectorAll('.upload-list').forEach(list => { list.innerHTML = ''; });
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => success.classList.remove('show'), 7000);
      }
    });
  }

  // Newsletter form (footer)
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const original = input.placeholder;
      newsletterForm.reset();
      input.placeholder = "Thanks — you're subscribed!";
      setTimeout(() => { input.placeholder = original; }, 4000);
    });
  }

  // Photo upload field (quote form) — lists selected file names, no backend
  document.querySelectorAll('.field-upload').forEach(dropzone => {
    const input = dropzone.querySelector('input[type=file]');
    const list = dropzone.parentElement.querySelector('.upload-list');
    if (!input) return;
    const renderFiles = (files) => {
      if (!list) return;
      list.innerHTML = '';
      Array.from(files).slice(0, 8).forEach(file => {
        const span = document.createElement('span');
        span.textContent = file.name;
        list.appendChild(span);
      });
    };
    input.addEventListener('change', () => renderFiles(input.files));
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag');
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        renderFiles(input.files);
      }
    });
  });

  // Set current year in footer
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
