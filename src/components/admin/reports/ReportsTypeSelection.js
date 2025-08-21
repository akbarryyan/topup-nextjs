"use client";

export default function ReportsTypeSelection({ reportTypes, selectedReport, setSelectedReport }) {
  const getColorClasses = (type, isActive) => {
    const colorMap = {
      green: {
        active: "border-green-500 bg-green-50 ring-2 ring-green-200 shadow-lg",
        inactive: "border-gray-200 bg-white hover:border-green-300 hover:shadow-md",
        icon: isActive ? "bg-green-100" : "bg-gray-100",
        text: isActive ? "text-green-900" : "text-gray-900"
      },
      blue: {
        active: "border-blue-500 bg-blue-50 ring-2 ring-blue-200 shadow-lg",
        inactive: "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md",
        icon: isActive ? "bg-blue-100" : "bg-gray-100",
        text: isActive ? "text-blue-900" : "text-gray-900"
      },
      purple: {
        active: "border-purple-500 bg-purple-50 ring-2 ring-purple-200 shadow-lg",
        inactive: "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md",
        icon: isActive ? "bg-purple-100" : "bg-gray-100",
        text: isActive ? "text-purple-900" : "text-gray-900"
      },
      orange: {
        active: "border-orange-500 bg-orange-50 ring-2 ring-orange-200 shadow-lg",
        inactive: "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md",
        icon: isActive ? "bg-orange-100" : "bg-gray-100",
        text: isActive ? "text-orange-900" : "text-gray-900"
      }
    };

    return colorMap[type.color] || colorMap.green;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {reportTypes.map((type) => {
        const isActive = selectedReport === type.id;
        const colors = getColorClasses(type, isActive);
        
        return (
          <button
            key={type.id}
            onClick={() => setSelectedReport(type.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
              isActive ? colors.active : colors.inactive
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`text-3xl p-4 rounded-xl transition-all duration-300 ${colors.icon}`}>
                {type.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 ${colors.text}`}>
                  {type.name}
                </h3>
                <p className={`text-sm ${isActive ? 'text-gray-700' : 'text-gray-600'}`}>
                  {isActive ? 'Currently selected' : 'Click to select'}
                </p>
                {isActive && (
                  <div className="mt-2 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
