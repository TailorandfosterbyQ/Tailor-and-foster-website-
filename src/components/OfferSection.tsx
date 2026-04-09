import { TrendingUp, TrendingDown, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const offers = [
  { icon: TrendingUp, key: "growth", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { icon: TrendingDown, key: "downsizing", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { icon: FileText, key: "lease", color: "bg-sky-50 text-sky-700 border-sky-200" },
];

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="mx-auto max-w-7xl px-6 py-28 sm:px-8 lg:px-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left sticky intro */}
        <motion.div
          className="lg:col-span-4 lg:sticky lg:top-32"
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
          <div className="mt-6 h-px w-16 bg-primary/30" />
        </motion.div>

        {/* Right stacked cards */}
        <div className="lg:col-span-8 space-y-6">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            return (
              <motion.a
                key={offer.key}
                href={`/services/${offer.key}`}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="group flex items-start gap-6 rounded-2xl border border-border bg-card p-8 cursor-pointer block"
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${offer.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {t(`offer.${offer.key}.title`)}
                    </h3>
                    <ArrowUpRight size={20} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {t(`offer.${offer.key}.text`)}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
