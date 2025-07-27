"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sample products data
  const products = [
    {
      id: "PROD-001",
      name: "Mobile Legends Diamond",
      category: "moba",
      price: 15000,
      originalPrice: 18000,
      stock: 999,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
      description: "Get Mobile Legends Diamonds instantly",
      rating: 4.8,
      sold: 2847,
      status: "active",
      isPopular: true,
    },
    {
      id: "PROD-002",
      name: "Free Fire Diamond",
      category: "battle-royale",
      price: 12000,
      originalPrice: 15000,
      stock: 999,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      description: "Free Fire Diamonds for your game",
      rating: 4.7,
      sold: 1923,
      status: "active",
      isPopular: true,
    },
    {
      id: "PROD-003",
      name: "PUBG UC",
      category: "battle-royale",
      price: 20000,
      originalPrice: 25000,
      stock: 500,
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=200&h=200&fit=crop",
      description: "PUBG Unknown Cash for premium items",
      rating: 4.6,
      sold: 1456,
      status: "active",
      isPopular: false,
    },
    {
      id: "PROD-004",
      name: "Genshin Impact Genesis Crystal",
      category: "rpg",
      price: 25000,
      originalPrice: 30000,
      stock: 750,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop",
      description: "Genesis Crystals for Genshin Impact",
      rating: 4.9,
      sold: 987,
      status: "active",
      isPopular: true,
    },
    {
      id: "PROD-005",
      name: "Valorant Point",
      category: "fps",
      price: 18000,
      originalPrice: 22000,
      stock: 300,
      image:
        "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=200&h=200&fit=crop",
      description: "Valorant Points for weapon skins",
      rating: 4.5,
      sold: 734,
      status: "active",
      isPopular: false,
    },
    {
      id: "PROD-006",
      name: "Call of Duty CP",
      category: "fps",
      price: 22000,
      originalPrice: 27000,
      stock: 0,
      image:
        "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=200&h=200&fit=crop",
      description: "Call of Duty COD Points",
      rating: 4.4,
      sold: 523,
      status: "out-of-stock",
      isPopular: false,
    },
    {
      id: "PROD-007",
      name: "Steam Wallet",
      category: "platform",
      price: 50000,
      originalPrice: 50000,
      stock: 999,
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
      description: "Steam Wallet for PC games",
      rating: 4.8,
      sold: 2156,
      status: "active",
      isPopular: true,
    },
    {
      id: "PROD-008",
      name: "Honkai Impact Crystal",
      category: "rpg",
      price: 23000,
      originalPrice: 28000,
      stock: 600,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop",
      description: "Honkai Impact 3rd Crystals",
      rating: 4.6,
      sold: 445,
      status: "active",
      isPopular: false,
    },
  ];

  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    {
      id: "moba",
      name: "MOBA Games",
      count: products.filter((p) => p.category === "moba").length,
    },
    {
      id: "battle-royale",
      name: "Battle Royale",
      count: products.filter((p) => p.category === "battle-royale").length,
    },
    {
      id: "rpg",
      name: "RPG Games",
      count: products.filter((p) => p.category === "rpg").length,
    },
    {
      id: "fps",
      name: "FPS Games",
      count: products.filter((p) => p.category === "fps").length,
    },
    {
      id: "platform",
      name: "Platform",
      count: products.filter((p) => p.category === "platform").length,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800 border-green-200",
      "out-of-stock": "bg-red-100 text-red-800 border-red-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusText = (status) => {
    const statusText = {
      active: "Active",
      "out-of-stock": "Out of Stock",
      inactive: "Inactive",
    };
    return statusText[status] || "Unknown";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <div className="lg:pl-64 pb-16 pt-3">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Product Management
                  </h1>
                  <p className="text-gray-600">
                    Manage gaming products and digital items
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Export
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add New Product
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {/* Total Products Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11V7"
                        />
                      </svg>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium text-blue-600">
                      📦 All items
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      Total Products
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {products.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Products Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-lg group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium text-green-600">
                    ✅ Available
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Active Products
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {products.filter((p) => p.status === "active").length}
                  </p>
                </div>
              </div>

              {/* Popular Products Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <span className="inline-flex items-center text-xs font-medium text-yellow-600">
                    ⭐ Trending
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Popular Products
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                    {products.filter((p) => p.isPopular).length}
                  </p>
                </div>
              </div>

              {/* Revenue Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium text-purple-600">
                      💰 Earnings
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      Total Revenue
                    </h3>
                    <p className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {formatCurrency(
                        products.reduce((sum, p) => sum + p.price * p.sold, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter Products
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Search and filter products by category
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Enhanced Search */}
                <div className="space-y-2">
                  <div className="relative">
                    <label
                      htmlFor="search-input"
                      className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                    >
                      Search Products
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20">
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
                      id="search-input"
                      type="text"
                      placeholder="Type to search by product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm font-medium placeholder-gray-400 hover:border-gray-300"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-20"
                      >
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
                      </button>
                    )}
                  </div>
                  {searchTerm && (
                    <p className="text-xs text-blue-600 font-medium ml-1">
                      Found {filteredProducts.length} results for "{searchTerm}"
                    </p>
                  )}
                </div>

                {/* Category Filter Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">
                      Filter by Category
                    </h4>
                    <span className="text-xs text-gray-500 hidden sm:inline">
                      {categories.length} categories available
                    </span>
                  </div>

                  {/* Desktop: Horizontal layout */}
                  <div className="hidden sm:flex sm:flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-200 scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm hover:scale-102"
                        }`}
                      >
                        <span className="truncate">{category.name}</span>
                        <span
                          className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${
                            selectedCategory === category.id
                              ? "bg-blue-500 text-blue-100"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile: Grid layout with better spacing */}
                  <div className="grid grid-cols-2 gap-2 sm:hidden">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-3 py-3 rounded-xl text-xs font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-blue-200 scale-105"
                            : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="truncate max-w-full text-center leading-tight">
                          {category.name}
                        </span>
                        <span
                          className={`inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold rounded-full ${
                            selectedCategory === category.id
                              ? "bg-blue-500 text-blue-100"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedCategory !== "all") && (
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 shrink-0">
                      Active filters:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          <span className="truncate max-w-32 sm:max-w-none">
                            Search: "{searchTerm}"
                          </span>
                          <button
                            onClick={() => setSearchTerm("")}
                            className="ml-1 text-blue-600 hover:text-blue-800 shrink-0"
                          >
                            <svg
                              className="w-3 h-3"
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
                        </span>
                      )}
                      {selectedCategory !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Category:{" "}
                          {
                            categories.find((c) => c.id === selectedCategory)
                              ?.name
                          }
                          <button
                            onClick={() => setSelectedCategory("all")}
                            className="ml-1 text-green-600 hover:text-green-800 shrink-0"
                          >
                            <svg
                              className="w-3 h-3"
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
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {products.length}
                    </span>{" "}
                    products
                  </div>
                </div>
              )}
            </div>

            {/* Products Table Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Products List
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Showing {currentProducts.length} of{" "}
                      {filteredProducts.length} products
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="hidden sm:inline">Showing</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span>per page</span>
                  </div>
                </div>
              </div>

              {/* Horizontal scroll wrapper for mobile */}
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Desktop Table Header - Hidden on mobile */}
                  <div className="hidden lg:grid lg:grid-cols-12 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-200">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-2 text-center">Category</div>
                    <div className="col-span-1 text-center">Stock</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-2 text-center">Actions</div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="lg:grid lg:grid-cols-12 lg:items-center px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        {/* Mobile Card Layout */}
                        <div className="lg:hidden space-y-3">
                          {/* Product Info Row */}
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {product.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                    product.status
                                  )}`}
                                >
                                  {product.status === "active"
                                    ? "🟢"
                                    : product.status === "out-of-stock"
                                    ? "🔴"
                                    : "⚪"}{" "}
                                  {getStatusText(product.status)}
                                </span>
                                {product.isPopular && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    ⭐ Popular
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Stock</p>
                              <p
                                className={`font-semibold ${
                                  product.stock < 10
                                    ? "text-red-600"
                                    : product.stock < 50
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                              >
                                {product.stock.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(product.price)}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Rating</p>
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-yellow-400">⭐</span>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {product.rating}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions Row */}
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                              Edit
                            </button>
                            <button className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View
                            </button>
                            <button className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Desktop Grid Layout */}
                        <div className="hidden lg:contents">
                          {/* Product Column */}
                          <div className="col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center">
                                  <span className="text-yellow-400 text-sm">
                                    ⭐
                                  </span>
                                  <span className="text-sm text-gray-600 ml-1">
                                    {product.rating}
                                  </span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {product.sold} sold
                                </span>
                                {product.isPopular && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-xs font-medium text-yellow-600">
                                      Popular
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Category Column */}
                          <div className="col-span-2 text-center">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category.charAt(0).toUpperCase() +
                                product.category.slice(1)}
                            </span>
                          </div>

                          {/* Stock Column */}
                          <div className="col-span-1 text-center">
                            <span
                              className={`font-semibold ${
                                product.stock < 10
                                  ? "text-red-600"
                                  : product.stock < 50
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {product.stock.toLocaleString()}
                            </span>
                          </div>

                          {/* Price Column */}
                          <div className="col-span-2 text-center">
                            <div className="space-y-0.5">
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(product.price)}
                              </p>
                              {product.originalPrice &&
                                product.originalPrice > product.price && (
                                  <p className="text-xs text-gray-500 line-through">
                                    {formatCurrency(product.originalPrice)}
                                  </p>
                                )}
                            </div>
                          </div>

                          {/* Status Column */}
                          <div className="col-span-1 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                product.status
                              )}`}
                            >
                              {product.status === "active"
                                ? "🟢"
                                : product.status === "out-of-stock"
                                ? "🔴"
                                : "⚪"}{" "}
                              {getStatusText(product.status)}
                            </span>
                          </div>

                          {/* Actions Column */}
                          <div className="col-span-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <button className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Footer with Pagination */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredProducts.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
