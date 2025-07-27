"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("revenue");
  const [dateRange, setDateRange] = useState("30d");
  const [exportFormat, setExportFormat] = useState("pdf");

  // Sample reports data
  const reportsData = {
    revenue: {
      title: "Revenue Report",
      description: "Comprehensive revenue analysis and trends",
      data: [
        {
          period: "January 2025",
          revenue: 45750000,
          growth: 12.3,
          transactions: 892,
        },
        {
          period: "December 2024",
          revenue: 40250000,
          growth: 8.7,
          transactions: 743,
        },
        {
          period: "November 2024",
          revenue: 37100000,
          growth: 15.2,
          transactions: 651,
        },
        {
          period: "October 2024",
          revenue: 32200000,
          growth: 6.8,
          transactions: 598,
        },
        {
          period: "September 2024",
          revenue: 30150000,
          growth: -2.1,
          transactions: 612,
        },
      ],
      summary: {
        totalRevenue: 185450000,
        avgGrowth: 8.18,
        totalTransactions: 3496,
        avgTicket: 53058,
      },
    },
    transactions: {
      title: "Transaction Report",
      description: "Detailed transaction analytics and patterns",
      data: [
        {
          period: "Week 4",
          transactions: 234,
          success: 228,
          failed: 6,
          rate: 97.4,
        },
        {
          period: "Week 3",
          transactions: 198,
          success: 192,
          failed: 6,
          rate: 97.0,
        },
        {
          period: "Week 2",
          transactions: 187,
          success: 179,
          failed: 8,
          rate: 95.7,
        },
        {
          period: "Week 1",
          transactions: 156,
          success: 148,
          failed: 8,
          rate: 94.9,
        },
      ],
      summary: {
        totalTransactions: 775,
        successRate: 96.3,
        failedTransactions: 28,
        avgPerDay: 27.7,
      },
    },
    users: {
      title: "User Activity Report",
      description: "User engagement and behavior analytics",
      data: [
        {
          period: "This Month",
          active: 1285,
          new: 127,
          returning: 1158,
          retention: 90.1,
        },
        {
          period: "Last Month",
          active: 1198,
          new: 89,
          returning: 1109,
          retention: 92.6,
        },
        {
          period: "2 Months Ago",
          active: 1156,
          new: 134,
          returning: 1022,
          retention: 88.4,
        },
        {
          period: "3 Months Ago",
          active: 1089,
          new: 156,
          returning: 933,
          retention: 85.7,
        },
      ],
      summary: {
        totalUsers: 1285,
        avgRetention: 89.2,
        newUsersGrowth: 42.7,
        activeUsersGrowth: 18.0,
      },
    },
    products: {
      title: "Product Performance Report",
      description: "Analysis of top-performing products and categories",
      data: [
        {
          product: "Mobile Legends Diamond",
          revenue: 12450000,
          units: 234,
          growth: 18.5,
        },
        {
          product: "Free Fire Diamond",
          revenue: 9200000,
          units: 187,
          growth: 12.3,
        },
        { product: "PUBG UC", revenue: 7850000, units: 156, growth: 8.7 },
        {
          product: "Genshin Impact Genesis",
          revenue: 6300000,
          units: 134,
          growth: 15.2,
        },
        {
          product: "Valorant Point",
          revenue: 5150000,
          units: 123,
          growth: -3.4,
        },
      ],
      summary: {
        totalProducts: 45,
        bestPerformer: "Mobile Legends Diamond",
        avgGrowth: 10.26,
        totalUnits: 834,
      },
    },
  };

  const reportTypes = [
    { id: "revenue", name: "Revenue Report", icon: "💰", color: "green" },
    {
      id: "transactions",
      name: "Transaction Report",
      icon: "📊",
      color: "blue",
    },
    { id: "users", name: "User Activity Report", icon: "👥", color: "purple" },
    {
      id: "products",
      name: "Product Performance",
      icon: "🎮",
      color: "orange",
    },
  ];

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

  const generateReport = () => {
    alert(
      `Generating ${
        reportsData[selectedReport].title
      } in ${exportFormat.toUpperCase()} format for ${dateRange}`
    );
  };

  const scheduleReport = () => {
    alert("Report scheduling feature would be implemented here");
  };

  const currentReport = reportsData[selectedReport];

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
                    Reports Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Generate and analyze comprehensive business reports
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm font-medium"
                  >
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="1y">Last Year</option>
                  </select>
                  <button
                    onClick={scheduleReport}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                  >
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Report Type Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedReport === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50 ring-2 ring-${type.color}-200`
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`text-2xl p-3 rounded-lg ${
                        selectedReport === type.id
                          ? `bg-${type.color}-100`
                          : "bg-gray-100"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          selectedReport === type.id
                            ? `text-${type.color}-900`
                            : "text-gray-900"
                        }`}
                      >
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600">Click to select</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Report Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {currentReport.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {currentReport.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                    >
                      <option value="pdf">📄 PDF</option>
                      <option value="excel">📊 Excel</option>
                      <option value="csv">📋 CSV</option>
                    </select>
                    <button
                      onClick={generateReport}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                    >
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
                      Export Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Report Summary Cards */}
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Report Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedReport === "revenue" && (
                    <>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Revenue
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {formatCurrency(currentReport.summary.totalRevenue)}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Avg Growth
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {currentReport.summary.avgGrowth}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Transactions
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.totalTransactions.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Avg Ticket
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {formatCurrency(currentReport.summary.avgTicket)}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedReport === "transactions" && (
                    <>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Transactions
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.totalTransactions.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Success Rate
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {currentReport.summary.successRate}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Failed Transactions
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          {currentReport.summary.failedTransactions}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Avg Per Day
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.avgPerDay}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedReport === "users" && (
                    <>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Users
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.totalUsers.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Avg Retention
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {currentReport.summary.avgRetention}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          New Users Growth
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {currentReport.summary.newUsersGrowth}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Active Users Growth
                        </div>
                        <div className="text-xl font-bold text-purple-600">
                          {currentReport.summary.activeUsersGrowth}%
                        </div>
                      </div>
                    </>
                  )}

                  {selectedReport === "products" && (
                    <>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Products
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.totalProducts}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Best Performer
                        </div>
                        <div className="text-sm font-bold text-yellow-600">
                          {currentReport.summary.bestPerformer}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Avg Growth
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {currentReport.summary.avgGrowth}%
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">
                          Total Units Sold
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {currentReport.summary.totalUnits.toLocaleString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Report Data Table */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {selectedReport === "revenue" && (
                          <>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                              Period
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Revenue
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Growth
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Transactions
                            </th>
                          </>
                        )}
                        {selectedReport === "transactions" && (
                          <>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                              Period
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Total
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Success
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Failed
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Success Rate
                            </th>
                          </>
                        )}
                        {selectedReport === "users" && (
                          <>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                              Period
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Active
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              New
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Returning
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Retention
                            </th>
                          </>
                        )}
                        {selectedReport === "products" && (
                          <>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">
                              Product
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Revenue
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Units
                            </th>
                            <th className="text-right py-3 px-4 font-semibold text-gray-900">
                              Growth
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {currentReport.data.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          {selectedReport === "revenue" && (
                            <>
                              <td className="py-4 px-4 font-medium text-gray-900">
                                {item.period}
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                {formatCurrency(item.revenue)}
                              </td>
                              <td className="py-4 px-4 text-right">
                                {formatPercentage(item.growth)}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-600">
                                {item.transactions}
                              </td>
                            </>
                          )}
                          {selectedReport === "transactions" && (
                            <>
                              <td className="py-4 px-4 font-medium text-gray-900">
                                {item.period}
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                {item.transactions}
                              </td>
                              <td className="py-4 px-4 text-right text-green-600">
                                {item.success}
                              </td>
                              <td className="py-4 px-4 text-right text-red-600">
                                {item.failed}
                              </td>
                              <td className="py-4 px-4 text-right font-medium text-blue-600">
                                {item.rate}%
                              </td>
                            </>
                          )}
                          {selectedReport === "users" && (
                            <>
                              <td className="py-4 px-4 font-medium text-gray-900">
                                {item.period}
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                {item.active}
                              </td>
                              <td className="py-4 px-4 text-right text-green-600">
                                {item.new}
                              </td>
                              <td className="py-4 px-4 text-right text-blue-600">
                                {item.returning}
                              </td>
                              <td className="py-4 px-4 text-right font-medium text-purple-600">
                                {item.retention}%
                              </td>
                            </>
                          )}
                          {selectedReport === "products" && (
                            <>
                              <td className="py-4 px-4 font-medium text-gray-900">
                                {item.product}
                              </td>
                              <td className="py-4 px-4 text-right font-semibold text-gray-900">
                                {formatCurrency(item.revenue)}
                              </td>
                              <td className="py-4 px-4 text-right text-gray-600">
                                {item.units}
                              </td>
                              <td className="py-4 px-4 text-right">
                                {formatPercentage(item.growth)}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-4">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Custom Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Create tailored reports
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-4">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Automated Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Schedule recurring reports
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Share Reports
                    </h4>
                    <p className="text-sm text-gray-600">
                      Collaborate with team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
