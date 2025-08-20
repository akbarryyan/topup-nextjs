"use client";

export default function UsersTable({ currentUsers, currentPage, setCurrentPage, totalPages, filteredUsers, itemsPerPage }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      user: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return roleConfig[role] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Scroll Indicator */}
      <div className="hidden md:block bg-blue-50 border-b border-blue-100 px-4 py-2">
        <div className="flex items-center text-sm text-blue-600">
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Scroll horizontally to view all columns</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto max-w-full custom-scrollbar">
          <div className="inline-block min-w-full align-middle">
            <table
              className="min-w-full divide-y divide-gray-200"
              style={{ minWidth: "1200px" }}
            >
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                    Total Spent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center min-w-0">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                            src={user.avatar}
                            alt={user.name}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}&background=6b7280&color=ffffff`;
                            }}
                          />
                          {user.verified && (
                            <div className="relative -mt-3 -ml-1">
                              <div className="bg-blue-500 rounded-full p-1">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {user.id}
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            Joined {formatDate(user.joinDate)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="min-w-0">
                        <div className="text-sm text-gray-900 truncate">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() +
                          user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatCurrency(user.totalSpent)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.transactionCount} transactions
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-xs">
                        {getTimeAgo(user.lastLogin)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors text-sm font-medium">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                          Edit
                        </button>
                        {user.status === "suspended" ? (
                          <button className="text-green-600 hover:text-green-900 transition-colors text-sm font-medium">
                            Activate
                          </button>
                        ) : (
                          <button className="text-red-600 hover:text-red-900 transition-colors text-sm font-medium">
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden max-h-96 overflow-y-auto">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-4 mb-3">
              <div className="flex-shrink-0 relative">
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                  src={user.avatar}
                  alt={user.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&background=6b7280&color=ffffff`;
                  }}
                />
                {user.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-400">{user.id}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getStatusBadge(
                        user.status
                      )}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {user.role.charAt(0).toUpperCase() +
                        user.role.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 shrink-0">
                  Phone:
                </span>
                <span className="text-sm font-medium text-gray-900 truncate ml-2 text-right">
                  {user.phone}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 shrink-0">
                  Total Spent:
                </span>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {formatCurrency(user.totalSpent)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 shrink-0">
                  Transactions:
                </span>
                <span className="text-sm text-gray-900 shrink-0">
                  {user.transactionCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 shrink-0">
                  Last Login:
                </span>
                <span className="text-sm text-gray-900 shrink-0 text-right">
                  {getTimeAgo(user.lastLogin)}
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Edit
              </button>
              {user.status === "suspended" ? (
                <button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                  Activate
                </button>
              ) : (
                <button className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                  Suspend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredUsers.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredUsers.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
