import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-gradient-to-br from-primary via-primary to-[hsl(205,80%,18%)] p-10 sm:p-14 lg:p-20 text-primary-foreground"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground/60"
          >
            {t("contact.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5 }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/opportunity-scan"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-lg group"
            >
              {t("contact.cta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
