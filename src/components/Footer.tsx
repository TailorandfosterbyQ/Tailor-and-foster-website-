import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.letsTalk'), href: '/opportunity-scan' },
  ];

  const contactPeople = [
    {
      name: t('footer.contact.person1.name'),
      email: t('footer.contact.person1.email'),
      phone: t('footer.contact.person1.phone'),
    },
    {
      name: t('footer.contact.person2.name'),
      email: t('footer.contact.person2.email'),
      phone: t('footer.contact.person2.phone'),
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-logo text-2xl sm:text-3xl mb-4">
              {t('footer.company')}
            </h3>
            <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-5">
              {contactPeople.map((person) => (
                <li key={person.email}>
                  <p className="text-sm font-medium text-primary-foreground">
                    {person.name}
                  </p>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 block"
                  >
                    {person.email}
                  </a>
                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 block"
                  >
                    {person.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
              {t('footer.offices')}
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-primary-foreground/70">
                {t('footer.brussels')}
              </li>
              <li className="text-sm text-primary-foreground/70">
                {t('footer.ghent')}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-5 text-primary-foreground/40">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[0.1em] uppercase text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Tailor & Foster. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs tracking-[0.1em] uppercase text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-200"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-xs tracking-[0.1em] uppercase text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-200"
            >
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

