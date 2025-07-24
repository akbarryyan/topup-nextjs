"use client";

import Image from "next/image";
import { useState } from "react";

export default function AllProducts() {
  const [activeCategory, setActiveCategory] = useState("TopUp Games");

  const categories = [
    "TopUp Games",
    "Joki MLBB",
    "Joki HOK",
    "Pulsa & Data",
    "Lain-lain",
  ];

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
    <section className="py-16 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Semua Produk</h2>
          <p className="text-gray-400 text-lg">
            Pilih kategori produk yang Anda inginkan
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-orange-500 text-white border-b-2 border-orange-500"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
      <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
        {/* Background Image */}
        <div className="aspect-[4/5] relative">
          <Image
            src={product.image}
            alt={`${product.name} ${product.region}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Logo/Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.name.includes("MOBILE LEGENDS")
                ? "ML"
                : product.name.includes("FREE FIRE")
                ? "FF"
                : product.name.includes("JOKI")
                ? "JOKI"
                : product.name.includes("TELKOMSEL")
                ? "TSEL"
                : product.name.includes("INDOSAT")
                ? "ISAT"
                : product.name.includes("XL")
                ? "XL"
                : "TOP"}
            </div>
          </div>

          {/* PI TOPUP Watermark */}
          <div className="absolute top-4 right-4">
            <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              PI TOPUP
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Product Name */}
            <div className="mb-2">
              <div className="text-orange-500 font-bold text-sm leading-tight">
                {product.name}
              </div>
            </div>

            {/* Region/Category Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm">{product.flag}</span>
                <span className="text-white font-medium text-xs">
                  {product.region}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
