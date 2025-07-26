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
        <div className="relative overflow-hidden">
          {/* Transaksi Tab Content */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              activeTab === "transaksi"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
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
          </div>

          {/* Keterangan Tab Content */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              activeTab === "keterangan"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Description Only */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-[#2C2C2B] rounded-xl overflow-hidden">
                  <div className="bg-[#434649]">
                    <div className="flex">
                      <div className="bg-[#A58C6F] px-6 flex items-center justify-center"></div>
                      <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
                        <h2 className="text-white text-[15px] font-semibold">
                          Deskripsi Mobile Legends
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-5">
                    <div className="text-white text-[13px] space-y-2">
                      <p>
                        Top up Diamond Mobile Legends harga paling murah. Cara
                        topup :
                      </p>
                      <ol className="list-decimal list-inside">
                        <li>Masukkan Data Akun</li>
                        <li>Pilih Nominal</li>
                        <li>Masukkan jumlah</li>
                        <li>Pilih Pembayaran</li>
                        <li>Tulis Kode Promo (jika ada)</li>
                        <li>Masukkan No WhatsApp</li>
                        <li>Klik Order Now & lakukan Pembayaran</li>
                        <li>Produk otomatis masuk ke akun kamu setelah</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Ulasan dan Rating + FAQ */}
              <div className="lg:col-span-1 space-y-6">
                {/* Rating Overview */}
                <div className="bg-[#2C2C2B] rounded-lg overflow-hidden">
                  <div className="bg-[#434649]">
                    <div className="flex">
                      <div className="bg-[#A58C6F] px-4 flex items-center justify-center">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="bg-[#5F666D] flex-1 px-5 py-2 flex items-center">
                        <h2 className="text-white text-[15px] font-semibold">
                          Ulasan
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-6 mt-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <svg
                        className="w-8 h-8 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-4xl font-bold text-white">
                        4.99
                      </span>
                      <span className="text-gray-400 text-lg">/ 5.0</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Pelanggan merasa puas dengan produk ini.
                    </p>
                    <p className="text-gray-400 text-sm">
                      Dari <span className="font-medium">5.68jt</span> ulasan.
                    </p>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-2 mb-6 px-4">
                    {[
                      { stars: 5, count: "5.67jt", percentage: 95 },
                      { stars: 4, count: "3.56rb", percentage: 3 },
                      { stars: 3, count: "418", percentage: 1 },
                      { stars: 2, count: "78", percentage: 0.5 },
                      { stars: 1, count: "218", percentage: 0.5 },
                    ].map((rating) => (
                      <div
                        key={rating.stars}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="text-white w-2">{rating.stars}</span>
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1">
                          <div className="bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${rating.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-gray-300 text-xs w-12 text-right">
                          {rating.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm mb-4 px-4">
                    Apakah kamu menyukai produk ini? Beri tahu kami dan cari
                    tahu pendapat tamu lainnya tentang pengalamanmu.
                  </p>

                  {/* User Reviews */}
                  <div className="space-y-4 mb-4 px-4">
                    {[
                      {
                        name: "ran************",
                        date: "25-07-2025",
                        time: "23:49:35",
                        review: "Puas banget topup disini!",
                        product:
                          "1000 (500+500) Diamonds Khasura Top Up Pertama Kali! (Klik dan Baca Deskripsinya)",
                      },
                      {
                        name: "ran************",
                        date: "26-07-2025",
                        time: "23:33:41",
                        review: "Puas banget topup disini!",
                        product: "4x Weekly Diamond Pass",
                      },
                      {
                        name: "ran************",
                        date: "26-07-2025",
                        time: "23:33:41",
                        review: "Puas banget topup disini!",
                        product:
                          "1000 (500+500) Diamonds Khasura Top Up Pertama Kali! (Klik dan Baca Deskripsinya)",
                      },
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="border-t border-gray-600 py-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium text-sm">
                            {review.name}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-3 h-3 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs mb-2">
                          {review.date} {review.time}
                        </p>
                        <p className="text-white text-sm mb-2 italic">
                          "{review.review}"
                        </p>
                        <p className="text-gray-400 text-xs">
                          {review.product}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-[#434649] hover:bg-gray-600 text-white text-sm py-3 px-4 rounded--blg transition-colors duration-200 flex items-center justify-center gap-2">
                    Lihat semua ulasan
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* FAQ Section - Moved to sidebar */}
                <div className="bg-[#5F666D] rounded-lg p-6">
                  <h3 className="text-white text-lg font-medium mb-6">
                    Kamu Punya Pertanyaan?
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Bagaimana cara top up di Oura Store?",
                      "Metode pembayaran apa saja yang ada di Oura Store?",
                      "Mengapa harus top up di Oura Store?",
                      "Berapa lama proses top up di Oura Store?",
                      "Apakah top up di Oura Store aman?",
                      "Bagaimana cara cek transaksi di Oura Store?",
                      "Apakah ada promo di Oura Store?",
                      "Jika ada kendala bagaimana cara chat Customer Service Oura Store?",
                    ].map((question, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-600 pb-3"
                      >
                        <button className="w-full text-left flex items-center justify-between text-white hover:text-gray-300 transition-colors py-2">
                          <span className="text-sm">{question}</span>
                          <svg
                            className="w-4 h-4 text-gray-400"
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
