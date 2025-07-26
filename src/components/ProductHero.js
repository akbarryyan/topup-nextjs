"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductHero({
  bannerImage,
  gameTitle,
  gameSubtitle,
  features,
}) {
  const [iconError, setIconError] = useState(false);
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src={bannerImage}
          alt={`${gameTitle} Banner`}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              {/* Game Icon/Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                {!iconError ? (
                  <Image
                    src="/ml.webp"
                    alt="Mobile Legends Icon"
                    width={64}
                    height={64}
                    className="rounded-lg"
                    onError={() => setIconError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">ML</span>
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {gameTitle}
                </h1>
                <p className="text-gray-300 text-sm md:text-base mb-3">
                  {gameSubtitle}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-white"
                    >
                      <span className="text-yellow-400">{feature.icon}</span>
                      <span className="text-xs md:text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
