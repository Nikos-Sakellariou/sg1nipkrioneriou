const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

const setCmsText = (name, value) => {
  if (typeof value !== 'string' || !value.trim()) return;
  document.querySelectorAll(`[data-cms="${name}"]`).forEach((element) => {
    element.textContent = value;
  });
};

const normalizeAssetPath = (path) => path.startsWith('/') ? path.slice(1) : path;

const hydrateSiteContent = (site) => {
  Object.entries(site).forEach(([name, value]) => setCmsText(name, value));

  const compactPhone = String(site.phone || '').replace(/[^+\d]/g, '');
  document.querySelectorAll('[data-cms="phone"]').forEach((link) => {
    if (compactPhone) link.href = `tel:${compactPhone}`;
  });
  document.querySelectorAll('[data-cms="email"]').forEach((link) => {
    if (site.email) link.href = `mailto:${site.email}`;
  });

  const heroImage = document.querySelector('[data-cms-image="hero_image"]');
  if (heroImage && site.hero_image) heroImage.src = normalizeAssetPath(site.hero_image);

  const goals = document.querySelector('[data-cms-list="goals"]');
  if (goals && Array.isArray(site.goals) && site.goals.length) {
    goals.replaceChildren(...site.goals.map((goal) => {
      const item = document.createElement('li');
      item.textContent = goal;
      return item;
    }));
  }

  window.cmsSiteEmail = site.email || window.cmsSiteEmail;
};

const formatGreekDate = (date) => {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(parsed);
};

const hydrateAnnouncements = (announcements) => {
  const container = document.querySelector('[data-cms-list="announcements"]');
  if (!container || !Array.isArray(announcements)) return;

  const published = announcements
    .filter((item) => item && item.published !== false)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!published.length) return;

  container.replaceChildren(...published.map((announcement) => {
    const article = document.createElement('article');
    article.className = 'news-item';

    const time = document.createElement('time');
    time.dateTime = announcement.date || '';
    time.textContent = formatGreekDate(announcement.date || '');

    const title = document.createElement('h3');
    title.textContent = announcement.title || '';

    const summary = document.createElement('p');
    summary.textContent = announcement.summary || '';

    article.append(time, title, summary);
    if (announcement.label) {
      const label = document.createElement('span');
      label.className = 'sample-label';
      label.textContent = announcement.label;
      article.append(label);
    }
    return article;
  }));
};

Promise.all([
  fetch('content/site.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Δεν φορτώθηκαν τα κείμενα του site.');
    return response.json();
  }),
  fetch('content/announcements.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Δεν φορτώθηκαν οι ανακοινώσεις.');
    return response.json();
  })
]).then(([site, announcements]) => {
  hydrateSiteContent(site);
  hydrateAnnouncements(announcements);
}).catch((error) => {
  console.warn('Pages CMS content fallback:', error.message);
});

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  siteNav.classList.toggle('is-open', !open);
});

siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
}));

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Μήνυμα ιστοσελίδας από ${data.get('name')}`);
  const body = encodeURIComponent(`Όνομα: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  status.textContent = 'Ανοίγει η εφαρμογή email προς τη σχολική μονάδα.';
  const recipient = window.cmsSiteEmail || 'mail@nip-kryon.att.sch.gr';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
