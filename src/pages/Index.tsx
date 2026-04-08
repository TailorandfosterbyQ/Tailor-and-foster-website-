import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProcessSection from "@/components/ProcessSection";
import SituationsSection from "@/components/SituationsSection";
import ReferencesSection from "@/components/ReferencesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ExpertiseSection />
      <SituationsSection />
      <ProcessSection />
      <ReferencesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
