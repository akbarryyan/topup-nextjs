"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";

export default function TransactionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample transaction data
  const transactions = [
    {
      id: "TXN-001",
      user: "John Doe",
      email: "john@example.com",
      product: "Mobile Legends Diamond",
      amount: 50000,
      type: "Top Up",
      status: "completed",
      date: "2025-01-27T10:30:00Z",
      paymentMethod: "QRIS",
      orderId: "ML-123456",
    },
    {
      id: "TXN-002",
      user: "Jane Smith",
      email: "jane@example.com",
      product: "Free Fire Diamond",
      amount: 75000,
      type: "Top Up",
      status: "pending",
      date: "2025-01-27T09:15:00Z",
      paymentMethod: "Bank Transfer",
      orderId: "FF-789012",
    },
    {
      id: "TXN-003",
      user: "Mike Johnson",
      email: "mike@example.com",
      product: "PUBG UC",
      amount: 100000,
      type: "Top Up",
      status: "failed",
      date: "2025-01-27T08:45:00Z",
      paymentMethod: "E-Wallet",
      orderId: "PB-345678",
    },
    {
      id: "TXN-004",
      user: "Sarah Wilson",
      email: "sarah@example.com",
      product: "Genshin Impact Genesis Crystal",
      amount: 150000,
      type: "Top Up",
      status: "completed",
      date: "2025-01-26T16:20:00Z",
      paymentMethod: "Credit Card",
      orderId: "GI-901234",
    },
    {
      id: "TXN-005",
      user: "David Brown",
      email: "david@example.com",
      product: "Valorant Point",
      amount: 80000,
      type: "Top Up",
      status: "completed",
      date: "2025-01-26T14:10:00Z",
      paymentMethod: "QRIS",
      orderId: "VL-567890",
    },
    {
      id: "TXN-006",
      user: "Lisa Chen",
      email: "lisa@example.com",
      product: "Mobile Legends Diamond",
      amount: 25000,
      type: "Top Up",
      status: "pending",
      date: "2025-01-26T12:30:00Z",
      paymentMethod: "Bank Transfer",
      orderId: "ML-234567",
    },
    {
      id: "TXN-007",
      user: "Robert Taylor",
      email: "robert@example.com",
      product: "Free Fire Diamond",
      amount: 60000,
      type: "Top Up",
      status: "completed",
      date: "2025-01-25T18:45:00Z",
      paymentMethod: "E-Wallet",
      orderId: "FF-678901",
    },
    {
      id: "TXN-008",
      user: "Emily Davis",
      email: "emily@example.com",
      product: "PUBG UC",
      amount: 120000,
      type: "Top Up",
      status: "failed",
      date: "2025-01-25T15:20:00Z",
      paymentMethod: "Credit Card",
      orderId: "PB-890123",
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    const matchesType =
      filterType === "all" ||
      transaction.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    return statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgb(156 163 175) rgb(243 244 246);
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(243 244 246);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(156 163 175);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <div className="lg:pl-64 pt-16">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Transaction Management
              </h1>
              <p className="text-gray-600">
                Manage and monitor all platform transactions
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        transactions.filter((t) => t.status === "completed")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
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
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        transactions.filter((t) => t.status === "pending")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
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
                    <p className="text-sm font-medium text-gray-600">Failed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {transactions.filter((t) => t.status === "failed").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        transactions
                          .filter((t) => t.status === "completed")
                          .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
              {/* Header with Clear All button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter Transactions
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Use filters to find specific transactions quickly
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterType("all");
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
                {/* Enhanced Search - Full width on mobile */}
                <div className="space-y-2">
                  <div className="relative">
                    <label
                      htmlFor="search-input"
                      className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                    >
                      Search Transactions
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
                      placeholder="Type to search by user, email, product, or transaction ID..."
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
                      Found {filteredTransactions.length} results for "
                      {searchTerm}"
                    </p>
                  )}
                </div>

                {/* Filters Row - Stack on mobile, side by side on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Enhanced Status Filter */}
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
                          🔍 View All Statuses ({transactions.length} total)
                        </option>
                        <option
                          value="completed"
                          className="text-green-700 font-medium"
                        >
                          ✅ Completed Transactions (
                          {
                            transactions.filter((t) => t.status === "completed")
                              .length
                          }
                          )
                        </option>
                        <option
                          value="pending"
                          className="text-yellow-700 font-medium"
                        >
                          ⏳ Pending Transactions (
                          {
                            transactions.filter((t) => t.status === "pending")
                              .length
                          }
                          )
                        </option>
                        <option
                          value="failed"
                          className="text-red-700 font-medium"
                        >
                          ❌ Failed Transactions (
                          {
                            transactions.filter((t) => t.status === "failed")
                              .length
                          }
                          )
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

                  {/* Enhanced Type Filter */}
                  <div className="space-y-2">
                    <div className="relative">
                      <label
                        htmlFor="type-filter"
                        className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                      >
                        Filter by Type
                      </label>
                      <select
                        id="type-filter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
                      >
                        <option
                          value="all"
                          className="text-gray-600 font-medium"
                        >
                          📋 View All Transaction Types
                        </option>
                        <option
                          value="top up"
                          className="text-blue-700 font-medium"
                        >
                          💳 Top Up Transactions
                        </option>
                        <option
                          value="refund"
                          className="text-purple-700 font-medium"
                        >
                          🔄 Refund Transactions
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
                filterType !== "all") && (
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

                      {filterType !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Type:{" "}
                          {filterType.charAt(0).toUpperCase() +
                            filterType.slice(1)}
                          <button
                            onClick={() => setFilterType("all")}
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
                      {filteredTransactions.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {transactions.length}
                    </span>{" "}
                    transactions
                  </div>
                </div>
              )}
            </div>

            {/* Transactions Table */}
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
                      style={{ minWidth: "1000px" }}
                    >
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                            Transaction
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[160px]">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentTransactions.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {transaction.id}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {transaction.orderId}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {transaction.user}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {transaction.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="min-w-0">
                                <div className="text-sm text-gray-900 truncate">
                                  {transaction.product}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {transaction.paymentMethod}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                                  transaction.status
                                )}`}
                              >
                                {transaction.status.charAt(0).toUpperCase() +
                                  transaction.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-xs">
                                {formatDate(transaction.date)}
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
                {currentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="min-w-0 flex-1 mr-3">
                        <h3 className="font-medium text-gray-900 truncate">
                          {transaction.id}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {transaction.orderId}
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getStatusBadge(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          User:
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate ml-2 text-right">
                          {transaction.user}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Product:
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate ml-2 text-right">
                          {transaction.product}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Amount:
                        </span>
                        <span className="text-sm font-bold text-gray-900 shrink-0">
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Date:
                        </span>
                        <span className="text-sm text-gray-900 shrink-0 text-right">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
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
                            filteredTransactions.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredTransactions.length}
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
          </div>
        </div>
      </div>
    </>
  );
}
