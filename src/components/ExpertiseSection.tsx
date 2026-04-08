import { Building2, FileCheck, MapPin, Paintbrush, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const serviceKeys = [
  { icon: Building2, key: "realEstate" },
  { icon: FileCheck, key: "contracts" },
  { icon: MapPin, key: "selection" },
  { icon: Paintbrush, key: "design" },
  { icon: Truck, key: "move" },
  { icon: RefreshCw, key: "sync" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const ExpertiseSection = () => {
  const { t } = useLanguage();

  return (
    <section id="expertise" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 overflow-hidden">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          {t("expertise.label")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
          {t("expertise.title")}
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {serviceKeys.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.key}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="group relative rounded-3xl border border-border bg-card p-8 shadow-sm overflow-hidden cursor-default"
            >
              <motion.div
                className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 to-primary/0 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                whileHover={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", scale: 1.1 }}
                transition={{ duration: 0.25 }}
              >
                <Icon size={20} />
              </motion.div>
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-foreground">
                {t(`expertise.${service.key}.title`)}
              </h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                {t(`expertise.${service.key}.text`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ExpertiseSection;
