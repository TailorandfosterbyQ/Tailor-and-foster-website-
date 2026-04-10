import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const WhatWeDoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.22em] text-primary"
        >
          {t("whatwedo.label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-serif"
        >
          {t("whatwedo.title")}
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-base leading-7 text-muted-foreground">
              {t("whatwedo.p1")}
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              {t("whatwedo.p2")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            <p className="text-base leading-7 text-muted-foreground">
              {t("whatwedo.p3")}
            </p>
            <p className="text-base leading-7 text-foreground font-medium italic">
              {t("whatwedo.p4")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
