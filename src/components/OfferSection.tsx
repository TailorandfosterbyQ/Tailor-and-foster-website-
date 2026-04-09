import { TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const offers = [
  { icon: TrendingUp, key: "growth" },
  { icon: TrendingDown, key: "downsizing" },
  { icon: FileText, key: "lease" },
];

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 overflow-hidden">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          {t("offer.label")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
          {t("offer.title")}
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {offers.map((offer, i) => {
          const Icon = offer.icon;
          return (
            <motion.div
              key={offer.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="group relative rounded-3xl border border-border bg-card p-8 shadow-sm overflow-hidden cursor-default"
            >
              <motion.div
                className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 to-primary/0 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                whileHover={{ backgroundColor: "hsl(var(--primary))", color: "#fff", scale: 1.1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon size={20} />
              </motion.div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {t(`offer.${offer.key}.title`)}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {t(`offer.${offer.key}.text`)}
              </p>
              <motion.a
                href="/services"
                className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
                whileHover={{ x: 4 }}
              >
                Learn more →
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OfferSection;
