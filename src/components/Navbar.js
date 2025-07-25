"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-[#1C1D1F] text-white relative">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/logo.webp" alt="Logo" width={140} height={32} />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-full leading-5 text-white placeholder-gray-500 placeholder:text-[14px] bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden md:flex items-center space-x-2 border border-gray-600 rounded-full px-3 py-2">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-2"
                      : "translate-y-0"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "-rotate-45 translate-y-2"
                      : "translate-y-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden md:block">
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#1C1D1F] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Image src="/logo.webp" alt="Logo" width={120} height={28} />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-700">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-full leading-5 text-white placeholder-gray-500 placeholder:text-[14px] bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="flex-1 py-4">
            <MobileNavItem
              icon="⭐"
              text="Top up"
              active={true}
              onClick={toggleMobileMenu}
            />
            <MobileNavItem
              icon="📋"
              text="Cek Pesanan"
              onClick={toggleMobileMenu}
            />
            <MobileNavItem icon="📰" text="Berita" onClick={toggleMobileMenu} />
            <MobileNavItem
              icon="🧮"
              text="Kalkulator"
              onClick={toggleMobileMenu}
            />
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-gray-700 space-y-4">
            {/* Language Selector */}
            <div className="flex items-center justify-center space-x-2 border border-gray-600 rounded-full px-3 py-2">
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

            {/* Login Button */}
            <button className="w-full flex items-center justify-center space-x-1.5 text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-600">
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Masuk</span>
            </button>
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

function MobileNavItem({ icon, text, active = false, onClick }) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors hover:bg-gray-800 ${
        active
          ? "text-yellow-500 bg-gray-800 border-r-4 border-yellow-500"
          : "text-gray-300 hover:text-white"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </a>
  );
}
