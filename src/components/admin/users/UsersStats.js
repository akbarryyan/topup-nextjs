"use client";

export default function UsersStats({ users }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {/* Total Users Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Users
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {users.length}
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1">
                👥 All registered users
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Active
            </div>
          </div>
        </div>
      </div>

      {/* Active Users Card */}
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Active Users
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                {users.filter((u) => u.status === "active").length}
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                ✅ Currently active
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Premium Users Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Premium Users
              </p>
              <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {users.filter((u) => u.role === "premium").length}
              </p>
              <p className="text-xs text-purple-600 font-medium mt-1">
                ⭐ Premium members
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              VIP
            </div>
          </div>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -mr-10 -mt-10"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-50 rounded-lg group-hover:from-yellow-200 group-hover:to-orange-100 transition-all duration-300">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 mb-1">
                User Revenue
              </p>
              <p className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                {formatCurrency(
                  users.reduce((sum, u) => sum + u.totalSpent, 0)
                )}
              </p>
              <p className="text-xs text-yellow-600 font-medium mt-1">
                💰 Total from users
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800">
              Lifetime
            </div>
            <div className="mt-2 text-xs text-green-600 font-semibold">
              +8.2% ↗️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
