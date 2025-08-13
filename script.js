const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');

function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const mid = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return `${before}<span class="hl">${mid}</span>${after}`;
}

function renderCards(list, query = '', category = '') {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();
  const selectedCat = (category || '').trim();

  const frag = document.createDocumentFragment();

  list.forEach(({ id, title, image, categories }) => {
    const matchTitle = title.toLowerCase().includes(q);
    const matchCategory = !selectedCat || categories.includes(selectedCat);
    if ((q && !matchTitle) || !matchCategory) return;

    const link = document.createElement('a');
    link.href = `details.html?id=${id}`;
    link.className = 'card';
    link.innerHTML = `
      <img class="thumb" src="${image}" alt="کاور ${title}" loading="lazy" />
      <div class="content">
        <h2 class="title">${highlight(title, q)}</h2>
        <div class="meta">
          ${categories.map(cat => `<span class="pill">${cat}</span>`).join('')}
        </div>
      </div>
    `;
    frag.appendChild(link);
  });

  grid.appendChild(frag);
  empty.hidden = grid.children.length > 0;
  grid.setAttribute('aria-busy', 'false');
}

let t;
search.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(() => renderCards(games, search.value, categoryFilter.value), 120);
});

categoryFilter.addEventListener('change', () => {
  renderCards(games, search.value, categoryFilter.value);
});

renderCards(games, '', categoryFilter.value);
