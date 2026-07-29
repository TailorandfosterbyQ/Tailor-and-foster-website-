import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroWorkspace from '@/assets/hero-workspace.jpg';
import { useLanguage } from '@/i18n/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden text-white">
      <motion.img
        src={heroWorkspace}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y: imgY }}
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/55 to-primary/30" />
      <motion.div
        className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12 pb-20 pt-32 lg:pb-28"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.8rem,4.2vw,4.5rem)] leading-[1.1] tracking-tight text-white font-bold font-serif max-w-4xl"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <motion.div whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Link
              to="/opportunity-scan"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-primary shadow-lg hover:shadow-xl inline-block"
            >
              {t("hero.cta.primary")}
            </Link>
          </motion.div>
          <motion.a
            href="#usps"
            className="rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-medium text-white"
            whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {t("hero.cta.secondary")}
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.a
        href="#usps"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition"
        aria-label="Scroll down"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default HeroSection;
