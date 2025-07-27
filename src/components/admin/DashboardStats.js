export default function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rp 45,890,000",
      change: "+12.5%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" />
        </svg>
      ),
    },
    {
      title: "Total Transactions",
      value: "1,247",
      change: "+8.2%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Active Users",
      value: "892",
      change: "+15.3%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      title: "Success Rate",
      value: "98.7%",
      change: "+2.1%",
      changeType: "increase",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative bg-white border border-gray-200 rounded-xl p-3 sm:p-4 lg:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:scale-105">
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.changeType === "increase"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${
                    stat.changeType === "increase"
                      ? "rotate-0 group-hover:rotate-12"
                      : "rotate-180 group-hover:-rotate-12"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {stat.change}
              </div>
            </div>

            <div>
              <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1 group-hover:text-gray-700 transition-colors">
                {stat.title}
              </h3>
              <p className="text-gray-900 text-lg sm:text-xl lg:text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {stat.value}
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300 opacity-50"></div>
          <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300 opacity-30"></div>
        </div>
      ))}
    </div>
  );
}
