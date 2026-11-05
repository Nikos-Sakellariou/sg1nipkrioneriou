const detailRoot = document.querySelector('[data-detail]');
const contentType = document.body.dataset.contentType;
const isActivity = contentType === 'activity';
const source = isActivity ? 'content/activities.json' : 'content/announcements.json';
const slug = new URLSearchParams(window.location.search).get('slug');

const normalizeAssetPath = (path) => String(path || '').replace(/^\//, '');
const escapeHtml = (value) => String(value || '').replace(/[&<>\"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
}[character]));

const formatGreekDate = (date) => {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('el-GR', {
    day: '2-digit', month: 'long', year: 'numeric'
  }).format(parsed);
};

const sanitizeHtml = (html) => {
  const parsed = new DOMParser().parseFromString(String(html || ''), 'text/html');
  const allowed = new Set(['P', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI', 'STRONG', 'EM', 'A', 'BLOCKQUOTE', 'BR']);
  const clean = (node) => {
    [...node.children].forEach((child) => {
      if (!allowed.has(child.tagName)) {
        if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') {
          child.remove();
          return;
        }
        clean(child);
        child.replaceWith(...child.childNodes);
        return;
      }
      const href = child.tagName === 'A' ? child.getAttribute('href') || '' : '';
      [...child.attributes].forEach((attribute) => child.removeAttribute(attribute.name));
      if (child.tagName === 'A') {
        if (/^(https?:|mailto:|\/|\.\/|#)/i.test(href)) child.setAttribute('href', href);
      }
      clean(child);
    });
  };
  clean(parsed.body);
  return parsed.body.innerHTML;
};

const renderNotFound = () => {
  document.title = 'Το περιεχόμενο δεν βρέθηκε';
  detailRoot.innerHTML = '<h1>Η σελίδα δεν είναι διαθέσιμη</h1><p>Η καταχώριση μπορεί να έχει αφαιρεθεί ή ο σύνδεσμος να μην είναι σωστός.</p><a class="button" href="index.html">Επιστροφή στην αρχική</a>';
};

fetch(source, { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error('Content unavailable');
    return response.json();
  })
  .then((items) => {
    const item = Array.isArray(items) ? items.find((entry) => entry.slug === slug && entry.published !== false) : null;
    if (!item) return renderNotFound();

    document.title = `${item.title} | 1ο Νηπιαγωγείο Κρυονερίου`;
    const image = item.image
      ? `<figure class="detail-media"><img src="${escapeHtml(normalizeAssetPath(item.image))}" alt="${escapeHtml(item.image_alt)}"></figure>`
      : '';
    const label = item.label ? `<span class="sample-label">${escapeHtml(item.label)}</span>` : '';
    detailRoot.innerHTML = `
      <a class="detail-back" href="index.html#${isActivity ? 'activities' : 'news'}">← Επιστροφή ${isActivity ? 'στις δράσεις' : 'στις ανακοινώσεις'}</a>
      <header class="detail-heading">
        <h1>${escapeHtml(item.title)}</h1>
        <p class="detail-meta">${isActivity ? 'Δράση' : 'Ανακοίνωση'} · <time datetime="${escapeHtml(item.date)}">${formatGreekDate(item.date || '')}</time></p>
        ${label}
      </header>
      ${image}
      <article class="detail-content">${sanitizeHtml(item.content || `<p>${item.summary || ''}</p>`)}</article>
    `;
  })
  .catch(renderNotFound);
