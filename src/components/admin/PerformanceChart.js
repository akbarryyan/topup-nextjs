"use client";

import { useState } from "react";

export default function PerformanceChart() {
  const [timeRange, setTimeRange] = useState("7d");

  // Sample data for demonstration
  const chartData = {
    "7d": [
      { date: "Mon", revenue: 85, transactions: 45 },
      { date: "Tue", revenue: 92, transactions: 52 },
      { date: "Wed", revenue: 78, transactions: 38 },
      { date: "Thu", revenue: 115, transactions: 68 },
      { date: "Fri", revenue: 98, transactions: 55 },
      { date: "Sat", revenue: 142, transactions: 82 },
      { date: "Sun", revenue: 125, transactions: 71 },
    ],
    "30d": [
      { date: "Week 1", revenue: 520, transactions: 285 },
      { date: "Week 2", revenue: 680, transactions: 392 },
      { date: "Week 3", revenue: 450, transactions: 256 },
      { date: "Week 4", revenue: 720, transactions: 415 },
    ],
    "90d": [
      { date: "Month 1", revenue: 2150, transactions: 1248 },
      { date: "Month 2", revenue: 2680, transactions: 1532 },
      { date: "Month 3", revenue: 2420, transactions: 1387 },
    ],
  };

  const maxRevenue = Math.max(...chartData[timeRange].map((d) => d.revenue));
  const maxTransactions = Math.max(
    ...chartData[timeRange].map((d) => d.transactions)
  );

  return (
    <div className="bg-gradient-to-br from-[#2a2b35] via-[#2e2f3a] to-[#32333e] border border-[#D5D4FF]/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-0">
        <div>
          <h3 className="text-[#F2F5FF] text-lg sm:text-xl font-bold mb-1 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#8197E5]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Performance Overview
          </h3>
          <p className="text-[#D5D4FF]/70 text-sm">
            Revenue and transaction trends
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 font-medium ${
                timeRange === range
                  ? "bg-gradient-to-r from-[#8197E5] to-[#51508B] text-white shadow-lg"
                  : "bg-[#51508B]/30 text-[#D5D4FF] hover:bg-[#51508B]/50 hover:text-[#F2F5FF] border border-[#D5D4FF]/20"
              }`}
            >
              {range === "7d"
                ? "Last 7 Days"
                : range === "30d"
                ? "Last 30 Days"
                : "Last 90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Legend */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#8197E5] rounded-full"></div>
            <span className="text-[#D5D4FF] text-sm">Revenue (millions)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D5D4FF] rounded-full"></div>
            <span className="text-[#D5D4FF] text-sm">Transactions</span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#D5D4FF]/60 py-2">
            <span>{maxRevenue}M</span>
            <span>{Math.round(maxRevenue * 0.75)}M</span>
            <span>{Math.round(maxRevenue * 0.5)}M</span>
            <span>{Math.round(maxRevenue * 0.25)}M</span>
            <span>0</span>
          </div>

          {/* Grid lines */}
          <div className="absolute left-12 top-0 right-0 h-full">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute left-0 right-0 border-t border-[#D5D4FF]/10"
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>

          {/* Chart bars */}
          <div className="absolute left-12 top-2 right-0 bottom-8 flex items-end justify-between gap-2">
            {chartData[timeRange].map((data, index) => {
              const revenueHeight = (data.revenue / maxRevenue) * 100;
              const transactionHeight =
                (data.transactions / maxTransactions) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 flex items-end justify-center gap-1 group"
                >
                  {/* Revenue bar */}
                  <div className="relative flex-1 max-w-[20px]">
                    <div
                      className="bg-[#8197E5] rounded-t-sm transition-all duration-300 group-hover:bg-[#7086d4] relative"
                      style={{ height: `${revenueHeight}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#51508B] text-[#F2F5FF] text-xs px-2 py-1 rounded whitespace-nowrap">
                        {data.revenue}M Revenue
                      </div>
                    </div>
                  </div>

                  {/* Transaction bar */}
                  <div className="relative flex-1 max-w-[20px]">
                    <div
                      className="bg-[#D5D4FF]/60 rounded-t-sm transition-all duration-300 group-hover:bg-[#D5D4FF] relative"
                      style={{ height: `${transactionHeight}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#51508B] text-[#F2F5FF] text-xs px-2 py-1 rounded whitespace-nowrap">
                        {data.transactions} Transactions
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-12 bottom-0 right-0 flex justify-between text-xs text-[#D5D4FF]/60">
            {chartData[timeRange].map((data, index) => (
              <span key={index} className="flex-1 text-center">
                {data.date}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#D5D4FF]/10">
        <div className="text-center">
          <div className="text-[#8197E5] text-2xl font-bold">
            {chartData[timeRange].reduce((sum, d) => sum + d.revenue, 0)}M
          </div>
          <div className="text-[#D5D4FF] text-sm">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-[#D5D4FF] text-2xl font-bold">
            {chartData[timeRange].reduce((sum, d) => sum + d.transactions, 0)}
          </div>
          <div className="text-[#D5D4FF] text-sm">Total Transactions</div>
        </div>
        <div className="text-center">
          <div className="text-[#8197E5] text-2xl font-bold">
            {Math.round(
              chartData[timeRange].reduce((sum, d) => sum + d.revenue, 0) /
                chartData[timeRange].length
            )}
            M
          </div>
          <div className="text-[#D5D4FF] text-sm">Avg Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-[#D5D4FF] text-2xl font-bold">
            {Math.round(
              chartData[timeRange].reduce((sum, d) => sum + d.transactions, 0) /
                chartData[timeRange].length
            )}
          </div>
          <div className="text-[#D5D4FF] text-sm">Avg Transactions</div>
        </div>
      </div>
    </div>
  );
}
