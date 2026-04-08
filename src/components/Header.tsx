import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import tfLogo from "@/assets/tf-logo.png";
import tfEmblem from "@/assets/tf-emblem-new.png";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentLabel = languages.find(l => l.code === language)?.label || 'EN';

  const navItems = [
    { label: t("nav.services"), href: "#expertise" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.references"), href: "#references" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`bg-header text-header-foreground sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between h-20 px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 group shrink-0 mr-8">
          <img
            src={tfLogo}
            alt="Tailor & Foster"
            className="h-6 sm:h-7 object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-logo tracking-[0.15em] uppercase font-semibold text-header-foreground/60 hover:text-header-foreground transition-colors duration-300 text-[11px]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 border border-header-foreground/80 rounded-full font-logo font-semibold tracking-[0.15em] uppercase text-header-foreground px-6 py-2.5 hover:bg-header-foreground hover:text-header transition-colors duration-300 text-[11px]"
          >
            {t("nav.letsTalk")}
          </a>

          {/* Language dropdown */}
          <div ref={langRef} className="relative ml-4 border-l border-header-foreground/15 pl-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-header-foreground/50 hover:text-header-foreground transition-colors duration-200 px-2 py-1.5 rounded"
            >
              <Globe size={13} />
              {currentLabel}
              <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-header border border-header-foreground/10 rounded-lg shadow-xl py-1 min-w-[80px] overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[11px] font-semibold tracking-wider transition-colors duration-150 ${
                      language === lang.code
                        ? 'bg-header-foreground/10 text-header-foreground'
                        : 'text-header-foreground/40 hover:bg-header-foreground/5 hover:text-header-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button
          className="md:hidden text-header-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-header border-t border-header-foreground/10 px-6 pb-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-logo text-sm tracking-[0.15em] uppercase font-semibold text-header-foreground/70 hover:text-header-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-3 border border-header-foreground/80 rounded-full font-logo text-sm font-semibold tracking-[0.15em] uppercase text-header-foreground px-6 py-2.5 hover:bg-header-foreground hover:text-header transition-colors"
          >
            {t("nav.letsTalk")}
          </a>

          {/* Mobile language selector */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-header-foreground/10">
            <Globe size={14} className="text-header-foreground/40" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-sm font-semibold tracking-wider px-3 py-1.5 rounded transition-colors duration-200 ${
                  language === lang.code
                    ? 'bg-header-foreground/10 text-header-foreground'
                    : 'text-header-foreground/40 hover:text-header-foreground'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
