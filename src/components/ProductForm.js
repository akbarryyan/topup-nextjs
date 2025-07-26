"use client";

import { useState } from "react";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    userId: "",
    server: "",
    quantity: 1,
    paymentMethod: "",
    whatsapp: "+62",
    promoCode: "",
  });

  const [activeStep, setActiveStep] = useState(1);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Masukkan Data Akun */}
      <div className="bg-[#2C2C2B] rounded-2xl overflow-hidden">
        <div className="flex">
          <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
            <div className="px-1 flex items-center justify-center text-white text-[16px] font-semibold">
              1
            </div>
          </div>
          <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
            <h2 className="text-white text-[15px] font-semibold">
              Masukkan Data Akun
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-white text-[13px] font-medium mb-2 flex items-center gap-2">
                ID
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input
                type="text"
                placeholder="Masukkan ID"
                value={formData.userId}
                onChange={(e) => handleInputChange("userId", e.target.value)}
                className="w-full px-4 py-2 bg-[#5F666D] border-0 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#A58C6F]"
              />
            </div>
            <div>
              <label className="block text-white text-[13px] font-medium mb-2">
                Server
              </label>
              <input
                type="text"
                placeholder="Masukkan Server"
                value={formData.server}
                onChange={(e) => handleInputChange("server", e.target.value)}
                className="w-full px-4 py-2 bg-[#5F666D] border-0 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#A58C6F]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Pilih Nominal */}
      <div className="bg-[#2C2C2B] rounded-2xl overflow-hidden">
        <div className="flex">
          <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
            <div className="px-1 flex items-center justify-center text-white text-[16px] font-semibold">
              2
            </div>
          </div>
          <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
            <h2 className="text-white text-[15px] font-semibold">
              Pilih Nominal
            </h2>
          </div>
        </div>

        <div className="p-6">
          {/* Special Items */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-1 text-[15px]">
              Special Items <span className="text-yellow-400">✨</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "Weekly Diamond Pass",
                  icon: "💎",
                  price: "Rp 28.499",
                  tag: "TERLARIS",
                },
                {
                  name: "2x Weekly Diamond Pass",
                  icon: "💎",
                  price: "Rp 56.998",
                  tag: "TERLARIS",
                },
                {
                  name: "3x Weekly Diamond Pass",
                  icon: "💎",
                  price: "Rp 85.497",
                  tag: "TERLARIS",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-[#5F666D] hover:bg-[#6B7178] border-0 rounded-xl p-4 cursor-pointer transition-all duration-200"
                >
                  <div className="text-start">
                    <h4 className="text-white text-[10.2px] font-semibold mb-2 leading-tight">
                      {item.name}
                    </h4>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <p className="text-[#A38A6F] font-bold text-[14px]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 flex justify-end border-t border-gray-600">
                    <button className="bg-white text-black text-[10px] font-medium py-1.5 px-3 rounded-md flex items-center justify-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      INSTANT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Up Instant */}
          <div>
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              Top Up Instant <span className="text-yellow-400">✨</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { diamonds: "5 (5+0) Diamonds", icon: "💎", price: "Rp 1.539" },
                {
                  diamonds: "10 (9+1) Diamonds",
                  icon: "💎",
                  price: "Rp 3.120",
                },
                {
                  diamonds: "12 (11+1) Diamonds",
                  icon: "💎",
                  price: "Rp 3.590",
                },
                {
                  diamonds: "14 (13+1) Diamonds",
                  icon: "💎",
                  price: "Rp 4.159",
                },
                {
                  diamonds: "15 (15+0) Diamonds",
                  icon: "💎",
                  price: "Rp 4.617",
                },
                {
                  diamonds: "17 (16+1) Diamonds",
                  icon: "💎",
                  price: "Rp 4.777",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#3C3C3B] hover:bg-[#4C4C4B] border border-gray-600 hover:border-[#A58C6F] rounded-lg p-4 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">
                        {item.diamonds}
                      </h4>
                      <p className="text-[#A58C6F] font-bold">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Pilih Pembayaran */}
      <div className="bg-[#2C2C2B] rounded-lg overflow-hidden">
        <div className="flex">
          <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
            <div className="px-1 flex items-center justify-center text-white text-[16px] font-semibold">
              3
            </div>
          </div>
          <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
            <h2 className="text-white text-[15px] font-semibold">
              Pilih Pembayaran
            </h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Oura Coin */}
          <div className="bg-[#3C3C3B] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="text-white font-medium">Oura Coin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">Min. Rp 0</span>
                <span className="bg-[#A58C6F] text-white text-xs px-2 py-1 rounded">
                  BEST PRICE
                </span>
              </div>
            </div>
          </div>

          {/* Payment Categories */}
          {[
            {
              title: "QRIS OVO DANA GOPAY SHOPEPAY, DLL",
              subtitle: "Min. Rp 1.000",
              methods: ["ShopeePay", "DANA", "OVO", "GoPay", "LinkAja"],
            },
            {
              title: "Virtual Account",
              subtitle: "",
              methods: [
                "BCA",
                "BNI",
                "BRI",
                "Mandiri",
                "CIMB",
                "Permata",
                "BSI",
              ],
            },
            {
              title: "Convenience Store",
              subtitle: "",
              methods: ["Alfamart", "Indomaret", "Alfamidi"],
            },
          ].map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-[#3C3C3B] rounded-lg">
              <div className="p-4 border-b border-gray-600">
                <h3 className="text-white font-medium">{category.title}</h3>
                {category.subtitle && (
                  <p className="text-red-400 text-sm">{category.subtitle}</p>
                )}
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {category.methods.map((method, methodIndex) => (
                    <span
                      key={methodIndex}
                      className="bg-[#4C4C4B] text-gray-300 text-xs px-3 py-1 rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: Detail Kontak */}
      <div className="bg-[#2C2C2B] rounded-lg overflow-hidden">
        <div className="flex">
          <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
            <div className="px-1 flex items-center justify-center text-white text-[16px] font-semibold">
              4
            </div>
          </div>
          <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
            <h2 className="text-white text-[15px] font-semibold">
              Detail Kontak
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                No. WhatsApp
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-3 bg-[#3C3C3B] border border-gray-600 border-r-0 rounded-l-lg">
                  <img
                    src="/flag-indonesia.png"
                    alt="ID"
                    className="w-5 h-4 mr-2"
                  />
                  <span className="text-white text-sm">+62</span>
                </div>
                <input
                  type="text"
                  value={formData.whatsapp.replace("+62", "")}
                  onChange={(e) =>
                    handleInputChange("whatsapp", "+62" + e.target.value)
                  }
                  className="flex-1 px-4 py-3 bg-[#3C3C3B] border border-gray-600 rounded-r-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A58C6F] focus:border-[#A58C6F]"
                />
              </div>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  i
                </span>
                *Nomor ini akan dihubungi jika terjadi masalah
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Kode Promo */}
      <div className="bg-[#2C2C2B] rounded-lg overflow-hidden">
        <div className="flex">
          <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
            <div className="px-1 flex items-center justify-center text-white text-[16px] font-semibold">
              5
            </div>
          </div>
          <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
            <h2 className="text-white text-[15px] font-semibold">Kode Promo</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ketik Kode Promo Kamu"
              value={formData.promoCode}
              onChange={(e) => handleInputChange("promoCode", e.target.value)}
              className="flex-1 px-4 py-2 bg-[#5F666D] border-0 rounded-lg text-white placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#A58C6F] focus:border-[#A58C6F]"
            />
            <button className="bg-[#A58C6F] hover:bg-[#94795E] text-white px-4 rounded-lg font-medium transition-colors duration-200 text-[14px]">
              Gunakan
            </button>
          </div>
          <button className="mt-3 text-[#A58C6F] text-sm flex items-center gap-2 hover:underline">
            <span>🎫</span>
            Pakai Promo Yang Tersedia
          </button>
        </div>
      </div>
    </div>
  );
}
