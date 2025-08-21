"use client";

export default function ReportsContent({ 
  currentReport, 
  selectedReport, 
  exportFormat, 
  setExportFormat, 
  generateReport 
}) {
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
  );
}
