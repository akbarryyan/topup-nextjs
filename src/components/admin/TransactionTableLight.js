"use client";

import { useState } from "react";

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const itemsPerPage = 6;

  const transactions = [
    {
      id: "TXN-001",
      user: "John Doe",
      product: "Mobile Legends - 1000 Diamonds",
      amount: "Rp 250,000",
      status: "completed",
      date: "2025-01-15 14:30",
      method: "Dana",
      avatar: "JD"
    },
    {
      id: "TXN-002",
      user: "Jane Smith",
      product: "Free Fire - 500 Diamonds",
      amount: "Rp 125,000",
      status: "pending",
      date: "2025-01-15 13:45",
      method: "GoPay",
      avatar: "JS"
    },
    {
      id: "TXN-003",
      user: "Bob Wilson",
      product: "PUBG Mobile - UC 325",
      amount: "Rp 89,000",
      status: "completed",
      date: "2025-01-15 12:20",
      method: "OVO",
      avatar: "BW"
    },
    {
      id: "TXN-004",
      user: "Alice Brown",
      product: "Mobile Legends - 2000 Diamonds",
      amount: "Rp 450,000",
      status: "failed",
      date: "2025-01-15 11:15",
      method: "Bank Transfer",
      avatar: "AB"
    },
    {
      id: "TXN-005",
      user: "Charlie Davis",
      product: "Valorant - 1000 VP",
      amount: "Rp 200,000",
      status: "completed",
      date: "2025-01-15 10:30",
      method: "Dana",
      avatar: "CD"
    },
    {
      id: "TXN-006",
      user: "Eva Martinez",
      product: "Genshin Impact - 680 Genesis",
      amount: "Rp 150,000",
      status: "pending",
      date: "2025-01-15 09:45",
      method: "ShopeePay",
      avatar: "EM"
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          bg: "bg-green-50"
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          ),
          bg: "bg-yellow-50"
        };
      case "failed":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ),
          bg: "bg-red-50"
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: null,
          bg: "bg-gray-50"
        };
    }
  };

  const getPaymentMethodIcon = (method) => {
    const methodIcons = {
      "Dana": (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
        </svg>
      ),
      "GoPay": (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      "OVO": (
        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      "ShopeePay": (
        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" clipRule="evenodd" />
        </svg>
      ),
      "Bank Transfer": (
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
        </svg>
      )
    };
    return methodIcons[method] || methodIcons["Bank Transfer"];
  };

  // Filter transactions based on selected status
  const filteredTransactions = selectedStatus === "all" 
    ? transactions 
    : transactions.filter(t => t.status === selectedStatus);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-gray-900 text-xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
                </svg>
              </div>
              Recent Transactions
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Monitor all transaction activities and payment status
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select 
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {currentTransactions.map((transaction) => {
          const statusConfig = getStatusConfig(transaction.status);
          return (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 text-sm font-bold">
                      {transaction.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-blue-600 font-bold text-sm">
                      {transaction.id}
                    </p>
                    <p className="text-gray-900 font-semibold text-sm">
                      {transaction.user}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${statusConfig.color}`}>
                  {statusConfig.icon}
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <p className="text-gray-900 font-medium text-sm mb-2 line-clamp-2">
                  {transaction.product}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-bold text-lg">
                    {transaction.amount}
                  </span>
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(transaction.method)}
                    <span className="text-gray-600 text-sm font-medium">
                      {transaction.method}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-gray-500 text-xs">
                  {formatDate(transaction.date)}
                </span>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded-lg hover:bg-blue-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 transition-colors p-1.5 rounded-lg hover:bg-gray-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Pagination */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">
            Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(endIndex, filteredTransactions.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> transactions
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-300 hover:border-gray-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                const isActive = currentPage === pageNumber;
                const isNearActive = Math.abs(currentPage - pageNumber) <= 1;
                const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
                
                if (isActive || isNearActive || isFirstOrLast) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (pageNumber === 2 && currentPage > 3) {
                  return <span key="ellipsis1" className="px-2 text-gray-400">...</span>;
                } else if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                  return <span key="ellipsis2" className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-300 hover:border-gray-400"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
