"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import TransactionsHeader from "@/components/admin/transactions/TransactionsHeader";
import TransactionsStats from "@/components/admin/transactions/TransactionsStats";
import TransactionsFilters from "@/components/admin/transactions/TransactionsFilters";
import TransactionsTable from "@/components/admin/transactions/TransactionsTable";

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
        {/* Sidebar */}
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen overflow-hidden">
          {/* Header */}
          <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

          {/* Dashboard Content */}
          <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto">
            {/* Page Header */}
            <TransactionsHeader />

            {/* Stats Cards */}
            <TransactionsStats transactions={transactions} />

            {/* Filters and Search */}
            <TransactionsFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterType={filterType}
              setFilterType={setFilterType}
              setCurrentPage={setCurrentPage}
              transactions={transactions}
              filteredTransactions={filteredTransactions}
            />

            {/* Transactions Table */}
            <TransactionsTable
              currentTransactions={currentTransactions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              filteredTransactions={filteredTransactions}
              itemsPerPage={itemsPerPage}
            />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
