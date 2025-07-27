"use client";

import { useState } from "react";

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
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
    },
    {
      id: "TXN-002",
      user: "Jane Smith",
      product: "Free Fire - 500 Diamonds",
      amount: "Rp 125,000",
      status: "pending",
      date: "2025-01-15 13:45",
      method: "GoPay",
    },
    {
      id: "TXN-003",
      user: "Bob Wilson",
      product: "PUBG Mobile - UC 325",
      amount: "Rp 89,000",
      status: "completed",
      date: "2025-01-15 12:20",
      method: "OVO",
    },
    {
      id: "TXN-004",
      user: "Alice Brown",
      product: "Mobile Legends - 2000 Diamonds",
      amount: "Rp 450,000",
      status: "failed",
      date: "2025-01-15 11:15",
      method: "Bank Transfer",
    },
    {
      id: "TXN-005",
      user: "Charlie Davis",
      product: "Valorant - 1000 VP",
      amount: "Rp 200,000",
      status: "completed",
      date: "2025-01-15 10:30",
      method: "Dana",
    },
    {
      id: "TXN-006",
      user: "Eva Martinez",
      product: "Genshin Impact - 680 Genesis",
      amount: "Rp 150,000",
      status: "pending",
      date: "2025-01-15 09:45",
      method: "ShopeePay",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h3 className="text-gray-900 text-base sm:text-lg font-bold flex items-center gap-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
              </svg>
              Recent Transactions
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Monitor all transaction activities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-blue-500 transition-all duration-200">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {currentTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="p-3 sm:p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-blue-600 font-semibold text-sm">
                  {transaction.id}
                </p>
                <p className="text-gray-900 font-medium text-sm">
                  {transaction.user}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                  transaction.status
                )}`}
              >
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {transaction.product}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-900 font-semibold">
                {transaction.amount}
              </span>
              <span className="text-gray-500">{transaction.method}</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">{transaction.date}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Transaction ID
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                User
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Product
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Method
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Status
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Date
              </th>
              <th className="text-left px-6 py-3 text-gray-700 text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-blue-600 font-semibold text-sm">
                    {transaction.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">
                        {transaction.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-gray-900 text-sm font-medium">
                      {transaction.user}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 text-sm">
                    {transaction.product}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900 font-semibold text-sm">
                    {transaction.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 text-sm">
                    {transaction.method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-500 text-sm">
                    {transaction.date}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors p-1">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
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
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-gray-600 text-sm">
          Showing {startIndex + 1} to {Math.min(endIndex, transactions.length)}{" "}
          of {transactions.length} transactions
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg text-sm bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg text-sm bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
