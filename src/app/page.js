import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      {/* Navbar Component */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
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
