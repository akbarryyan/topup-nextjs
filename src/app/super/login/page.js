"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUser", JSON.stringify(data.user));

        console.log("🎉 Login successful, now using real token from server");
        console.log("Response data:", data);

        // Use real token from server response
        const realToken = data.token;
        console.log(
          "🔑 Real token from server:",
          realToken ? "Received" : "Missing"
        );

        // Set cookie with real token from server
        if (realToken) {
          document.cookie = `admin_token=${realToken}; path=/; max-age=86400; SameSite=Lax`;
          console.log("🍪 Real token cookie set:", document.cookie);
        } else {
          // Fallback to temp token if server token missing
          const tempToken = "temp_token_" + Date.now();
          document.cookie = `admin_token=${tempToken}; path=/; max-age=86400; SameSite=Lax`;
          console.log("🍪 Fallback temp token set:", document.cookie);
        }

        // Show success notification using Sonner
        toast.success("Login Successful! 🎉", {
          description: `Welcome back, ${data.user.name || "Admin"}!`,
          duration: 1500,
        });

        // Wait for cookies to be set by browser before redirecting
        console.log("⏳ Manual cookie set, now redirecting...");
        setTimeout(() => {
          // Debug: Check if cookies are set
          console.log("🍪 All cookies after manual set:", document.cookie);

          // Check specifically for admin_token
          const hasAdminToken = document.cookie.includes("admin_token");
          console.log(
            "🎫 Admin token present after manual set:",
            hasAdminToken
          );

          console.log("🚀 Forcing redirect to /super");
          window.location.assign("/super");
        }, 1000);
      } else {
        // Handle specific error codes
        if (data.code === "ACCOUNT_LOCKED") {
          setErrors({
            submit: data.error,
          });
          toast.error("Account Locked! 🔒", {
            description:
              "Account temporarily locked due to multiple failed attempts",
            duration: 5000,
          });
        } else if (data.code === "ACCOUNT_INACTIVE") {
          setErrors({
            submit: data.error,
          });
          toast.error("Account Inactive! 😞", {
            description: "Please contact support for assistance",
            duration: 5000,
          });
        } else {
          setErrors({
            submit: data.error || "Login failed. Please try again.",
          });
          toast.error("Login Failed! ❌", {
            description:
              data.error || "Please check your credentials and try again",
            duration: 4000,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: "Network error. Please check your connection and try again.",
      });
      toast.error("Network Error! 🌐", {
        description: "Please check your connection and try again",
        duration: 4000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                >
                  Email Address
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
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`block w-full pl-12 pr-4 py-3.5 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white text-sm font-medium placeholder-gray-400 text-gray-400 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-gray-700 z-10"
                >
                  Password
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`block w-full pl-12 pr-12 py-3.5 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white text-sm font-medium placeholder-gray-400 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors z-20"
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700 select-none">
                  Remember me
                </span>
              </label>
              <Link
                href="/super/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium flex items-center gap-2">
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Database Credentials */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Default Admin Credentials
            </h3>
            <div className="space-y-1 text-xs text-blue-800">
              <p>
                <span className="font-medium">Email:</span> admin@topup.com
              </p>
              <p>
                <span className="font-medium">Password:</span> admin123456
              </p>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-700">
                <p className="font-medium text-xs">⚠️ Setup Required:</p>
                <ol className="text-xs mt-1 space-y-1 list-decimal list-inside">
                  <li>Install MySQL and create database</li>
                  <li>Update .env.local with database credentials</li>
                  <li>Run: npm run init-db to setup tables</li>
                  <li>Install required packages (see README)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 TopUp Admin Dashboard. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/support"
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Sonner Toaster */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
