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
  // دیکشنری ژانرها (نمایش فارسی)
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
    "Hack and slash/Beat 'em up": "هک‌-‌اند‌-‌اسلش / بزن‌بهادر",
    "Quiz/Trivia": "پرسش و معلومات"
  };

  // دیکشنری حالت‌ها (Modes)
  const modeNames = {
    "Single player": "تک‌نفره",
    "Multiplayer": "چندنفره",
    "Co-operative": "همکاری (Co-op)",
    "Split screen": "صفحه تقسیم‌شده",
    "Massively Multiplayer Online (MMO)": "آنلاین گسترده (MMO)"
  };

  // دیکشنری زاویه دید (Perspectives)
  const perspectiveNames = {
    "First person": "اول شخص",
    "Third person": "سوم شخص",
    "Bird view / Isometric": "نمای ایزومتریک (بالا به پایین)",
    "Side view": "نمای کناری",
    "Text": "متنی"
  };

  // استخراج قیمت‌ها برای هر پلتفرم
  const priceRows = [];
  const platformMap = {
    PC: { idField: 'priceIdPC', sizeField: 'sizePC', prices: pricesPC, label: 'PC' },
    PS4: { idField: 'priceIdPS4', sizeField: 'sizePS4', prices: pricesPS4, label: 'PS4' },
    PS5: { idField: 'priceIdPS5', sizeField: 'sizePS5', prices: pricesPS5, label: 'PS5' },
    PS3: { idField: 'priceIdPS3', sizeField: 'sizePS3', prices: pricesPS3, label: 'PS3' },
    PS2: { idField: 'priceIdPS2', sizeField: 'sizePS2', prices: pricesPS2, label: 'PS2' },
    Xbox: { idField: 'priceIdXbox', sizeField: 'sizeXbox', prices: pricesXbox, label: 'Xbox' },
    Android: { idField: 'priceIdAndroid', sizeField: 'sizeAndroid', prices: pricesAndroid, label: 'Android' }
  };

  game.categories.forEach(cat => {
    const info = platformMap[cat];
    if (info && game[info.idField]) {
      const priceObj = info.prices[game[info.idField]];
      if (priceObj) {
        const { price, discount } = priceObj;
        const finalPrice = discount > 0
          ? Math.floor(price - (price * discount / 100))
          : price;
        const sizeVal = game[info.sizeField] ? `${game[info.sizeField]} گیگابایت` : "نامشخص";

        priceRows.push(`
          <div class="price-row">
            <span class="platform-label">${info.label}</span>
            ${
              discount > 0
                ? `<span class="old-price">${price.toLocaleString()} ت</span>
                   <span class="final-price">${finalPrice.toLocaleString()} ت</span>
                   <span class="discount">٪${discount}</span>`
                : `<span class="final-price">${price.toLocaleString()} ت</span>`
            }
            <span class="size">حجم: ${sizeVal}</span>
          </div>
        `);
      }
    }
  });

  // محاسبه و نمایش تاریخ انتشار
  let releaseInfo = "";
  if (game.releaseDate) {
    const releaseYear = new Date(game.releaseDate).getFullYear();
    const now = new Date().getFullYear();
    const diff = Math.floor(now - releaseYear);
    releaseInfo = `<p class="release-date">تاریخ انتشار: ${releaseYear} (${diff} سال قبل)</p>`;
  }

  // رندر محتوای کامل صفحه
  container.innerHTML = `
    <section>
      <h2>${game.title}</h2>
      <div class="meta" style="margin:.5rem 0 1rem;">
        ${game.categories.map(cat => `<span class="pill">${cat}</span>`).join('')}
        ${game.genres && game.genres.length
          ? game.genres.map(g => `<span class="pill genre">${genreNames[g] || g}</span>`).join('')
          : ''
        }
        ${game.modes && game.modes.length
          ? game.modes.map(m => `<span class="pill mode">${modeNames[m] || m}</span>`).join('')
          : ''
        }
        ${game.perspectives && game.perspectives.length
          ? game.perspectives.map(p => `<span class="pill perspective">${perspectiveNames[p] || p}</span>`).join('')
          : ''
        }
      </div>
      <p class="desc-justify">${game.description}</p>
      ${releaseInfo}
      ${priceRows.length > 0 ? `
        <div class="price-box-details">
          ${priceRows.join('')}
        </div>
      ` : ''}
    </section>

    <section style="margin-top:20px;">
      <h3>ویدیو</h3>
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);box-shadow:var(--shadow);">
        <iframe src="${game.video}" frameborder="0" allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
      </div>
    </section>

    <section style="margin-top:20px;">
      <h3>گالری تصاویر</h3>
      <div class="gallery-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px;">
        ${game.gallery.map((src, i) => `
          <img src="${src}" alt="تصویر از ${game.title}" class="gallery-img" data-idx="${i}" style="width:100%;border-radius:var(--radius);box-shadow:var(--shadow);cursor:pointer;" loading="lazy" />
        `).join('')}
      </div>
    </section>

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
