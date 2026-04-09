import { Shield, Clock, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const usps = [
  { icon: Shield, key: "independent" },
  { icon: Clock, key: "disruption" },
  { icon: UserCheck, key: "senior" },
];

const USPsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="usps" className="bg-secondary/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("usps.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t("usps.title")}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="group rounded-3xl border border-border bg-card p-8 shadow-sm"
              >
                <motion.div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  whileHover={{ backgroundColor: "hsl(var(--primary))", color: "#fff", scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon size={22} />
                </motion.div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {t(`usps.${usp.key}.title`)}
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {t(`usps.${usp.key}.text`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default USPsSection;
