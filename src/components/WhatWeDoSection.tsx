import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const WhatWeDoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-serif"
        >
          {t("whatwedo.title")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 max-w-2xl space-y-4"
        >
          <p className="text-base leading-7 text-muted-foreground">
            {t("whatwedo.p1")}
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            {t("whatwedo.p2")}
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            {t("whatwedo.p3")}
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            {t("whatwedo.p4")}
          </p>
          <p className="text-base leading-7 text-muted-foreground">
            {t("whatwedo.p5")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
