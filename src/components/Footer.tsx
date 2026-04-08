import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-header text-header-foreground/50 py-8">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-[0.1em] uppercase">
          © {new Date().getFullYear()} Tailor & Foster. {t("footer.rights")}
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs tracking-[0.1em] uppercase hover:text-header-foreground transition-colors">
            {t("footer.privacy")}
          </a>
          <a href="#" className="text-xs tracking-[0.1em] uppercase hover:text-header-foreground transition-colors">
            {t("footer.cookies")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
