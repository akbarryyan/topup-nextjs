"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import AnalyticsHeader from "@/components/admin/analytics/AnalyticsHeader";
import AnalyticsOverview from "@/components/admin/analytics/AnalyticsOverview";
import AnalyticsCharts from "@/components/admin/analytics/AnalyticsCharts";
import AnalyticsDetails from "@/components/admin/analytics/AnalyticsDetails";

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

  return (
    <>
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
            <AnalyticsHeader timeFilter={timeFilter} setTimeFilter={setTimeFilter} />

            {/* Overview Stats */}
            <AnalyticsOverview analyticsData={analyticsData} />

            {/* Charts Row */}
            <AnalyticsCharts analyticsData={analyticsData} />

            {/* Payment Methods & User Activity */}
            <AnalyticsDetails analyticsData={analyticsData} />
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
