import { motion } from 'framer-motion';
import { Search, Compass, Pencil, Cog, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const steps = [
  { icon: Search, key: 'analysis' },
  { icon: Compass, key: 'strategy' },
  { icon: Pencil, key: 'design' },
  { icon: Cog, key: 'execution' },
  { icon: ShieldCheck, key: 'aftercare' },
];

const HowWeWorkSection = () => {
  const { t } = useLanguage();

  return (
    <section id="howwework" className="bg-background py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t('howwework.label')}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-serif">
            {t('howwework.title')}
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute top-11 left-0 right-0 h-px bg-primary/20" />
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center"
                >
                  <div className="relative mx-auto flex h-22 w-22 items-center justify-center rounded-full bg-secondary border border-border">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground font-serif">
                      {t(`howwework.${step.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {t(`howwework.${step.key}.text`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/20" />
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-6"
                >
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground font-serif">
                      {t(`howwework.${step.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t(`howwework.${step.key}.text`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
