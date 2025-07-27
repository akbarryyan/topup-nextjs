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
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl lg:rounded-2xl p-4 sm:p-6 text-white overflow-hidden shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full translate-y-8 -translate-x-8"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2">
                Welcome to Admin Dashboard
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm lg:text-base opacity-90">
                Monitor your business performance and manage transactions
                efficiently
              </p>
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
