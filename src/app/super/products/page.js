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
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0, startTime: null });
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

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

  // Fetch categories from database
  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const response = await fetch('/api/products/categories');
      const result = await response.json();

      if (result.success) {
        // Add "All Categories" option at the beginning
        const allCategories = [
          {
            id: "all",
            name: "All Categories",
            count: totalProducts
          },
          ...result.data
        ];
        setCategories(allCategories);
      } else {
        console.error('Error fetching categories:', result.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, currentPage, itemsPerPage]);

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Update "All Categories" count when totalProducts changes
  useEffect(() => {
    if (categories.length > 0) {
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === "all" 
            ? { ...cat, count: totalProducts }
            : cat
        )
      );
    }
  }, [totalProducts]);

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
    setProgress({ current: 0, total: 0, percentage: 0, startTime: Date.now() });
    
    try {
      // Step 1: Fetch products from VIP Reseller API
      setApiMessage("🔄 Fetching products from VIP Reseller API...");
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
        setApiMessage(`📥 Successfully fetched ${data.data.length} products from VIP Reseller. Starting batch processing...`);
        
        // Step 2: Prepare products data (without stock)
        const productsData = data.data.map(product => ({
          ...product,
          status: 'available' // Set all products as available
        }));
        
        // Step 3: Save products to database with progress tracking
        setProgress({ current: 0, total: productsData.length, percentage: 0, startTime: Date.now() });
        
        // Start the save process
        const saveResponse = await fetch('/api/products/save-vip-reseller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products: productsData
          })
        });

        // Start polling for progress
        const progressInterval = setInterval(async () => {
          try {
            const progressResponse = await fetch('/api/products/save-vip-reseller');
            const progressData = await progressResponse.json();
            
                         if (progressData.isProcessing) {
               setProgress({
                 current: progressData.current,
                 total: progressData.total,
                 percentage: progressData.percentage,
                 startTime: progress.startTime
               });
               setApiMessage(`🔄 ${progressData.message}`);
             } else {
               cleanup(); // Clean up timeout and interval
               
               // Get final result
               const finalResponse = await fetch('/api/products/save-vip-reseller');
               const finalResult = await finalResponse.json();
               
                               if (finalResult.success) {
                  setProgress({ current: productsData.length, total: productsData.length, percentage: 100, startTime: progress.startTime });
                  setApiMessage(`✅ Successfully processed ${finalResult.savedCount} products! ${finalResult.updatedCount} products updated, ${finalResult.newCount} new products added.`);
                  
                  // Refresh the products list, stats, and categories
                  fetchProducts();
                  fetchCategories();
                  // Trigger stats refresh by dispatching a custom event
                  window.dispatchEvent(new CustomEvent('refreshStats'));
                } else {
                 setApiMessage(`❌ Database Error: ${finalResult.message || finalResult.error || 'Unknown error occurred'}`);
               }
               
               setIsLoading(false);
             }
                     } catch (error) {
             console.error('Error checking progress:', error);
             cleanup(); // Clean up timeout and interval
             setIsLoading(false);
             setApiMessage(`❌ Error checking progress: ${error.message}`);
           }
        }, 1000); // Check every second
        
                 // Set a timeout to stop polling after 30 minutes
         const timeoutId = setTimeout(() => {
           clearInterval(progressInterval);
           setIsLoading(false);
           setApiMessage("⚠️ Process timeout after 30 minutes. Please check the results.");
         }, 30 * 60 * 1000);
         
         // Clean up timeout when process completes
         const cleanup = () => {
           clearTimeout(timeoutId);
           clearInterval(progressInterval);
         };
        
        console.log('VIP Reseller Products:', productsData);
      } else {
        setApiMessage(`❌ Error: ${data.message || 'No products found or failed to fetch products'}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setApiMessage(`❌ Error: ${error.message}`);
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
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
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
                  : apiMessage.includes('❌')
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
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
                
                {/* Progress Bar */}
                {isLoading && progress.total > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Processing products...</span>
                      <span>{progress.current} / {progress.total} ({progress.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Processing {progress.current} of {progress.total} products...
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stats Cards */}
            <ProductsStats />

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
                      {isLoadingCategories ? 'Loading...' : `${categories.length - 1} categories available`}
                    </span>
                  </div>

                                     {/* Desktop: Horizontal scrollable layout */}
                   <div className="hidden sm:block">
                     {isLoadingCategories ? (
                       // Loading skeleton for categories
                       <div className="flex gap-2 overflow-x-auto pb-2">
                         {Array.from({ length: 8 }).map((_, index) => (
                           <div key={index} className="px-4 py-2.5 rounded-lg bg-gray-200 animate-pulse flex-shrink-0">
                             <div className="w-20 h-5 bg-gray-300 rounded"></div>
                           </div>
                         ))}
                       </div>
                     ) : (
                                               <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
                         {categories.map((category) => (
                           <button
                             key={category.id}
                             onClick={() => setSelectedCategory(category.id)}
                             className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 flex-shrink-0 whitespace-nowrap ${
                               selectedCategory === category.id
                                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-blue-200 scale-105"
                                 : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200 hover:border-gray-300"
                             }`}
                           >
                             <span className="truncate max-w-32">{category.name}</span>
                             <span
                               className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${
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
                     )}
                   </div>

                   {/* Mobile: Grid layout with better spacing */}
                   <div className="grid grid-cols-2 sm:hidden gap-2">
                     {isLoadingCategories ? (
                       // Loading skeleton for mobile categories
                       Array.from({ length: 6 }).map((_, index) => (
                         <div key={index} className="px-3 py-3 rounded-xl bg-gray-200 animate-pulse">
                           <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
                           <div className="w-8 h-3 bg-gray-300 rounded"></div>
                         </div>
                       ))
                     ) : (
                       categories.map((category) => (
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
                       ))
                     )}
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
                              ?.name || selectedCategory
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

            {/* Products Cards Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Products List
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Showing {products.length} of {totalProducts} products • Sorted by price (lowest first)
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
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                      <option value={96}>96</option>
                    </select>
                    <span>per page</span>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-4 sm:p-6">
                {isLoadingProducts ? (
                  // Loading skeleton
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                          <div className="flex gap-2">
                            <div className="h-8 bg-gray-200 rounded flex-1"></div>
                            <div className="h-8 bg-gray-200 rounded w-8"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-t-xl"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop';
                            }}
                          />
                          {/* Status Badge */}
                          <div className="absolute top-2 left-2">
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
                          </div>
                          {/* Popular Badge */}
                          {product.is_popular && (
                            <div className="absolute top-2 right-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                ⭐ Popular
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {/* Product Name */}
                          <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h4>

                          {/* Category */}
                          <div className="mb-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category
                                ? product.category
                                    .split("-")
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")
                                : "Other"}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mb-3">
                            <ProductPrice product={product} />
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">⭐</span>
                              <span>{product.rating || 0}</span>
                            </div>
                            <span>{product.sold_count || 0} sold</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
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
                            <button className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
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
                      </div>
                    ))}
                  </div>
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

              {/* Pagination */}
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
