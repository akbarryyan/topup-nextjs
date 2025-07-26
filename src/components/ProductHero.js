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
            <div className="flex flex-col gap-4">
              <div className="flex items-end gap-6">
                {/* Game Icon/Logo */}
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  {!iconError ? (
                    <Image
                      src="/ml.webp"
                      alt="Mobile Legends Icon"
                      width={160}
                      height={160}
                      className="rounded-xl w-full h-full object-cover"
                      onError={() => setIconError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-4xl md:text-5xl lg:text-6xl">
                        ML
                      </span>
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="flex-1 pb-2">
                  <h1 className="text-md md:text-3xl lg:text-4xl font-bold text-white">
                    {gameTitle}
                  </h1>
                  <p className="text-gray-200 text-sm md:text-base lg:text-lg">
                    {gameSubtitle}
                  </p>
                </div>
              </div>

              {/* Features - Now below the image and title */}
              <div className="flex flex-wrap gap-4 md:gap-6 ml-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-yellow-400 text-[11px] md:text-base">
                      {feature.icon}
                    </span>
                    <span className="text-[11px] md:text-sm lg:text-base">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
