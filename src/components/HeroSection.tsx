import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroOffice from '@/assets/hero-office.jpg';
import expertsBg from '@/assets/experts-bg.png';
import { useLanguage } from '@/i18n/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden text-white">
        <motion.img
          src={heroOffice}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: imgY }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C82]/70 via-[#0F4C82]/50 to-[#0F4C82]/25" />
        <motion.div
          className="relative mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12 pb-20 pt-32 lg:pb-28"
          style={{ y: textY, opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.8rem,4.2vw,4.5rem)] leading-[1.1] tracking-tight text-white font-bold font-serif"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/50 sm:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.a
              href="#expertise"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-header shadow-lg"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("hero.cta.services")}
            </motion.a>
            <motion.a
              href="#contact"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white"
              whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {t("hero.cta.conversation")}
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.a
          href="#expertise"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.a>
      </section>

      <section className="bg-secondary/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                  {t("whatWeDo.label")}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
                  {t("whatWeDo.title")}
                </h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 text-base leading-7 text-muted-foreground max-w-3xl"
              >
                {t("whatWeDo.text")}
              </motion.p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src={expertsBg}
                alt="We are a unique group of experts"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
