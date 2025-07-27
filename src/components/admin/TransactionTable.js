"use client";

import { useState } from "react";

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    {
      id: "TXN-007",
      user: "David Lee",
      product: "Free Fire - 1000 Diamonds",
      amount: "Rp 230,000",
      status: "completed",
      date: "2025-01-15 08:20",
      method: "GoPay",
    },
    {
      id: "TXN-008",
      user: "Sophie Chen",
      product: "Mobile Legends - 5000 Diamonds",
      amount: "Rp 950,000",
      status: "completed",
      date: "2025-01-15 07:10",
      method: "Bank Transfer",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "failed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="bg-gradient-to-br from-[#2a2b35] via-[#2e2f3a] to-[#32333e] border border-[#D5D4FF]/20 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#D5D4FF]/10 bg-gradient-to-r from-[#51508B]/10 to-[#8197E5]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h3 className="text-[#F2F5FF] text-lg sm:text-xl font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#8197E5]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
              </svg>
              Recent Transactions
            </h3>
            <p className="text-[#D5D4FF]/70 text-sm mt-1">
              Monitor all transaction activities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <select className="bg-[#51508B]/50 border border-[#D5D4FF]/20 rounded-lg px-3 py-2 text-[#F2F5FF] text-sm focus:outline-none focus:border-[#8197E5] focus:bg-[#51508B] transition-all duration-200">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <button className="bg-gradient-to-r from-[#8197E5] to-[#7086d4] hover:from-[#7086d4] hover:to-[#6075c3] text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#51508B]/20">
            <tr>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Transaction ID
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                User
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Product
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Method
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Status
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Date
              </th>
              <th className="text-left px-6 py-3 text-[#D5D4FF] text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="border-t border-[#D5D4FF]/10 hover:bg-[#D5D4FF]/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-[#8197E5] font-medium text-sm">
                    {transaction.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#8197E5]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#8197E5] text-xs font-medium">
                        {transaction.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-[#F2F5FF] text-sm">
                      {transaction.user}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#F2F5FF] text-sm">
                    {transaction.product}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#F2F5FF] font-medium text-sm">
                    {transaction.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#D5D4FF] text-sm">
                    {transaction.method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#D5D4FF] text-sm">
                    {transaction.date}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-[#8197E5] hover:text-[#7086d4] transition-colors">
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
                    <button className="text-[#D5D4FF] hover:text-[#F2F5FF] transition-colors">
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
      <div className="px-6 py-4 border-t border-[#D5D4FF]/10 flex items-center justify-between">
        <div className="text-[#D5D4FF] text-sm">
          Showing {startIndex + 1} to {Math.min(endIndex, transactions.length)}{" "}
          of {transactions.length} transactions
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg text-sm bg-[#51508B]/50 text-[#D5D4FF] hover:bg-[#51508B] hover:text-[#F2F5FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                currentPage === i + 1
                  ? "bg-[#8197E5] text-white"
                  : "bg-[#51508B]/50 text-[#D5D4FF] hover:bg-[#51508B] hover:text-[#F2F5FF]"
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
            className="px-3 py-1 rounded-lg text-sm bg-[#51508B]/50 text-[#D5D4FF] hover:bg-[#51508B] hover:text-[#F2F5FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
