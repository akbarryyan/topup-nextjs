"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/ProductHero";
import ProductForm from "@/components/ProductForm";

export default function MobileLegendsPage() {
  const [activeTab, setActiveTab] = useState("transaksi");

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      {/* Product Hero Section */}
      <ProductHero
        gameTitle="MOBILE LEGENDS"
        gameSubtitle="Moonton"
        features={[
          { icon: "⚡", text: "Proses Cepat" },
          { icon: "💬", text: "Layanan Chat 24/7" },
          { icon: "🔒", text: "Pembayaran Aman!" },
        ]}
      />

      {/* Tab Category */}
      <div className="flex items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-1 bg-[#434649] px-1 py-1 rounded-lg">
          <button
            onClick={() => setActiveTab("transaksi")}
            className={`px-14 py-1 rounded-md font-semibold transition-colors ${
              activeTab === "transaksi"
                ? "bg-[#A58C6F] text-white"
                : "text-white hover:bg-gray-600"
            }`}
          >
            <span className="text-sm font-medium">Transaksi</span>
          </button>
          <button
            onClick={() => setActiveTab("keterangan")}
            className={`px-14 py-1 rounded-md font-semibold transition-colors ${
              activeTab === "keterangan"
                ? "bg-[#A58C6F] text-white"
                : "text-white hover:bg-gray-600"
            }`}
          >
            <span className="text-sm font-medium">Keterangan</span>
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === "transaksi" ? (
          // Transaksi Tab Content
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <ProductForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#2C2C2B] rounded-lg p-6">
                <p className="text-gray-400 text-center text-sm mb-4">
                  Belum ada item produk yang dipilih.
                </p>
                <button className="w-full bg-[#A58C6F] hover:bg-[#94795E] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                  </svg>
                  Pesan Sekarang!
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Keterangan Tab Content
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Description & FAQ */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-[#A58C6F] rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">
                  Deskripsi Mobile Legends
                </h3>
                <div className="text-white text-sm space-y-2">
                  <p>
                    Top up Diamond Mobile Legends harga paling murah. Cara topup
                    :
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Masukkan Data Akun</li>
                    <li>Pilih Nominal</li>
                    <li>Masukkan jumlah</li>
                    <li>Pilih Pembayaran</li>
                    <li>Tulis Kode Promo (jika ada)</li>
                    <li>Masukkan No WhatsApp</li>
                  </ol>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#2C2C2B] rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-6">
                  Kamu Punya Pertanyaan?
                </h3>
                <div className="space-y-4">
                  {[
                    "Bagaimana cara top up di Oura Store?",
                    "Metode pembayaran apa saja yang ada di Oura Store?",
                    "Mengapa harus top up di Oura Store?",
                    "Berapa lama proses top up di Oura Store?",
                    "Apakah top up di Oura Store aman?",
                    "Bagaimana cara cek transaksi di Oura Store?",
                    "Apakah ada promo di Oura Store?",
                    "Jika ada kendala bagaimana cara chat Customer Service Oura Store?",
                    "Berapa batas pembelian weekly diamond pass?",
                    "Apa penjelasan diamond yang dalam kurung misalnya: 277 (250+27) Diamonds?",
                  ].map((question, index) => (
                    <div key={index} className="border-b border-gray-600 pb-4">
                      <button className="w-full text-left flex items-center justify-between text-white hover:text-gray-300 transition-colors">
                        <span className="text-sm">{question}</span>
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Ulasan dan Rating */}
            <div className="lg:col-span-1">
              <div className="bg-[#2C2C2B] rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <h3 className="text-white text-lg font-medium mb-2">
                    Ulasan dan rating
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">4.99</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Berdasarkan total 5.68jt rating
                  </p>
                </div>
              </div>

              <div className="bg-[#2C2C2B] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C14.74 5.59 13.53 6.47 12.71 7.71L11 10L13 12L14.5 10.5C15.14 9.86 16.05 9.5 17 9.5C17.35 9.5 17.69 9.55 18 9.65V21C18 21.55 18.45 22 19 22S20 21.55 20 22V10C20.55 10 21 9.55 21 9ZM6 14V16H4V18H6V20H8V18H10V16H8V14H6ZM4 8V10H2V12H4V14H6V12H8V10H6V8H4Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Butuh Bantuan?</h4>
                    <p className="text-gray-400 text-sm">
                      Kamu bisa hubungi admin disini.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
