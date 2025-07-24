import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSeller from "@/components/BestSeller";
import AllProducts from "@/components/SpecialistMLBB";

export default function Home() {
  return (
    <div className="bg-[#121212]">
      {/* Navbar Component */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      {/* Best Seller Section */}
      <BestSeller />
      {/* All Products Section */}
      <AllProducts />
    </div>
  );
}
