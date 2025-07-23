import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSeller from "@/components/BestSeller";
import SpecialistMLBB from "@/components/SpecialistMLBB";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      {/* Navbar Component */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      {/* Best Seller Section */}
      <BestSeller />
      {/* Specialist MLBB Section */}
      <SpecialistMLBB />
    </div>
  );
}
