"use client";

export default function AnalyticsCharts({ analyticsData }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
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
  );
}
