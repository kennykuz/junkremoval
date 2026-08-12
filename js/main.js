// ClearSpace Junk Removal — site interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle (supports both the original nav and the editorial redesign nav)
  [['.nav-toggle', '.nav-links'], ['.ed-nav-toggle', '.ed-nav-links']].forEach(([toggleSel, linksSel]) => {
    const navToggle = document.querySelector(toggleSel);
    const navLinks = document.querySelector(linksSel);
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
  });

  // Highlight active nav link based on current page (original nav only —
  // the editorial redesign nav sets its active link directly in the markup)
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // FAQ accordion (supports both the original .faq-* and editorial .ed-faq-* markup)
  [
    { item: '.faq-item', group: '.faq', q: '.faq-q', a: '.faq-a' },
    { item: '.ed-faq-item', group: '.ed-faq', q: '.ed-faq-q', a: '.ed-faq-a' },
  ].forEach(({ item: itemSel, group: groupSel, q: qSel, a: aSel }) => {
    document.querySelectorAll(itemSel).forEach(item => {
      const q = item.querySelector(qSel);
      const a = item.querySelector(aSel);
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        item.closest(groupSel).querySelectorAll(`${itemSel}.open`).forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector(aSel).style.maxHeight = null;
          }
        });
        item.classList.toggle('open', !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      });
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
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => success.classList.remove('show'), 7000);
      }
    });
  }

  // Pricing volume estimator (pricing page)
  const slider = document.querySelector('#volume-slider');
  const sliderOutput = document.querySelector('#volume-output');
  const sliderPrice = document.querySelector('#volume-price');
  if (slider && sliderOutput && sliderPrice) {
    const tiers = [
      { max: 15, label: 'Minimum Load — a couch or a few bags', price: '$99–$149' },
      { max: 35, label: 'Quarter Load — single furniture pieces', price: '$179–$249' },
      { max: 55, label: 'Half Load — a room of furniture', price: '$299–$399' },
      { max: 75, label: 'Three-Quarter Load — small apartment', price: '$429–$519' },
      { max: 100, label: 'Full Load — full home or garage', price: '$549–$649' },
    ];
    const update = () => {
      const val = Number(slider.value);
      const tier = tiers.find(t => val <= t.max) || tiers[tiers.length - 1];
      sliderOutput.textContent = tier.label;
      sliderPrice.textContent = tier.price;
    };
    slider.addEventListener('input', update);
    update();
  }

  // Set current year in footer
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
