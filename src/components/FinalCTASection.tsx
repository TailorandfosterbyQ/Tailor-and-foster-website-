import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const FinalCTASection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-gradient-to-br from-primary via-primary to-[hsl(205,80%,18%)] p-10 sm:p-14 lg:p-20 text-primary-foreground text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl mx-auto text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("finalCta.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 max-w-xl mx-auto text-base leading-7 text-primary-foreground/70"
          >
            {t("finalCta.text")}
          </motion.p>
          <motion.a
            href="mailto:info@tailorandfoster.com"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-lg group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5 }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t("finalCta.button")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
