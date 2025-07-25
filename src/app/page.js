import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSeller from "@/components/BestSeller";
import AllProducts from "@/components/AllProducts";
import News from "@/components/News";
import Footer from "@/components/Footer";

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
      {/* News Section */}
      <News />
      {/* Footer */}
      <Footer />
    </div>
  );
}
