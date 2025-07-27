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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Active Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products.filter((p) => p.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Popular Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {products.filter((p) => p.isPopular).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(
                        products.reduce((sum, p) => sum + p.price * p.sold, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full lg:w-64"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isPopular && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ⭐ Popular
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          product.status
                        )}`}
                      >
                        {getStatusText(product.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-600">
                          {product.sold} sold
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        Stock: {product.stock}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredProducts.length
                  )}{" "}
                  of {filteredProducts.length} products
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-2 border rounded-lg text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
