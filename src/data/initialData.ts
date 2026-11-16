import { DatabaseStore } from "@/types";

export const initialData: DatabaseStore = {
  cafeSettings: {
  "id": 1,
  "cafeName": "Rindang Teduh Warkop",
  "tagline": "Teduh Bernaung, Hangat Berbincang",
  "storyTitle": "Lebih Dari Sekadar Tempat Duduk & Kopi",
  "storyText": "Rindang Teduh lahir dari kerinduan akan ruang santai yang bersahaja namun berkarakter. Di tengah kesibukan perkuliahan dan padatnya kota, kami menyediakan kanopi alami untuk bertukar pikiran, mengerjakan proyek kreatif, atau menikmati hangatnya obrolan bersama teman.",
  "features": [
    "🌿 Ruang Terbuka Hijau",
    "☕ Kopi & Kudapan Lokal",
    "📱 Akses Menu NFC & QR",
    "👥 Area Diskusi Komunitas",
    "🪑 Kapasitas Hingga 80 Kursi"
  ],
  "address": "Jl. Srengseng Sawah No.17, Jagakarsa (Kawasan Kampus Politeknik Negeri Media Kreatif), Jakarta Selatan 12640.",
  "mapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.317548918237!2d106.8249673!3d-6.3529245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec3e5f2cf2e7%3A0x6b696f8c7df94676!2sPoliteknik%20Negeri%20Media%20Kreatif!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  "mapsLinkUrl": "https://maps.app.goo.gl/yXfpphxU1FUZXYPr7",
  "instagramUrl": "https://www.instagram.com/rindangteduh_/",
  "whatsappNumber": "+6281234567890",
  "operatingHours": {
    "weekday": "08:00 - 22:00 WIB",
    "weekend": "09:00 - 23:00 WIB",
    "isOpenToday": true
  },
  "heroImageUrl": "/images/rindang-teduh-hero.jpg",
  "heroCaptionTitle": "Suasana Teduh & Semilir Angin Senja",
  "heroCaptionDesc": "Dikelilingi pepohonan rindang dengan pencahayaan hangat saat malam tiba.",
  "updatedAt": "2026-11-14T10:39:39.663Z"
},

  menuCategories: [
  {
    "id": "cat-coffee-beans",
    "name": "Coffee Beans",
    "slug": "coffee-beans",
    "sortOrder": 1,
    "isActive": true
  },
  {
    "id": "cat-special-drinks",
    "name": "Special Drinks",
    "slug": "special-drinks",
    "sortOrder": 2,
    "isActive": true
  },
  {
    "id": "cat-snacks",
    "name": "Snacks",
    "slug": "snacks",
    "sortOrder": 3,
    "isActive": true
  },
  {
    "id": "cat-makanan-utama",
    "name": "Makanan Utama",
    "slug": "makanan-utama",
    "sortOrder": 4,
    "isActive": true
  }
],

  menuItems: [
  {
    "id": "item-1",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Latte",
    "name": "Aren Latte",
    "description": "",
    "price": 19000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": true,
    "sortOrder": 1,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "FAVORIT",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-2",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Latte",
    "name": "Dirty Matcha Latte",
    "description": "",
    "price": 19000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 2,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-3",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Latte",
    "name": "Cafe Latte",
    "description": "",
    "price": 18000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 3,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-4",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Latte",
    "name": "Spanish Latte",
    "description": "",
    "price": 18000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 4,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-5",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Latte",
    "name": "Cappucino",
    "description": "",
    "price": 18000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 5,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-6",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Black",
    "name": "Americano",
    "description": "",
    "price": 16000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 6,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-7",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Black",
    "name": "Espresso",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 7,
    "tempOptions": [
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-8",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Black",
    "name": "Add Extra Shoot",
    "description": "",
    "price": 6000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 8,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-9",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Nescafe, Liong, Kapal Api",
    "description": "",
    "price": 7000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 9,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-10",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Luwak White Coffee",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 10,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-11",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Indocafe Coffeemix",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 11,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-12",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "ABC Mocca",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 12,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-13",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "ABC Klepon",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 13,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-14",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Goodday Cappucino",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 14,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-15",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Goodday Freeze",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 15,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-16",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Chocolatos",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 16,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-17",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Chocolatos Matcha",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 17,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-18",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Beng Beng Drink",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 18,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-19",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Milo",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 19,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-20",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Ovaltine",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 20,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-21",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Dancow",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 21,
    "tempOptions": [
      "Panas (Hot)",
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-22",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Nutrisari",
    "description": "",
    "price": 7000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 22,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-23",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Jahe",
    "description": "",
    "price": 7000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 23,
    "tempOptions": [
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-24",
    "categoryId": "cat-coffee-beans",
    "subcategory": "Lain-lain",
    "name": "Air Mineral",
    "description": "",
    "price": 5000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 24,
    "tempOptions": [
      "Dingin (Es)",
      "Normal"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-25",
    "categoryId": "cat-special-drinks",
    "subcategory": "Cheese Drink",
    "name": "Blueberry Cheese Drink",
    "description": "",
    "price": 11000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 25,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-26",
    "categoryId": "cat-special-drinks",
    "subcategory": "Cheese Drink",
    "name": "Strawberry Cheese Drink",
    "description": "",
    "price": 11000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 26,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-27",
    "categoryId": "cat-special-drinks",
    "subcategory": "Cheese Drink",
    "name": "Chocolate Cheese Drink",
    "description": "",
    "price": 11000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 27,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-28",
    "categoryId": "cat-special-drinks",
    "subcategory": "Yogurt Drink",
    "name": "Lychee Yogurt",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 28,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-29",
    "categoryId": "cat-special-drinks",
    "subcategory": "Yogurt Drink",
    "name": "Strawberry Yogurt",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 29,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-30",
    "categoryId": "cat-special-drinks",
    "subcategory": "Yogurt Drink",
    "name": "Mango Yogurt",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 30,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-31",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Thai Tea",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 31,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-32",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Teh Tarik",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 32,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-33",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Lemon Tea",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 33,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-34",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Lychee Tea",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 34,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-35",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Teh Poci",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 35,
    "tempOptions": [
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-36",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Teh Manis",
    "description": "",
    "price": 6000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 36,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-37",
    "categoryId": "cat-special-drinks",
    "subcategory": "Tea",
    "name": "Teh Tawar",
    "description": "",
    "price": 3000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 37,
    "tempOptions": [
      "Dingin (Es)",
      "Panas (Hot)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-38",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Soda Susu",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 38,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-39",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Fanta Susu",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 39,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-40",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Coffee Beer",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 40,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-41",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Temulawak",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 41,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-42",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Sarsaparilla",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 42,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-43",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Banteng",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 43,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-44",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Extra Joss",
    "description": "",
    "price": 8000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 44,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-45",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Kuku Bima",
    "description": "",
    "price": 7000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 45,
    "tempOptions": [
      "Dingin (Es)"
    ],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-46",
    "categoryId": "cat-special-drinks",
    "subcategory": "Soda",
    "name": "Extra Susu",
    "description": "",
    "price": 2000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 46,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-47",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "French Fries",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 47,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-48",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Otak-Otak",
    "description": "",
    "price": 9000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 48,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-49",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Cireng",
    "description": "",
    "price": 9000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 49,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-50",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Mixed Platter",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 50,
    "tempOptions": [],
    "badge": "FAVORIT",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-51",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Tahu Bakso",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 51,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-52",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Dimsum Chili Oil",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 52,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-53",
    "categoryId": "cat-snacks",
    "subcategory": "Snack's",
    "name": "Dimsum Kuah Creamy",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 53,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-54",
    "categoryId": "cat-snacks",
    "subcategory": "Pancong",
    "name": "Pancong Ori",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 54,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-55",
    "categoryId": "cat-snacks",
    "subcategory": "Pancong",
    "name": "Pancong Coklat",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 55,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-56",
    "categoryId": "cat-snacks",
    "subcategory": "Pancong",
    "name": "Pancong Keju",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 56,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-57",
    "categoryId": "cat-snacks",
    "subcategory": "Pancong",
    "name": "Pancong Coklat Keju",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 57,
    "tempOptions": [],
    "badge": "FAVORIT",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-58",
    "categoryId": "cat-snacks",
    "subcategory": "Roti Bakar",
    "name": "Roti Bakar Coklat",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 58,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-59",
    "categoryId": "cat-snacks",
    "subcategory": "Roti Bakar",
    "name": "Roti Bakar Keju",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 59,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-60",
    "categoryId": "cat-snacks",
    "subcategory": "Roti Bakar",
    "name": "Roti Bakar Coklat Keju",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 60,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-61",
    "categoryId": "cat-snacks",
    "subcategory": "Pisang Bakar",
    "name": "Pisang Bakar Coklat",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 61,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-62",
    "categoryId": "cat-snacks",
    "subcategory": "Pisang Bakar",
    "name": "Pisang Bakar Keju",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 62,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-63",
    "categoryId": "cat-snacks",
    "subcategory": "Pisang Bakar",
    "name": "Pisang Bakar Coklat Keju",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 63,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-64",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Polos",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 64,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-65",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Telur",
    "description": "",
    "price": 12000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 65,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-66",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Telur Sosis",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 66,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-67",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Telur Keju",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 67,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-68",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Spesial",
    "description": "",
    "price": 17000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": true,
    "sortOrder": 68,
    "tempOptions": [],
    "badge": "SPESIAL",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-69",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Double Polos",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 69,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-70",
    "categoryId": "cat-snacks",
    "subcategory": "Mie Instant",
    "name": "Mi Rebus / Goreng Double Telur",
    "description": "",
    "price": 17000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 70,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-71",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Nasi Goreng",
    "name": "Nasi Goreng Polos",
    "description": "",
    "price": 11000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 71,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-72",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Nasi Goreng",
    "name": "Nasi Goreng Telur",
    "description": "",
    "price": 13000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 72,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-73",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Nasi Goreng",
    "name": "Nasi Goreng Katsu",
    "description": "",
    "price": 16000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 73,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-74",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Nasi Goreng",
    "name": "Nasi Goreng Combo",
    "description": "",
    "price": 16000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": true,
    "sortOrder": 74,
    "tempOptions": [],
    "badge": "TERLARIS",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-75",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Kwetiau",
    "name": "Kwetiau Polos",
    "description": "",
    "price": 11000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 75,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-76",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Kwetiau",
    "name": "Kwetiau Katsu",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 76,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-77",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Ayam Geprek",
    "name": "Ayam Geprek",
    "description": "",
    "price": 16000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 77,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-78",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Spaghetti",
    "name": "Spaghetti Bolognaise Original",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 78,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-79",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Spaghetti",
    "name": "Spaghetti Bolognaise Katsu",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 79,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-80",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Spaghetti",
    "name": "Spaghetti Carbonara Original",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 80,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-81",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Spaghetti",
    "name": "Spaghetti Carbonara Katsu",
    "description": "",
    "price": 15000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 81,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-82",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Rice Bowl",
    "name": "Nasi Telur",
    "description": "",
    "price": 10000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 82,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-83",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Rice Bowl",
    "name": "Nasi Nugget Sosis",
    "description": "",
    "price": 14000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 83,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  },
  {
    "id": "item-84",
    "categoryId": "cat-makanan-utama",
    "subcategory": "Rice Bowl",
    "name": "Nasi Combo",
    "description": "",
    "price": 16000,
    "imageUrl": "",
    "isAvailable": true,
    "isFeatured": false,
    "sortOrder": 84,
    "tempOptions": [],
    "badge": "",
    "updatedAt": "2026-11-16T09:09:00.412Z"
  }
],

  reservationRules: {
  "id": 1,
  "isBookingOpen": true,
  "minGuests": 5,
  "maxGuests": 80,
  "overCapacityMode": "WARNING",
  "overCapacityNote": "Kapasitas kursi melebihi batas standar (80 orang). Pengajuan tetap kami terima, tim kami akan mengonfirmasi kesiapan kursi tambahan & layout meja via DM Instagram.",
  "pricePerPerson": 25000,
  "pricePerHour": 50000,
  "baseFee": 0,
  "availableDurations": [
    2,
    3,
    4
  ],
  "availableTimeSlots": [
    "10:00 WIB (Pagi)",
    "14:00 WIB (Siang/Sore)",
    "16:00 WIB (Sore)",
    "19:00 WIB (Malam)"
  ],
  "termsAndConditions": [
    "1. Pengajuan reservasi wajib diajukan minimal H-2 sebelum kegiatan.",
    "2. Pembatalan tanpa biaya dapat dilakukan hingga H-1.",
    "3. Fasilitas mencakup area kursi terpusat, sound standar, dan akses colokan listrik.",
    "4. Dilarang membawa makanan berat dari luar tanpa izin pengelola."
  ],
  "updatedAt": "2026-11-14T10:39:39.668Z"
},

  reservations: [
  {
    "id": "res-1794802842316",
    "bookingCode": "RT-2611-004",
    "customerName": "Ahmad Rizky (Komunitas Sastra)",
    "customerPhone": "+62 812-3456-7890",
    "bookingDate": "2026-11-16",
    "bookingTime": "14:00 WIB (Siang/Sore)",
    "durationHours": 3,
    "guestCount": 30,
    "estimatedPrice": 900000,
    "customerNotes": "Perlu 2 colokan listrik tambahan dan proyektor portable untuk presentasi.",
    "status": "PENDING",
    "privacyConsent": true,
    "createdAt": "2026-11-16T04:20:42.316Z"
  },
  {
    "id": "res-1794652843924",
    "bookingCode": "RT-2611-003",
    "customerName": "Budi Hartono",
    "customerPhone": "+6281987654321",
    "bookingDate": "2026-11-20",
    "bookingTime": "14:00 WIB",
    "durationHours": 3,
    "guestCount": 25,
    "estimatedPrice": 775000,
    "customerNotes": "Ruang kanopi outdoor",
    "status": "REJECTED",
    "privacyConsent": true,
    "createdAt": "2026-11-14T10:40:43.924Z",
    "processedBy": "Budi (Kasir Warkop)"
  },
  {
    "id": "res-1",
    "bookingCode": "RT-2611-042",
    "customerName": "Ahmad Rizky (Komunitas Sastra)",
    "customerPhone": "+62 812-3456-7890",
    "bookingDate": "2026-11-15",
    "bookingTime": "14:00 WIB",
    "durationHours": 3,
    "guestCount": 30,
    "estimatedPrice": 900000,
    "customerNotes": "Perlu 2 colokan listrik tambahan dan proyektor portable untuk presentasi.",
    "status": "REJECTED",
    "privacyConsent": true,
    "createdAt": "2026-11-10T08:30:00.000Z",
    "processedBy": "Budi (Kasir Warkop)"
  },
  {
    "id": "res-2",
    "bookingCode": "RT-2611-038",
    "customerName": "Siti Nurhaliza (BEM Polimedia)",
    "customerPhone": "+62 813-9876-5432",
    "bookingDate": "2026-11-12",
    "bookingTime": "16:00 WIB",
    "durationHours": 2,
    "guestCount": 20,
    "estimatedPrice": 600000,
    "customerNotes": "Rapat koordinasi festival kampus, mohon area kanopi tengah.",
    "status": "CONFIRMED",
    "privacyConsent": true,
    "createdAt": "2026-11-08T11:00:00.000Z",
    "processedBy": "Owner"
  }
],

  activityLogs: [
  {
    "id": "log-1794813974783-784",
    "userName": "Hisyam (Developer)",
    "userRole": "DEVELOPER",
    "actionType": "LOGOUT",
    "description": "Pengguna Hisyam (Developer) keluar dari sistem (logout).",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0",
    "createdAt": "2026-11-16T07:26:14.783Z"
  },
  {
    "id": "log-1794813913376-939",
    "userName": "Hisyam (Developer)",
    "userRole": "DEVELOPER",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai DEVELOPER.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0",
    "createdAt": "2026-11-16T07:25:13.376Z"
  },
  {
    "id": "log-1794802842316-242",
    "userName": "Ahmad Rizky (Komunitas Sastra)",
    "userRole": "PUBLIC",
    "actionType": "RESERVATION_CREATE",
    "description": "Pengajuan reservasi baru [RT-2611-004] (30 orang).",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36 Edg/157.0.0.0",
    "createdAt": "2026-11-16T04:20:42.316Z"
  },
  {
    "id": "log-1794660965240-670",
    "userName": "Muhammad Dailami (Manajemen)",
    "userRole": "MANAGEMENT",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai MANAGEMENT.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36",
    "createdAt": "2026-11-14T12:56:05.240Z"
  },
  {
    "id": "log-1794660708991-318",
    "userName": "Muhammad Dailami (Manajemen)",
    "userRole": "MANAGEMENT",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai MANAGEMENT.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456",
    "createdAt": "2026-11-14T12:51:48.991Z"
  },
  {
    "id": "log-1794660353332-942",
    "userName": "Staf",
    "userRole": "STAFF",
    "actionType": "LOGOUT",
    "description": "Pengguna Staf keluar dari sistem (logout).",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36",
    "createdAt": "2026-11-14T12:45:53.332Z"
  },
  {
    "id": "log-1794659808766-406",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "LOGOUT",
    "description": "Pengguna Agus (Owner) keluar dari sistem (logout).",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36",
    "createdAt": "2026-11-14T12:36:48.766Z"
  },
  {
    "id": "log-1794658068564-854",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai OWNER.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36",
    "createdAt": "2026-11-14T12:07:48.564Z"
  },
  {
    "id": "log-1794655786256-980",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai OWNER.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456",
    "createdAt": "2026-11-14T11:29:46.256Z"
  },
  {
    "id": "log-1794655671261-292",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai OWNER.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456",
    "createdAt": "2026-11-14T11:27:51.261Z"
  },
  {
    "id": "log-1794655656166-784",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "LOGIN_SUCCESS",
    "description": "Pengguna berhasil login sebagai OWNER.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456",
    "createdAt": "2026-11-14T11:27:36.166Z"
  },
  {
    "id": "log-1794655650665-538",
    "userName": "owner@rindangteduh.com",
    "userRole": "GUEST",
    "actionType": "LOGIN_FAILED",
    "description": "Percobaan login gagal untuk email 'owner@rindangteduh.com'.",
    "ipAddress": "::1",
    "userAgent": "Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.19041.6456",
    "createdAt": "2026-11-14T11:27:30.665Z"
  },
  {
    "id": "log-1794653461273-701",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "STOCK_TOGGLE",
    "description": "Mengubah stok 'Kopi Tubruk Polimedia' menjadi Tersedia.",
    "createdAt": "2026-11-14T10:51:01.273Z"
  },
  {
    "id": "log-1794653180257-983",
    "userName": "Budi (Kasir Warkop)",
    "userRole": "CASHIER",
    "actionType": "RESERVATION_STATUS_CHANGE",
    "description": "Mengubah status reservasi [RT-2611-042] dari PENDING menjadi REJECTED.",
    "createdAt": "2026-11-14T10:46:20.257Z"
  },
  {
    "id": "log-1794653179374-523",
    "userName": "Budi (Kasir Warkop)",
    "userRole": "CASHIER",
    "actionType": "RESERVATION_STATUS_CHANGE",
    "description": "Mengubah status reservasi [RT-2611-003] dari PENDING menjadi REJECTED.",
    "createdAt": "2026-11-14T10:46:19.374Z"
  },
  {
    "id": "log-1794653174101-181",
    "userName": "Budi (Kasir Warkop)",
    "userRole": "CASHIER",
    "actionType": "STOCK_TOGGLE",
    "description": "Mengubah stok 'Kopi Tubruk Polimedia' menjadi Habis.",
    "createdAt": "2026-11-14T10:46:14.101Z"
  },
  {
    "id": "log-1794652843924-859",
    "userName": "Pengunjung",
    "userRole": "PUBLIC",
    "actionType": "RESERVATION_CREATE",
    "description": "Pengajuan reservasi baru [RT-2611-003] oleh Budi Hartono (25 orang).",
    "createdAt": "2026-11-14T10:40:43.924Z"
  },
  {
    "id": "log-1794652834236-663",
    "userName": "Kasir",
    "userRole": "CASHIER",
    "actionType": "STOCK_TOGGLE",
    "description": "Mengubah stok 'Pisang Bakar Cokelat Keju' menjadi Habis.",
    "createdAt": "2026-11-14T10:40:34.236Z"
  },
  {
    "id": "log-1794652822439-337",
    "userName": "Kasir",
    "userRole": "CASHIER",
    "actionType": "STOCK_TOGGLE",
    "description": "Mengubah stok 'Pisang Bakar Cokelat Keju' menjadi Tersedia.",
    "createdAt": "2026-11-14T10:40:22.439Z"
  },
  {
    "id": "log-2",
    "userId": "usr-cashier",
    "userName": "Budi (Kasir Warkop)",
    "userRole": "CASHIER",
    "actionType": "STOCK_UPDATE",
    "description": "Mengubah stok menu 'Pisang Bakar Cokelat Keju' menjadi Habis.",
    "createdAt": "2026-11-10T14:15:00.000Z"
  },
  {
    "id": "log-1",
    "userId": "usr-owner",
    "userName": "Agus (Owner)",
    "userRole": "OWNER",
    "actionType": "SYSTEM_INIT",
    "description": "Inisialisasi sistem database Rindang Teduh Web & CMS v1.0.",
    "createdAt": "2026-11-09T03:00:00.000Z"
  }
],

  users: [
  {
    "id": "usr-owner",
    "email": "owner@rindangteduh.com",
    "fullName": "Agus (Owner)",
    "role": "OWNER",
    "isActive": true,
    "password": "password123",
    "lastLoginAt": "2026-11-14T12:07:48.564Z"
  },
  {
    "id": "usr-mgmt",
    "email": "dailami@rindangteduh.com",
    "fullName": "Muhammad Dailami (Manajemen)",
    "role": "MANAGEMENT",
    "isActive": true,
    "password": "password123",
    "lastLoginAt": "2026-11-14T12:56:05.240Z"
  },
  {
    "id": "usr-cashier",
    "email": "kasir@rindangteduh.com",
    "fullName": "Budi (Kasir Warkop)",
    "role": "CASHIER",
    "isActive": true,
    "password": "password123"
  },
  {
    "id": "usr-dev",
    "email": "developer@rindangteduh.com",
    "fullName": "Hisyam (Developer)",
    "role": "DEVELOPER",
    "isActive": true,
    "password": "password123",
    "lastLoginAt": "2026-11-16T07:25:13.375Z"
  }
],
};
