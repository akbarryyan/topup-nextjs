"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import ReportsHeader from "@/components/admin/reports/ReportsHeader";
import ReportsTypeSelection from "@/components/admin/reports/ReportsTypeSelection";
import ReportsContent from "@/components/admin/reports/ReportsContent";

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
            <ReportsHeader 
              dateRange={dateRange} 
              setDateRange={setDateRange} 
              scheduleReport={scheduleReport} 
            />

            {/* Report Type Selection */}
            <ReportsTypeSelection 
              reportTypes={reportTypes}
              selectedReport={selectedReport}
              setSelectedReport={setSelectedReport}
            />

            {/* Report Content */}
            <ReportsContent 
              currentReport={currentReport}
              selectedReport={selectedReport}
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
              generateReport={generateReport}
            />

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
