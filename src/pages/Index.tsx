import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import USPsSection from "@/components/USPsSection";
import OfferSection from "@/components/OfferSection";
import SocialProofSection from "@/components/SocialProofSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <USPsSection />
      <OfferSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
