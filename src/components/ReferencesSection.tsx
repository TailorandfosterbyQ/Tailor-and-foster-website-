import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const featuredProjects = [
  {
    name: "Vandemoortele Group Ghent",
    image: "https://i0.wp.com/tailorandfoster.com/wp-content/uploads/2021/09/Vandemoortele-1.jpeg?resize=600%2C403&ssl=1",
  },
  {
    name: "Baker McKenzie",
    image: "https://i0.wp.com/tailorandfoster.com/wp-content/uploads/2021/03/TAYLOR-FOSTER_SHOT_335-scaled.jpg?resize=600%2C403&ssl=1",
  },
];

const clientList = [
  "Abbott", "Adecco", "Alpha Insurance", "Altius", "Altran", "Alfa Laval", "Attentia",
  "Baker McKenzie", "B. Braun", "Bofidi", "Bombardier", "Brother", "Carmignac",
  "Coca Cola", "Cochlear", "Comeos", "Crédit Suisse Life", "Danone", "D.A.S.",
  "Deloitte", "Denuo", "Deutsche Telekom", "Eastman", "Eaton", "Egon Zehnder",
  "Ericsson", "Ergo", "Eubelius", "Euric", "EuroCommerce", "European Parliament",
  "EY", "Global IP", "G4S", "GO!", "Bank Hapoalim", "Hasbro", "Haviland",
  "HighCo DATA", "Hilti", "HRJ-CSJ", "Hudson", "IAB-IBR", "IGO-IFJ",
  "Impulse Brussels", "Incendin", "ISDA", "ISK Biosciences", "Johnson",
  "Kellen Europe", "Leonardo & Co", "Levi Strauss", "Liantis", "Marsh",
  "Panasonic", "Qualix", "Racine", "RSVZ-Inasti", "Salmon & Associates",
  "Seeds of Law", "Selligent", "Smith & Nephew", "Solutia", "Staples",
  "Tetra Pack", "The Wonderful Company", "Tiberghien Lawyers",
  "TMC Science & Technology", "TomTom", "Unizo", "Vandemoortele", "VDAB",
  "VGC", "Volkswagen International", "Yara",
];

const ReferencesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="references" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("references.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground max-w-2xl mx-auto">
            {t("references.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-center text-sm font-medium uppercase tracking-[0.22em] text-primary mb-8">
            {t("references.andMore")}
          </h3>
          <p className="text-center text-sm leading-relaxed text-muted-foreground max-w-4xl mx-auto">
            {clientList.join(", ")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferencesSection;
