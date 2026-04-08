import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const SituationsSection = () => {
  const { t } = useLanguage();

  const situations = Array.from({ length: 6 }, (_, i) => ({
    title: t(`situations.${i + 1}.title`),
    text: t(`situations.${i + 1}.text`),
  }));

  return (
    <section className="bg-secondary/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("situations.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t("situations.title")}
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {situations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                borderColor: "hsl(var(--primary) / 0.3)",
                boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)",
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-sm cursor-default"
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                  whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--primary))", color: "#fff" }}
                  transition={{ duration: 0.2 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SituationsSection;
