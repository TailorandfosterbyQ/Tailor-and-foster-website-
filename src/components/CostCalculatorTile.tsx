import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";

const CostCalculatorTile = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-secondary/40 p-8 sm:p-12 lg:p-14"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-5">
              <Calculator size={14} />
              Kostencalculator
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-tight">
              Wat kost uw kantoor u écht?
            </h2>
            <p className="mt-5 text-lg leading-8 text-foreground/70">
              Bereken in twee minuten uw werkelijke kantoorkosten, en zie hoe u zich verhoudt tot
              de markt.
            </p>
          </div>
          <Link
            to="/kostencalculator"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group whitespace-nowrap"
          >
            Start de calculator
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CostCalculatorTile;
