// گرفتن شناسه بازی از URL
const params = new URLSearchParams(window.location.search);
const gameId = parseInt(params.get('id'), 10);

// پیدا کردن بازی
const game = games.find(g => g.id === gameId);
const container = document.getElementById('detailsContent');

if (!game) {
  container.innerHTML = `<p class="empty">بازی مورد نظر پیدا نشد.</p>`;
  container.setAttribute('aria-busy', 'false');
} else {
  container.innerHTML = `
    <section>
      <h2>${game.title}</h2>
      <p>${game.description}</p>
    </section>

    <section style="margin-top:20px;">
      <h3>ویدیو</h3>
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius);box-shadow:var(--shadow);">
        <iframe src="${game.video}" frameborder="0" allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;">
        </iframe>
      </div>
    </section>

    <section style="margin-top:20px;">
      <h3>گالری تصاویر</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px;">
        ${game.gallery.map(src => `
          <img src="${src}" alt="تصویر از ${game.title}" style="width:100%;border-radius:var(--radius);box-shadow:var(--shadow);" loading="lazy" />
        `).join('')}
      </div>
    </section>
  `;
  container.setAttribute('aria-busy', 'false');
}
