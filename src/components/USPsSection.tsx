import { Shield, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const KnightIcon = (props: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? 24}
    height={props.size ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15.5 21h-7a2 2 0 0 1-2-2v-1.5a.5.5 0 0 0-.5-.5H4v-2h2a2 2 0 0 1 2-2h1.5c.83 0 1.5-.67 1.5-1.5V9c0-2.2-1.8-4-4-4h-.5C5.5 5 4 4 4 3s2-2 4.5-2c2 0 3.5 1.5 4.5 3 .8 1.2 1.5 2 3 2.5 2.5.8 4 2.5 4 5.5v1c0 2.2-1.8 4-4 4h-1.5a.5.5 0 0 0-.5.5V19a2 2 0 0 1-2 2Z" />
    <path d="M6 12h2" />
    <circle cx="16" cy="8" r="1" />
  </svg>
);

const usps = [
  { icon: Shield, key: "independent", accent: "from-blue-500/20 to-cyan-500/20" },
  { icon: Clock, key: "disruption", accent: "from-amber-500/20 to-orange-500/20" },
  { icon: KnightIcon, key: "strategyExecution", accent: "from-emerald-500/20 to-teal-500/20" },
  { icon: DollarSign, key: "financial", accent: "from-violet-500/20 to-purple-500/20" },
];

const USPsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="usps" className="relative overflow-hidden">
      {/* Full-width dark band for contrast */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 lg:px-12">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground/50">
              {t("usps.label")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-primary-foreground">
              {t("usps.title")}
            </h2>
          </motion.div>

          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-4 bg-primary-foreground/10">
            {usps.map((usp, i) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={usp.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-primary px-8 py-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-primary-foreground">
                      {t(`usps.${usp.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-base leading-7 text-primary-foreground/60">
                    {t(`usps.${usp.key}.text`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPsSection;
