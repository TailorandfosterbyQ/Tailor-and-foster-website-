import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeroProps {
  variant?: "photo" | "solid";
  image?: string;
  icon?: LucideIcon;
  eyebrow?: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  secondaryText?: ReactNode;
  titleMaxWidth?: string;
}

const PageHero = ({
  variant = "photo",
  image,
  icon: Icon,
  eyebrow,
  title,
  text,
  secondaryText,
  titleMaxWidth = "max-w-3xl",
}: PageHeroProps) => {
  if (variant === "solid") {
    return (
      <section className="bg-primary text-primary-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium uppercase tracking-[0.22em] text-primary-foreground/80"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`${eyebrow ? "mt-4" : ""} ${titleMaxWidth} text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] font-bold font-serif`}
          >
            {title}
          </motion.h1>
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80"
            >
              {text}
            </motion.p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/30" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-white">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            {Icon && <Icon size={20} className="text-white/80" />}
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/80">
              {eyebrow}
            </p>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`${eyebrow ? "mt-2" : ""} ${titleMaxWidth} text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] font-bold font-serif`}
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/80"
          >
            {text}
          </motion.p>
        )}
        {secondaryText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-3 max-w-2xl text-base leading-7 text-white/80"
          >
            {secondaryText}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
