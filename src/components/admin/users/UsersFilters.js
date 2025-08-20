"use client";

export default function UsersFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterRole,
  setFilterRole,
  setCurrentPage,
  users,
  filteredUsers
}) {
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterRole("all");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
      {/* Header with Clear All button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Filter Users
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Search and filter users by various criteria
          </p>
        </div>
        <button
          onClick={clearAllFilters}
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
              Search Users
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
              placeholder="Type to search by name, email, phone, or user ID..."
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
              Found {filteredUsers.length} results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Status Filter */}
          <div className="space-y-2">
            <div className="relative">
              <label
                htmlFor="status-filter"
                className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
              >
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
              >
                <option
                  value="all"
                  className="text-gray-600 font-medium"
                >
                  🔍 View All Statuses ({users.length} total)
                </option>
                <option
                  value="active"
                  className="text-green-700 font-medium"
                >
                  ✅ Active Users (
                  {users.filter((u) => u.status === "active").length})
                </option>
                <option
                  value="inactive"
                  className="text-gray-700 font-medium"
                >
                  😴 Inactive Users (
                  {users.filter((u) => u.status === "inactive").length})
                </option>
                <option
                  value="suspended"
                  className="text-red-700 font-medium"
                >
                  ❌ Suspended Users (
                  {users.filter((u) => u.status === "suspended").length}
                  )
                </option>
                <option
                  value="pending"
                  className="text-yellow-700 font-medium"
                >
                  ⏳ Pending Users (
                  {users.filter((u) => u.status === "pending").length})
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Role Filter */}
          <div className="space-y-2">
            <div className="relative">
              <label
                htmlFor="role-filter"
                className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
              >
                Filter by Role
              </label>
              <select
                id="role-filter"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
              >
                <option
                  value="all"
                  className="text-gray-600 font-medium"
                >
                  📋 View All Roles
                </option>
                <option
                  value="admin"
                  className="text-purple-700 font-medium"
                >
                  👑 Admin Users
                </option>
                <option
                  value="premium"
                  className="text-blue-700 font-medium"
                >
                  ⭐ Premium Users
                </option>
                <option
                  value="user"
                  className="text-gray-700 font-medium"
                >
                  👤 Regular Users
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm ||
        filterStatus !== "all" ||
        filterRole !== "all") && (
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

              {filterStatus !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  Status:{" "}
                  {filterStatus.charAt(0).toUpperCase() +
                    filterStatus.slice(1)}
                  <button
                    onClick={() => setFilterStatus("all")}
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

              {filterRole !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Role:{" "}
                  {filterRole.charAt(0).toUpperCase() +
                    filterRole.slice(1)}
                  <button
                    onClick={() => setFilterRole("all")}
                    className="ml-1 text-purple-600 hover:text-purple-800 shrink-0"
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
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {users.length}
            </span>{" "}
            users
          </div>
        </div>
      )}
    </div>
  );
}
