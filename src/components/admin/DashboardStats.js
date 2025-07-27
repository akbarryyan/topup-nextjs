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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-[#2a2b35] via-[#2e2f3a] to-[#32333e] border border-[#D5D4FF]/20 rounded-xl lg:rounded-2xl p-4 sm:p-6 hover:border-[#8197E5]/30 transition-all duration-500 group cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden"
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8197E5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8197E5]/20 to-[#51508B]/20 rounded-xl lg:rounded-2xl flex items-center justify-center text-[#8197E5] group-hover:from-[#8197E5] group-hover:to-[#51508B] group-hover:text-white transition-all duration-500 shadow-lg group-hover:shadow-[#8197E5]/25 transform group-hover:scale-110">
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  stat.changeType === "increase"
                    ? "bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border border-green-400/30"
                    : "bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-400 border border-red-400/30"
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
              <h3 className="text-[#D5D4FF] text-xs sm:text-sm font-medium mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {stat.title}
              </h3>
              <p className="text-[#F2F5FF] text-xl sm:text-2xl lg:text-3xl font-bold group-hover:text-white transition-colors">
                {stat.value}
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#8197E5]/5 rounded-full group-hover:bg-[#8197E5]/10 transition-colors duration-500"></div>
          <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-[#51508B]/5 rounded-full group-hover:bg-[#51508B]/10 transition-colors duration-500"></div>
        </div>
      ))}
    </div>
  );
}
