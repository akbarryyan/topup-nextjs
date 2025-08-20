"use client";

import { useState } from "react";

export default function AdminHeader({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-gray-100/50">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md"
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
          <h2 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-xs text-gray-500 mt-1 hidden sm:block font-medium">
            Welcome back, manage your platform efficiently
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Search - Mobile Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md"
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
            <div className="relative group">
              <input
                type="text"
                placeholder="Search transactions, users..."
                className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-300 rounded-xl px-4 py-2.5 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-100 transition-all duration-300 w-64 xl:w-80 text-sm hover:shadow-md"
              />
              <svg
                className="absolute right-4 top-3 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
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
            <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 group hover:scale-110 active:scale-95 hover:shadow-md">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce"
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
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white animate-pulse shadow-lg"></span>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 rounded-xl p-2 sm:p-3 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="hidden sm:block text-right">
              <p className="text-gray-900 text-xs sm:text-sm font-semibold group-hover:text-blue-800 transition-colors duration-300">
                Admin User
              </p>
              <p className="text-green-600 text-xs flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-blue-100 group-hover:ring-blue-200">
              <span className="text-white font-bold text-xs sm:text-sm">
                AD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200/80 animate-in slide-in-from-top-2 duration-300">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search transactions, users..."
              className="w-full bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:ring-2 focus:ring-blue-100 transition-all duration-300 hover:shadow-md"
            />
            <svg
              className="absolute right-4 top-3.5 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
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
