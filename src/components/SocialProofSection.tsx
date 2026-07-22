import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const clients = [
  { name: "Abbott", domain: "abbott.com" },
  { name: "Adecco", domain: "adecco.com" },
  { name: "Baker McKenzie", domain: "bakermckenzie.com" },
  { name: "Coca-Cola", domain: "coca-cola.com" },
  { name: "Cochlear", domain: "cochlear.com" },
  { name: "Danone", domain: "danone.com" },
  { name: "Deloitte", domain: "deloitte.com" },
  { name: "Deutsche Telekom", domain: "telekom.com" },
  { name: "Eastman", domain: "eastman.com" },
  { name: "Eaton", domain: "eaton.com" },
  { name: "Ericsson", domain: "ericsson.com" },
  { name: "EY", domain: "ey.com" },
  { name: "G4S", domain: "g4s.com" },
  { name: "Hasbro", domain: "hasbro.com" },
  { name: "Hilti", domain: "hilti.com" },
  { name: "Hudson", domain: "hudson.com" },
  { name: "Johnson & Johnson", domain: "jnj.com" },
  { name: "Levi Strauss", domain: "levistrauss.com" },
  { name: "Marsh", domain: "marsh.com" },
  { name: "Panasonic", domain: "panasonic.com" },
  { name: "Smith & Nephew", domain: "smith-nephew.com" },
  { name: "TomTom", domain: "tomtom.com" },
  { name: "Vandemoortele", domain: "vandemoortele.com" },
  { name: "Volkswagen", domain: "volkswagen.com" },
  { name: "Yara", domain: "yara.com" },
];

const row1 = clients.slice(0, 13);
const row2 = clients.slice(13);

type Client = { name: string; domain: string };

const ClientLogo = ({ client }: { client: Client }) => {
  return (
    <div className="inline-flex items-center justify-center rounded-xl border border-border/70 bg-gradient-to-b from-card to-secondary/40 px-6 py-4 min-w-[160px] h-[72px] shadow-[0_1px_2px_rgba(15,76,130,0.04),0_4px_12px_-4px_rgba(15,76,130,0.08)] hover:border-primary/30 hover:shadow-[0_2px_4px_rgba(15,76,130,0.06),0_8px_20px_-6px_rgba(15,76,130,0.15)] transition-all">
      <img
        src={`https://img.logo.dev/${client.domain}?token=pk_a8CO5GPaRUWVLT6JMzEO4w&size=120&format=png`}
        alt={client.name}
        className="h-8 max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.nextElementSibling) {
            (target.nextElementSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
      <span
        className="text-sm font-semibold tracking-wide text-foreground/50 hidden items-center"
      >
        {client.name}
      </span>
    </div>
  );
};

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
          <ClientLogo key={`${client.name}-${i}`} client={client} />
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
