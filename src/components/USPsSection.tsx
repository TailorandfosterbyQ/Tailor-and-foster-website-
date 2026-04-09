import { Shield, Clock, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const usps = [
  { icon: Shield, key: "independent", number: "100%", accent: "from-blue-500/20 to-cyan-500/20" },
  { icon: Clock, key: "disruption", number: "0", accent: "from-amber-500/20 to-orange-500/20" },
  { icon: UserCheck, key: "senior", number: "∞", accent: "from-emerald-500/20 to-teal-500/20" },
];

const USPsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="usps" className="relative overflow-hidden">
      {/* Full-width dark band for contrast */}
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-background/50">
              {t("usps.label")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-background">
              {t("usps.title")}
            </h2>
          </motion.div>

          <div className="grid gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/10">
            {usps.map((usp, i) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={usp.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative px-8 py-8 first:pl-0 last:pr-0"
                >
                  <motion.span
                    className="block text-6xl font-serif font-light text-background/20 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                  >
                    {usp.number}
                  </motion.span>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background/70">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-background">
                      {t(`usps.${usp.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-base leading-7 text-background/60">
                    {t(`usps.${usp.key}.text`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPsSection;
