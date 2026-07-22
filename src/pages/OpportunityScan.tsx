import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import opportunityScanHero from "@/assets/opportunity-scan-hero.jpg";
import { Handshake, CalendarCheck, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/bernard-tailorandfoster/opportunity-scan";

const OpportunityScan = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img
          src={servicesHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/85 via-[hsl(var(--primary))]/65 to-[hsl(var(--primary))]/35" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] font-bold font-serif"
          >
            {t("opportunityScan.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80"
          >
            {t("opportunityScan.hero.text")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-7 text-white/60"
          >
            {t("opportunityScan.hero.cta")}
          </motion.p>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card shadow-lg overflow-hidden"
        >
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default OpportunityScan;
