import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import servicesHero from '@/assets/services-hero.jpg';

const situationKeys = [
  "outgrowing", "relocation", "mismatch", "clarity",
  "merging", "lease_expiry", "building_issues", "no_resources"
] as const;

const ServicesOverview = () => {
  const { t } = useLanguage();
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggle = (i: number) => setOpenCard(openCard === i ? null : i);

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C82]/80 via-[#0F4C82]/60 to-[#0F4C82]/30" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.22em] text-white/60"
          >
            {t("servicesOverview.hero.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-3xl text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] font-bold font-serif"
          >
            {t("servicesOverview.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/70"
          >
            {t("servicesOverview.hero.text")}
          </motion.p>
        </div>
      </section>

      {/* Situation Cards */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("servicesOverview.cards.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t("servicesOverview.cards.title")}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {situationKeys.map((key, i) => {
            const isOpen = openCard === i;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-7 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {t(`servicesOverview.${key}.title`)}
                        </h3>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                        </motion.div>
                      </div>
                      <p className="mt-2 text-base leading-7 text-muted-foreground">
                        {t(`servicesOverview.${key}.summary`)}
                      </p>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 pt-0">
                        <div className="ml-12 border-t border-border pt-5">
                          <p className="text-base leading-7 text-muted-foreground">
                            {t(`servicesOverview.${key}.detail`)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Closing line + CTA */}
      <section className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xl leading-8 text-foreground font-medium italic font-serif">
              {t("servicesOverview.closing")}
            </p>
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10"
            >
              <Link
                to="/opportunity-scan"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg group"
              >
                {t("hero.cta.primary")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesOverview;
