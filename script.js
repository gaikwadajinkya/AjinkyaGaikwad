// Renders publications and news from JSON files and fills links.
async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.json();
}

function createPubItem(pub) {
  const div = document.createElement('div');
  div.className = 'pub-item';
  const authorsText = pub.authors?.join(', ');
  const title = pub.title || '';
  const venue = pub.venue || '';
  const year = pub.year ? ` (${pub.year})` : '';
  const extra = pub.note ? ` — ${pub.note}` : '';

  div.innerHTML = `
    <div class="pub-title">${title}</div>
    <div class="pub-authors">${authorsText || ''}</div>
    <div class="pub-venue">${venue}${year}${extra}</div>
    <div class="pub-links">
      ${pub.pdf ? `<a href="${pub.pdf}" target="_blank" rel="noopener">PDF</a>` : ''}
      ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener">DOI</a>` : ''}
      ${pub.arxiv ? `<a href="https://arxiv.org/abs/${pub.arxiv}" target="_blank" rel="noopener">arXiv</a>` : ''}
      ${pub.code ? `<a href="${pub.code}" target="_blank" rel="noopener">Code</a>` : ''}
      ${pub.slides ? `<a href="${pub.slides}" target="_blank" rel="noopener">Slides</a>` : ''}
    </div>
  `;
  return div;
}

function createNewsItem(item) {
  const li = document.createElement('li');
  const d = document.createElement('div');
  d.className = 'news-date';
  d.textContent = item.date || '';
  const t = document.createElement('div');
  t.textContent = item.text || '';
  li.appendChild(d);
  li.appendChild(t);
  return li;
}

function setIfProvided(id, url) {
  const el = document.getElementById(id);
  if (el && url) { el.href = url; el.textContent = el.textContent || url; }
}

function setEmail(mailto) {
  const el = document.getElementById('emailLink');
  if (el && mailto) { el.href = `mailto:${mailto}`; el.textContent = mailto; }
}

async function main() {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Load publications
  try {
    const pubs = await fetchJSON('publications.json');
    const container = document.getElementById('pubs');
    const sorted = pubs.sort((a, b) => (b.year || 0) - (a.year || 0));
    sorted.forEach(p => container.appendChild(createPubItem(p)));
  } catch (e) {
    console.warn(e);
  }

  // Load news
  try {
    const news = await fetchJSON('news.json');
    const list = document.getElementById('newsList');
    news.forEach(n => list.appendChild(createNewsItem(n)));
  } catch (e) {
    console.warn(e);
  }

  // Optional links (edit in site-config.json)
  try {
    const cfg = await fetchJSON('site-config.json');
    setIfProvided('scholarLink', cfg.google_scholar);
    setIfProvided('dblpLink', cfg.dblp);
    setIfProvided('orcidLink', cfg.orcid);
    setIfProvided('githubLink', cfg.github);
    setEmail(cfg.email);
    document.title = (cfg.title || 'Homepage') + ' — Homepage';
    const h1 = document.querySelector('.brand h1 a');
    if (h1 && cfg.title) h1.textContent = cfg.title;
  } catch (e) {
    console.warn(e);
  }
}

main();
