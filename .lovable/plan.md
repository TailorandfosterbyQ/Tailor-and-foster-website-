# Homepage hero: kicker, roterende titel, nieuwe subtekst

## Wat verandert

1. **Kicker boven de titel** — "VOOR ORGANISATIES IN BEWEGING", in dezelfde stijl als de kickers elders op de site (klein, uppercase, letterspacing 0.22em), maar in wit/transparant wit zodat het leesbaar blijft op de herofoto.

2. **Roterende titel** — "Werkplekstrategie voor wie [X]." waarbij X elke 2,5 seconde wisselt in deze vaste volgorde:
   groeit → krimpt → fuseert → de huur ziet aflopen → kampt met leegstand → (opnieuw)
   Animatie: huidig item schuift omhoog en vervaagt, volgende schuift van onderaf in. De breedte van het roterende deel beweegt soepel mee met de lengte van elk item; op mobiel valt het roterende deel netjes onder "voor wie" in plaats van te overlopen.

3. **Subtekst** — "Wij bieden strategie en projectmanagement, volledig onafhankelijk."

Foto, overlay, knoppen en scroll-chevron blijven ongewijzigd.

## Technisch

- `src/i18n/translations.ts`: nieuwe keys `hero.kicker`, `hero.title.prefix`, `hero.rotating.1..5`, en aangepaste `hero.subtitle`. Alle drie de talen (NL, EN, FR) krijgen een passende vertaling; de NL-tekst is exact zoals hierboven.
- `src/components/HeroSection.tsx`:
  - kicker-`<p>` boven de `h1`, met bestaande fade-in animatie;
  - `h1` bestaat uit vaste tekst + een inline-block wrapper met `AnimatePresence mode="popLayout"` en een `motion.span` per item (`y: 20 → 0 → -20`, opacity mee), plus `layout` op de wrapper voor de vloeiende breedteovergang;
  - `useEffect` met interval van 2500 ms, opgeruimd bij unmount;
  - `prefers-reduced-motion` respecteren: geen rotatie-animatie, alleen tekstwissel;
  - één `<h1>` blijft behouden voor SEO; de volledige titeltekst blijft leesbaar voor screenreaders.

## Verificatie

Build + Playwright-check op desktop en mobiele viewport: kicker zichtbaar, woorden roteren, geen layout shift of tekstoverloop.
