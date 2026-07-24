import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import USPsSection from "@/components/USPsSection";
import OfferSection from "@/components/OfferSection";
import SocialProofSection from "@/components/SocialProofSection";
import CostCalculatorTile from "@/components/CostCalculatorTile";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <TrustBar />
      <WhatWeDoSection />
      <USPsSection />
      <OfferSection />
      <SocialProofSection />
      <CostCalculatorTile />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
