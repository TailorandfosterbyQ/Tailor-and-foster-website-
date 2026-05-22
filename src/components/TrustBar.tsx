import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const TrustBar = () => {
  const { t } = useLanguage();

  const items = [
    t('trust.since'),
    t('trust.locations'),
  ];

  return (
    <section className="bg-white border-t border-b border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center py-6 sm:py-8 gap-4 sm:gap-0"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center px-6 lg:px-12 ${
                index < items.length - 1
                  ? 'sm:border-r border-border'
                  : ''
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-primary whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
