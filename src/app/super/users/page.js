"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample users data
  const users = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62 812-3456-7890",
      role: "user",
      status: "active",
      joinDate: "2024-12-15T08:30:00Z",
      lastLogin: "2025-01-27T09:15:00Z",
      totalSpent: 750000,
      transactionCount: 12,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+62 813-2345-6789",
      role: "user",
      status: "active",
      joinDate: "2024-11-20T14:22:00Z",
      lastLogin: "2025-01-26T16:45:00Z",
      totalSpent: 1200000,
      transactionCount: 8,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-003",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+62 814-3456-7890",
      role: "user",
      status: "suspended",
      joinDate: "2024-10-05T11:15:00Z",
      lastLogin: "2025-01-20T13:30:00Z",
      totalSpent: 350000,
      transactionCount: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: false,
    },
    {
      id: "USR-004",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+62 815-4567-8901",
      role: "premium",
      status: "active",
      joinDate: "2024-09-12T10:00:00Z",
      lastLogin: "2025-01-27T11:20:00Z",
      totalSpent: 2500000,
      transactionCount: 25,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-005",
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+62 816-5678-9012",
      role: "user",
      status: "inactive",
      joinDate: "2024-08-30T16:45:00Z",
      lastLogin: "2024-12-15T09:10:00Z",
      totalSpent: 150000,
      transactionCount: 3,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-006",
      name: "Lisa Chen",
      email: "lisa.chen@example.com",
      phone: "+62 817-6789-0123",
      role: "admin",
      status: "active",
      joinDate: "2024-07-10T09:30:00Z",
      lastLogin: "2025-01-27T08:45:00Z",
      totalSpent: 0,
      transactionCount: 0,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-007",
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      phone: "+62 818-7890-1234",
      role: "user",
      status: "active",
      joinDate: "2024-06-25T13:20:00Z",
      lastLogin: "2025-01-25T15:30:00Z",
      totalSpent: 900000,
      transactionCount: 15,
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      verified: true,
    },
    {
      id: "USR-008",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+62 819-8901-2345",
      role: "user",
      status: "pending",
      joinDate: "2025-01-20T14:10:00Z",
      lastLogin: "2025-01-26T12:15:00Z",
      totalSpent: 50000,
      transactionCount: 1,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      verified: false,
    },
  ];

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      suspended: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      user: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return roleConfig[role] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgb(156 163 175) rgb(243 244 246);
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(243 244 246);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(156 163 175);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <div className="lg:pl-64 pb-16 py-3">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    User Management
                  </h1>
                  <p className="text-gray-600">
                    Manage and monitor all platform users
                  </p>
                </div>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New User
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {/* Total Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {users.length}
                      </p>
                      <p className="text-xs text-blue-600 font-medium mt-1">
                        👥 All registered users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-lg group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Active Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                        {users.filter((u) => u.status === "active").length}
                      </p>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        ✅ Currently active
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Premium Users
                      </p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {users.filter((u) => u.role === "premium").length}
                      </p>
                      <p className="text-xs text-purple-600 font-medium mt-1">
                        ⭐ Premium members
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      VIP
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Revenue Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-50 rounded-lg group-hover:from-yellow-200 group-hover:to-orange-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        User Revenue
                      </p>
                      <p className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                        {formatCurrency(
                          users.reduce((sum, u) => sum + u.totalSpent, 0)
                        )}
                      </p>
                      <p className="text-xs text-yellow-600 font-medium mt-1">
                        💰 Total from users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800">
                      Lifetime
                    </div>
                    <div className="mt-2 text-xs text-green-600 font-semibold">
                      +8.2% ↗️
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
              {/* Header with Clear All button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter Users
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Search and filter users by various criteria
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterRole("all");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Enhanced Search */}
                <div className="space-y-2">
                  <div className="relative">
                    <label
                      htmlFor="search-input"
                      className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                    >
                      Search Users
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-20">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Type to search by name, email, phone, or user ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm font-medium placeholder-gray-400 hover:border-gray-300"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-20"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {searchTerm && (
                    <p className="text-xs text-blue-600 font-medium ml-1">
                      Found {filteredUsers.length} results for "{searchTerm}"
                    </p>
                  )}
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Status Filter */}
                  <div className="space-y-2">
                    <div className="relative">
                      <label
                        htmlFor="status-filter"
                        className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                      >
                        Filter by Status
                      </label>
                      <select
                        id="status-filter"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
                      >
                        <option
                          value="all"
                          className="text-gray-600 font-medium"
                        >
                          🔍 View All Statuses ({users.length} total)
                        </option>
                        <option
                          value="active"
                          className="text-green-700 font-medium"
                        >
                          ✅ Active Users (
                          {users.filter((u) => u.status === "active").length})
                        </option>
                        <option
                          value="inactive"
                          className="text-gray-700 font-medium"
                        >
                          😴 Inactive Users (
                          {users.filter((u) => u.status === "inactive").length})
                        </option>
                        <option
                          value="suspended"
                          className="text-red-700 font-medium"
                        >
                          ❌ Suspended Users (
                          {users.filter((u) => u.status === "suspended").length}
                          )
                        </option>
                        <option
                          value="pending"
                          className="text-yellow-700 font-medium"
                        >
                          ⏳ Pending Users (
                          {users.filter((u) => u.status === "pending").length})
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Role Filter */}
                  <div className="space-y-2">
                    <div className="relative">
                      <label
                        htmlFor="role-filter"
                        className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                      >
                        Filter by Role
                      </label>
                      <select
                        id="role-filter"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
                      >
                        <option
                          value="all"
                          className="text-gray-600 font-medium"
                        >
                          📋 View All Roles
                        </option>
                        <option
                          value="admin"
                          className="text-purple-700 font-medium"
                        >
                          👑 Admin Users
                        </option>
                        <option
                          value="premium"
                          className="text-blue-700 font-medium"
                        >
                          ⭐ Premium Users
                        </option>
                        <option
                          value="user"
                          className="text-gray-700 font-medium"
                        >
                          👤 Regular Users
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm ||
                filterStatus !== "all" ||
                filterRole !== "all") && (
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 shrink-0">
                      Active filters:
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          <span className="truncate max-w-32 sm:max-w-none">
                            Search: "{searchTerm}"
                          </span>
                          <button
                            onClick={() => setSearchTerm("")}
                            className="ml-1 text-blue-600 hover:text-blue-800 shrink-0"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      )}

                      {filterStatus !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Status:{" "}
                          {filterStatus.charAt(0).toUpperCase() +
                            filterStatus.slice(1)}
                          <button
                            onClick={() => setFilterStatus("all")}
                            className="ml-1 text-green-600 hover:text-green-800 shrink-0"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      )}

                      {filterRole !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Role:{" "}
                          {filterRole.charAt(0).toUpperCase() +
                            filterRole.slice(1)}
                          <button
                            onClick={() => setFilterRole("all")}
                            className="ml-1 text-purple-600 hover:text-purple-800 shrink-0"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredUsers.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {users.length}
                    </span>{" "}
                    users
                  </div>
                </div>
              )}
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Scroll Indicator */}
              <div className="hidden md:block bg-blue-50 border-b border-blue-100 px-4 py-2">
                <div className="flex items-center text-sm text-blue-600">
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
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span>Scroll horizontally to view all columns</span>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="overflow-x-auto max-w-full custom-scrollbar">
                  <div className="inline-block min-w-full align-middle">
                    <table
                      className="min-w-full divide-y divide-gray-200"
                      style={{ minWidth: "1200px" }}
                    >
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                            Role
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Total Spent
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                            Last Login
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center min-w-0">
                                <div className="flex-shrink-0 h-12 w-12">
                                  <img
                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                                    src={user.avatar}
                                    alt={user.name}
                                    onError={(e) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.name
                                      )}&background=6b7280&color=ffffff`;
                                    }}
                                  />
                                  {user.verified && (
                                    <div className="relative -mt-3 -ml-1">
                                      <div className="bg-blue-500 rounded-full p-1">
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {user.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate">
                                    {user.id}
                                  </div>
                                  <div className="text-xs text-gray-400 truncate">
                                    Joined {formatDate(user.joinDate)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="min-w-0">
                                <div className="text-sm text-gray-900 truncate">
                                  {user.email}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {user.phone}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(
                                  user.role
                                )}`}
                              >
                                {user.role.charAt(0).toUpperCase() +
                                  user.role.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                                  user.status
                                )}`}
                              >
                                {user.status.charAt(0).toUpperCase() +
                                  user.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {formatCurrency(user.totalSpent)}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.transactionCount} transactions
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-xs">
                                {getTimeAgo(user.lastLogin)}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 transition-colors text-sm font-medium">
                                  View
                                </button>
                                <button className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                                  Edit
                                </button>
                                {user.status === "suspended" ? (
                                  <button className="text-green-600 hover:text-green-900 transition-colors text-sm font-medium">
                                    Activate
                                  </button>
                                ) : (
                                  <button className="text-red-600 hover:text-red-900 transition-colors text-sm font-medium">
                                    Suspend
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden max-h-96 overflow-y-auto">
                {currentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-4 mb-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                          src={user.avatar}
                          alt={user.name}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=6b7280&color=ffffff`;
                          }}
                        />
                        {user.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {user.name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400">{user.id}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getStatusBadge(
                                user.status
                              )}`}
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </span>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border shrink-0 ${getRoleBadge(
                                user.role
                              )}`}
                            >
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Phone:
                        </span>
                        <span className="text-sm font-medium text-gray-900 truncate ml-2 text-right">
                          {user.phone}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Total Spent:
                        </span>
                        <span className="text-sm font-bold text-gray-900 shrink-0">
                          {formatCurrency(user.totalSpent)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Transactions:
                        </span>
                        <span className="text-sm text-gray-900 shrink-0">
                          {user.transactionCount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 shrink-0">
                          Last Login:
                        </span>
                        <span className="text-sm text-gray-900 shrink-0 text-right">
                          {getTimeAgo(user.lastLogin)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                        Edit
                      </button>
                      {user.status === "suspended" ? (
                        <button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                          Activate
                        </button>
                      ) : (
                        <button className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {(currentPage - 1) * itemsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            currentPage * itemsPerPage,
                            filteredUsers.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredUsers.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === index + 1
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
