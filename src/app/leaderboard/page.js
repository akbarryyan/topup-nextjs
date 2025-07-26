"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("today");

  // Sample leaderboard data
  const leaderboardData = {
    today: [
      {
        rank: 1,
        username: "GamerPro123",
        totalSpent: "Rp 2.500.000",
        transactions: 15,
        lastActive: "2 menit yang lalu",
      },
      {
        rank: 2,
        username: "TopUpKing",
        totalSpent: "Rp 2.200.000",
        transactions: 12,
        lastActive: "5 menit yang lalu",
      },
      {
        rank: 3,
        username: "DiamondHunter",
        totalSpent: "Rp 1.850.000",
        transactions: 18,
        lastActive: "10 menit yang lalu",
      },
      {
        rank: 4,
        username: "MLLegend",
        totalSpent: "Rp 1.650.000",
        transactions: 9,
        lastActive: "15 menit yang lalu",
      },
      {
        rank: 5,
        username: "FFMaster",
        totalSpent: "Rp 1.400.000",
        transactions: 11,
        lastActive: "20 menit yang lalu",
      },
      {
        rank: 6,
        username: "PUBGPro",
        totalSpent: "Rp 1.250.000",
        transactions: 8,
        lastActive: "25 menit yang lalu",
      },
      {
        rank: 7,
        username: "ValorantAce",
        totalSpent: "Rp 1.100.000",
        transactions: 7,
        lastActive: "30 menit yang lalu",
      },
      {
        rank: 8,
        username: "GenshinWhale",
        totalSpent: "Rp 950.000",
        transactions: 6,
        lastActive: "35 menit yang lalu",
      },
      {
        rank: 9,
        username: "CoDMobile",
        totalSpent: "Rp 800.000",
        transactions: 5,
        lastActive: "40 menit yang lalu",
      },
      {
        rank: 10,
        username: "GameAddict",
        totalSpent: "Rp 650.000",
        transactions: 4,
        lastActive: "45 menit yang lalu",
      },
    ],
    week: [
      {
        rank: 1,
        username: "TopUpKing",
        totalSpent: "Rp 15.750.000",
        transactions: 89,
        lastActive: "1 menit yang lalu",
      },
      {
        rank: 2,
        username: "GamerPro123",
        totalSpent: "Rp 14.200.000",
        transactions: 76,
        lastActive: "3 menit yang lalu",
      },
      {
        rank: 3,
        username: "DiamondHunter",
        totalSpent: "Rp 12.850.000",
        transactions: 95,
        lastActive: "7 menit yang lalu",
      },
      {
        rank: 4,
        username: "MLLegend",
        totalSpent: "Rp 11.500.000",
        transactions: 63,
        lastActive: "12 menit yang lalu",
      },
      {
        rank: 5,
        username: "GenshinWhale",
        totalSpent: "Rp 10.200.000",
        transactions: 45,
        lastActive: "18 menit yang lalu",
      },
      {
        rank: 6,
        username: "FFMaster",
        totalSpent: "Rp 9.800.000",
        transactions: 67,
        lastActive: "22 menit yang lalu",
      },
      {
        rank: 7,
        username: "PUBGPro",
        totalSpent: "Rp 8.750.000",
        transactions: 54,
        lastActive: "28 menit yang lalu",
      },
      {
        rank: 8,
        username: "ValorantAce",
        totalSpent: "Rp 7.600.000",
        transactions: 41,
        lastActive: "33 menit yang lalu",
      },
      {
        rank: 9,
        username: "CoDMobile",
        totalSpent: "Rp 6.400.000",
        transactions: 38,
        lastActive: "39 menit yang lalu",
      },
      {
        rank: 10,
        username: "GameAddict",
        totalSpent: "Rp 5.250.000",
        transactions: 29,
        lastActive: "44 menit yang lalu",
      },
    ],
    month: [
      {
        rank: 1,
        username: "GenshinWhale",
        totalSpent: "Rp 85.500.000",
        transactions: 234,
        lastActive: "5 menit yang lalu",
      },
      {
        rank: 2,
        username: "TopUpKing",
        totalSpent: "Rp 78.200.000",
        transactions: 312,
        lastActive: "8 menit yang lalu",
      },
      {
        rank: 3,
        username: "DiamondHunter",
        totalSpent: "Rp 65.750.000",
        transactions: 298,
        lastActive: "11 menit yang lalu",
      },
      {
        rank: 4,
        username: "GamerPro123",
        totalSpent: "Rp 58.400.000",
        transactions: 267,
        lastActive: "15 menit yang lalu",
      },
      {
        rank: 5,
        username: "MLLegend",
        totalSpent: "Rp 52.300.000",
        transactions: 189,
        lastActive: "19 menit yang lalu",
      },
      {
        rank: 6,
        username: "FFMaster",
        totalSpent: "Rp 48.900.000",
        transactions: 245,
        lastActive: "24 menit yang lalu",
      },
      {
        rank: 7,
        username: "PUBGPro",
        totalSpent: "Rp 43.200.000",
        transactions: 201,
        lastActive: "29 menit yang lalu",
      },
      {
        rank: 8,
        username: "ValorantAce",
        totalSpent: "Rp 38.700.000",
        transactions: 167,
        lastActive: "34 menit yang lalu",
      },
      {
        rank: 9,
        username: "CoDMobile",
        totalSpent: "Rp 32.500.000",
        transactions: 143,
        lastActive: "38 menit yang lalu",
      },
      {
        rank: 10,
        username: "GameAddict",
        totalSpent: "Rp 28.100.000",
        transactions: 128,
        lastActive: "42 menit yang lalu",
      },
    ],
  };

  const tabs = [
    { id: "today", label: "Hari Ini", icon: "📅" },
    { id: "week", label: "Minggu Ini", icon: "📊" },
    { id: "month", label: "Bulan Ini", icon: "🏆" },
  ];

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1)
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (rank === 2) return "text-gray-300 bg-gray-300/10 border-gray-300/20";
    if (rank === 3) return "text-amber-600 bg-amber-600/10 border-amber-600/20";
    return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  };

  const currentData = leaderboardData[activeTab];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              🏆 Leaderboard Top Up
            </h1>
            <p className="text-gray-300">
              Ranking pemain dengan total top up tertinggi
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-[#2C2C2B] rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#A58C6F] text-white shadow-lg"
                      : "bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a] hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-[#2C2C2B] rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-600">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <span>{tabs.find((t) => t.id === activeTab)?.icon}</span>
                <span>
                  Top 10 - {tabs.find((t) => t.id === activeTab)?.label}
                </span>
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Ranking berdasarkan total pembelian
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#1a1a1a]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaksi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Terakhir Aktif
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#2C2C2B] divide-y divide-gray-600">
                  {currentData.map((player, index) => (
                    <tr
                      key={player.username}
                      className={`hover:bg-[#3a3a3a] transition-colors ${
                        player.rank <= 3
                          ? "bg-gradient-to-r from-transparent to-[#3a3a3a]/30"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border text-sm font-bold ${getRankColor(
                            player.rank
                          )}`}
                        >
                          {getRankBadge(player.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {player.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">
                            {player.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-green-400">
                        {player.totalSpent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {player.transactions} transaksi
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {player.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-600">
              {currentData.map((player) => (
                <div
                  key={player.username}
                  className={`p-4 ${
                    player.rank <= 3
                      ? "bg-gradient-to-r from-transparent to-[#3a3a3a]/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full border text-lg font-bold ${getRankColor(
                          player.rank
                        )}`}
                      >
                        {getRankBadge(player.rank)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {player.username.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">
                            {player.username}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {player.lastActive}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        Total Spent:
                      </span>
                      <span className="text-lg font-bold text-green-400">
                        {player.totalSpent}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Transaksi:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {player.transactions} transaksi
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
