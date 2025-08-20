"use client";

export default function AnalyticsOverview({ analyticsData }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const isPositive = value >= 0;
    return (
      <span
        className={`inline-flex items-center text-xs font-medium ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? "↗️" : "↘️"} {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Revenue Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-50 rounded-lg group-hover:from-green-200 group-hover:to-emerald-100 transition-all duration-300">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            {formatPercentage(analyticsData.overview.revenueGrowth)}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              {formatCurrency(analyticsData.overview.totalRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          {formatPercentage(analyticsData.overview.transactionGrowth)}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Total Transactions
          </h3>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {analyticsData.overview.totalTransactions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Users Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          {formatPercentage(analyticsData.overview.userGrowth)}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
            {analyticsData.overview.totalUsers.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Conversion Rate Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          {formatPercentage(analyticsData.overview.conversionGrowth)}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Conversion Rate
          </h3>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
            {analyticsData.overview.conversionRate}%
          </p>
        </div>
      </div>
    </div>
  );
}
