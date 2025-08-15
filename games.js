// لیست بازیها با پشتیبانی از چند دستهبندی
// هر بازی میتواند چند دسته داشته باشد
const games = [
  {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    image: 'https://par30games.net/wp-content/uploads/2018/03/A-Way-Out-PC-Game.jpg',
    description: 'یک بازی نقشآفرینی جهانباز با داستانی عمیق و محیطهای متنوع، ساخته CD Projekt Red.',
    categories: ['PC', 'PS4'],
    gallery: [
      'https://par30games.net/wp-content/uploads/2018/03/A-Way-Out-PC-Game.jpg',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  },
  {
    id: 2,
    title: 'God of War (208)',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4azn.jpg',
    description: 'اکشن ماجراجویی محبوب با روایت داستانی قدرتمند.',
    categories: ['PS4', 'PC'],
    gallery: [
      'https://images.igdb.com/igdb/image/upload/t_cover_big/co4azn.jpg'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  },
  {
    id: 3,
    title: 'PES 2013',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200',
    description: 'شبیهساز فوتبال کلاسیک محبوب روی کنسولهای قدیمیتر.',
    categories: ['PS3', 'PC'],
    gallery: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  },
  {
    id: 4,
    title: 'GTA: San Andreas',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
    description: 'اکشن ماجرایی جهانباز خاطرهانگیز.',
    categories: ['PS2', 'PC'],
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  },
  {
    id: 5,
    title: 'Forza Horizon 4',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200',
    description: 'مسابقهای جهانباز با فصول پویا.',
    categories: ['Xbox', 'PC'],
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  },
  {
    id: 6,
    title: 'PUBG Mobile',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200',
    description: 'بتلرویال محبوب روی اندروید.',
    categories: ['Android'],
    gallery: [
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200'
    ],
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame'
  }
];

