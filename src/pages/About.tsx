import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import teamPhoto from '@/assets/team-photo.jpg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const valueKeys = [
  "independence", "intentionality", "tailored", "strategic", "execution", "longterm"
] as const;

const figures = [
  { icon: MapPin, key: "cities" },
  { icon: Award, key: "experience" },
  { icon: CheckCircle, key: "projects" },
];

const ValueTabs = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12"
    >
      {/* Tab bar */}
      <div className="flex flex-wrap gap-x-1 gap-y-1 border-b border-border">
        {valueKeys.map((key, i) => (
          <button
            key={key}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
              hovered === i
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(`about.values.${key}`)}
            {hovered === i && (
              <motion.div
                layoutId="value-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="relative mt-6 min-h-[80px]">
        <AnimatePresence mode="wait">
          {hovered !== null && (
            <motion.p
              key={hovered}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-7 text-muted-foreground"
            >
              {t(`about.values.${valueKeys[hovered]}.desc`)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground/60"
          >
            {t("about.hero.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-4xl text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] font-bold font-serif"
          >
            {t("about.hero.title")}
          </motion.h1>
        </div>
      </section>

      {/* What We Do */}
      <section id="whatwedo" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary mb-4">
            {t("about.whatwedo.label")}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground font-serif max-w-3xl">
            {t("about.whatwedo.title")}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5">
            {[
              { key: "about.whatwedo.p1", className: "text-base leading-7 text-muted-foreground" },
              { key: "about.whatwedo.p2", className: "text-base leading-7 text-foreground font-medium" },
              { key: "about.whatwedo.p3", className: "text-base leading-7 text-muted-foreground" },
              { key: "about.whatwedo.p4", className: "text-base leading-7 text-muted-foreground" },
              { key: "about.whatwedo.p5", className: "text-base leading-7 text-foreground font-medium italic" },
            ].map(({ key, className }) => {
              const text = t(key);
              return text ? <p key={key} className={className}>{text}</p> : null;
            })}
          </div>
        </motion.div>
      </section>

      {/* Mission */}
      <section id="mission" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              {t("about.mission.label")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
              {t("about.mission.title")}
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              {t("about.mission.text")}
            </p>
            <ValueTabs />
          </motion.div>
          <motion.img
            src={teamPhoto}
            alt="Our team"
            className="w-full rounded-lg shadow-lg object-cover"
            loading="lazy"
            width={1280}
            height={854}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </section>

      {/* Key Figures */}
      <section id="figures" className="bg-secondary/50 py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.22em] text-primary mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("about.figures.label")}
          </motion.p>
          <div className="grid gap-8 md:grid-cols-3">
            {figures.map((fig, i) => {
              const Icon = fig.icon;
              return (
                <motion.div
                  key={fig.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <p className="text-base leading-7 text-foreground font-medium">
                    {t(`about.figures.${fig.key}`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 scroll-mt-24">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            {t("about.team.label")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            {t("about.team.title")}
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {t("about.team.text")}
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
