// گرفتن المان‌ها
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const genreSelect = document.getElementById('genreSelect');
const modeSelect = document.getElementById('modeSelect');
const categoryButtons = document.getElementById('categoryButtons');
const empty = document.getElementById('empty');

// دیکشنری ترجمه ژانرها
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

// دیکشنری ترجمه حالت‌ها
const modeNames = {
  "Single player": "تک‌نفره",
  "Multiplayer": "چندنفره",
  "Co-operative": "همکاری (Co-op)",
  "Split screen": "صفحه تقسیم‌شده",
  "Massively Multiplayer Online (MMO)": "آنلاین گسترده (MMO)"
};
// پر کردن ژانرها
genreSelect.innerHTML = `<option value="">همه ژانرها</option>`;
Object.keys(genreNames).forEach(key => {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = genreNames[key];
  genreSelect.appendChild(option);
});

// پر کردن حالت‌ها
modeSelect.innerHTML = `<option value="">همه حالت‌ها</option>`;
Object.keys(modeNames).forEach(key => {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = modeNames[key];
  modeSelect.appendChild(option);
});

// رندر کارت‌ها
function renderCards(list, query = '', selectedGenre = '', selectedCat = '', selectedMode = '') {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();
  const frag = document.createDocumentFragment();

  list.forEach(({ id, title, image, genres, categories, modes }) => {
    const matchTitle = title.toLowerCase().includes(q);
    const matchGenre = !selectedGenre || (genres && genres.includes(selectedGenre));
    const matchCategory = !selectedCat || (categories && categories.includes(selectedCat));
    const matchMode = !selectedMode || (modes && modes.includes(selectedMode));

    if ((q && !matchTitle) || !matchGenre || !matchCategory || !matchMode) return;

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
        <h1> </h1>
        ${genres && genres.length
          ? `<div class="meta">🎮 ${genres.map(g => `<span class="pill genre">${genreNames[g] || g}</span>`).join('')}</div>`
          : ''
        }
        <h1> </h1>
        ${modes && modes.length
          ? `<div class="meta">👥 ${modes.map(m => `<span class="pill genre">${modeNames[m] || m}</span>`).join('')}</div>`
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

// هایلایت متن جستجو
function highlight(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// رویداد جستجو
search.addEventListener('input', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode);
});

// رویداد ژانر
genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode);
});

// رویداد حالت
modeSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode);
});

// رویداد دسته‌بندی (دکمه‌ها)
categoryButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    categoryButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const selectedGenre = genreSelect.value;
    const selectedMode = modeSelect.value;
    const selectedCat = e.target.dataset.cat;
    renderCards(games, search.value, selectedGenre, selectedCat, selectedMode);
  }
});

// اولین بار رندر همه بازی‌ها
renderCards(games);
