export type Language = 'en' | 'nl' | 'fr';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.references": "References",
    "nav.contact": "Contact",
    "nav.letsTalk": "Opportunity Scan",

    // Hero
    "hero.title": "Workspace Advisory  for Evolving Businesses.",
    "hero.subtitle": "Is your organization growing, considering downsizing, or facing a lease end? We provide 100% independent real estate advice to protect your time and budget.",
    "hero.cta.primary": "Start Your Opportunity Scan",
    "hero.cta.secondary": "Learn More",

    // USPs
    "usps.label": "Why choose us",
    "usps.title": "What sets us apart",
    "usps.independent.title": "100% Independent",
    "usps.independent.text": "We are not influenced by any predetermined supply routes. Our path is our own, ensuring that all decisions remain yours to make.",
    "usps.disruption.title": "Minimal Disruption",
    "usps.disruption.text": "We understand your time is your most valuable asset. We focus on minimizing and controlling the time diverted away from your core business operations.",
    "usps.senior.title": "Senior Oversight",
    "usps.senior.text": "A guaranteed continuous senior presence throughout your project.",

    // Offer
    "offer.label": "Our services",
    "offer.title": "Solutions for every stage of your workspace journey.",
    "offer.growth.title": "Growth Strategies",
    "offer.growth.text": "Expanding your team? We find, negotiate, and deliver the workspace that supports your ambitions without the stress.",
    "offer.downsizing.title": "Downsizing Solutions",
    "offer.downsizing.text": "Optimizing your footprint while maintaining culture and productivity. Smart transitions, controlled costs.",
    "offer.lease.title": "Lease Management",
    "offer.lease.text": "Your lease is expiring? We evaluate your options early so deadlines don't dictate the outcome.",

    // Social Proof
    "social.label": "Trusted by",
    "social.title": "Organisations that rely on our expertise",

    // Final CTA
    "finalCta.title": "Ready for an Opportunity Scan?",
    "finalCta.text": "Let us evaluate your current workspace setup and uncover opportunities to save time and budget.",
    "finalCta.button": "Start Your Opportunity Scan",

    // About page
    "about.hero.label": "About us",
    "about.hero.title": "A unique group of experts dedicated to tailor-made work environment excellence.",
    "about.mission.label": "Mission & Values",
    "about.mission.title": "We operate as one team.",
    "about.mission.text": "Our mission is to stand behind every client with the collective power and experience of our entire firm. Independence is not just a value — it's a guarantee.",
    "about.figures.label": "Key figures",
    "about.figures.cities": "Expert presence in Brussels, Antwerp, and Ghent",
    "about.figures.experience": "Senior experts with years of collective project management experience",
    "about.figures.projects": "Hundreds of successful workspace transitions delivered",
    "about.team.label": "Our team",
    "about.team.title": "People buy from people.",
    "about.team.text": "Our consultants bring senior-level experience to every engagement. Authentic, hands-on, and always accessible.",

    // Services page — Growth
    "services.growth.hero.label": "Growth Strategies",
    "services.growth.hero.title": "Scaling Your Workspace to Match Your Ambitions",
    "services.growth.hero.text": "Rapid growth shouldn't mean rushed decisions. We help expanding organisations find, negotiate, and transition into workspaces that fuel productivity, not hinder it.",
    "services.growth.process.label": "Our approach",
    "services.growth.process.title": "From growing pains to a future-proof workspace.",
    "services.growth.step1.title": "Growth Assessment",
    "services.growth.step1.text": "We map your headcount projections, team dynamics, and spatial needs to quantify exactly how much space you'll need  and when.",
    "services.growth.step2.title": "Location & Negotiation Strategy",
    "services.growth.step2.text": "We scout locations that align with your employer brand, commute profiles, and budget then negotiate terms that protect your flexibility.",
    "services.growth.step3.title": "Managed Transition",
    "services.growth.step3.text": "From fit-out coordination to move management, we oversee every detail so your team can focus on what they do best.",
    "services.growth.forWhom.label": "Is this for you?",
    "services.growth.forWhom.title": "Built for businesses on the rise",
    "services.growth.forWhom.text": "Whether you're hiring 10 people or 200, opening a second office or consolidating into a larger HQ if growth is driving your workspace decisions, this service is for you.",

    // Services page — Downsizing
    "services.downsizing.hero.label": "Downsizing Solutions",
    "services.downsizing.hero.title": "Right-Size Your Workspace Without Losing What Matters",
    "services.downsizing.hero.text": "Reducing your footprint doesn't mean reducing your standards. We help you optimise space, renegotiate terms, and maintain the culture your team values.",
    "services.downsizing.process.label": "Our approach",
    "services.downsizing.process.title": "A smarter footprint, not a smaller ambition.",
    "services.downsizing.step1.title": "Utilisation & Cost Audit",
    "services.downsizing.step1.text": "We analyse how your current space is actually used. Identifying underutilized areas, hidden costs, and quick-win savings.",
    "services.downsizing.step2.title": "Scenario Modelling",
    "services.downsizing.step2.text": "Stay and sublease? Move to a smaller location? Go hybrid? We model every option with hard numbers so you can decide with confidence.",
    "services.downsizing.step3.title": "Controlled Execution",
    "services.downsizing.step3.text": "We manage lease exits, sublease negotiations, and space reconfigurations minimizing disruption to your daily operations.",
    "services.downsizing.forWhom.label": "Is this for you?",
    "services.downsizing.forWhom.title": "For organisations rethinking their footprint",
    "services.downsizing.forWhom.text": "Post-merger integration, shift to hybrid work, or simply paying for space you no longer need. If your workspace has outgrown (or under-grown) your reality, we can help.",

    // Services page — Lease
    "services.lease.hero.label": "Lease Management",
    "services.lease.hero.title": "Turn Your Lease Expiry Into a Strategic Opportunity",
    "services.lease.hero.text": "A lease end is more than an administrative deadline — it's a chance to renegotiate, relocate, or reimagine your workplace. We make sure you seize it.",
    "services.lease.process.label": "Our approach",
    "services.lease.process.title": "Proactive lease strategy, not last-minute scrambles.",
    "services.lease.step1.title": "Early Lease Review",
    "services.lease.step1.text": "We review your lease terms 18–24 months ahead, identifying break options, penalty clauses, and market benchmarks.",
    "services.lease.step2.title": "Market Comparison & Options",
    "services.lease.step2.text": "We compare renegotiation scenarios with relocation alternatives — giving you a clear view of the financial and operational trade-offs.",
    "services.lease.step3.title": "Negotiation & Handover",
    "services.lease.step3.text": "Whether you stay or go, we lead negotiations with landlords and manage the transition end-to-end.",
    "services.lease.forWhom.label": "Is this for you?",
    "services.lease.forWhom.title": "For businesses approaching a lease milestone",
    "services.lease.forWhom.text": "If your lease expires within 24 months, or you've just received a renewal proposal, now is the time to act. Don't let deadlines dictate your outcome.",

    // Services generic
    "services.cta": "Request a Consultation",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
  },

  nl: {
    // Nav
    "nav.home": "Home",
    "nav.about": "Over ons",
    "nav.services": "Diensten",
    "nav.references": "Referenties",
    "nav.contact": "Contact",
    "nav.letsTalk": "Opportunity Scan",

    // Hero
    "hero.title": "Werkplekadvies op maat van groeiende bedrijven.",
    "hero.subtitle": "Groeit uw organisatie, overweegt u in te krimpen, of loopt uw huurcontract af? Wij bieden 100% onafhankelijk vastgoedadvies om uw tijd en budget te beschermen.",
    "hero.cta.primary": "Start uw Opportunity Scan",
    "hero.cta.secondary": "Meer weten",

    // USPs
    "usps.label": "Waarom wij",
    "usps.title": "Wat ons onderscheidt",
    "usps.independent.title": "100% Onafhankelijk",
    "usps.independent.text": "Beslissingen blijven van u; wij hebben geen vooraf bepaalde leveringsroutes.",
    "usps.disruption.title": "Minimale verstoring",
    "usps.disruption.text": "Wij beperken de tijd die wordt afgeleid van uw kernactiviteiten.",
    "usps.senior.title": "Senior begeleiding",
    "usps.senior.text": "Een gegarandeerde continue senior aanwezigheid gedurende uw hele project.",

    // Offer
    "offer.label": "Ons aanbod",
    "offer.title": "Oplossingen voor elke fase van uw werkplektraject.",
    "offer.growth.title": "Groeistrategieën",
    "offer.growth.text": "Breidt uw team uit? Wij vinden, onderhandelen en leveren de werkplek die uw ambities ondersteunt — zonder stress.",
    "offer.downsizing.title": "Downsizing-oplossingen",
    "offer.downsizing.text": "Optimaliseer uw footprint met behoud van cultuur en productiviteit. Slimme transities, gecontroleerde kosten.",
    "offer.lease.title": "Leasemanagement",
    "offer.lease.text": "Loopt uw huurcontract af? Wij evalueren uw opties vroegtijdig zodat deadlines het resultaat niet bepalen.",

    // Social Proof
    "social.label": "Vertrouwd door",
    "social.title": "Organisaties die op onze expertise vertrouwen",

    // Final CTA
    "finalCta.title": "Klaar voor een Opportunity Scan?",
    "finalCta.text": "Laat ons uw huidige werkpleksituatie evalueren en ontdek kansen om tijd en budget te besparen.",
    "finalCta.button": "Start uw Opportunity Scan",

    // About page
    "about.hero.label": "Over ons",
    "about.hero.title": "Een unieke groep experts gewijd aan op maat gemaakte werkplekinnovatie.",
    "about.mission.label": "Missie & Waarden",
    "about.mission.title": "Wij werken als één team.",
    "about.mission.text": "Onze missie is om achter elke klant te staan met de collectieve kracht en ervaring van ons hele bedrijf. Onafhankelijkheid is niet zomaar een waarde — het is een garantie.",
    "about.figures.label": "Kerncijfers",
    "about.figures.cities": "Expertaanwezigheid in Brussel, Antwerpen en Gent",
    "about.figures.experience": "Senior experts met jaren collectieve projectmanagementervaring",
    "about.figures.projects": "Honderden succesvolle werkplektransities opgeleverd",
    "about.team.label": "Ons team",
    "about.team.title": "Mensen kopen van mensen.",
    "about.team.text": "Onze consultants brengen senior-level ervaring mee bij elke opdracht. Authentiek, hands-on en altijd bereikbaar.",

    // Services page — Growth
    "services.growth.hero.label": "Groeistrategieën",
    "services.growth.hero.title": "Uw werkplek opschalen naar uw ambities",
    "services.growth.hero.text": "Snelle groei mag geen overhaaste beslissingen betekenen. Wij helpen groeiende organisaties werkplekken te vinden, te onderhandelen en over te stappen die productiviteit stimuleren.",
    "services.growth.process.label": "Onze aanpak",
    "services.growth.process.title": "Van groeipijnen naar een toekomstbestendige werkplek.",
    "services.growth.step1.title": "Groeianalyse",
    "services.growth.step1.text": "We brengen uw personeelsprojecties, teamdynamiek en ruimtelijke behoeften in kaart om precies te bepalen hoeveel ruimte u nodig heeft — en wanneer.",
    "services.growth.step2.title": "Locatie- & Onderhandelingsstrategie",
    "services.growth.step2.text": "We zoeken locaties die aansluiten bij uw employer brand, pendelprofielen en budget — en onderhandelen voorwaarden die uw flexibiliteit beschermen.",
    "services.growth.step3.title": "Begeleide Transitie",
    "services.growth.step3.text": "Van inrichtingscoördinatie tot verhuismanagement, we overzien elk detail zodat uw team zich kan richten op hun kernwerk.",
    "services.growth.forWhom.label": "Is dit voor u?",
    "services.growth.forWhom.title": "Gebouwd voor bedrijven in groei",
    "services.growth.forWhom.text": "Of u nu 10 of 200 mensen aanwerft, een tweede kantoor opent of consolideert naar een groter hoofdkantoor — als groei uw werkplekbeslissingen aanstuurt, is deze dienst voor u.",

    // Services page — Downsizing
    "services.downsizing.hero.label": "Downsizing-oplossingen",
    "services.downsizing.hero.title": "Optimaliseer uw werkplek zonder te verliezen wat telt",
    "services.downsizing.hero.text": "Uw footprint verkleinen betekent niet uw standaarden verlagen. Wij helpen u ruimte te optimaliseren, voorwaarden te heronderhandelen en de cultuur te behouden die uw team waardeert.",
    "services.downsizing.process.label": "Onze aanpak",
    "services.downsizing.process.title": "Een slimmere footprint, geen kleinere ambitie.",
    "services.downsizing.step1.title": "Gebruiks- & Kostenaudit",
    "services.downsizing.step1.text": "We analyseren hoe uw huidige ruimte daadwerkelijk wordt gebruikt — onderbenut, verborgen kosten en snelle besparingen identificerend.",
    "services.downsizing.step2.title": "Scenariomodellering",
    "services.downsizing.step2.text": "Blijven en onderverhuren? Verhuizen naar een kleinere locatie? Hybride werken? We modelleren elke optie met harde cijfers.",
    "services.downsizing.step3.title": "Gecontroleerde Uitvoering",
    "services.downsizing.step3.text": "We beheren huuruitstappen, onderverhuuronderhandelingen en ruimteherindelingen — met minimale verstoring van uw dagelijkse operaties.",
    "services.downsizing.forWhom.label": "Is dit voor u?",
    "services.downsizing.forWhom.title": "Voor organisaties die hun footprint heroverwegen",
    "services.downsizing.forWhom.text": "Post-fusie integratie, verschuiving naar hybride werk, of simpelweg betalen voor ruimte die u niet meer nodig heeft — als uw werkplek niet meer past bij uw realiteit, kunnen wij helpen.",

    // Services page — Lease
    "services.lease.hero.label": "Leasemanagement",
    "services.lease.hero.title": "Maak van uw huurverval een strategische kans",
    "services.lease.hero.text": "Een huurverval is meer dan een administratieve deadline — het is een kans om te heronderhandelen, te verhuizen of uw werkplek te herdenken.",
    "services.lease.process.label": "Onze aanpak",
    "services.lease.process.title": "Proactieve huurstrategie, geen last-minute paniek.",
    "services.lease.step1.title": "Vroegtijdige Huurreview",
    "services.lease.step1.text": "We reviewen uw huurvoorwaarden 18–24 maanden vooruit, met identificatie van breakopties, boeteclausules en marktbenchmarks.",
    "services.lease.step2.title": "Marktvergelijking & Opties",
    "services.lease.step2.text": "We vergelijken heronderhandelingsscenario's met verhuisalternatieven — voor een helder beeld van de financiële en operationele trade-offs.",
    "services.lease.step3.title": "Onderhandeling & Overdracht",
    "services.lease.step3.text": "Of u nu blijft of vertrekt, wij leiden de onderhandelingen met verhuurders en beheren de transitie end-to-end.",
    "services.lease.forWhom.label": "Is dit voor u?",
    "services.lease.forWhom.title": "Voor bedrijven die een huurmijlpaal naderen",
    "services.lease.forWhom.text": "Als uw huur binnen 24 maanden afloopt, of u net een verlengingsvoorstel heeft ontvangen, is nu het moment om te handelen.",

    // Services generic
    "services.cta": "Vraag een consultatie aan",

    // Footer
    "footer.rights": "Alle rechten voorbehouden.",
    "footer.privacy": "Privacybeleid",
    "footer.cookies": "Cookiebeleid",
  },

  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.services": "Services",
    "nav.references": "Références",
    "nav.contact": "Contact",
    "nav.letsTalk": "Opportunity Scan",

    // Hero
    "hero.title": "Conseil en espace de travail adapté aux entreprises en évolution.",
    "hero.subtitle": "Votre organisation est en croissance, envisage de réduire ses effectifs ou fait face à une fin de bail ? Nous offrons des conseils immobiliers 100% indépendants pour protéger votre temps et votre budget.",
    "hero.cta.primary": "Démarrez votre Opportunity Scan",
    "hero.cta.secondary": "En savoir plus",

    // USPs
    "usps.label": "Pourquoi nous",
    "usps.title": "Ce qui nous distingue",
    "usps.independent.title": "100% Indépendant",
    "usps.independent.text": "Les décisions restent les vôtres ; nous n'avons aucune route d'approvisionnement prédéterminée.",
    "usps.disruption.title": "Perturbation minimale",
    "usps.disruption.text": "Nous contrôlons le temps détourné de votre activité principale.",
    "usps.senior.title": "Supervision senior",
    "usps.senior.text": "Une présence senior continue et garantie tout au long de votre projet.",

    // Offer
    "offer.label": "Nos services",
    "offer.title": "Des solutions pour chaque étape de votre parcours workspace.",
    "offer.growth.title": "Stratégies de croissance",
    "offer.growth.text": "Vous agrandissez votre équipe ? Nous trouvons, négocions et livrons l'espace de travail qui soutient vos ambitions — sans stress.",
    "offer.downsizing.title": "Solutions de réduction",
    "offer.downsizing.text": "Optimisez votre empreinte tout en maintenant culture et productivité. Des transitions intelligentes, des coûts maîtrisés.",
    "offer.lease.title": "Gestion de bail",
    "offer.lease.text": "Votre bail expire ? Nous évaluons vos options tôt pour que les délais ne dictent pas le résultat.",

    // Social Proof
    "social.label": "Ils nous font confiance",
    "social.title": "Des organisations qui comptent sur notre expertise",

    // Final CTA
    "finalCta.title": "Prêt pour un Opportunity Scan ?",
    "finalCta.text": "Laissez-nous évaluer votre configuration actuelle et découvrir des opportunités d'économiser du temps et du budget.",
    "finalCta.button": "Démarrez votre Opportunity Scan",

    // About page
    "about.hero.label": "À propos",
    "about.hero.title": "Un groupe unique d'experts dédiés à l'excellence sur mesure de l'environnement de travail.",
    "about.mission.label": "Mission & Valeurs",
    "about.mission.title": "Nous opérons comme une seule équipe.",
    "about.mission.text": "Notre mission est de soutenir chaque client avec la puissance collective et l'expérience de toute notre entreprise. L'indépendance n'est pas qu'une valeur — c'est une garantie.",
    "about.figures.label": "Chiffres clés",
    "about.figures.cities": "Présence d'experts à Bruxelles, Anvers et Gand",
    "about.figures.experience": "Des experts seniors avec des années d'expérience collective en gestion de projets",
    "about.figures.projects": "Des centaines de transitions d'espaces de travail réussies",
    "about.team.label": "Notre équipe",
    "about.team.title": "Les gens achètent aux gens.",
    "about.team.text": "Nos consultants apportent une expérience de niveau senior à chaque mission. Authentiques, impliqués et toujours accessibles.",

    // Services page — Growth
    "services.growth.hero.label": "Stratégies de croissance",
    "services.growth.hero.title": "Adaptez votre espace de travail à vos ambitions",
    "services.growth.hero.text": "Une croissance rapide ne doit pas signifier des décisions précipitées. Nous aidons les organisations en expansion à trouver, négocier et s'installer dans des espaces qui stimulent la productivité.",
    "services.growth.process.label": "Notre approche",
    "services.growth.process.title": "Des douleurs de croissance à un espace pérenne.",
    "services.growth.step1.title": "Évaluation de croissance",
    "services.growth.step1.text": "Nous cartographions vos projections d'effectifs, la dynamique d'équipe et les besoins spatiaux pour quantifier exactement l'espace nécessaire — et quand.",
    "services.growth.step2.title": "Stratégie de localisation & négociation",
    "services.growth.step2.text": "Nous recherchons des emplacements alignés avec votre marque employeur, les profils de trajet et votre budget — puis négocions des conditions protégeant votre flexibilité.",
    "services.growth.step3.title": "Transition accompagnée",
    "services.growth.step3.text": "De la coordination d'aménagement à la gestion du déménagement, nous supervisons chaque détail pour que votre équipe reste concentrée.",
    "services.growth.forWhom.label": "Est-ce pour vous ?",
    "services.growth.forWhom.title": "Conçu pour les entreprises en croissance",
    "services.growth.forWhom.text": "Que vous recrutiez 10 ou 200 personnes, ouvriez un second bureau ou consolidiez dans un siège plus grand — si la croissance guide vos décisions, ce service est pour vous.",

    // Services page — Downsizing
    "services.downsizing.hero.label": "Solutions de réduction",
    "services.downsizing.hero.title": "Optimisez votre espace sans perdre l'essentiel",
    "services.downsizing.hero.text": "Réduire votre empreinte ne signifie pas réduire vos standards. Nous vous aidons à optimiser l'espace, renégocier les conditions et préserver la culture que votre équipe valorise.",
    "services.downsizing.process.label": "Notre approche",
    "services.downsizing.process.title": "Une empreinte plus intelligente, pas une ambition réduite.",
    "services.downsizing.step1.title": "Audit d'utilisation & coûts",
    "services.downsizing.step1.text": "Nous analysons comment votre espace est réellement utilisé — identifiant les zones sous-utilisées, les coûts cachés et les économies rapides.",
    "services.downsizing.step2.title": "Modélisation de scénarios",
    "services.downsizing.step2.text": "Rester et sous-louer ? Déménager plus petit ? Passer en hybride ? Nous modélisons chaque option avec des chiffres concrets.",
    "services.downsizing.step3.title": "Exécution contrôlée",
    "services.downsizing.step3.text": "Nous gérons les sorties de bail, les négociations de sous-location et les reconfigurations — en minimisant les perturbations.",
    "services.downsizing.forWhom.label": "Est-ce pour vous ?",
    "services.downsizing.forWhom.title": "Pour les organisations repensant leur empreinte",
    "services.downsizing.forWhom.text": "Intégration post-fusion, passage au travail hybride, ou simplement payer pour un espace dont vous n'avez plus besoin — nous pouvons vous aider.",

    // Services page — Lease
    "services.lease.hero.label": "Gestion de bail",
    "services.lease.hero.title": "Transformez votre fin de bail en opportunité stratégique",
    "services.lease.hero.text": "Une fin de bail est plus qu'une échéance administrative — c'est une chance de renégocier, de déménager ou de réinventer votre lieu de travail.",
    "services.lease.process.label": "Notre approche",
    "services.lease.process.title": "Stratégie de bail proactive, pas de panique de dernière minute.",
    "services.lease.step1.title": "Revue anticipée du bail",
    "services.lease.step1.text": "Nous examinons vos conditions de bail 18–24 mois à l'avance, identifiant les options de rupture, clauses pénales et benchmarks du marché.",
    "services.lease.step2.title": "Comparaison marché & options",
    "services.lease.step2.text": "Nous comparons les scénarios de renégociation avec les alternatives de relocalisation — pour une vision claire des compromis financiers et opérationnels.",
    "services.lease.step3.title": "Négociation & transfert",
    "services.lease.step3.text": "Que vous restiez ou partiez, nous menons les négociations avec les bailleurs et gérons la transition de bout en bout.",
    "services.lease.forWhom.label": "Est-ce pour vous ?",
    "services.lease.forWhom.title": "Pour les entreprises approchant une échéance de bail",
    "services.lease.forWhom.text": "Si votre bail expire dans les 24 mois, ou si vous venez de recevoir une proposition de renouvellement, c'est le moment d'agir.",

    // Services generic
    "services.cta": "Demander une consultation",

    // Footer
    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Politique de confidentialité",
    "footer.cookies": "Politique des cookies",
  },
};
