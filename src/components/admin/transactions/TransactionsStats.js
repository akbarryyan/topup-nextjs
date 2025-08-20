"use client";

export default function TransactionsStats({ transactions }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Transaction Overview</h2>
          <p className="text-sm text-gray-600 mt-1">Real-time statistics and performance metrics</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Completed Transactions Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full -mr-12 -mt-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl group-hover:from-green-200 group-hover:to-green-100 transition-all duration-500 shadow-sm">
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
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-500">
                    {
                      transactions.filter((t) => t.status === "completed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                  ↗️ {Math.round(
                    (transactions.filter((t) => t.status === "completed")
                      .length /
                      transactions.length) *
                      100
                  )}% Success Rate
                </span>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    ✅ Active
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(transactions.filter((t) => t.status === "completed").length / transactions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Transactions Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full -mr-12 -mt-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl group-hover:from-yellow-200 group-hover:to-yellow-100 transition-all duration-500 shadow-sm">
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
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-500">
                    {
                      transactions.filter((t) => t.status === "pending")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-600 font-semibold bg-yellow-50 px-2 py-1 rounded-full">
                  ⏳ Awaiting Processing
                </span>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
                    🔄 In Queue
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(transactions.filter((t) => t.status === "pending").length / transactions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Failed Transactions Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-full -mr-12 -mt-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-xl group-hover:from-red-200 group-hover:to-red-100 transition-all duration-500 shadow-sm">
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
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-500">
                    {
                      transactions.filter((t) => t.status === "failed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-full">
                  ❌ Needs Attention
                </span>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                    ⚠️ Error Rate
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(transactions.filter((t) => t.status === "failed").length / transactions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-100 rounded-full -mr-12 -mt-12 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-50 to-blue-100 rounded-full -ml-8 -mb-8 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-50 rounded-xl group-hover:from-blue-200 group-hover:to-purple-100 transition-all duration-500 shadow-sm">
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
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-500">
                    {formatCurrency(
                      transactions
                        .filter((t) => t.status === "completed")
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
                  💰 From {transactions.filter((t) => t.status === "completed").length} transactions
                </span>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                    📈 Monthly
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-semibold">+12.5% ↗️</span>
                </div>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Total Transactions: <span className="font-bold text-gray-900">{transactions.length}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Success Rate: <span className="font-bold text-gray-900">
                  {Math.round((transactions.filter((t) => t.status === "completed").length / transactions.length) * 100)}%
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
