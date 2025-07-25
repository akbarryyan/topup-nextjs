"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function AllProducts() {
  const [activeCategory, setActiveCategory] = useState("TopUp Games");
  const scrollContainerRef = useRef(null);

  const categories = [
    "TopUp Games",
    "Joki MLBB",
    "Joki HOK",
    "Pulsa & Data",
    "Lain-lain",
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const products = {
    "TopUp Games": [
      {
        name: "MOBILE LEGENDS",
        region: "INDONESIA",
        flag: "🇮🇩",
        image: "/ml.webp",
      },
      {
        name: "MOBILE LEGENDS",
        region: "GLOBAL",
        flag: "🌍",
        image: "/ml.webp",
      },
      {
        name: "MOBILE LEGENDS",
        region: "NON SEA",
        flag: "🌐",
        image: "/ml.webp",
      },
      {
        name: "MOBILE LEGENDS",
        region: "PHILIPPINES",
        flag: "🇵🇭",
        image: "/ml.webp",
      },
      {
        name: "MOBILE LEGENDS",
        region: "RUSSIA",
        flag: "🇷🇺",
        image: "/ml.webp",
      },
      {
        name: "FREE FIRE",
        region: "INDONESIA",
        flag: "🇮🇩",
        image: "/ff.webp",
      },
      {
        name: "VALORANT",
        region: "GLOBAL",
        flag: "🌍",
        image: "/ff.webp",
      },
      {
        name: "PUBG MOBILE",
        region: "INDONESIA",
        flag: "🇮🇩",
        image: "/ff.webp",
      },
    ],
    "Joki MLBB": [
      {
        name: "JOKI RANK",
        region: "WARRIOR - EPIC",
        flag: "⚔️",
        image: "/ml.webp",
      },
      {
        name: "JOKI RANK",
        region: "LEGEND - MYTHIC",
        flag: "🏆",
        image: "/ml.webp",
      },
      {
        name: "JOKI CLASSIC",
        region: "WIN RATE BOOST",
        flag: "📈",
        image: "/ml.webp",
      },
    ],
    "Joki HOK": [
      {
        name: "JOKI RANK HOK",
        region: "BRONZE - GOLD",
        flag: "🥉",
        image: "/ff.webp",
      },
      {
        name: "JOKI RANK HOK",
        region: "PLATINUM - DIAMOND",
        flag: "💎",
        image: "/ff.webp",
      },
    ],
    "Pulsa & Data": [
      {
        name: "TELKOMSEL",
        region: "PULSA & PAKET DATA",
        flag: "📱",
        image: "/ff.webp",
      },
      {
        name: "INDOSAT",
        region: "PULSA & PAKET DATA",
        flag: "📱",
        image: "/ff.webp",
      },
      {
        name: "XL AXIATA",
        region: "PULSA & PAKET DATA",
        flag: "📱",
        image: "/ff.webp",
      },
    ],
    "Lain-lain": [
      {
        name: "STEAM WALLET",
        region: "GLOBAL",
        flag: "🎮",
        image: "/ff.webp",
      },
      {
        name: "GOOGLE PLAY",
        region: "GIFT CARD",
        flag: "🎁",
        image: "/ff.webp",
      },
    ],
  };

  return (
    <section className="pb-8 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="relative flex items-center">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
              style={{ transform: "translateX(-50%)" }}
            >
              <svg
                className="w-4 h-4"
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

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-0 mx-8"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-orange-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
              style={{ transform: "translateX(50%)" }}
            >
              <svg
                className="w-4 h-4"
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
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
          {products[activeCategory]?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-gray-800 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
        {/* Background Image */}
        <div className="aspect-[3/4] md:aspect-[4/5] relative">
          <Image
            src={product.image}
            alt={`${product.image} ${product.region}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
