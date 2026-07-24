import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, Pencil, Wrench, Headset, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const steps = [
  { icon: Search, key: 'analysis' },
  { icon: Target, key: 'strategy' },
  { icon: Pencil, key: 'design' },
  { icon: Wrench, key: 'execution' },
  { icon: Headset, key: 'aftercare' },
];

const HowWeWorkSection = () => {
  const { t } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

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
              const isOpen = openKey === step.key;
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
                  <button
                    type="button"
                    onClick={() => toggle(step.key)}
                    className="mt-6 w-full group cursor-pointer text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground font-serif">
                        {t(`howwework.${step.key}.title`)}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="text-primary/70 group-hover:text-primary"
                      >
                        <ChevronDown size={16} strokeWidth={2.5} />
                      </motion.div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {t(`howwework.${step.key}.text`)}
                    </p>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm leading-6 text-primary/80">
                            {t(`howwework.${step.key}.expand`)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
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
              const isOpen = openKey === step.key;
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
                  <button
                    type="button"
                    onClick={() => toggle(step.key)}
                    className="flex-1 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground font-serif">
                        {t(`howwework.${step.key}.title`)}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="text-primary/70 group-hover:text-primary"
                      >
                        <ChevronDown size={16} strokeWidth={2.5} />
                      </motion.div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t(`howwework.${step.key}.text`)}
                    </p>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm leading-6 text-primary/80">
                            {t(`howwework.${step.key}.expand`)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
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
