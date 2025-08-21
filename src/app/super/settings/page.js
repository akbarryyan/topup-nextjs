"use client";

import { useState } from "react";
import AdminSidebarLight from "@/components/admin/AdminSidebarLight";
import AdminHeaderLight from "@/components/admin/AdminHeaderLight";
import SettingsHeader from "@/components/admin/settings/SettingsHeader";
import SettingsNavigation from "@/components/admin/settings/SettingsNavigation";
import SettingsSaveBar from "@/components/admin/settings/SettingsSaveBar";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: "TopUp Gaming Store",
      siteDescription: "Premium gaming currency and items marketplace",
      siteUrl: "https://topup-gaming.com",
      adminEmail: "admin@topup-gaming.com",
      timezone: "Asia/Jakarta",
      language: "id",
      maintenanceMode: false,
    },
    security: {
      twoFactorAuth: true,
      loginAttempts: 5,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelist: true,
      apiRateLimit: 1000,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserRegistration: true,
      newTransaction: true,
      systemAlerts: true,
      dailyReports: true,
      weeklyReports: false,
    },
    payment: {
      currency: "IDR",
      paymentMethods: {
        qris: true,
        bankTransfer: true,
        eWallet: true,
        creditCard: false,
        virtualAccount: true,
      },
      minimumTopup: 10000,
      maximumTopup: 5000000,
      transactionFee: 2.5,
      autoRefund: true,
    },
    appearance: {
      theme: "light",
      primaryColor: "#3B82F6",
      accentColor: "#10B981",
      darkModeSupport: true,
      customLogo: true,
      customFavicon: true,
    },
  });

  const [tempSettings, setTempSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "payment", name: "Payment", icon: "💳" },
    { id: "appearance", name: "Appearance", icon: "🎨" },
  ];

  const updateSetting = (category, key, value) => {
    setTempSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (category, parentKey, key, value) => {
    setTempSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    setSettings(tempSettings);
    setHasChanges(false);
    alert("Settings saved successfully!");
  };

  const resetSettings = () => {
    setTempSettings(settings);
    setHasChanges(false);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(tempSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🌐</span>
            Site Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={tempSettings.general.siteName}
                onChange={(e) =>
                  updateSetting("general", "siteName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                value={tempSettings.general.siteDescription}
                onChange={(e) =>
                  updateSetting("general", "siteDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site URL
              </label>
              <input
                type="url"
                value={tempSettings.general.siteUrl}
                onChange={(e) =>
                  updateSetting("general", "siteUrl", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">⚡</span>
            System Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={tempSettings.general.adminEmail}
                onChange={(e) =>
                  updateSetting("general", "adminEmail", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={tempSettings.general.timezone}
                onChange={(e) =>
                  updateSetting("general", "timezone", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={tempSettings.general.language}
                onChange={(e) =>
                  updateSetting("general", "language", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="id">🇮🇩 Bahasa Indonesia</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </label>
                <p className="text-xs text-gray-500">
                  Temporarily disable site access
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "general",
                    "maintenanceMode",
                    !tempSettings.general.maintenanceMode
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.general.maintenanceMode
                    ? "bg-red-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.general.maintenanceMode
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🔐</span>
            Authentication
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </label>
                <p className="text-xs text-gray-500">
                  Require 2FA for admin accounts
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "security",
                    "twoFactorAuth",
                    !tempSettings.security.twoFactorAuth
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.security.twoFactorAuth
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.security.twoFactorAuth
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Login Attempts
              </label>
              <input
                type="number"
                value={tempSettings.security.loginAttempts}
                onChange={(e) =>
                  updateSetting(
                    "security",
                    "loginAttempts",
                    parseInt(e.target.value)
                  )
                }
                min={3}
                max={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={tempSettings.security.sessionTimeout}
                onChange={(e) =>
                  updateSetting(
                    "security",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                min={15}
                max={120}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Access Control */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🛡️</span>
            Access Control
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={tempSettings.security.passwordExpiry}
                onChange={(e) =>
                  updateSetting(
                    "security",
                    "passwordExpiry",
                    parseInt(e.target.value)
                  )
                }
                min={30}
                max={365}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  IP Whitelist
                </label>
                <p className="text-xs text-gray-500">
                  Restrict access to specific IPs
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "security",
                    "ipWhitelist",
                    !tempSettings.security.ipWhitelist
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.security.ipWhitelist
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.security.ipWhitelist
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Rate Limit (requests/hour)
              </label>
              <input
                type="number"
                value={tempSettings.security.apiRateLimit}
                onChange={(e) =>
                  updateSetting(
                    "security",
                    "apiRateLimit",
                    parseInt(e.target.value)
                  )
                }
                min={100}
                max={10000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Channels */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">📱</span>
            Notification Channels
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-xs text-gray-500">
                  Send notifications via email
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "emailNotifications",
                    !tempSettings.notifications.emailNotifications
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.emailNotifications
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
                <p className="text-xs text-gray-500">
                  Send notifications via SMS
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "smsNotifications",
                    !tempSettings.notifications.smsNotifications
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.smsNotifications
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.smsNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Push Notifications
                </label>
                <p className="text-xs text-gray-500">
                  Browser push notifications
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "pushNotifications",
                    !tempSettings.notifications.pushNotifications
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.pushNotifications
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.pushNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Event Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">📋</span>
            Event Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  New User Registration
                </label>
                <p className="text-xs text-gray-500">
                  When a new user signs up
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "newUserRegistration",
                    !tempSettings.notifications.newUserRegistration
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.newUserRegistration
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.newUserRegistration
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  New Transaction
                </label>
                <p className="text-xs text-gray-500">
                  When a transaction is completed
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "newTransaction",
                    !tempSettings.notifications.newTransaction
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.newTransaction
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.newTransaction
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  System Alerts
                </label>
                <p className="text-xs text-gray-500">
                  Critical system notifications
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "systemAlerts",
                    !tempSettings.notifications.systemAlerts
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.systemAlerts
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.systemAlerts
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Daily Reports
                </label>
                <p className="text-xs text-gray-500">
                  Automated daily summaries
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "notifications",
                    "dailyReports",
                    !tempSettings.notifications.dailyReports
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.notifications.dailyReports
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.notifications.dailyReports
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">💰</span>
            Payment Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Currency
              </label>
              <select
                value={tempSettings.payment.currency}
                onChange={(e) =>
                  updateSetting("payment", "currency", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="IDR">🇮🇩 Indonesian Rupiah (IDR)</option>
                <option value="USD">🇺🇸 US Dollar (USD)</option>
                <option value="EUR">🇪🇺 Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Top-up Amount
              </label>
              <input
                type="number"
                value={tempSettings.payment.minimumTopup}
                onChange={(e) =>
                  updateSetting(
                    "payment",
                    "minimumTopup",
                    parseInt(e.target.value)
                  )
                }
                min={1000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Top-up Amount
              </label>
              <input
                type="number"
                value={tempSettings.payment.maximumTopup}
                onChange={(e) =>
                  updateSetting(
                    "payment",
                    "maximumTopup",
                    parseInt(e.target.value)
                  )
                }
                min={100000}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Fee (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={tempSettings.payment.transactionFee}
                onChange={(e) =>
                  updateSetting(
                    "payment",
                    "transactionFee",
                    parseFloat(e.target.value)
                  )
                }
                min={0}
                max={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">💳</span>
            Payment Methods
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📱</span>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    QRIS
                  </label>
                  <p className="text-xs text-gray-500">
                    Quick Response Code Indonesian Standard
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateNestedSetting(
                    "payment",
                    "paymentMethods",
                    "qris",
                    !tempSettings.payment.paymentMethods.qris
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.paymentMethods.qris
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.paymentMethods.qris
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🏦</span>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Bank Transfer
                  </label>
                  <p className="text-xs text-gray-500">Direct bank transfers</p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateNestedSetting(
                    "payment",
                    "paymentMethods",
                    "bankTransfer",
                    !tempSettings.payment.paymentMethods.bankTransfer
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.paymentMethods.bankTransfer
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.paymentMethods.bankTransfer
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📲</span>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    E-Wallet
                  </label>
                  <p className="text-xs text-gray-500">
                    OVO, GoPay, DANA, etc.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateNestedSetting(
                    "payment",
                    "paymentMethods",
                    "eWallet",
                    !tempSettings.payment.paymentMethods.eWallet
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.paymentMethods.eWallet
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.paymentMethods.eWallet
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">💳</span>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Credit Card
                  </label>
                  <p className="text-xs text-gray-500">
                    Visa, Mastercard, etc.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateNestedSetting(
                    "payment",
                    "paymentMethods",
                    "creditCard",
                    !tempSettings.payment.paymentMethods.creditCard
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.paymentMethods.creditCard
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.paymentMethods.creditCard
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔢</span>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Virtual Account
                  </label>
                  <p className="text-xs text-gray-500">Bank virtual accounts</p>
                </div>
              </div>
              <button
                onClick={() =>
                  updateNestedSetting(
                    "payment",
                    "paymentMethods",
                    "virtualAccount",
                    !tempSettings.payment.paymentMethods.virtualAccount
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.paymentMethods.virtualAccount
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.paymentMethods.virtualAccount
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auto Refund
                </label>
                <p className="text-xs text-gray-500">
                  Automatic refund on failed transactions
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "payment",
                    "autoRefund",
                    !tempSettings.payment.autoRefund
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.payment.autoRefund
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.payment.autoRefund
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🎨</span>
            Theme Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Theme
              </label>
              <select
                value={tempSettings.appearance.theme}
                onChange={(e) =>
                  updateSetting("appearance", "theme", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="light">☀️ Light Theme</option>
                <option value="dark">🌙 Dark Theme</option>
                <option value="auto">🔄 Auto (System)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={tempSettings.appearance.primaryColor}
                  onChange={(e) =>
                    updateSetting("appearance", "primaryColor", e.target.value)
                  }
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={tempSettings.appearance.primaryColor}
                  onChange={(e) =>
                    updateSetting("appearance", "primaryColor", e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={tempSettings.appearance.accentColor}
                  onChange={(e) =>
                    updateSetting("appearance", "accentColor", e.target.value)
                  }
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={tempSettings.appearance.accentColor}
                  onChange={(e) =>
                    updateSetting("appearance", "accentColor", e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Dark Mode Support
                </label>
                <p className="text-xs text-gray-500">
                  Allow users to switch themes
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "appearance",
                    "darkModeSupport",
                    !tempSettings.appearance.darkModeSupport
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.appearance.darkModeSupport
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.appearance.darkModeSupport
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🏷️</span>
            Branding
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Custom Logo
                </label>
                <p className="text-xs text-gray-500">
                  Use custom logo instead of default
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "appearance",
                    "customLogo",
                    !tempSettings.appearance.customLogo
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.appearance.customLogo
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.appearance.customLogo
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {tempSettings.appearance.customLogo && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-4">
                    <button className="text-blue-600 hover:text-blue-500 font-medium">
                      Upload logo
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Custom Favicon
                </label>
                <p className="text-xs text-gray-500">
                  Use custom favicon for the site
                </p>
              </div>
              <button
                onClick={() =>
                  updateSetting(
                    "appearance",
                    "customFavicon",
                    !tempSettings.appearance.customFavicon
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  tempSettings.appearance.customFavicon
                    ? "bg-green-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    tempSettings.appearance.customFavicon
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "payment":
        return renderPaymentSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <>
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
            <SettingsHeader 
              hasChanges={hasChanges}
              exportSettings={exportSettings}
              resetSettings={resetSettings}
            />

            {/* Settings Navigation */}
            <SettingsNavigation 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Settings Content */}
            <div className="mb-8">{renderTabContent()}</div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Save Changes Bar */}
        <SettingsSaveBar 
          hasChanges={hasChanges}
          resetSettings={resetSettings}
          saveSettings={saveSettings}
        />
      </div>
    </>
  );
}
