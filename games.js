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
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame',
    priceIdPC: 1,
    priceIdPS4: 1,
    isNew: true
  },
  {
  id: 2,
  title: "Assassin's Creed Valhalla",
  image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.jpg",
  description: "در Assassin's Creed Valhalla در نقش «ایوور»، یک جنگجوی افسانه‌ای وایکینگ، قدم به سفری حماسی برای کسب شکوه و افتخار بگذارید.\nدنیایی پویا و گسترده در انتظار شماست؛ جهانی زیبا و نفس‌گیر که در دل دوران تاریک انگلستان شکل گرفته است.\nبه سرزمین دشمنان یورش ببرید، سکونتگاه خود را گسترش دهید و قدرت سیاسی‌تان را افزایش دهید تا در نهایت جایگاهی در میان خدایان «والهالا» به دست آورید.\n\nاین بازی شما را به دنیای پرآشوب و پرخون وایکینگ‌ها می‌برد؛ جایی که هر تصمیم، سرنوشت شما و قبیله‌تان را رقم خواهد زد.\nدر نبردهای سهمگین، استراتژی و قدرت بازوی خود را بیازمایید و در دل طبیعتی خیره‌کننده، از کوهستان‌ها و رودخانه‌ها تا دشت‌های سبز انگلستان، ماجراجویی کنید.\n\nعلاوه بر نبرد، شما باید روابط سیاسی و اجتماعی خود را هوشمندانه بسازید.\nهر انتخاب شما می‌تواند اتحاد یا دشمنی جدیدی به همراه داشته باشد و مسیر داستانی متفاوتی را رقم بزند.\nگسترش قلمرو و ساخت سکونتگاه تنها بخشی از این ماجراجویی عظیم است؛ چرا که روح واقعی یک وایکینگ، در تعادل میان قدرت، شجاعت و خرد نهفته است.\n\nدر Valhalla، شما نه تنها یک جنگجو، بلکه یک رهبر و اسطوره هستید.\nاین فرصت برای شماست که میراثی جاودان خلق کنید و نام خود را در تاریخ وایکینگ‌ها و در تالار باشکوه خدایان حک کنید.",
  categories: [
    "PS4",
    "PC",
    "PS5",
    "Xbox"
  ],
  gallery: [
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8gf9.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8gfc.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8gfa.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8gfd.jpg",
    "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8gfb.jpg"
  ],
  video: "https://www.youtube.com/embed/SrwKP2iTPb8",
   priceIdPC: 2,
   priceIdPS4: 2,
   priceIdPS5: 1,
   priceIdXbox: 1,
   isNew: false
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
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame',
    priceIdPC: 3,
    priceIdPS3: 1,
    isNew: true
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
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame',
    priceIdPC: 4,
    priceIdPS2: 1,
    isNew: false
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
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame',
    priceIdPC: 5,
    priceIdXbox: 2,
    isNew: false
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
    video: 'https://www.aparat.com/video/video/embed/videohash/0MTCo/vt/frame',
    priceIdAndroid: 1,
    isNew: true
  }
];

// قیمت مخصوص هر پلتفرم
const pricesPC = {
  1: { price: 350000, discount: 10 },
  2: { price: 400000, discount: 15 },
  3: { price: 12000, discount: 0 },
  4: { price: 25000, discount: 5 },
  5: { price: 420000, discount: 20 }
};

const pricesPS4 = {
  1: { price: 500000, discount: 5 },
  2: { price: 550000, discount: 10 }
};

const pricesPS5 = {
  1: { price: 700000, discount: 0 }
};

const pricesPS3 = {
  1: { price: 18000, discount: 0 }
};

const pricesPS2 = {
  1: { price: 20000, discount: 0 }
};

const pricesXbox = {
  1: { price: 480000, discount: 8 },
  2: { price: 390000, discount: 12 }
};

const pricesAndroid = {
  1: { price: 100000, discount: 5 }
};

