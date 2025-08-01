"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductHero({ gameTitle, gameSubtitle, features }) {
  const [iconError, setIconError] = useState(false);

  return (
    <div className="relative">
      {/* Banner Background */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {/* Multiple gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/50 via-purple-800/30 to-pink-800/40"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-700/40 via-transparent to-violet-800/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-600/10 to-transparent"></div>
        {/* Animated decorative elements */}
        <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-40 h-40 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-yellow-400/15 to-orange-500/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-2xl"></div>
        {/* Geometric patterns */}
        <div className="absolute top-12 right-12 w-16 h-16 border border-white/10 rounded-lg rotate-12 bg-white/5 backdrop-blur-sm"></div>
        <div className="absolute bottom-24 left-16 w-12 h-12 border border-blue-400/20 rounded-full bg-blue-400/5"></div>
        {/* Main overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60"></div>{" "}
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
