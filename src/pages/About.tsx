import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from 'framer-motion';
import { MapPin, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import teamPhoto from '@/assets/team-photo.jpg';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const valueKeys = [
  "independence", "intentionality", "tailored", "strategic", "execution", "longterm"
] as const;

const figures = [
  { icon: MapPin, key: "cities" },
  { icon: Award, key: "experience" },
  { icon: CheckCircle, key: "projects" },
];

const ValuesList = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {valueKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t(`about.values.${key}`)}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t(`about.values.${key}.desc`)}
            </p>
          </motion.div>
        ))}
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

      <PageHero
        variant="solid"
        eyebrow={t("about.hero.label")}
        title={t("about.hero.title")}
        titleMaxWidth="max-w-4xl"
      />

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
            <ValuesList />
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
                  <div className="flex flex-col">
                    <h3 className="text-base leading-7 text-foreground font-bold whitespace-nowrap">
                      {t(`about.figures.${fig.key}.title`)}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {t(`about.figures.${fig.key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team - hidden for now, may be revisited later */}
      {/*
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
      */}


      <Footer />
    </div>
  );
};

export default About;
