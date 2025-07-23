import Image from "next/image";

export default function SpecialistMLBB() {
  const mlbbRegions = [
    {
      name: "MOBILE LEGENDS",
      region: "INDONESIA",
      flag: "🇮🇩",
      image: "/ml.webp",
    },
    {
      name: "MOBILE LEGENDS",
      region: "GLOBAL",
      flag: "🌍",
      image: "/ml.webp",
    },
    {
      name: "MOBILE LEGENDS",
      region: "NON SEA",
      flag: "🌐",
      image: "/ml.webp",
    },
    {
      name: "MOBILE LEGENDS",
      region: "PHILIPPINES",
      flag: "🇵🇭",
      image: "/ml.webp",
    },
    {
      name: "MOBILE LEGENDS",
      region: "RUSSIA",
      flag: "🇷🇺",
      image: "/ml.webp",
    },
  ];

  return (
    <section className="pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-white mb-1">
            Specialist MLBB
          </h2>
          <p className="text-gray-400 text-sm">Diamonds murah, 1000% Legal</p>
        </div>

        {/* MLBB Regions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mlbbRegions.map((region, index) => (
            <MLBBCard key={index} region={region} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MLBBCard({ region }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
        {/* Background Image */}
        <div className="aspect-[4/5] relative">
          <Image
            src={region.image}
            alt={`Mobile Legends ${region.region}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Mobile Legends Text */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">M</span>
                <div className="text-orange-500 font-bold text-lg">MOBILE</div>
              </div>
              <div className="text-orange-500 font-bold text-lg -mt-2">
                LEGENDS
              </div>
            </div>

            {/* Region Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{region.flag}</span>
                <span className="text-white font-bold text-sm">
                  {region.region}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
