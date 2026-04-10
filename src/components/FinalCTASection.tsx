import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const FinalCTASection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative overflow-hidden bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h2
              className="text-4xl font-semibold tracking-tight sm:text-5xl text-white"
            >
              {t("finalCta.title")}
            </motion.h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              {t("finalCta.text")}
            </p>
          </motion.div>
          <motion.div
            className="flex lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/opportunity-scan"
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-medium text-primary shadow-lg group"
              >
                {t("finalCta.button")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "40px 40px",
        }} />
      </div>
    </section>
  );
};

export default FinalCTASection;
