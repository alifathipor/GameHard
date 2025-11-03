// گرفتن المان‌ها
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const genreSelect = document.getElementById('genreSelect');
const modeSelect = document.getElementById('modeSelect');
const newSelect = document.getElementById('newSelect');
const categoryButtons = document.getElementById('categoryButtons');
const empty = document.getElementById('empty');

// رندر کارت‌ها
function renderCards(list, query = '', selectedGenre = '', selectedCat = '', selectedMode = '', selectedNew = '') {
  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = '';

  const q = (query || '').trim().toLowerCase();

  let sortedList = [...list];

  // مرتب‌سازی بر اساس تاریخ انتشار
  if (selectedNew === 'new') {
    sortedList.sort((a, b) => (Number(b.release_year) || 0) - (Number(a.release_year) || 0));
  } else if (selectedNew === 'old') {
    sortedList.sort((a, b) => (Number(a.release_year) || 0) - (Number(b.release_year) || 0));
  } else {
    // مرتب‌سازی پیش‌فرض: بازی‌های جدید (isNew) اول
    const newGames = sortedList.filter(g => g.isNew);
    const otherGames = sortedList.filter(g => !g.isNew);
    sortedList = [...newGames, ...otherGames];
  }

  const frag = document.createDocumentFragment();

  sortedList.forEach(({ id, title, image, categories, isNew, release_year }) => {
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
        <div class="meta">
          ${release_year ? `<span>📅 ${release_year}</span>` : ''}
          ${isNew ? `<span class="pill new">جدید</span>` : ''}
        </div>
        ${categories && categories.length
        ? `<div class="meta">${categories.map(cat => `<span class="pill">${cat}</span>`).join('')}</div>`
        : ''
      }
      </div>
    `;
    frag.appendChild(card);
    const thumbBox = card.querySelector('.thumb-box');
    const bgLayer = document.createElement('div');
    bgLayer.className = 'bg-layer';
    bgLayer.style.backgroundImage = `url(${image})`;
    thumbBox.prepend(bgLayer);
  });

  grid.appendChild(frag);
  empty.hidden = grid.children.length > 0;
  grid.setAttribute('aria-busy', 'false');
}

// هایلایت متن جستجو
function highlight(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function handleFilterChange() {
  const selectedGenre = genreSelect.value;
  const selectedMode = modeSelect.value;
  const selectedNew = newSelect.value;
  const activeCatBtn = categoryButtons.querySelector('button.active');
  const selectedCat = activeCatBtn ? activeCatBtn.dataset.cat : '';
  renderCards(games, search.value, selectedGenre, selectedCat, selectedMode, selectedNew);
}

// رویدادها
search.addEventListener('input', handleFilterChange);
genreSelect.addEventListener('change', handleFilterChange);
modeSelect.addEventListener('change', handleFilterChange);
newSelect.addEventListener('change', handleFilterChange);

categoryButtons.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    categoryButtons.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    handleFilterChange();
  }
});

// اولین بار رندر همه بازی‌ها
renderCards(games);

// --- اسلایدر بنر ---
const bannerGames = games.filter(g => g.banner);
if (bannerGames.length > 0) {
  const bg = document.getElementById("bg");
  const mainImage = document.getElementById("mainImage");
  const gameTitle = document.getElementById("gameTitle");
  const thumbContainer = document.getElementById("thumbContainer");

  let current = 0;
  let autoSlideInterval;

  function showGame(i) {
    current = i;
    let g = bannerGames[i];

    mainImage.src = g.image;
    bg.style.backgroundImage = `url('${g.image}')`;
    gameTitle.textContent = g.title;

    document.querySelectorAll("#thumbContainer img").forEach((e, idx) => {
      e.classList.toggle("active", idx === current);
    });

    const item = document.querySelector(`#thumbContainer img:nth-child(${i + 1})`);
    if (item) {
      const container = thumbContainer;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset = itemRect.left - containerRect.left - (containerRect.width / 2) + (itemRect.width / 2);
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  function nextSlide() {
    current = (current + 1) % bannerGames.length;
    showGame(current);
  }

  function prevSlide() {
    current = (current - 1 + bannerGames.length) % bannerGames.length;
    showGame(current);
  }

  bannerGames.forEach((g, i) => {
    let img = document.createElement("img");
    img.src = g.image;
    img.alt = `تصویر کوچک ${g.title}`;
    img.onclick = () => {
      showGame(i);
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 8000);
    };
    thumbContainer.appendChild(img);
  });

  document.getElementById("rightBtn").onclick = () => {
    prevSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 8000);
  };
  document.getElementById("leftBtn").onclick = () => {
    nextSlide();
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 8000);
  };

  mainImage.onclick = () => {
    let g = bannerGames[current];
    window.location.href = `details.html?id=${g.id}`;
  };

  showGame(0);
  autoSlideInterval = setInterval(nextSlide, 8000);
}


// --- شمارنده آمار ---
function setupCounters() {
  const categoryCounts = games.reduce((acc, game) => {
    if (game.categories && game.categories.length > 0) {
      game.categories.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const createOdometer = (el, value) => {
    if (!el) return;
    const odometer = new Odometer({
      el: el,
      value: 0,
      format: 'd'
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => odometer.update(value), 100);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);
  };

  createOdometer(document.querySelector(".ps4.odometer"), categoryCounts['PS4'] || 0);
  createOdometer(document.querySelector(".pc.odometer"), categoryCounts['PC'] || 0);
  createOdometer(document.querySelector(".ps3.odometer"), categoryCounts['PS3'] || 0);
  createOdometer(document.querySelector(".ps2.odometer"), categoryCounts['PS2'] || 0);
}

// اجرای توابع در زمان بارگذاری
document.addEventListener('DOMContentLoaded', () => {
  setupCounters();
});
