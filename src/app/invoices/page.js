"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CekInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Sample transaction data
  const sampleTransactions = [
    {
      id: "INV-001",
      date: "2025-01-26",
      time: "14:30:25",
      game: "Mobile Legends",
      item: "86 Diamonds",
      userId: "123456789",
      amount: "Rp 25.000",
      status: "Berhasil",
      method: "DANA",
    },
    {
      id: "INV-002",
      date: "2025-01-26",
      time: "13:15:42",
      game: "Free Fire",
      item: "100 Diamonds",
      userId: "987654321",
      amount: "Rp 15.000",
      status: "Pending",
      method: "OVO",
    },
    {
      id: "INV-003",
      date: "2025-01-26",
      time: "12:45:18",
      game: "PUBG Mobile",
      item: "325 UC",
      userId: "555666777",
      amount: "Rp 50.000",
      status: "Gagal",
      method: "GoPay",
    },
    {
      id: "INV-004",
      date: "2025-01-26",
      time: "11:20:33",
      game: "Genshin Impact",
      item: "980 Genesis Crystals",
      userId: "111222333",
      amount: "Rp 199.000",
      status: "Berhasil",
      method: "Bank Transfer",
    },
    {
      id: "INV-005",
      date: "2025-01-26",
      time: "10:05:17",
      game: "Valorant",
      item: "1000 VP",
      userId: "444555666",
      amount: "Rp 75.000",
      status: "Berhasil",
      method: "DANA",
    },
  ];

  const handleSearch = () => {
    if (!invoiceNumber.trim()) return;

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      if (invoiceNumber.trim() === "") {
        setSearchResults([]);
      } else {
        // Filter transactions based on invoice number or show all for demo
        const filtered = sampleTransactions.filter(
          (transaction) =>
            transaction.id
              .toLowerCase()
              .includes(invoiceNumber.toLowerCase()) ||
            transaction.userId.includes(invoiceNumber) ||
            invoiceNumber.toLowerCase() === "all"
        );
        setSearchResults(filtered);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Berhasil":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Gagal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Section */}
          <div className="bg-[#2C2C2B] rounded-lg shadow-md py-9 px-4 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Cek Invoice
              </h1>
              <p className="text-gray-300">
                Masukkan nomor invoice untuk melihat detail transaksi
              </p>
            </div>
            <div className="max-w-md mx-auto bg-[#262727] rounded-2xl px-5 py-5">
              <label
                htmlFor="invoice"
                className="block text-sm font-semibold text-white mb-3"
              >
                Nomor Invoice
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  id="invoice"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Masukkan nomor invoice atau ID User"
                  className="flex-1 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-[#5F666D] placeholder:text-sm"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="py-2 bg-[#A58C6F] text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mencari...</span>
                    </div>
                  ) : (
                    "Cari Invoice"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Real Time Transactions Section */}
          <div className="bg-[#2C2C2B] rounded-lg shadow-md">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Transaksi Real Time
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                {searchResults.length > 0
                  ? `Menampilkan ${searchResults.length} hasil pencarian`
                  : "Data transaksi terbaru akan ditampilkan di sini"}
              </p>
            </div>

            {searchResults.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal & Waktu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Game & Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metode
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <div>{transaction.date}</div>
                              <div className="text-xs text-gray-400">
                                {transaction.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>
                              <div className="font-medium text-gray-900">
                                {transaction.game}
                              </div>
                              <div className="text-xs">{transaction.item}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                            {transaction.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.method}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                transaction.status
                              )}`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {searchResults.map((transaction) => (
                    <div key={transaction.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {transaction.id}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {transaction.date} {transaction.time}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Game:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {transaction.game}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Item:</span>
                          <span className="text-sm text-gray-900">
                            {transaction.item}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            User ID:
                          </span>
                          <span className="text-sm font-mono text-gray-900">
                            {transaction.userId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Jumlah:</span>
                          <span className="text-sm font-bold text-gray-900">
                            {transaction.amount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Metode:</span>
                          <span className="text-sm text-gray-900">
                            {transaction.method}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-200 mb-2">
                  Belum ada data transaksi
                </h3>
                <p className="text-gray-300">
                  Masukkan nomor invoice untuk mencari transaksi
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
