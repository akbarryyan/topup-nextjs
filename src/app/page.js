import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Banner Promo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/banner.webp"
              alt="Weekly Diamond Pass Mobile Legends"
              width={1400}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Overlay untuk memastikan teks tetap terbaca jika gambar tidak load */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
          </div>

          {/* Info Section di bawah banner */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Promo Info */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">WEEKLY DIAMOND PASS</h3>
              <p className="text-3xl font-bold mb-2">RP. 22.500</p>
              <p className="text-sm opacity-90">HARGA TERMURAH</p>
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <p className="text-xs font-semibold">
                  STOK TERBATAS! HADIR SETIAP JAM 15:00 WIB
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">📱</span>
                  <span className="text-sm">+62 822-8775-1007</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">🌐</span>
                  <span className="text-sm">pitopup.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-400">📷</span>
                  <span className="text-sm">@pitopupcom</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Kenapa Pilih Kami?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">⚡</span>
                  <span className="text-sm">Proses Instan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">🔒</span>
                  <span className="text-sm">100% Aman</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">💰</span>
                  <span className="text-sm">Harga Terbaik</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Game Populer
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {gameList.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Mengapa Pilih PI TOPUP?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Proses Cepat"
              description="Top up dalam hitungan detik, langsung masuk ke akun game kamu"
            />
            <FeatureCard
              icon="🔒"
              title="Aman & Terpercaya"
              description="Transaksi menggunakan sistem keamanan tingkat bank"
            />
            <FeatureCard
              icon="💰"
              title="Harga Terbaik"
              description="Dapatkan harga termurah dengan berbagai promo menarik"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Data game sementara
const gameList = [
  { name: "Mobile Legends", image: "/games/ml.jpg", category: "MOBA" },
  { name: "Free Fire", image: "/games/ff.jpg", category: "Battle Royale" },
  { name: "PUBG Mobile", image: "/games/pubg.jpg", category: "Battle Royale" },
  { name: "Genshin Impact", image: "/games/genshin.jpg", category: "RPG" },
  { name: "Valorant", image: "/games/valorant.jpg", category: "FPS" },
  { name: "Honkai Star Rail", image: "/games/hsr.jpg", category: "RPG" },
  { name: "Call of Duty", image: "/games/cod.jpg", category: "FPS" },
  { name: "Arena of Valor", image: "/games/aov.jpg", category: "MOBA" },
  { name: "Clash of Clans", image: "/games/coc.jpg", category: "Strategy" },
  { name: "Clash Royale", image: "/games/cr.jpg", category: "Strategy" },
  { name: "Dragon City", image: "/games/dc.jpg", category: "Simulation" },
  { name: "8 Ball Pool", image: "/games/8bp.jpg", category: "Sports" },
];

function GameCard({ game }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-700 hover:border-orange-500">
      <div className="aspect-square bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
        <span className="text-white text-xs font-semibold text-center px-2">
          {game.name}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-white truncate">
          {game.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1">{game.category}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center bg-gray-900 p-6 rounded-lg border border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
