import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhatWeDoSection from "@/components/WhatWeDoSection";
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
      <WhatWeDoSection />
      <USPsSection />
      <OfferSection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
