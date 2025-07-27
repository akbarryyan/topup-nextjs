"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("7d");

  // Sample analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 15750000,
      totalTransactions: 342,
      totalUsers: 1285,
      conversionRate: 23.5,
      revenueGrowth: 12.3,
      transactionGrowth: 8.7,
      userGrowth: 15.2,
      conversionGrowth: -2.1,
    },
    dailyStats: [
      { date: "2025-01-21", revenue: 2100000, transactions: 45, users: 12 },
      { date: "2025-01-22", revenue: 1850000, transactions: 38, users: 8 },
      { date: "2025-01-23", revenue: 2300000, transactions: 52, users: 15 },
      { date: "2025-01-24", revenue: 1950000, transactions: 41, users: 10 },
      { date: "2025-01-25", revenue: 2450000, transactions: 58, users: 18 },
      { date: "2025-01-26", revenue: 2200000, transactions: 47, users: 13 },
      { date: "2025-01-27", revenue: 2900000, transactions: 61, users: 22 },
    ],
    topProducts: [
      {
        name: "Mobile Legends Diamond",
        revenue: 4500000,
        transactions: 89,
        percentage: 28.6,
      },
      {
        name: "Free Fire Diamond",
        revenue: 3200000,
        transactions: 67,
        percentage: 20.3,
      },
      { name: "PUBG UC", revenue: 2800000, transactions: 52, percentage: 17.8 },
      {
        name: "Genshin Impact Genesis",
        revenue: 2100000,
        transactions: 38,
        percentage: 13.3,
      },
      {
        name: "Valorant Point",
        revenue: 1850000,
        transactions: 34,
        percentage: 11.7,
      },
      { name: "Others", revenue: 1300000, transactions: 62, percentage: 8.3 },
    ],
    paymentMethods: [
      { name: "QRIS", amount: 5250000, percentage: 33.3, transactions: 125 },
      {
        name: "Bank Transfer",
        amount: 4200000,
        percentage: 26.7,
        transactions: 98,
      },
      { name: "E-Wallet", amount: 3150000, percentage: 20.0, transactions: 76 },
      {
        name: "Credit Card",
        amount: 2100000,
        percentage: 13.3,
        transactions: 32,
      },
      {
        name: "Virtual Account",
        amount: 1050000,
        percentage: 6.7,
        transactions: 11,
      },
    ],
    userActivity: {
      activeUsers: 892,
      newUsers: 127,
      returningUsers: 765,
      avgSessionDuration: "12m 34s",
      bounceRate: 24.8,
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const isPositive = value >= 0;
    return (
      <span
        className={`inline-flex items-center text-xs font-medium ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? "↗️" : "↘️"} {Math.abs(value)}%
      </span>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <div className="lg:pl-64 pb-16 pt-3">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Track performance metrics and gain insights
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm font-medium"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                  </select>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {/* Revenue Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-50 rounded-lg group-hover:from-green-200 group-hover:to-emerald-100 transition-all duration-300">
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
                    {formatPercentage(analyticsData.overview.revenueGrowth)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      Total Revenue
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      {formatCurrency(analyticsData.overview.totalRevenue)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transactions Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  {formatPercentage(analyticsData.overview.transactionGrowth)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Total Transactions
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {analyticsData.overview.totalTransactions.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  {formatPercentage(analyticsData.overview.userGrowth)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Total Users
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {analyticsData.overview.totalUsers.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Conversion Rate Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  {formatPercentage(analyticsData.overview.conversionGrowth)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    Conversion Rate
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {analyticsData.overview.conversionRate}%
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Revenue Trend
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Daily Revenue</span>
                  </div>
                </div>

                {/* Simple Bar Chart */}
                <div className="space-y-4">
                  {analyticsData.dailyStats.map((day, index) => {
                    const maxRevenue = Math.max(
                      ...analyticsData.dailyStats.map((d) => d.revenue)
                    );
                    const percentage = (day.revenue / maxRevenue) * 100;
                    const date = new Date(day.date).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    );

                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-16 text-xs text-gray-600 font-medium">
                          {date}
                        </div>
                        <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-xs text-white font-medium">
                              {formatCurrency(day.revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 text-xs text-gray-600 text-right">
                          {day.transactions}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Top Products
                </h3>
                <div className="space-y-4">
                  {analyticsData.topProducts.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-orange-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.transactions} transactions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(product.revenue)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Methods & User Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Payment Methods */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Payment Methods
                </h3>
                <div className="space-y-4">
                  {analyticsData.paymentMethods.map((method, index) => {
                    const colors = [
                      "bg-green-500",
                      "bg-blue-500",
                      "bg-purple-500",
                      "bg-yellow-500",
                      "bg-red-500",
                    ];
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div
                            className={`w-4 h-4 rounded-full ${colors[index]}`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {method.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {method.transactions} transactions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(method.amount)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {method.percentage}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* User Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  User Activity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {analyticsData.userActivity.activeUsers}
                    </div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {analyticsData.userActivity.newUsers}
                    </div>
                    <div className="text-sm text-gray-600">New Users</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {analyticsData.userActivity.avgSessionDuration}
                    </div>
                    <div className="text-sm text-gray-600">Avg. Session</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {analyticsData.userActivity.bounceRate}%
                    </div>
                    <div className="text-sm text-gray-600">Bounce Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-blue-900">
                    Revenue Insight
                  </h4>
                </div>
                <p className="text-sm text-blue-800">
                  Revenue increased by 12.3% this week, driven by higher Mobile
                  Legends Diamond sales.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-green-900">User Growth</h4>
                </div>
                <p className="text-sm text-green-800">
                  User acquisition is performing well with 15.2% growth and
                  strong retention rates.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
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
                  <h4 className="font-semibold text-yellow-900">
                    Attention Needed
                  </h4>
                </div>
                <p className="text-sm text-yellow-800">
                  Conversion rate decreased by 2.1%. Consider optimizing the
                  checkout flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
