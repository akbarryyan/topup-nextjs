"use client";

export default function TransactionsStats({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Completed Transactions Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {
                  transactions.filter((t) => t.status === "completed")
                    .length
                }
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ↗️{" "}
                {Math.round(
                  (transactions.filter((t) => t.status === "completed")
                    .length /
                    transactions.length) *
                    100
                )}
                % of total
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Success Rate
            </div>
          </div>
        </div>
      </div>

      {/* Pending Transactions Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Pending
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                {
                  transactions.filter((t) => t.status === "pending")
                    .length
                }
              </p>
              <p className="text-xs text-yellow-600 font-medium mt-1">
                ⏳ Awaiting processing
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              In Queue
            </div>
          </div>
        </div>
      </div>

      {/* Failed Transactions Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-lg group-hover:from-red-200 group-hover:to-red-100 transition-all duration-300">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Failed
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                {
                  transactions.filter((t) => t.status === "failed")
                    .length
                }
              </p>
              <p className="text-xs text-red-600 font-medium mt-1">
                ❌ Needs attention
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Error Rate
            </div>
          </div>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-50 rounded-lg group-hover:from-blue-200 group-hover:to-purple-100 transition-all duration-300">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Revenue
              </p>
              <p className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {formatCurrency(
                  transactions
                    .filter((t) => t.status === "completed")
                    .reduce((sum, t) => sum + t.amount, 0)
                )}
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1">
                💰 From{" "}
                {
                  transactions.filter((t) => t.status === "completed")
                    .length
                }{" "}
                transactions
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
              Monthly
            </div>
            <div className="mt-2 text-xs text-green-600 font-semibold">
              +12.5% ↗️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
