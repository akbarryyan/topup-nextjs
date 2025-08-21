"use client";

export default function ProductsStats({ products }) {
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  return (
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
            {products.filter((p) => p.is_popular).length}
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
                products.reduce((sum, p) => {
                  const price = p.price_basic || p.price_premium || p.price_special || 0;
                  const sold = p.sold_count || 0;
                  return sum + (price * sold);
                }, 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
