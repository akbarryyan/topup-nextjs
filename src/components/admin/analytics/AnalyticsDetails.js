"use client";

export default function AnalyticsDetails({ analyticsData }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Payment Methods
        </h3>
        <div className="space-y-4">
          {analyticsData.paymentMethods.map((method, index) => {
            const colors = [
              "bg-green-500",
              "bg-blue-500",
              "bg-purple-500",
              "bg-yellow-500",
              "bg-red-500",
            ];
            return (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className={`w-4 h-4 rounded-full ${colors[index]}`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {method.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {method.transactions} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(method.amount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {method.percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          User Activity
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {analyticsData.userActivity.activeUsers}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {analyticsData.userActivity.newUsers}
            </div>
            <div className="text-sm text-gray-600">New Users</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {analyticsData.userActivity.avgSessionDuration}
            </div>
            <div className="text-sm text-gray-600">Avg. Session</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {analyticsData.userActivity.bounceRate}%
            </div>
            <div className="text-sm text-gray-600">Bounce Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
