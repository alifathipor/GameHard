// دریافت ID بازی از پارامتر URL
const params = new URLSearchParams(window.location.search);
const gameId = parseInt(params.get('id'), 10);

// پیدا کردن بازی در آرایه games
const game = games.find(g => g.id === gameId);
const container = document.getElementById('detailsContent');

if (!game) {
  container.innerHTML = `<p class="empty">بازی مورد نظر پیدا نشد.</p>`;
  container.setAttribute('aria-busy', 'false');
} else {
  // دیکشنری‌های ترجمه
  const genreNames = { "Pinball": "پین‌بال", "Adventure": "ماجراجویی", "Indie": "ایندی (مستقل)", "Arcade": "آرکید", "Visual Novel": "ویژوال ناول", "Card & Board Game": "بازی کارت و تخته‌ای", "MOBA": "میدان آنلاین (MOBA)", "Point-and-click": "اشاره و کلیک", "Fighting": "مبارزه‌ای", "Shooter": "شوتر", "Music": "موسیقی", "Platform": "سکوبازی", "Puzzle": "معمایی", "Racing": "مسابقه‌ای", "Real Time Strategy (RTS)": "استراتژی هم‌زمان (RTS)", "Role-playing (RPG)": "نقش‌آفرینی (RPG)", "Simulator": "شبیه‌سازی", "Sport": "ورزشی", "Strategy": "استراتژی", "Turn-based strategy (TBS)": "استراتژی نوبتی (TBS)", "Tactical": "تاکتیکی", "Hack and slash/Beat 'em up": "هک‌-‌اند‌-‌اسلش / بزن‌بهادر", "Quiz/Trivia": "پرسش و معلومات" };
  const modeNames = { "Single player": "تک‌نفره", "Multiplayer": "چندنفره", "Co-operative": "همکاری (Co-op)", "Split screen": "صفحه تقسیم‌شده", "Massively Multiplayer Online (MMO)": "آنلاین گسترده (MMO)" };
  const perspectiveNames = { "First person": "اول شخص", "Third person": "سوم شخص", "Bird view / Isometric": "نمای ایزومتریک", "Side view": "نمای کناری", "Text": "متنی" };

  // استخراج قیمت‌ها برای هر پلتفرم
  const priceRows = [];
  const platformMap = { PC: { idField: 'priceIdPC', sizeField: 'sizePC', prices: pricesPC, label: 'PC' }, PS4: { idField: 'priceIdPS4', sizeField: 'sizePS4', prices: pricesPS4, label: 'PS4' }, PS5: { idField: 'priceIdPS5', sizeField: 'sizePS5', prices: pricesPS5, label: 'PS5' }, PS3: { idField: 'priceIdPS3', sizeField: 'sizePS3', prices: pricesPS3, label: 'PS3' }, PS2: { idField: 'priceIdPS2', sizeField: 'sizePS2', prices: pricesPS2, label: 'PS2' }, Xbox: { idField: 'priceIdXbox', sizeField: 'sizeXbox', prices: pricesXbox, label: 'Xbox' }, Android: { idField: 'priceIdAndroid', sizeField: 'sizeAndroid', prices: pricesAndroid, label: 'Android' } };

  if (game.categories) {
    game.categories.forEach(cat => {
      const info = platformMap[cat];
      if (info && game[info.idField]) {
        const priceObj = info.prices[game[info.idField]];
        if (priceObj) {
          const { price, discount } = priceObj;
          const finalPrice = discount > 0 ? Math.floor(price - (price * discount / 100)) : price;
          const sizeVal = game[info.sizeField] ? `${game[info.sizeField]} گیگابایت` : "نامشخص";

          priceRows.push(`
            <div class="price-row">
              <span class="platform-label">${info.label}</span>
              <span class="size">حجم: ${sizeVal}</span>
              ${discount > 0
              ? `<span class="old-price">${price.toLocaleString()} ت</span>
                     <span class="final-price">${finalPrice.toLocaleString()} ت</span>
                     <span class="discount">٪${discount}</span>`
              : `<span class="final-price">${price.toLocaleString()} ت</span>`
            }
            </div>
          `);
        }
      }
    });
  }

  // تابع کمکی استخراج سال انتشار
  function extractYear(val) {
    if (val === null || val === undefined) return null;
    const n = Number(val);
    if (!Number.isNaN(n)) {
      if (n > 1e12) return new Date(n).getFullYear();
      if (n > 1e9) return new Date(n * 1000).getFullYear();
      if (n >= 1800 && n <= 3000) return Math.floor(n);
    }
    const d = new Date(val);
    return isNaN(d.getFullYear()) ? null : d.getFullYear();
  }

  let releaseInfo = "";
  const releaseYear = extractYear(game.release_year);
  if (releaseYear) {
    const now = new Date().getFullYear();
    const diff = now - releaseYear;
    releaseInfo = `<p class="release-date">تاریخ انتشار: <span>${releaseYear}</span> (${diff > 0 ? `${diff} سال قبل` : 'امسال'})</p>`;
  }
  
  // بروزرسانی عنوان صفحه
  document.title = `جزئیات بازی: ${game.title}`;

  // رندر محتوای کامل صفحه
  container.innerHTML = `
    <div class="details-grid">
      <div class="details-main">
        <div class="details-card">
          <h2>${game.title}</h2>
          <p class="desc-justify">${game.description}</p>
          ${releaseInfo}
        </div>

        ${priceRows.length > 0 ? `
          <div class="details-card">
            <h3>قیمت و حجم</h3>
            <div class="price-box-details">
              ${priceRows.join('')}
            </div>
          </div>
        ` : ''}

        ${game.video ? `
          <div class="details-card">
            <h3>ویدیو</h3>
            <div class="video-container">
              <iframe src="${game.video}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        ` : ''}
        
        ${game.gallery && game.gallery.length > 0 ? `
          <div class="details-card">
            <h3>گالری تصاویر</h3>
            <div class="gallery-grid">
              ${game.gallery.map((src, i) => `
                <img src="${src}" alt="تصویر ${i + 1} از ${game.title}" class="gallery-img" data-idx="${i}" loading="lazy" />
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="details-sidebar">
        <div class="details-card">
          <h3>اطلاعات بازی</h3>
          <div class="meta-section">
            ${game.categories?.length ? `<div class="meta"><strong>پلتفرم:</strong> ${game.categories.map(cat => `<span class="pill">${cat}</span>`).join('')}</div>` : ''}
            ${game.genres?.length ? `<div class="meta"><strong>ژانر:</strong> ${game.genres.map(g => `<span class="pill">${genreNames[g] || g}</span>`).join('')}</div>` : ''}
            ${game.modes?.length ? `<div class="meta"><strong>حالت:</strong> ${game.modes.map(m => `<span class="pill">${modeNames[m] || m}</span>`).join('')}</div>` : ''}
            ${game.perspectives?.length ? `<div class="meta"><strong>زاویه دید:</strong> ${game.perspectives.map(p => `<span class="pill">${perspectiveNames[p] || p}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      </div>
    </div>

    <div id="lightbox" class="lightbox" style="display:none;">
      <div class="lightbox-bg"></div>
      <img id="lightbox-img" src="" alt="تصویر بزرگ" />
    </div>
  `;

  container.setAttribute('aria-busy', 'false');

  // لایت‌باکس گالری
  const galleryImgs = container.querySelectorAll('.gallery-img');
  const lightbox = container.querySelector('#lightbox');
  const lightboxImg = container.querySelector('#lightbox-img');

  if (galleryImgs.length > 0 && lightbox) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    });
  }
}
