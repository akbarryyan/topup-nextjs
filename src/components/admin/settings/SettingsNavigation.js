"use client";

export default function SettingsNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap hover:bg-gray-50 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50 shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-lg mr-3">{tab.icon}</span>
              <span className="font-semibold">{tab.name}</span>
              {activeTab === tab.id && (
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
