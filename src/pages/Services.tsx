import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Search, Map, Users, ArrowRight, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import servicesHero from '@/assets/services-hero.jpg';

const serviceConfig = {
  growth: { icon: TrendingUp, accent: "from-emerald-600 to-emerald-800" },
  downsizing: { icon: TrendingDown, accent: "from-amber-600 to-amber-800" },
  lease: { icon: FileText, accent: "from-sky-600 to-sky-800" },
} as const;

type ServiceType = keyof typeof serviceConfig;

const stepIcons = [Search, Map, Users];

const Services = () => {
  const { t } = useLanguage();
  const { type } = useParams<{ type: string }>();

  const serviceType: ServiceType = (type && type in serviceConfig) ? type as ServiceType : 'growth';
  const config = serviceConfig[serviceType];
  const ServiceIcon = config.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero with image */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <img
          src={servicesHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C82]/80 via-[#0F4C82]/60 to-[#0F4C82]/30" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <ServiceIcon size={20} className="text-white/60" />
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/60">
              {t(`services.${serviceType}.hero.label`)}
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 max-w-3xl text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] font-bold font-serif"
          >
            {t(`services.${serviceType}.hero.title`)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/70"
          >
            {t(`services.${serviceType}.hero.text`)}
          </motion.p>
        </div>
      </section>

      {/* Process steps */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t(`services.${serviceType}.process.label`)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t(`services.${serviceType}.process.title`)}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((num, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)", transition: { type: "spring", stiffness: 400, damping: 17 } }}
                className="rounded-3xl border border-border bg-card p-8 shadow-md border-t-2 border-t-primary"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {num}
                  </div>
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {t(`services.${serviceType}.step${num}.title`)}
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {t(`services.${serviceType}.step${num}.text`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* For Whom */}
      <section className="bg-secondary/50 pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium uppercase tracking-[0.22em] text-primary"
            >
              {t(`services.${serviceType}.forWhom.label`)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground"
            >
              {t(`services.${serviceType}.forWhom.title`)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base leading-7 text-muted-foreground"
            >
              {t(`services.${serviceType}.forWhom.text`)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-gradient-to-br from-primary via-primary to-[hsl(205,80%,18%)] p-10 sm:p-14 lg:p-20 text-primary-foreground text-center"
          >
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-10"
            >
              <Link
                to="/opportunity-scan"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-lg group"
              >
                {t("services.cta")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
