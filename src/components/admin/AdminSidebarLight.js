"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("dashboard");

  // Update active item based on current pathname
  useEffect(() => {
    const currentPath = pathname.split("/").pop() || "dashboard";
    if (pathname === "/super" || pathname === "/super/") {
      setActiveItem("dashboard");
    } else {
      setActiveItem(currentPath);
    }
  }, [pathname]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/super",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      id: "transactions",
      label: "Transactions",
      href: "/super/transactions",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Products",
      href: "/super/products",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8.5 13a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "users",
      label: "Users",
      href: "/super/users",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "/super/analytics",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      href: "/super/reports",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      href: "/super/settings",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    router.push(item.href);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-xl border-r border-gray-200/80 overflow-y-auto shadow-2xl">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="ml-3">
              <span className="text-gray-900 text-lg font-bold">
                Admin Panel
              </span>
              <p className="text-xs text-gray-500 mt-0.5">Management System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`group flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-l-4 border-blue-400"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-md"
                }`}
              >
                <span
                  className={`mr-3 transition-all duration-300 ${
                    activeItem === item.id
                      ? "text-white"
                      : "text-gray-400 group-hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
                {activeItem === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-4 border-t border-gray-100">
            <div className="flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-blue-100">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">admin@topup.com</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop/Overlay */}
        <div
          className={`fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/20 to-indigo-900/40 backdrop-blur-md transition-all duration-500 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        ></div>

        {/* Sidebar Panel */}
        <div
          className={`relative flex flex-col w-80 max-w-[85vw] h-full bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out border-r border-gray-200/50 ${
            isOpen
              ? "translate-x-0 opacity-100 scale-100"
              : "-translate-x-full opacity-0 scale-95"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between flex-shrink-0 px-6 py-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100 transition-all duration-500 ease-out transform ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? "150ms" : "0ms",
            }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-100">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="ml-3">
                <span className="text-gray-900 text-lg font-bold">
                  Admin Panel
                </span>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-4 space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`group flex items-center w-full px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-500 ease-out transform ${
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  } ${
                    activeItem === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-l-4 border-blue-400 scale-105"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:scale-105 hover:shadow-md active:scale-95"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 80 + 200}ms` : "0ms",
                  }}
                >
                  <span
                    className={`mr-3 transition-all duration-300 ${
                      activeItem === item.id
                        ? "text-white"
                        : "text-gray-400 group-hover:text-blue-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {activeItem === item.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          <div
            className={`flex-shrink-0 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-4 border-t border-gray-100 transition-all duration-500 ease-out transform ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isOpen ? "600ms" : "0ms",
            }}
          >
            <div className="flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md ring-2 ring-blue-100">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@topup.com
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
