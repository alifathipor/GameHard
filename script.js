// گرفتن المان‌ها
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const genreSelect = document.getElementById('genreSelect');
const modeSelect = document.getElementById('modeSelect');
const newSelect = document.getElementById('newSelect');
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
  "Real Time Strategy (RTS)": "استراتژی هم‌زمان (RTS)",
  "Role-playing (RPG)": "نقش‌آفرینی (RPG)",
  "Simulator": "شبیه‌سازی",
  "Sport": "ورزشی",
  "Strategy": "استراتژی",
  "Turn-based strategy (TBS)": "استراتژی نوبتی (TBS)",
  "Tactical": "تاکتیکی",
  "Hack and slash/Beat 'em up": "هک‌انداَسْلش / بزن‌بهادر",
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

// رندر کارت‌ها
function renderCards(list, query = '', selectedGenre = '', selectedCat = '', selectedMode = '', selectedNew = '') {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();


  // سورت بر اساس release_year
  // سورت بر اساس release_year (اگر انتخاب شده)
  let sortedList = [...list];
  if (selectedNew === 'new') {
    sortedList.sort((a, b) => (Number(b.release_year) || 0) - (Number(a.release_year) || 0));
  } else if (selectedNew === 'old') {
    sortedList.sort((a, b) => (Number(a.release_year) || 0) - (Number(b.release_year) || 0));
  }

  // سپس از روی همین sortedList، ابتدا آیتم‌های isNew را بیاور
  const newGames = sortedList.filter(g => g.isNew);
  const oldGames = sortedList.filter(g => !g.isNew);
  sortedList = [...newGames, ...oldGames];


  const frag = document.createDocumentFragment();

  sortedList.forEach(({ id, title, image, genres, categories, modes, description, isNew, release_year }) => {
    const matchTitle = title.toLowerCase().includes(q);
    const matchGenre = !selectedGenre || (genres && genres.includes(selectedGenre));
    const matchCategory = !selectedCat || (categories && categories.includes(selectedCat));
    const matchMode = !selectedMode || (modes && modes.includes(selectedMode));

    if ((q && !matchTitle) || !matchGenre || !matchCategory || !matchMode) return;

    const card = document.createElement('div');
    card.className = 'list-card';
    card.innerHTML = `
      <a href="details.html?id=${id}" class="thumb-box">
        <img class="thumb" src="${image}" alt="کاور ${title}" loading="lazy" />
      </a>
      <div class="info-box">
        <h2 class="title"><a href="details.html?id=${id}">${highlight(title, q)}</a></h2>
        ${release_year ? `<div class="meta">📅 تاریخ انتشار: <span style="color:#1976d2">${release_year}</span></div>` : ''}
        ${categories && categories.length
        ? `<div class="meta">💻 پلتفرم: ${categories.map(cat => `<span class="pill">${cat}</span>`).join('')}</div>`
        : ''
      }
        ${isNew ? `<div class="meta"><span class="pill new">🆕 بازی هایی که اخیرا به هارد اضافه شده</span></div>` : ''}
      </div>
    `;
    frag.appendChild(card);
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
  const selectedNew = newSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
});

// رویداد ژانر
genreSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const selectedNew = newSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
});

// رویداد حالت
modeSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const selectedNew = newSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
});

newSelect.addEventListener('change', () => {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const selectedNew = newSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
});

// رویداد دسته‌بندی (دکمه‌ها)
categoryButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    categoryButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const selectedGenre = genreSelect.value;
    const selectedMode = modeSelect.value;
    const selectedCat = e.target.dataset.cat;
    const selectedNew = newSelect.value;
    renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
  }
});

// اولین بار رندر همه بازی‌ها
renderCards(games);

// 👇 فعال کردن دکمه "همه" در شروع
const defaultBtn = categoryButtons.querySelector('button[data-cat=""]');
if (defaultBtn) {
  defaultBtn.classList.add('active');
}

// ======= اسلایدر بازی‌های Banner =======
// ----------- Dynamic Banner Slider -----------
// ======= اسلایدر بازی‌های Banner =======

// === Banner Slider Proper Version ===

// const bannerGames = games.filter(g => g.banner);  
// let current = 0;

// const slider = document.getElementById("bannerSlider");

// function renderSlider() {
//   const g = bannerGames[current];

//   slider.innerHTML = `
//     <div class="bg" style="background-image:url('${g.image}')"></div>
//     <div class="main-img" style="background-image:url('${g.image}')"></div>
//     <div class="title">${g.title} - ${g.release_year || ""}</div>
//     <div class="thumbs">
//       ${bannerGames.map((x,i)=>`
//         <div class="thumb ${i===current?"active":""}" 
//              style="background-image:url('${x.image}')"
//              onclick="changeSlide(${i})"></div>
//       `).join("")}
//     </div>
//   `;
// }

// window.changeSlide = function(i){
//   current = i;
//   renderSlider();
// };

// renderSlider();
const bannerGames = games.filter(g => g.banner);
const bg = document.getElementById("bg");
const mainImage = document.getElementById("mainImage");
const gameTitle = document.getElementById("gameTitle");
const thumbContainer = document.getElementById("thumbContainer");

let current = 0;

function showGame(i) {
  current = i;
  let g = bannerGames[i];

  mainImage.src = g.image;
  bg.style.backgroundImage = `url('${g.image}')`;
  gameTitle.textContent = g.title;

  document.querySelectorAll("#thumbContainer img").forEach((e, idx) => {
    e.classList.toggle("active", idx === current);
  });

  // وقتی انتخاب شد، thumbnail تا وسط بیاد
  const item = document.querySelector(`#thumbContainer img:nth-child(${i + 1})`);
  if (item) {
    const container = thumbContainer;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const offset = itemRect.left - containerRect.left - (containerRect.width / 2) + (itemRect.width / 2);
    container.scrollBy({ left: offset, behavior: "smooth" });
  }
}

bannerGames.forEach((g, i) => {
  let img = document.createElement("img");
  img.src = g.image;

  // فقط اسلاید عوض کن، صفحه نره
  img.onclick = () => showGame(i);

  thumbContainer.appendChild(img);
});

showGame(0);

// RTL → برعکس دکمه ها
document.getElementById("rightBtn").onclick = () => {
  current = (current - 1 + bannerGames.length) % bannerGames.length;
  showGame(current);
};
document.getElementById("leftBtn").onclick = () => {
  current = (current + 1) % bannerGames.length;
  showGame(current);
};

// روی عکس بزرگ → برو details
mainImage.onclick = () => {
  let g = bannerGames[current];
  window.location.href = `details.html?id=${g.id}`;
};

// Auto slide
setInterval(() => {
  current = (current + 1) % bannerGames.length;
  showGame(current);
}, 8000);



