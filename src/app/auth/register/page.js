"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!/^[0-9+\-\s]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Registration attempt:", formData);
      setIsLoading(false);
      // Redirect or show success message
    }, 2000);
  };

  return (
    <div className="h-screen bg-[#121212] flex items-center justify-center px-6 sm:px-8 lg:px-10 overflow-hidden">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-start">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Daftar
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
            Masukkan informasi pendaftaran yang valid.
          </p>
        </div>

        {/* Register Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Full Name Input */}
            <div className="relative">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm peer ${
                  errors.fullName ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Nama Lengkap"
              />
              <label
                htmlFor="fullName"
                className={`absolute left-4 -top-2.5 bg-[#121212] px-2 text-sm font-medium transition-all duration-300 peer-focus:text-orange-500 ${
                  errors.fullName ? "text-red-400" : "text-gray-400"
                }`}
              >
                Nama Lengkap
              </label>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm peer ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Email Address"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 -top-2.5 bg-[#121212] px-2 text-sm font-medium transition-all duration-300 peer-focus:text-orange-500 ${
                  errors.email ? "text-red-400" : "text-gray-400"
                }`}
              >
                Email Address
              </label>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm peer ${
                  errors.phone ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Nomor Telepon"
              />
              <label
                htmlFor="phone"
                className={`absolute left-4 -top-2.5 bg-[#121212] px-2 text-sm font-medium transition-all duration-300 peer-focus:text-orange-500 ${
                  errors.phone ? "text-red-400" : "text-gray-400"
                }`}
              >
                Nomor Telepon
              </label>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm peer ${
                  errors.password ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className={`absolute left-4 -top-2.5 bg-[#121212] px-2 text-sm font-medium transition-all duration-300 peer-focus:text-orange-500 ${
                  errors.password ? "text-red-400" : "text-gray-400"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/70 border rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm peer ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Konfirmasi Password"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-4 -top-2.5 bg-[#121212] px-2 text-sm font-medium transition-all duration-300 peer-focus:text-orange-500 ${
                  errors.confirmPassword ? "text-red-400" : "text-gray-400"
                }`}
              >
                Konfirmasi Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                )}
              </button>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded bg-gray-800 mt-1"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-3 block text-sm text-gray-300 leading-5"
              >
                Saya menyetujui{" "}
                <Link
                  href="/terms"
                  className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  Syarat & Ketentuan
                </Link>{" "}
                dan{" "}
                <Link
                  href="/privacy"
                  className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  Kebijakan Privasi
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-2 text-sm text-red-400">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-4xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
            ) : null}
            {isLoading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-300"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
