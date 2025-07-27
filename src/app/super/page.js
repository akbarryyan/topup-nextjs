"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import TransactionTable from "@/components/admin/TransactionTable";
import PerformanceChart from "@/components/admin/PerformanceChart";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b23] via-[#1e1f2a] to-[#22232e] flex">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Welcome Section */}
          <div className="relative bg-gradient-to-r from-[#51508B] via-[#6b5fb5] to-[#8197E5] rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-[#F2F5FF] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-white rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-4">
                Welcome to Admin Dashboard
              </h1>
              <p className="text-[#D5D4FF] text-sm sm:text-base lg:text-lg opacity-90">
                Monitor your business performance and manage transactions
                efficiently
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Charts & Tables Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Performance Chart */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <PerformanceChart />
            </div>

            {/* Quick Stats */}
            <div className="space-y-4 sm:space-y-6 order-1 xl:order-2">
              <div className="bg-gradient-to-br from-[#2a2b35] to-[#32333e] border border-[#D5D4FF]/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
                <h3 className="text-[#F2F5FF] font-semibold mb-4 text-base sm:text-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[#8197E5]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                  <button className="w-full bg-gradient-to-r from-[#8197E5] to-[#7086d4] hover:from-[#7086d4] hover:to-[#6075c3] text-white py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Add New Product
                  </button>
                  <button className="w-full bg-gradient-to-r from-[#51508B] to-[#5a5994] hover:from-[#5a5994] hover:to-[#63629d] text-[#F2F5FF] py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    View All Users
                  </button>
                  <button className="w-full bg-[#D5D4FF]/20 hover:bg-[#D5D4FF]/30 text-[#D5D4FF] py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium border border-[#D5D4FF]/30 hover:border-[#D5D4FF]/50 transform hover:-translate-y-1">
                    Generate Report
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2a2b35] to-[#32333e] border border-[#D5D4FF]/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
                <h3 className="text-[#F2F5FF] font-semibold mb-4 text-base sm:text-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[#8197E5]"
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
                <div className="space-y-3">
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
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#D5D4FF]/5 transition-colors duration-200"
                    >
                      <div
                        className={`w-3 h-3 rounded-full shadow-sm ${
                          activity.type === "user"
                            ? "bg-[#8197E5] shadow-[#8197E5]/50"
                            : activity.type === "transaction"
                            ? "bg-green-400 shadow-green-400/50"
                            : "bg-[#D5D4FF] shadow-[#D5D4FF]/50"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-[#F2F5FF] text-xs sm:text-sm font-medium">
                          {activity.action}
                        </p>
                        <p className="text-[#D5D4FF]/70 text-xs">
                          {activity.time}
                        </p>
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
