import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const clientList = [
  "Abbott", "Adecco", "Baker McKenzie", "Coca Cola", "Cochlear", "Danone",
  "Deloitte", "Deutsche Telekom", "Eastman", "Eaton", "Ericsson", "EY",
  "G4S", "Hasbro", "Hilti", "Hudson", "Johnson", "Levi Strauss",
  "Marsh", "Panasonic", "Smith & Nephew", "TomTom",
  "Vandemoortele", "Volkswagen International", "Yara",
];

const row1 = clientList.slice(0, 13);
const row2 = clientList.slice(13);

const MarqueeRow = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((client, i) => (
          <span
            key={`${client}-${i}`}
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground hover:border-primary/30 transition-colors"
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SocialProofSection = () => {
  const { t } = useLanguage();

  return (
    <section id="references" className="py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("social.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground max-w-2xl mx-auto">
            {t("social.title")}
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed marquee */}
      <div className="space-y-2">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
};

export default SocialProofSection;
