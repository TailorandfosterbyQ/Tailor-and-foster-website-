
## Plan: Meertalige site met language switcher

### 1. "Expertise" → "Our services" in navigatie
- Navigatielink hernoemen

### 2. i18n systeem opzetten
- Een `LanguageContext` maken met EN/NL/FR support
- Alle vertalingen in een `translations.ts` bestand bundelen (alle teksten van elke sectie)

### 3. Language switcher in header
- EN | NL | FR knoppen bovenaan in de header

### 4. Alle secties vertalen
- HeroSection (titel, subtitel, knoppen, "What we do" tekst)
- ExpertiseSection (titels, beschrijvingen van alle 6 services)
- SituationsSection
- ProcessSection
- ReferencesSection
- ContactSection
- Footer
- Header navigatielinks

Dit vereist dat ik elke sectie doorlees en alle hardcoded teksten vervang door vertaalbare keys.
