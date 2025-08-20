"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import UsersHeader from "@/components/admin/users/UsersHeader";
import UsersStats from "@/components/admin/users/UsersStats";
import UsersFilters from "@/components/admin/users/UsersFilters";
import UsersTable from "@/components/admin/users/UsersTable";

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
        {/* Sidebar */}
        <AdminSidebarLight
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen overflow-hidden">
          {/* Header */}
          <AdminHeaderLight onMenuClick={() => setSidebarOpen(true)} />

          {/* Dashboard Content */}
          <main className="flex-1 p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 overflow-y-auto">
            {/* Page Header */}
            <UsersHeader />

            {/* Stats Cards */}
            <UsersStats users={users} />

            {/* Filters and Search */}
            <UsersFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
              setCurrentPage={setCurrentPage}
              users={users}
              filteredUsers={filteredUsers}
            />

            {/* Users Table */}
            <UsersTable
              currentUsers={currentUsers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              filteredUsers={filteredUsers}
              itemsPerPage={itemsPerPage}
            />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
