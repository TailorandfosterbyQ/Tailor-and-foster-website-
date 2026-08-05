import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import workplaceImage from '@/assets/workplace-strategy.jpg';

const WhatWeDoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-serif"
            >
              {t("whatwedo.title")}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 max-w-xl space-y-4"
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
              className="mt-8"
            >
              <Link
                to="/about#whatwedo"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/80 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-white hover:border-foreground/20"
              >
                {t("whatwedo.cta")}
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-primary/10">
              <img
                src={workplaceImage}
                alt=""
                width={1280}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/5] lg:aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-2xl bg-primary/10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
