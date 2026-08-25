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

// A cached or data-URI image can finish decoding before the listeners above
// are attached, so its load/error event is never observed. Sweep once the DOM
// is ready to catch anything that already settled.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img.photo').forEach((img) => {
    if (!img.complete) return;
    if (img.naturalWidth > 0) img.parentElement?.classList.add('has-photo');
    else img.remove();
  });
});

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    const setNav = (open) => {
      navLinks.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', () => {
      setNav(!navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setNav(false));
    });
    // The dimmed backdrop is a body pseudo-element, so it cannot carry its own
    // listener. Close on any press that lands outside the drawer instead —
    // otherwise the backdrop just blocks the page with no way out but the icon.
    document.addEventListener('click', (e) => {
      if (!document.body.classList.contains('nav-open')) return;
      if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      setNav(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNav(false);
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

  // The quote form is a Zoho Forms embed now, so submission, validation and
  // photo uploads are all handled inside the iframe. Nothing to wire up here.

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

  // Set current year in footer
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
