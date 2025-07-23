"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Promo */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/banner.webp"
            alt="Weekly Diamond Pass Mobile Legends"
            width={1400}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
          {/* Overlay untuk memastikan teks tetap terbaca jika gambar tidak load */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
