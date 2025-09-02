const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const search = document.getElementById('search');
const categoryButtons = document.getElementById('categoryButtons');
const genreSelect = document.getElementById('genreSelect');

// دیکشنری ژانرها (نمایش فارسی، کد انگلیسی)
const genreNames = {
  "Pinball": "پین‌بال",
  "Adventure": "ماجراجویی",
  "Indie": "ایندی (مستقل)",
  "Arcade": "آرکید",
  "Visual Novel": "ویژوال ناول",
  "Card & Board Game": "بازی کارت و تخته‌ای",
  "MOBA": "میدان آنلاین (MOBA)",
  "Point-and-click": "اشاره و کلیک",
  "Fighting": "مبارزه‌ای",
  "Shooter": "شوتر",
  "Music": "موسیقی",
  "Platform": "سکوبازی",
  "Puzzle": "معمایی",
  "Racing": "مسابقه‌ای",
  "Real Time Strategy (RTS)": "استراتژی واقعی (RTS)",
  "Role-playing (RPG)": "نقش‌آفرینی (RPG)",
  "Simulator": "شبیه‌سازی",
  "Sport": "ورزشی",
  "Strategy": "استراتژی",
  "Turn-based strategy (TBS)": "استراتژی نوبتی (TBS)",
  "Tactical": "تاکتیکی",
  "Hack and slash/Beat 'em up": "هک‌-‌اند‌-‌اسلش / مبارزه‌ای",
  "Quiz/Trivia": "پرسش و معلومات"
};

// پر کردن منوی ژانر با فارسی
genreSelect.innerHTML = `<option value="">همه ژانرها</option>`;
Object.keys(genreNames).forEach(key => {
  const option = document.createElement('option');
  option.value = key;          
  option.textContent = genreNames[key]; 
  genreSelect.appendChild(option);
});

// هایلایت متن جستجو
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
function renderCards(list, query = '', selectedGenre = '', selectedCat = '') {
  renderNewGames();
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();
  const frag = document.createDocumentFragment();

  list.forEach(({ id, title, image, genres, categories }) => {
    const matchTitle = title.toLowerCase().includes(q);
    const matchGenre = !selectedGenre || (genres && genres.includes(selectedGenre));
    const matchCategory = !selectedCat || (categories && categories.includes(selectedCat));

    if ((q && !matchTitle) || !matchGenre || !matchCategory) return;

    const link = document.createElement('a');
    link.href = `details.html?id=${id}`;
    link.className = 'card';
    link.innerHTML = `
      <img class="thumb" src="${image}" alt="کاور ${title}" loading="lazy" />
      <div class="content">
        <h2 class="title">${highlight(title, q)}</h2>
        ${categories && categories.length
          ? `<div class="meta">💻 ${categories.map(cat => `<span class="pill">${cat}</span>`).join('')}</div>`
          : ''
        }
        ${genres && genres.length
          ? `<div class="meta">🎮 ${genres.map(g => `<span class="pill genre">${genreNames[g] || g}</span>`).join('')}</div>`
          : ''
        }
      </div>
    `;
    frag.appendChild(link);
  });

  grid.appendChild(frag);
  empty.hidden = grid.children.length > 0;
  grid.setAttribute('aria-busy', 'false');
}

// بخش بازی‌های جدید ماه
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

// جستجو با تایمر
let t;
search.addEventListener('input', () => {
  clearTimeout(t);
  t = setTimeout(() => {
    const activeCatBtn = categoryButtons.querySelector('button.active');
    const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
    const selectedGenre = genreSelect.value;
    renderCards(games, search.value, selectedGenre, selectedCat);
  }, 120);
});

// فیلتر دسته‌بندی با دکمه‌ها
categoryButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const selected = e.target.dataset.cat;
    [...categoryButtons.children].forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const selectedGenre = genreSelect.value;
    renderCards(games, search.value, selectedGenre, selected);
  }
});

// فعال کردن اولین دکمه (همه)
const firstBtn = categoryButtons.querySelector('button[data-cat=""]');
if (firstBtn) firstBtn.classList.add('active');

// فیلتر ژانر
genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat);
});

// رندر اولیه
const activeCatBtn = categoryButtons.querySelector('button.active');
const initialCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
renderCards(games, '', '', initialCat);
