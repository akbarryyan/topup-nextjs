"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebarLight";
import AdminHeader from "@/components/admin/AdminHeaderLight";
import DashboardStats from "@/components/admin/DashboardStats";
import TransactionTable from "@/components/admin/TransactionTableLight";
import PerformanceChart from "@/components/admin/PerformanceChartLight";
import WelcomeSection from "@/components/admin/WelcomeSection";
import QuickStats from "@/components/admin/QuickStats";

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
          <WelcomeSection />

          {/* Stats Cards */}
          <DashboardStats />

          {/* Charts & Tables Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {/* Performance Chart */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <PerformanceChart />
            </div>

            {/* Quick Stats */}
            <div className="order-1 xl:order-2">
              <QuickStats />
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
