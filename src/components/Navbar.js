"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] =
    useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const toggleCalculatorDropdown = () => {
    setIsCalculatorDropdownOpen(!isCalculatorDropdownOpen);
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

          {/* Right Side: Search Icon (Mobile), Language Selector, Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Icon */}
            <button
              onClick={toggleMobileSearch}
              className="md:hidden p-2 rounded-full border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              {isMobileSearchOpen ? (
                <svg
                  className="h-5 w-5"
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
              ) : (
                <svg
                  className="h-5 w-5"
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
              )}
            </button>

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
      </div>

      {/* Mobile Search Dropdown */}
      <div
        className={`md:hidden bg-[#1C1D1F] border-t border-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
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

          {/* Mobile Navigation Items */}
          <div className="flex-1 py-4">
            <MobileNavItem
              icon={
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M12.5555 5.75C12.9697 5.74889 13.3046 5.41221 13.3035 4.998C13.3024 4.58379 12.9657 4.2489 12.5515 4.25L12.5555 5.75ZM9.56153 8H10.3115V8L9.56153 8ZM8.81153 8.054C8.81153 8.46821 9.14732 8.804 9.56153 8.804C9.97575 8.804 10.3115 8.46821 10.3115 8.054H8.81153ZM8.81153 9C8.81153 9.41421 9.14732 9.75 9.56153 9.75C9.97575 9.75 10.3115 9.41421 10.3115 9H8.81153ZM10.3115 8.054C10.3115 7.63979 9.97575 7.304 9.56153 7.304C9.14732 7.304 8.81153 7.63979 8.81153 8.054H10.3115ZM9.4717 7.3094C9.06047 7.35901 8.76732 7.7326 8.81693 8.14383C8.86654 8.55506 9.24013 8.84821 9.65136 8.7986L9.4717 7.3094ZM10.5615 8L10.5524 8.75H10.5615V8ZM14.4475 8V8.75006L14.4567 8.74994L14.4475 8ZM15.3577 8.7986C15.7689 8.84821 16.1425 8.55506 16.1921 8.14383C16.2417 7.7326 15.9486 7.35901 15.5374 7.3094L15.3577 8.7986ZM9.66405 8.79737C10.0746 8.74241 10.3629 8.36503 10.3079 7.95448C10.2529 7.54393 9.87557 7.25567 9.46501 7.31063L9.66405 8.79737ZM6.56953 12L5.8485 11.7936C5.84617 11.8017 5.84398 11.8099 5.84193 11.8181L6.56953 12ZM5.56953 16L4.84193 15.8181C4.83708 15.8375 4.83302 15.857 4.82974 15.8767L5.56953 16ZM19.4335 16L20.1734 15.8772C20.1701 15.8573 20.166 15.8376 20.1611 15.8181L19.4335 16ZM18.4335 12L19.1611 11.8181C19.1592 11.8102 19.157 11.8023 19.1548 11.7944L18.4335 12ZM15.5417 7.31072C15.1312 7.25538 14.7536 7.54329 14.6983 7.95379C14.6429 8.36429 14.9308 8.74193 15.3413 8.79727L15.5417 7.31072ZM10.3115 11.62C10.3115 11.2058 9.97575 10.87 9.56153 10.87C9.14732 10.87 8.81153 11.2058 8.81153 11.62H10.3115ZM8.81153 12.5C8.81153 12.9142 9.14732 13.25 9.56153 13.25C9.97575 13.25 10.3115 12.9142 10.3115 12.5H8.81153ZM12.4555 4.25C12.0413 4.2489 11.7046 4.58379 11.7035 4.998C11.7024 5.41221 12.0373 5.74889 12.4515 5.75L12.4555 4.25ZM15.4455 8L14.6955 8V8H15.4455ZM14.6955 8.054C14.6955 8.46821 15.0313 8.804 15.4455 8.804C15.8597 8.804 16.1955 8.46821 16.1955 8.054H14.6955ZM16.1955 8.054C16.1955 7.63979 15.8597 7.304 15.4455 7.304C15.0313 7.304 14.6955 7.63979 14.6955 8.054H16.1955ZM14.6955 9C14.6955 9.41421 15.0313 9.75 15.4455 9.75C15.8597 9.75 16.1955 9.41421 16.1955 9H14.6955ZM16.1955 11.621C16.1955 11.2068 15.8597 10.871 15.4455 10.871C15.0313 10.871 14.6955 11.2068 14.6955 11.621H16.1955ZM14.6955 12.5C14.6955 12.9142 15.0313 13.25 15.4455 13.25C15.8597 13.25 16.1955 12.9142 16.1955 12.5H14.6955ZM12.5515 4.25C10.4844 4.25552 8.81153 5.93283 8.81153 8L10.3115 8C10.3115 6.7597 11.3152 5.7533 12.5555 5.75L12.5515 4.25ZM8.81153 8V8.054H10.3115V8H8.81153ZM10.3115 9V8.054H8.81153V9H10.3115ZM9.65136 8.7986C9.95031 8.76253 10.2513 8.74628 10.5524 8.74994L10.5707 7.25006C10.2034 7.24559 9.83631 7.26541 9.4717 7.3094L9.65136 8.7986ZM10.5615 8.75H14.4475V7.25H10.5615V8.75ZM14.4567 8.74994C14.7578 8.74628 15.0588 8.76253 15.3577 8.7986L15.5374 7.3094C15.1728 7.26541 14.8056 7.24559 14.4384 7.25006L14.4567 8.74994ZM9.46501 7.31063C8.56843 7.43066 7.83317 7.76822 7.23065 8.55165C6.67688 9.27168 6.2672 10.3311 5.8485 11.7936L7.29056 12.2064C7.70587 10.7559 8.05419 9.94132 8.41967 9.4661C8.7364 9.05428 9.08164 8.87534 9.66405 8.79737L9.46501 7.31063ZM5.84193 11.8181L4.84193 15.8181L6.29714 16.1819L7.29714 12.1819L5.84193 11.8181ZM4.82974 15.8767C4.54151 17.6061 5.0564 18.8935 6.08303 19.7116C7.05266 20.4842 8.36935 20.75 9.55853 20.75V19.25C8.54472 19.25 7.6169 19.0158 7.01779 18.5384C6.47566 18.1065 6.09755 17.3939 6.30933 16.1233L4.82974 15.8767ZM9.55853 20.75H12.5535V19.25H9.55853V20.75ZM12.5535 20.75H15.4445V19.25H12.5535V20.75ZM15.4445 20.75C16.6324 20.75 17.9485 20.4841 18.9181 19.7116C19.9446 18.8938 20.4605 17.6067 20.1734 15.8772L18.6937 16.1228C18.9046 17.3933 18.526 18.1062 17.9834 18.5384C17.3841 19.0159 16.4566 19.25 15.4445 19.25V20.75ZM20.1611 15.8181L19.1611 11.8181L17.7059 12.1819L18.7059 16.1819L20.1611 15.8181ZM19.1548 11.7944C18.7379 10.3319 18.3283 9.27255 17.7742 8.55232C17.1718 7.76922 16.4367 7.43138 15.5417 7.31072L15.3413 8.79727C15.9224 8.87562 16.2683 9.05478 16.5853 9.46693C16.9508 9.94195 17.2991 10.7561 17.7123 12.2056L19.1548 11.7944ZM8.81153 11.62V12.5H10.3115V11.62H8.81153ZM12.4515 5.75C13.6918 5.7533 14.6955 6.7597 14.6955 8L16.1955 8C16.1955 5.93283 14.5227 4.25552 12.4555 4.25L12.4515 5.75ZM14.6955 8V8.054H16.1955V8H14.6955ZM14.6955 8.054V9H16.1955V8.054H14.6955ZM14.6955 11.621V12.5H16.1955V11.621H14.6955Z"
                    fill="currentColor"
                  />
                </svg>
              }
              text="Top up"
              active={true}
              onClick={toggleMobileMenu}
            />
            <MobileNavItem
              icon={
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.132 9.71395C10.139 11.2496 10.3328 13.2665 11.6 14.585C12.8468 15.885 14.8527 16.0883 16.335 15.065C16.6466 14.8505 16.9244 14.5906 17.159 14.294C17.3897 14.0023 17.5773 13.679 17.716 13.334C18.0006 12.6253 18.0742 11.8495 17.928 11.1C17.7841 10.3573 17.4268 9.67277 16.9 9.12995C16.3811 8.59347 15.7128 8.22552 14.982 8.07395C14.2541 7.92522 13.4982 8.00197 12.815 8.29395C12.1254 8.58951 11.5394 9.08388 11.132 9.71395Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5986 13.6868C17.2639 13.4428 16.7947 13.5165 16.5508 13.8513C16.3069 14.1861 16.3806 14.6552 16.7154 14.8991L17.5986 13.6868ZM19.0584 16.6061C19.3931 16.85 19.8623 16.7764 20.1062 16.4416C20.3501 16.1068 20.2764 15.6377 19.9416 15.3938L19.0584 16.6061ZM7.5 12.7499C7.91421 12.7499 8.25 12.4142 8.25 11.9999C8.25 11.5857 7.91421 11.2499 7.5 11.2499V12.7499ZM5.5 11.2499C5.08579 11.2499 4.75 11.5857 4.75 11.9999C4.75 12.4142 5.08579 12.7499 5.5 12.7499V11.2499ZM7.5 15.7499C7.91421 15.7499 8.25 15.4142 8.25 14.9999C8.25 14.5857 7.91421 14.2499 7.5 14.2499V15.7499ZM5.5 14.2499C5.08579 14.2499 4.75 14.5857 4.75 14.9999C4.75 15.4142 5.08579 15.7499 5.5 15.7499V14.2499ZM8.5 9.74994C8.91421 9.74994 9.25 9.41415 9.25 8.99994C9.25 8.58573 8.91421 8.24994 8.5 8.24994V9.74994ZM5.5 8.24994C5.08579 8.24994 4.75 8.58573 4.75 8.99994C4.75 9.41415 5.08579 9.74994 5.5 9.74994V8.24994ZM16.7154 14.8991L19.0584 16.6061L19.9416 15.3938L17.5986 13.6868L16.7154 14.8991ZM7.5 11.2499H5.5V12.7499H7.5V11.2499ZM7.5 14.2499H5.5V15.7499H7.5V14.2499ZM8.5 8.24994H5.5V9.74994H8.5V8.24994Z"
                    fill="currentColor"
                  />
                </svg>
              }
              text="Cek Pesanan"
              onClick={toggleMobileMenu}
            />
            <MobileNavItem
              icon={
                <svg
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M9.069 2.672v14.928h-6.397c0 0 0 6.589 0 8.718s1.983 3.010 3.452 3.010c1.469 0 16.26 0 20.006 0 1.616 0 3.199-1.572 3.199-3.199 0-1.175 0-23.457 0-23.457h-20.259zM6.124 28.262c-0.664 0-2.385-0.349-2.385-1.944v-7.652h5.331v7.192c0 0.714-0.933 2.404-2.404 2.404h-0.542zM28.262 26.129c0 1.036-1.096 2.133-2.133 2.133h-17.113c0.718-0.748 1.119-1.731 1.119-2.404v-22.12h18.126v22.391z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.268 5.871h13.861v1.066h-13.861v-1.066z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.268 20.265h13.861v1.066h-13.861v-1.066z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.268 23.997h13.861v1.066h-13.861v-1.066z"
                    fill="currentColor"
                  />
                  <path
                    d="M26.129 9.602h-13.861v7.997h13.861v-7.997zM25.063 16.533h-11.729v-5.864h11.729v5.864z"
                    fill="currentColor"
                  />
                </svg>
              }
              text="Berita"
              onClick={toggleMobileMenu}
            />
            <MobileNavItem
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M18 8.49998H14M18 14.5H14M18 17.5H14M10 8.49999H8M8 8.49999L6 8.49999M8 8.49999L8 6.49998M8 8.49999L8 10.5M9.5 14.5L8.00001 16M8.00001 16L6.50001 17.5M8.00001 16L6.5 14.5M8.00001 16L9.49999 17.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
              text="Kalkulator"
              hasDropdown={true}
              isDropdownOpen={isCalculatorDropdownOpen}
              onDropdownToggle={toggleCalculatorDropdown}
            />

            {/* Calculator Dropdown */}
            <div
              className={`bg-gray-800 border-l-4 border-yellow-500 transition-all duration-300 ease-in-out overflow-hidden ${
                isCalculatorDropdownOpen
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <MobileNavItem
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C14.74 5.59 13.53 6.47 12.71 7.71L11 10L13 12L14.5 10.5C15.14 9.86 16.05 9.5 17 9.5C17.35 9.5 17.69 9.55 18 9.65V21C18 21.55 18.45 22 19 22S20 21.55 20 22V10C20.55 10 21 9.55 21 9ZM6 14V16H4V18H6V20H8V18H10V16H8V14H6ZM4 8V10H2V12H4V14H6V12H8V10H6V8H4Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                text="Win Rate"
                isSubmenu={true}
                onClick={toggleMobileMenu}
              />
              <MobileNavItem
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 7L13.09 9.26L16 9.27L13.82 11.14L14.64 13.95L12 12.77L9.36 13.95L10.18 11.14L8 9.27L10.91 9.26L12 7Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                text="Magic Wheel"
                isSubmenu={true}
                onClick={toggleMobileMenu}
              />
              <MobileNavItem
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12 2C13.1046 2 14 2.89543 14 4V5C16.2091 5 18 6.79086 18 9V10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14V15C18 17.2091 16.2091 19 14 19H13V20C13 21.1046 12.1046 22 11 22C9.89543 22 9 21.1046 9 20V19H8C5.79086 19 4 17.2091 4 15V14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10V9C4 6.79086 5.79086 5 8 5V4C8 2.89543 8.89543 2 10 2C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4V5H11V4C11 2.89543 11.8954 2 13 2H12ZM8 7C6.89543 7 6 7.89543 6 9V15C6 16.1046 6.89543 17 8 17H14C15.1046 17 16 16.1046 16 15V9C16 7.89543 15.1046 7 14 7H8Z"
                      fill="currentColor"
                    />
                  </svg>
                }
                text="Zodiac"
                isSubmenu={true}
                onClick={toggleMobileMenu}
              />
            </div>
            <MobileNavItem
              icon={
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
              }
              text="Masuk"
              onClick={toggleMobileMenu}
            />
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

function MobileNavItem({
  icon,
  text,
  active = false,
  onClick,
  hasDropdown = false,
  isDropdownOpen = false,
  onDropdownToggle,
  isSubmenu = false,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (hasDropdown) {
      onDropdownToggle();
    } else {
      onClick && onClick();
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`flex items-center justify-between px-6 py-4 text-base font-medium transition-colors hover:bg-gray-800 ${
        active
          ? "text-yellow-500 bg-gray-800 border-r-4 border-yellow-500"
          : "text-gray-300 hover:text-white"
      } ${isSubmenu ? "pl-12 py-3 text-sm bg-gray-800" : ""}`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-lg flex items-center justify-center">
          {typeof icon === "string" ? icon : icon}
        </div>
        <span>{text}</span>
      </div>
      {hasDropdown && (
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </a>
  );
}
