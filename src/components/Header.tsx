import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import tfEmblem from "@/assets/tf-emblem.jpg";
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
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLabel = languages.find(l => l.code === language)?.label || 'EN';

  const navItems = [
    { label: t("nav.services"), href: "#expertise" },
    { label: t("nav.process"), href: "#process" },
    { label: t("nav.references"), href: "#references" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-20 px-6 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-3 group shrink-0 mr-8">
          <span className="font-logo text-2xl tracking-[0.2em] uppercase font-semibold">
            Tailor
          </span>
          <img src={tfEmblem} alt="TF monogram" className="h-11 w-11 object-cover rounded-sm" />
          <span className="font-logo text-2xl tracking-[0.2em] uppercase font-semibold">
            Foster
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-logo tracking-[0.2em] uppercase font-semibold text-header-foreground/80 hover:text-header-foreground transition-colors duration-300 text-xs"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 border-2 border-white/80 rounded-full font-logo font-semibold tracking-[0.15em] uppercase text-header-foreground px-6 py-2.5 hover:bg-white/10 transition-colors duration-300 text-xs"
          >
            {t("nav.letsTalk")}
          </a>

          {/* Language dropdown */}
          <div ref={langRef} className="relative ml-4 border-l border-header-foreground/20 pl-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-header-foreground/80 hover:text-header-foreground transition-colors duration-200 px-2 py-1.5 rounded"
            >
              <Globe size={14} />
              {currentLabel}
              <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-header border border-header-foreground/15 rounded-lg shadow-xl py-1 min-w-[80px] overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-150 ${
                      language === lang.code
                        ? 'bg-white/15 text-header-foreground'
                        : 'text-header-foreground/60 hover:bg-white/10 hover:text-header-foreground'
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
              className="block py-3 font-logo text-sm tracking-[0.2em] uppercase font-semibold text-header-foreground/80 hover:text-header-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-3 border-2 border-white/80 rounded-full font-logo text-sm font-semibold tracking-[0.15em] uppercase text-header-foreground px-6 py-2.5"
          >
            {t("nav.letsTalk")}
          </a>

          {/* Mobile language selector */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-header-foreground/10">
            <Globe size={14} className="text-header-foreground/60" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-sm font-semibold tracking-wider px-3 py-1.5 rounded transition-colors duration-200 ${
                  language === lang.code
                    ? 'bg-white/20 text-header-foreground'
                    : 'text-header-foreground/50 hover:text-header-foreground'
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
