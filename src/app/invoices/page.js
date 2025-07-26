"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CekInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

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
    if (!invoiceNumber.trim()) {
      // Jika input kosong, tampilkan semua data
      setSearchResults(sampleTransactions);
      setIsFiltered(false);
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Filter transactions based on invoice number or user ID
      const filtered = sampleTransactions.filter(
        (transaction) =>
          transaction.id.toLowerCase().includes(invoiceNumber.toLowerCase()) ||
          transaction.userId.includes(invoiceNumber) ||
          transaction.game.toLowerCase().includes(invoiceNumber.toLowerCase())
      );
      setSearchResults(filtered);
      setIsFiltered(true);
      setIsSearching(false);
    }, 500);
  };

  // Function to clear search and show all data
  const clearSearch = () => {
    setInvoiceNumber("");
    setSearchResults(sampleTransactions);
    setIsFiltered(false);
  };

  // Initialize with all data on component mount
  const displayData =
    searchResults.length > 0 || isFiltered ? searchResults : sampleTransactions;

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
                  placeholder="Masukkan nomor invoice, ID User, atau nama game"
                  className="flex-1 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-[#5F666D] placeholder:text-sm text-white"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-4 py-2 bg-[#A58C6F] text-white rounded-md hover:bg-[#96794F] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
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
                {isFiltered && (
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium text-sm"
                  >
                    Reset
                  </button>
                )}
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
                {isFiltered
                  ? `Menampilkan ${displayData.length} hasil pencarian dari ${sampleTransactions.length} total transaksi`
                  : `Menampilkan semua transaksi (${displayData.length} transaksi)`}
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-[#1a1a1a]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tanggal & Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Game & Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Metode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#2C2C2B] divide-y divide-gray-600">
                  {displayData.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-[#3a3a3a]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div>
                          <div>{transaction.date}</div>
                          <div className="text-xs text-gray-400">
                            {transaction.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div>
                          <div className="font-medium text-white">
                            {transaction.game}
                          </div>
                          <div className="text-xs">{transaction.item}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">
                        {transaction.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
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
            <div className="md:hidden divide-y divide-gray-600">
              {displayData.map((transaction) => (
                <div key={transaction.id} className="p-4 bg-[#2C2C2B]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {transaction.id}
                      </h3>
                      <p className="text-xs text-gray-400">
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
                      <span className="text-sm text-gray-400">Game:</span>
                      <span className="text-sm font-medium text-white">
                        {transaction.game}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Item:</span>
                      <span className="text-sm text-gray-300">
                        {transaction.item}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">User ID:</span>
                      <span className="text-sm font-mono text-gray-300">
                        {transaction.userId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Jumlah:</span>
                      <span className="text-sm font-bold text-white">
                        {transaction.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Metode:</span>
                      <span className="text-sm text-gray-300">
                        {transaction.method}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
