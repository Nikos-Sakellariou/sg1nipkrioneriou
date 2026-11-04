document.documentElement.classList.add('js');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

document.querySelectorAll('[data-reveal]').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  siteNav.classList.toggle('is-open', !open);
});
siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
}));

const preview = document.querySelector('.news-preview');
const previewImage = preview.querySelector('img');
const rows = document.querySelectorAll('.news-row');
const selectRow = (row) => {
  if (row.classList.contains('is-active')) return;
  rows.forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-pressed', 'false');
  });
  row.classList.add('is-active');
  row.setAttribute('aria-pressed', 'true');
  preview.classList.add('is-changing');
  window.setTimeout(() => {
    previewImage.src = row.dataset.image;
    previewImage.alt = row.dataset.alt;
    preview.classList.remove('is-changing');
  }, 150);
};
rows.forEach((row) => {
  row.addEventListener('mouseenter', () => selectRow(row));
  row.addEventListener('focus', () => selectRow(row));
  row.addEventListener('click', () => selectRow(row));
});

const contactForm = document.querySelector('#contact-form');
const status = contactForm.querySelector('.form-status');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent('Μήνυμα για τον Σύλλογο Γονέων');
  const body = encodeURIComponent(`Όνομα: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  status.textContent = 'Ανοίγει η εφαρμογή email. Παραλήπτης είναι προσωρινά η σχολική μονάδα.';
  window.location.href = `mailto:mail@nip-kryon.att.sch.gr?subject=${subject}&body=${body}`;
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const driftingImages = document.querySelectorAll('.image-drift img');
  window.addEventListener('scroll', () => {
    driftingImages.forEach((image) => {
      const rect = image.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        image.style.transform = `scale(1.04) translateY(${(progress - .5) * 14}px)`;
      }
    });
  }, { passive: true });
}
