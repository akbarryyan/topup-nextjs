"use client";

import { useState } from "react";

export default function AdminHeader({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#2a2b35] via-[#2e2f3a] to-[#32333e] border-b border-[#D5D4FF]/20 px-3 sm:px-4 py-3 sm:py-4 lg:px-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-[#D5D4FF] hover:text-[#F2F5FF] hover:bg-[#8197E5]/10 rounded-xl transition-all duration-200"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Title */}
        <div className="flex-1 lg:flex-none">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#F2F5FF] bg-gradient-to-r from-[#F2F5FF] to-[#D5D4FF] bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-xs text-[#D5D4FF]/70 mt-1 hidden sm:block">
            Welcome back, manage your platform
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Search - Mobile Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 text-[#D5D4FF] hover:text-[#F2F5FF] hover:bg-[#8197E5]/10 rounded-xl transition-all duration-200"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions, users..."
                className="bg-[#51508B]/30 border border-[#D5D4FF]/20 rounded-xl px-4 py-2 pr-10 text-[#F2F5FF] placeholder-[#D5D4FF]/50 focus:outline-none focus:border-[#8197E5] focus:bg-[#51508B]/50 transition-all duration-200 w-64 xl:w-80"
              />
              <svg
                className="absolute right-3 top-2.5 w-4 h-4 text-[#D5D4FF]/50"
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
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-[#D5D4FF] hover:text-[#F2F5FF] hover:bg-[#8197E5]/10 rounded-xl transition-all duration-200 group">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM15 17V7a6 6 0 00-12 0v10l-3 3h15z"
                />
              </svg>
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#8197E5] to-[#51508B] rounded-full border-2 border-[#2a2b35] animate-pulse shadow-lg shadow-[#8197E5]/50"></span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#51508B]/20 rounded-xl p-1 sm:p-2 border border-[#D5D4FF]/10 hover:border-[#8197E5]/30 transition-all duration-200">
            <div className="hidden sm:block text-right">
              <p className="text-[#F2F5FF] text-xs sm:text-sm font-semibold">
                Admin User
              </p>
              <p className="text-[#8197E5] text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8197E5] to-[#51508B] rounded-xl flex items-center justify-center shadow-lg hover:shadow-[#8197E5]/25 transition-all duration-200 cursor-pointer transform hover:scale-105">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#D5D4FF]/10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#51508B]/30 border border-[#D5D4FF]/20 rounded-xl px-4 py-2 pr-10 text-[#F2F5FF] placeholder-[#D5D4FF]/50 focus:outline-none focus:border-[#8197E5] transition-all duration-200"
            />
            <svg
              className="absolute right-3 top-2.5 w-4 h-4 text-[#D5D4FF]/50"
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
        </div>
      )}
    </header>
  );
}
