"use client";

import { useState, useEffect } from "react";

export default function WelcomeSection() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const quickStats = [
    {
      title: "Total Users",
      value: "1,247",
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      bgColor: "bg-blue-600",
      borderColor: "border-blue-100",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50"
    },
    {
      title: "Revenue",
      value: "$24.5K",
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v1a2 2 0 01-2 2H5V8h1z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: "bg-green-600",
      borderColor: "border-green-100",
      textColor: "text-green-600",
      bgLight: "bg-green-50"
    },
    {
      title: "Orders",
      value: "342",
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      bgColor: "bg-purple-600",
      borderColor: "border-purple-100",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side - Welcome Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Here's what's happening with your business today
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quickStats.map((stat, index) => (
              <div 
                key={index} 
                className={`${stat.bgLight} ${stat.borderColor} border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 group`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${stat.bgColor} w-8 h-8 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                    {stat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${stat.textColor} text-xs font-semibold uppercase tracking-wide mb-1`}>
                      {stat.title}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Current Time & Date */}
        <div className="lg:text-right">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
              Current Time
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {formatTime(currentTime)}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {formatDate(currentTime)}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                System Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
