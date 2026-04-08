import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const ProcessSection = () => {
  const { t } = useLanguage();

  const steps = Array.from({ length: 5 }, (_, i) => t(`process.step${i + 1}`));

  return (
    <section id="process" className="relative bg-primary text-primary-foreground overflow-hidden">
      <motion.div
        className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-white/5"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground/60">
              {t("process.label")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("process.title")}
            </h2>
          </motion.div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  x: 8,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
                className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 cursor-default"
              >
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-primary"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {index + 1}
                </motion.div>
                <p className="pt-1 text-base leading-7 text-primary-foreground/90">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
