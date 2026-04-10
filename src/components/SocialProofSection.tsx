import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const clients = [
  { name: "Abbott", logo: "https://logo.clearbit.com/abbott.com" },
  { name: "Adecco", logo: "https://logo.clearbit.com/adecco.com" },
  { name: "Baker McKenzie", logo: "https://logo.clearbit.com/bakermckenzie.com" },
  { name: "Coca Cola", logo: "https://logo.clearbit.com/coca-cola.com" },
  { name: "Cochlear", logo: "https://logo.clearbit.com/cochlear.com" },
  { name: "Danone", logo: "https://logo.clearbit.com/danone.com" },
  { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com" },
  { name: "Deutsche Telekom", logo: "https://logo.clearbit.com/telekom.com" },
  { name: "Eastman", logo: "https://logo.clearbit.com/eastman.com" },
  { name: "Eaton", logo: "https://logo.clearbit.com/eaton.com" },
  { name: "Ericsson", logo: "https://logo.clearbit.com/ericsson.com" },
  { name: "EY", logo: "https://logo.clearbit.com/ey.com" },
  { name: "G4S", logo: "https://logo.clearbit.com/g4s.com" },
  { name: "Hasbro", logo: "https://logo.clearbit.com/hasbro.com" },
  { name: "Hilti", logo: "https://logo.clearbit.com/hilti.com" },
  { name: "Hudson", logo: "https://logo.clearbit.com/hudson.com" },
  { name: "Johnson", logo: "https://logo.clearbit.com/jnj.com" },
  { name: "Levi Strauss", logo: "https://logo.clearbit.com/levistrauss.com" },
  { name: "Marsh", logo: "https://logo.clearbit.com/marsh.com" },
  { name: "Panasonic", logo: "https://logo.clearbit.com/panasonic.com" },
  { name: "Smith & Nephew", logo: "https://logo.clearbit.com/smith-nephew.com" },
  { name: "TomTom", logo: "https://logo.clearbit.com/tomtom.com" },
  { name: "Vandemoortele", logo: "https://logo.clearbit.com/vandemoortele.com" },
  { name: "Volkswagen", logo: "https://logo.clearbit.com/volkswagen.com" },
  { name: "Yara", logo: "https://logo.clearbit.com/yara.com" },
];

const row1 = clients.slice(0, 13);
const row2 = clients.slice(13);

type Client = { name: string; logo: string };

const MarqueeRow = ({ items, reverse = false }: { items: Client[]; reverse?: boolean }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap items-center"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-4 min-w-[160px] h-[72px] hover:border-primary/30 hover:shadow-sm transition-all grayscale hover:grayscale-0"
          >
            <img
              src={client.logo}
              alt={client.name}
              className="h-8 max-w-[120px] object-contain"
              loading="lazy"
              onError={(e) => {
                // Fallback to text if logo fails to load
                const target = e.currentTarget;
                target.style.display = 'none';
                const span = document.createElement('span');
                span.className = 'text-sm font-medium tracking-wide text-foreground/70';
                span.textContent = client.name;
                target.parentElement?.appendChild(span);
              }}
            />
          </div>
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

      <div className="space-y-3">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
};

export default SocialProofSection;
