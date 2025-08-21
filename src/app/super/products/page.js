"use client";

import { useState, useEffect } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import ProductsHeader from "@/components/admin/products/ProductsHeader";
import ProductsStats from "@/components/admin/products/ProductsStats";
import ProductPrice from "@/components/admin/products/ProductPrice";

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch products from database
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage
      });

      const response = await fetch(`/api/products?${params}`);
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        setTotalProducts(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
      } else {
        console.error('Error fetching products:', result.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, currentPage, itemsPerPage]);

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

  // Handle search and category changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // VIP Reseller API Configuration
  const API_CONFIG = {
    apikey: "baad6ab2dc32fd25b1a2f86505260433",
    apiId: "968EJsSc",
    sign: "9a46988cbe16225e58b4a2cda3357abb",
    baseUrl: "https://vip-reseller.co.id/api/game-feature"
  };

  // Function to get products from VIP Reseller API and save to database
  const getProductsFromAPI = async () => {
    setIsLoading(true);
    setApiMessage("");
    
    try {
      // Step 1: Fetch products from VIP Reseller API
      const response = await fetch(API_CONFIG.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          key: API_CONFIG.apikey,
          sign: API_CONFIG.sign,
          type: 'services'
        })
      });

      const data = await response.json();
      
      if (data.result && data.data.length > 0) {
        setApiMessage(`📥 Fetched ${data.data.length} products from VIP Reseller. Saving to database...`);
        
        // Step 2: Prepare products data (without stock)
        const productsData = data.data.map(product => ({
          ...product,
          status: 'available' // Set all products as available
        }));
        
        setApiMessage(`💾 Saving ${productsData.length} products to database...`);
        
        // Step 3: Save products to database
        const saveResponse = await fetch('/api/products/save-vip-reseller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products: productsData
          })
        });

        const saveResult = await saveResponse.json();
        
        if (saveResult.success) {
          setApiMessage(`✅ Successfully saved ${saveResult.savedCount} products! ${saveResult.updatedCount} products updated, ${saveResult.newCount} new products added.`);
          
          // Refresh the products list
          fetchProducts();
        } else {
          setApiMessage(`❌ Database Error: ${saveResult.message}`);
        }
        
        console.log('VIP Reseller Products:', productsData);
      } else {
        setApiMessage(`❌ Error: ${data.message || 'No products found or failed to fetch products'}`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setApiMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };



  const formatCurrency = (amount) => {
    // Ensure amount is a valid number
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: "bg-emerald-100 text-emerald-800 border-emerald-200",
      active: "bg-emerald-100 text-emerald-800 border-emerald-200",
      "out-of-stock": "bg-red-100 text-red-800 border-red-200",
      empty: "bg-red-100 text-red-800 border-red-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return statusConfig[status] || "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  const getStatusText = (status) => {
    const statusText = {
      available: "Tersedia",
      active: "Tersedia",
      "out-of-stock": "Habis",
      empty: "Habis",
      inactive: "Tidak Aktif",
    };
    return statusText[status] || "Tersedia";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
        {/* Sidebar */}
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen overflow-hidden">
          {/* Header */}
          <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

          {/* Dashboard Content */}
          <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto">
            {/* Page Header */}
            <ProductsHeader 
              onGetProducts={getProductsFromAPI}
              isLoading={isLoading}
            />

            {/* API Message */}
            {apiMessage && (
              <div className={`p-4 rounded-lg border ${
                apiMessage.includes('✅') 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{apiMessage}</span>
                  <button
                    onClick={() => setApiMessage("")}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <ProductsStats products={products} />

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
                      Found {products.length} results for "{searchTerm}"
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
                      {products.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {totalProducts}
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
                      Showing {products.length} of{" "}
                      {totalProducts} products
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
                    <div className="col-span-5">Product</div>
                    <div className="col-span-2 text-center">Category</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-2 text-center">Actions</div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {isLoadingProducts ? (
                      // Loading skeleton
                      Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="lg:grid lg:grid-cols-12 lg:items-center px-4 sm:px-6 py-4 animate-pulse">
                          <div className="col-span-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="col-span-2">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </div>
                          <div className="col-span-2">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="col-span-1">
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex gap-2">
                              <div className="h-8 bg-gray-200 rounded w-16"></div>
                              <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : products.length > 0 ? (
                      products.map((product) => (
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
                                  {product.status === "available" || product.status === "active"
                                    ? "🟢"
                                    : product.status === "out-of-stock" || product.status === "empty"
                                    ? "🔴"
                                    : "⚪"}{" "}
                                  {getStatusText(product.status)}
                                </span>
                                {product.is_popular && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    ⭐ Popular
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                                                     {/* Stats Row */}
                           <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Price</p>
                              <ProductPrice product={product} />
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Rating</p>
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-yellow-400">⭐</span>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {product.rating || 0}
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
                          <div className="col-span-5 flex items-center gap-3">
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
                                   {product.rating || 0}
                                 </span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {product.sold_count || 0} sold
                                </span>
                                                                 {product.is_popular && (
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



                          {/* Price Column */}
                          <div className="col-span-2 text-center">
                            <ProductPrice product={product} />
                          </div>

                          {/* Status Column */}
                          <div className="col-span-1 text-center">
                                                         <span
                               className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                 product.status
                               )}`}
                             >
                               {product.status === "available" || product.status === "active"
                                 ? "🟢"
                                 : product.status === "out-of-stock" || product.status === "empty"
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
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 11V7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                  )}
                  </div>
                </div>
              </div>

              {/* Table Footer with Pagination */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {products.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        totalProducts
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {totalProducts}
                    </span>{" "}
                    products
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
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
                            onClick={() => handlePageChange(pageNum)}
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
                      onClick={() => handlePageChange(currentPage + 1)}
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
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
