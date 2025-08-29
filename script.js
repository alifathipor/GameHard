const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const categoryButtons = document.getElementById('categoryButtons');

// رندر کارت‌ها (مثل قبل)
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
  renderNewGames();
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

// اضافه کردن بخش بازی‌های جدید ماه
const newGamesBox = document.createElement('div');
newGamesBox.className = 'new-games-box';
newGamesBox.style.marginBottom = '24px';
grid.parentNode.insertBefore(newGamesBox, grid);

function renderNewGames() {
  const newGames = games.filter(g => g.isNew);
  if (newGames.length === 0) {
    newGamesBox.innerHTML = '';
    newGamesBox.style.display = 'none';
    return;
  }
  newGamesBox.style.display = '';
  newGamesBox.innerHTML = `
    <div class="new-games-title">بازی‌های اضافه شده این ماه</div>
    <div class="new-games-list">
      ${newGames.map(game => `
        <a href="details.html?id=${game.id}" class="new-game-card">
          <img src="${game.image}" alt="کاور ${game.title}" class="new-game-thumb" loading="lazy" />
          <span class="new-game-name">${game.title}</span>
        </a>
      `).join('')}
    </div>
  `;
}

// جستجو
let t;
search.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(() => {
    const activeCatBtn = categoryButtons.querySelector('button.active');
    const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
    renderCards(games, search.value, selectedCat);
  }, 120);
});

// دسته‌بندی با دکمه‌ها
categoryButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const selected = e.target.dataset.cat;
    [...categoryButtons.children].forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    renderCards(games, search.value, selected);
  }
});

// فعال کردن اولین دکمه (همه)
categoryButtons.querySelector('button[data-cat=""]').classList.add('active');

// رندر اولیه
renderCards(games, '', '');