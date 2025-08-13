const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');

// هایلایت متن جستجو در عنوان
function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const mid = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return `${before}<span class="hl">${mid}</span>${after}`;
}

// رندر کارت‌ها
function renderCards(list, query = '') {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = query.trim().toLowerCase();
  const frag = document.createDocumentFragment();

  list.forEach(({ id, title, img }) => {
    const match = title.toLowerCase().includes(q);
    if (q && !match) return;

    const link = document.createElement('a');
    link.href = `details.html?id=${id}`;
    link.className = 'card';
    link.innerHTML = `
      <img class="thumb" src="${img}" alt="کاور ${title}" loading="lazy" />
      <div class="content">
        <h2 class="title">${highlight(title, q)}</h2>
        <div class="meta">
          <span class="pill">ویدئویی</span>
          <span class="pill">PC</span>
        </div>
      </div>
    `;
    frag.appendChild(link);
  });

  grid.appendChild(frag);
  empty.hidden = grid.children.length > 0;
  grid.setAttribute('aria-busy', 'false');
}

// جستجو با کمی تأخیر (debounce)
let t;
search.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(() => renderCards(games, search.value), 120);
});

// شروع
renderCards(games);
