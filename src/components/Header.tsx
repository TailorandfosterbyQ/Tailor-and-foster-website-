import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import tfLogo from "@/assets/tf-logo-blue.png";
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
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
    { label: t("nav.home"), href: "/" },
  ];

  const aboutItems = [
    { label: t("about.whatwedo.label"), href: "/about#whatwedo" },
    { label: t("about.mission.label"), href: "/about#mission" },
    { label: t("about.figures.label"), href: "/about#figures" },
    { label: t("about.team.label"), href: "/about#team" },
  ];

  const serviceItems = [
    { label: t("offer.growth.title"), href: "/services/growth" },
    { label: t("offer.downsizing.title"), href: "/services/downsizing" },
    { label: t("offer.lease.title"), href: "/services/lease" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`text-foreground sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 sm:px-8 lg:px-12 py-2">
        <Link to="/" className="flex items-center gap-0 group shrink-0 mr-8">
          <img
            src={tfLogo}
            alt="Tailor & Foster"
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-24'}`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`font-logo tracking-[0.15em] uppercase font-semibold transition-colors duration-300 text-[11px] ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-primary/60 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* About Us dropdown */}
          <div ref={aboutRef} className="relative">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className={`flex items-center gap-1 font-logo tracking-[0.15em] uppercase font-semibold transition-colors duration-300 text-[11px] ${
                location.pathname === '/about'
                  ? 'text-primary'
                  : 'text-primary/60 hover:text-primary'
              }`}
            >
              {t("nav.about")}
              <ChevronDown size={12} className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
            </button>
            {aboutOpen && (
              <div className="absolute left-0 top-full mt-3 bg-white border border-border rounded-xl shadow-xl py-2 min-w-[220px] overflow-hidden">
                {aboutItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setAboutOpen(false)}
                    className="block px-5 py-2.5 text-[12px] font-medium transition-colors duration-150 text-foreground/70 hover:bg-primary/5 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Services dropdown */}
          <div ref={servicesRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1 font-logo tracking-[0.15em] uppercase font-semibold transition-colors duration-300 text-[11px] ${
                location.pathname.startsWith('/services')
                  ? 'text-primary'
                  : 'text-primary/60 hover:text-primary'
              }`}
            >
              {t("nav.services")}
              <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-3 bg-white border border-border rounded-xl shadow-xl py-2 min-w-[220px] overflow-hidden">
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setServicesOpen(false)}
                    className={`block px-5 py-2.5 text-[12px] font-medium transition-colors duration-150 ${
                      location.pathname === item.href
                        ? 'bg-primary/5 text-primary'
                        : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/#contact"
            className="ml-4 border border-primary/80 rounded-full font-logo font-semibold tracking-[0.12em] uppercase text-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-300 text-[10px] whitespace-nowrap"
          >
            {t("nav.letsTalk")}
          </Link>

          <div ref={langRef} className="relative ml-3 border-l border-primary/15 pl-3">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-primary/50 hover:text-primary transition-colors duration-200 px-2 py-1.5 rounded"
            >
              <Globe size={13} />
              {currentLabel}
              <ChevronDown size={11} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-primary/10 rounded-lg shadow-xl py-1 min-w-[80px] overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-[11px] font-semibold tracking-wider transition-colors duration-150 ${
                      language === lang.code
                        ? 'bg-primary/10 text-primary'
                        : 'text-primary/40 hover:bg-primary/5 hover:text-primary'
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
          className="lg:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-primary/10 px-6 pb-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 font-logo text-sm tracking-[0.15em] uppercase font-semibold transition-colors ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="py-2">
            <span className="block py-3 font-logo text-sm tracking-[0.15em] uppercase font-semibold text-primary/40">
              {t("nav.about")}
            </span>
            {aboutItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 pl-4 font-logo text-sm tracking-[0.1em] font-medium transition-colors text-primary/60 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="py-2">
            <span className="block py-3 font-logo text-sm tracking-[0.15em] uppercase font-semibold text-primary/40">
              {t("nav.services")}
            </span>
            {serviceItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 pl-4 font-logo text-sm tracking-[0.1em] font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-primary/60 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            to="/#contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-3 border border-primary/80 rounded-full font-logo text-sm font-semibold tracking-[0.15em] uppercase text-primary px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
          >
            {t("nav.letsTalk")}
          </Link>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-primary/10">
            <Globe size={14} className="text-primary/40" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-sm font-semibold tracking-wider px-3 py-1.5 rounded transition-colors duration-200 ${
                  language === lang.code
                    ? 'bg-primary/10 text-primary'
                    : 'text-primary/40 hover:text-primary'
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
