const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

const setCmsText = (name, value) => {
  if (typeof value !== 'string' || !value.trim()) return;
  document.querySelectorAll(`[data-cms="${name}"]`).forEach((element) => {
    element.textContent = value;
  });
};

const normalizeAssetPath = (path) => path.startsWith('/') ? path.slice(1) : path;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver = null;

const observeReveal = (element, delay = Number(element.dataset.revealDelay || 0)) => {
  element.style.setProperty('--reveal-delay', `${delay}ms`);
  if (!revealObserver || reducedMotion.matches) {
    element.classList.add('is-visible');
    return;
  }
  revealObserver.observe(element);
};

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -100px 0px' });
}

document.documentElement.classList.add('reveal-ready');
document.querySelectorAll('[data-reveal]').forEach((element) => observeReveal(element));

const hydrateSiteContent = (site) => {
  Object.entries(site).forEach(([name, value]) => setCmsText(name, value));

  const compactPhone = String(site.phone || '').replace(/[^+\d]/g, '');
  document.querySelectorAll('[data-cms="phone"]').forEach((link) => {
    if (compactPhone) link.href = `tel:${compactPhone}`;
  });
  document.querySelectorAll('[data-cms="email"]').forEach((link) => {
    if (site.email) link.href = `mailto:${site.email}`;
  });
  document.querySelectorAll('[data-cms-mail="association_email"]').forEach((link) => {
    if (site.association_email) link.href = `mailto:${site.association_email}`;
  });

  const heroImage = document.querySelector('[data-cms-image="hero_image"]');
  if (heroImage && site.hero_image) heroImage.src = normalizeAssetPath(site.hero_image);

  const goals = document.querySelector('[data-cms-list="goals"]');
  if (goals && Array.isArray(site.goals) && site.goals.length) {
    const goalItems = site.goals.map((goal, index) => {
      const item = document.createElement('li');
      item.textContent = goal;
      item.dataset.reveal = '';
      item.dataset.revealDelay = String(index * 60);
      return item;
    });
    goals.replaceChildren(...goalItems);
    goalItems.forEach((item) => observeReveal(item));
  }

  window.cmsSiteEmail = site.association_email || window.cmsSiteEmail;
};

const formatGreekDate = (date) => {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(parsed);
};

const createContentCard = (item, type) => {
  const link = document.createElement('a');
  link.className = `content-card ${type === 'activity' ? 'activity-card' : 'news-item'}`;
  link.href = `${type === 'activity' ? 'activity' : 'announcement'}.html?slug=${encodeURIComponent(item.slug || '')}`;
  link.setAttribute('aria-label', `${item.title || 'Περιεχόμενο'} — διαβάστε περισσότερα`);

  if (item.image) {
    const image = document.createElement('img');
    image.className = 'content-card-image';
    image.src = normalizeAssetPath(item.image);
    image.alt = item.image_alt || '';
    image.loading = 'lazy';
    link.append(image);
  }

  const body = document.createElement('span');
  body.className = 'content-card-body';

  const time = document.createElement('time');
  time.dateTime = item.date || '';
  time.textContent = formatGreekDate(item.date || '');

  const title = document.createElement('h3');
  title.textContent = item.title || '';

  const summary = document.createElement('span');
  summary.className = 'content-card-summary';
  summary.textContent = item.summary || '';

  body.append(time, title, summary);
  if (item.label) {
    const label = document.createElement('span');
    label.className = 'sample-label';
    label.textContent = item.label;
    body.append(label);
  }

  const readMore = document.createElement('span');
  readMore.className = 'read-more';
  readMore.textContent = 'Διαβάστε περισσότερα →';
  body.append(readMore);
  link.append(body);
  return link;
};

const hydrateContentList = (items, listName, type) => {
  const container = document.querySelector(`[data-cms-list="${listName}"]`);
  if (!container || !Array.isArray(items)) return;

  const published = items
    .filter((item) => item && item.published !== false)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  if (!published.length) {
    const empty = document.createElement('p');
    empty.textContent = type === 'activity' ? 'Δεν υπάρχουν ακόμη δημοσιευμένες δράσεις.' : 'Δεν υπάρχουν ακόμη δημοσιευμένες ανακοινώσεις.';
    container.replaceChildren(empty);
    return;
  }

  const cards = published.map((item, index) => {
    const card = createContentCard(item, type);
    card.dataset.reveal = 'card';
    card.dataset.revealDelay = String(Math.min(index * 70, 210));
    return card;
  });
  container.replaceChildren(...cards);
  cards.forEach((card) => observeReveal(card));
};

Promise.all([
  fetch('content/site.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Δεν φορτώθηκαν τα κείμενα του site.');
    return response.json();
  }),
  fetch('content/announcements.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Δεν φορτώθηκαν οι ανακοινώσεις.');
    return response.json();
  }),
  fetch('content/activities.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Δεν φορτώθηκαν οι δράσεις.');
    return response.json();
  })
]).then(([site, announcements, activities]) => {
  hydrateSiteContent(site);
  hydrateContentList(announcements, 'announcements', 'announcement');
  hydrateContentList(activities, 'activities', 'activity');
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

const form = document.querySelector('#contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Μήνυμα ιστοσελίδας από ${data.get('name')}`);
  const body = encodeURIComponent(`Όνομα: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  status.textContent = 'Ανοίγει η εφαρμογή email προς τον Σύλλογο.';
  const recipient = window.cmsSiteEmail || 'syllogosgoneon1nipkryoneriou@gmail.com';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
