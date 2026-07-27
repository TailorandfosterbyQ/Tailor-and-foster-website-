import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
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

      <PageHero
        image={servicesHero}
        eyebrow={t("servicesOverview.hero.label")}
        title={t("servicesOverview.hero.title")}
        text={t("servicesOverview.hero.text")}
      />

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
                  aria-expanded={isOpen}
                  aria-controls={`situation-panel-${key}`}
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
                      id={`situation-panel-${key}`}
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
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
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
