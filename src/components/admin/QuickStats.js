"use client";

export default function QuickStats() {
  const quickActions = [
    {
      label: "Add New Product",
      gradient: "from-blue-600 to-indigo-600",
      hoverGradient: "from-blue-700 to-indigo-700",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: "View All Users",
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-700 to-pink-700",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    },
    {
      label: "Generate Report",
      gradient: "from-gray-100 to-gray-200",
      hoverGradient: "from-gray-200 to-gray-300",
      textColor: "text-gray-700",
      borderColor: "border-gray-300",
      hoverBorderColor: "border-gray-400",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0 1 1 0 002 0zm2-3a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const recentActivities = [
    {
      action: "New user registered",
      time: "2 min ago",
      type: "user",
      color: "bg-blue-500"
    },
    {
      action: "Transaction completed",
      time: "5 min ago",
      type: "transaction",
      color: "bg-green-500"
    },
    {
      action: "Product updated",
      time: "10 min ago",
      type: "product",
      color: "bg-purple-500"
    },
    {
      action: "Payment received",
      time: "15 min ago",
      type: "payment",
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-gray-800 font-bold mb-4 text-base sm:text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`w-full bg-gradient-to-r ${action.gradient} hover:${action.hoverGradient} ${
                action.textColor || 'text-white'
              } py-3 px-4 rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                action.borderColor ? `border ${action.borderColor} hover:${action.hoverBorderColor}` : ''
              }`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-gray-800 font-bold mb-4 text-base sm:text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group cursor-pointer"
            >
              <div className={`w-3 h-3 ${activity.color} rounded-full shadow-sm group-hover:scale-125 transition-transform duration-200`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm font-medium truncate group-hover:text-gray-900 transition-colors duration-200">
                  {activity.action}
                </p>
                <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-200">
                  {activity.time}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
          View All Activities
        </button>
      </div>
    </div>
  );
}
