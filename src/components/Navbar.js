"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-[#1C1D1F] text-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo.webp" alt="Logo" width={140} height={32} />
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari Kategori di sini"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-full leading-5 text-white placeholder-gray-500 placeholder:text-[14px]"
              />
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 border border-gray-600 rounded-full px-3 py-2">
            <div className="flex items-center space-x-1">
              <Image
                src="/flag-indonesia.png"
                alt="Indonesia Flag"
                width={20}
                height={15}
                className="rounded-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="text-sm font-medium">ID</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Menu Items */}
            <div className="flex items-center space-x-8">
              <NavItem icon="⭐" text="Top up" active={true} />
              <NavItem icon="📋" text="Cek Pesanan" />
              <NavItem icon="📰" text="Berita" />
              <NavItem icon="🧮" text="Kalkulator" />
            </div>

            {/* Login Button */}
            <div className="py-3">
              <button className="flex items-center space-x-1.5 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-[14px] font-light text-gray-300">
                  Masuk
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, text, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-2 py-3 px-2 border-b-2 transition-colors ${
        active
          ? "border-yellow-500 text-yellow-500"
          : "border-transparent font-light text-gray-300 hover:text-white hover:border-gray-300"
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </a>
  );
}
