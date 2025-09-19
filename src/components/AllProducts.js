"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function AllProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const scrollContainerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories");
        const data = await response.json();

        if (data.success) {
          // Add "All" category at the beginning
          const allCategories = [
            { id: "all", name: "All Products", count: 0 },
            ...data.data,
          ];
          setCategories(allCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryParam =
          activeCategory === "all" ? "" : `category=${activeCategory}`;
        const pageParam = `page=${currentPage}`;
        const limitParam = `limit=12`;

        const params = [categoryParam, pageParam, limitParam]
          .filter(Boolean)
          .join("&");
        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, currentPage]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section className="pb-8 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="relative flex items-center">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
              style={{ transform: "translateX(-50%)" }}
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

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-0 mx-8"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {category.name}
                  {category.count > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-700 rounded-full">
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-orange-500/20"
              style={{ transform: "translateX(50%)" }}
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

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] md:aspect-[4/5] bg-gray-700 rounded-lg md:rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        currentPage === pageNumber
                          ? "bg-orange-500 text-white"
                          : "text-gray-400 bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </div>
            )}

            {/* No Products Message */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image || "/ml.webp");

  // Get the lowest price from the available price tiers
  const getLowestPrice = () => {
    const prices = [
      product.price_basic,
      product.price_premium,
      product.price_special,
    ].filter((price) => price && price > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc("/ml.webp");
    }
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-gray-800 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
        {/* Product Image */}
        <div className="aspect-[3/4] md:aspect-[4/5] relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />

          {/* Popular Badge */}
          {product.is_popular && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Popular
            </div>
          )}

          {/* Stock Status */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-4">
          {/* Game Name */}
          <div className="text-orange-400 text-xs font-medium mb-1 uppercase tracking-wide">
            {product.game}
          </div>

          {/* Product Name */}
          <h3 className="text-white font-semibold text-sm md:text-base mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-green-400 font-bold text-sm md:text-base">
                {formatPrice(getLowestPrice())}
              </span>
              {getLowestPrice() > 0 && (
                <div className="text-gray-400 text-xs">Starting from</div>
              )}
            </div>

            {/* Rating & Sold Count */}
            <div className="text-right">
              {product.rating > 0 && (
                <div className="flex items-center gap-1 mb-1">
                  <svg
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-400 text-xs">
                    {product.rating}
                  </span>
                </div>
              )}
              {product.sold_count > 0 && (
                <div className="text-gray-400 text-xs">
                  {product.sold_count} sold
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
