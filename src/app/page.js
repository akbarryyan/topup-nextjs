import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

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
