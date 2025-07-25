"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function News() {
  const [currentNews, setCurrentNews] = useState(0);
  const intervalRef = useRef(null);

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

  // Auto-slide function
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        setCurrentNews((prev) => (prev + 1) % newsData.length);
      }, 4000); // Auto-slide every 4 seconds
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [newsData.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentNews((prev) => (prev - 1 + newsData.length) % newsData.length);
    // Reset auto-slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsData.length);
    }, 4000);
  };

  const goToNext = () => {
    setCurrentNews((prev) => (prev + 1) % newsData.length);
    // Reset auto-slide timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsData.length);
    }, 4000);
  };

  return (
    <section className="py-12 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
            Berita Terbaru
          </h2>
          <p className="text-gray-400 text-md max-w-2xl mx-auto">
            Dapatkan informasi terkini seputar game, promo, dan tips menarik
            dari kami
          </p>
        </div>

        {/* News Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* News Card Container */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentNews * 100}%)` }}
            >
              {newsData.map((news, index) => (
                <div key={news.id} className="w-full flex-shrink-0">
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {newsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentNews(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentNews
                  ? "bg-orange-500"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
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
        <div className="relative aspect-[16/10] overflow-hidden">
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
        <div className="p-5">
          {/* Date */}
          <p className="text-gray-400 text-sm mb-2">{news.date}</p>

          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
            {news.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
            {news.excerpt}
          </p>

          {/* Read More */}
          <div>
            <span className="text-orange-500 font-medium text-sm group-hover:text-orange-400 transition-colors duration-300">
              Baca Selengkapnya →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
