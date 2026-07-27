import { useParams, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from 'framer-motion';
import { Search, Map, Users, ArrowRight, TrendingUp, TrendingDown, FileText, Wrench, Phone, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import servicesHeroGrowth from '@/assets/services-hero.jpg';
import servicesHeroDownsizing from '@/assets/services-hero-downsizing.jpg';
import servicesHeroLease from '@/assets/services-hero-lease.jpg';
import servicesHeroInterventions from '@/assets/services-hero-interventions.jpg';

const serviceConfig = {
  growth: { icon: TrendingUp, image: servicesHeroGrowth, translationKey: "growth", stepIcons: [Search, Map, Users] },
  downsizing: { icon: TrendingDown, image: servicesHeroDownsizing, translationKey: "downsizing", stepIcons: [Search, Map, Users] },
  lease: { icon: FileText, image: servicesHeroLease, translationKey: "lease", stepIcons: [Search, Map, Users] },
  "kleine-interventies": { icon: Wrench, image: servicesHeroInterventions, translationKey: "interventions", stepIcons: [Phone, Wrench, ClipboardCheck] },
} as const;

type ServiceType = keyof typeof serviceConfig;

const Services = () => {
  const { t } = useLanguage();
  const { type } = useParams<{ type: string }>();

  const serviceType: ServiceType = (type && type in serviceConfig) ? type as ServiceType : 'growth';
  const config = serviceConfig[serviceType];
  const ServiceIcon = config.icon;
  const tKey = config.translationKey;
  const stepIcons = config.stepIcons;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <PageHero
        image={config.image}
        icon={ServiceIcon}
        eyebrow={t(`services.${tKey}.hero.label`)}
        title={t(`services.${tKey}.hero.title`)}
        text={t(`services.${tKey}.hero.text`)}
      />

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
            {t(`services.${tKey}.process.label`)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t(`services.${tKey}.process.title`)}
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
                  {t(`services.${tKey}.step${num}.title`)}
                </h3>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {t(`services.${tKey}.step${num}.text`)}
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
              {t(`services.${tKey}.forWhom.label`)}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground"
            >
              {t(`services.${tKey}.forWhom.title`)}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base leading-7 text-muted-foreground"
            >
              {t(`services.${tKey}.forWhom.text`)}
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-lg ring-offset-background transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group"
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
