"use client";

import Image from "next/image";

export default function News() {
  const newsData = [
    {
      id: 1,
      title: "Mobile Legends Bang Bang Update Terbaru - Hero Baru Sudah Rilis!",
      excerpt:
        "Hero baru dengan kemampuan unik telah hadir di Mobile Legends. Jangan lewatkan event spesial untuk mendapatkan skin gratis.",
      image: "/ml.webp",
      date: "26 Juli 2025",
      category: "Game Update",
    },
    {
      id: 2,
      title: "Free Fire OB42 Update - Mode Baru dan Senjata Legendaris",
      excerpt:
        "Update besar Free Fire membawa mode permainan baru, senjata legendaris, dan berbagai perbaikan gameplay yang menarik.",
      image: "/ff.webp",
      date: "25 Juli 2025",
      category: "Game Update",
    },
    {
      id: 3,
      title: "Promo Spesial TopUp Bulan Ini - Dapatkan Bonus Hingga 50%!",
      excerpt:
        "Jangan lewatkan promo topup spesial bulan ini. Dapatkan bonus diamond dan UC dengan pembelian minimum tertentu.",
      image: "/ml.webp",
      date: "24 Juli 2025",
      category: "Promo",
    },
    {
      id: 4,
      title: "Tips Joki Rank Mobile Legends - Cara Cepat Naik ke Mythic",
      excerpt:
        "Panduan lengkap untuk naik rank dengan cepat di Mobile Legends. Strategi meta terbaru dan hero recommendation.",
      image: "/ff.webp",
      date: "23 Juli 2025",
      category: "Tips & Tricks",
    },
  ];

  return (
    <section className="py-16 bg-[#1C1D1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Berita Terbaru
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dapatkan informasi terkini seputar game, promo, dan tips menarik
            dari kami
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
}

function NewsCard({ news }) {
  return (
    <article className="group cursor-pointer">
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
        {/* News Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </span>
          </div>
        </div>

        {/* News Content */}
        <div className="p-6">
          {/* Date */}
          <p className="text-gray-400 text-sm mb-3">{news.date}</p>

          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
            {news.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {news.excerpt}
          </p>

          {/* Read More */}
          <div className="mt-4">
            <span className="text-orange-500 font-medium text-sm group-hover:text-orange-400 transition-colors duration-300">
              Baca Selengkapnya →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
