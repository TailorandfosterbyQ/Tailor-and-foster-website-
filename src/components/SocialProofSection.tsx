import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const clientList = [
  "Abbott", "Adecco", "Baker McKenzie", "Coca Cola", "Cochlear", "Danone",
  "Deloitte", "Deutsche Telekom", "Eastman", "Eaton", "Ericsson", "EY",
  "G4S", "Hasbro", "Hilti", "Hudson", "Johnson", "Levi Strauss",
  "Marsh", "Panasonic", "Smith & Nephew", "TomTom",
  "Vandemoortele", "Volkswagen International", "Yara",
];

const SocialProofSection = () => {
  const { t } = useLanguage();

  return (
    <section id="references" className="bg-secondary/50 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
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

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {clientList.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--card))" }}
              className="flex items-center justify-center rounded-xl border border-border bg-card/50 px-3 py-4 text-center"
            >
              <span className="text-xs font-medium tracking-wide text-muted-foreground">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
