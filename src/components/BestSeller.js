import Image from "next/image";

export default function BestSeller() {
  const bestSellerGames = [
    {
      name: "Telegram Stars",
      developer: "Telegram Messenger Inc.",
      image: "/ff.webp",
      category: "Social",
    },
    {
      name: "Mobile Legends: Bang Bang",
      developer: "Moonton",
      image: "/ff.webp",
      category: "MOBA",
    },
    {
      name: "Free Fire / Free Fire Max",
      developer: "Garena",
      image: "/ff.webp",
      category: "Battle Royale",
    },
    {
      name: "Valorant",
      developer: "Riot Games",
      image: "/ff.webp",
      category: "FPS",
    },
    {
      name: "Honor of Kings",
      developer: "TiMi Studio",
      image: "/ff.webp",
      category: "MOBA",
    },
  ];

  return (
    <section className="pb-8 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-2xl font-semibold text-white">BEST SELLER</h2>
            <span className="text-2xl">🔥</span>
          </div>
          <p className="text-gray-400 text-sm">
            Kategori produk terlaris yang paling banyak dibeli.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestSellerGames.map((game, index) => (
            <BestSellerCard key={index} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellerCard({ game }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-orange-500 transition-all duration-300">
        {/* Game Image */}
        <div className="aspect-square relative">
          <Image
            src={game.image}
            alt={game.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Game Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">
                  {game.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {game.name}
                </h3>
                <p className="text-gray-300 text-xs">{game.developer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
