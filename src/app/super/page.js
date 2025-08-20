"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebarLight";
import AdminHeader from "@/components/admin/AdminHeaderLight";
import DashboardStats from "@/components/admin/DashboardStats";
import TransactionTable from "@/components/admin/TransactionTableLight";
import PerformanceChart from "@/components/admin/PerformanceChartLight";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen overflow-hidden">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      Welcome Back!
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                      Here's what's happening with your business today
                    </p>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">
                          Total Users
                        </p>
                        <p className="text-lg font-bold text-blue-900">1,247</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          Revenue
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          $24.5K
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium">
                          Orders
                        </p>
                        <p className="text-lg font-bold text-purple-900">342</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Current Time & Date */}
              <div className="hidden lg:block text-right ml-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Current Time
                  </p>
                  <p className="text-lg font-bold text-gray-900">14:35</p>
                  <p className="text-xs text-gray-600 mt-2">Aug 20, 2025</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">
                      System Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Charts & Tables Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Performance Chart */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <PerformanceChart />
            </div>

            {/* Quick Stats */}
            <div className="space-y-3 sm:space-y-4 order-1 xl:order-2">
              <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-gray-800 font-bold mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Add New Product
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    View All Users
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium border border-gray-300 hover:border-gray-400 transform hover:-translate-y-0.5">
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-gray-800 font-bold mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Recent Activity
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      action: "New user registered",
                      time: "2 min ago",
                      type: "user",
                    },
                    {
                      action: "Transaction completed",
                      time: "5 min ago",
                      type: "transaction",
                    },
                    {
                      action: "Product updated",
                      time: "10 min ago",
                      type: "product",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                          activity.type === "user"
                            ? "bg-blue-500"
                            : activity.type === "transaction"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 text-xs sm:text-sm font-medium truncate">
                          {activity.action}
                        </p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <TransactionTable />
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
  );
}
