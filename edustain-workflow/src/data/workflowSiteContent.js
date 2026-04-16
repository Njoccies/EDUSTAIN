export const NAV_TABS = [
  { id: "wsa", label: "WSA Navigator", icon: "explore", section: "welcome" },
  { id: "partner", label: "Partner", icon: "handshake", section: "partners" },
  { id: "schule", label: "Unsere Schule", icon: "school", section: "navigation" },
  { id: "projekte", label: "Projekte", icon: "assignment", section: null },
];

export const BENEFITS = [
  {
    icon: "hub",
    title: "Vernetzen",
    text: "Vernetzt euch mit WSA Mitstreitenden aus ganz Deutschland.",
  },
  {
    icon: "route",
    title: "Orientieren",
    text: "Orientierung und Inspiration, wie ihr den WSA an eurer Schule wirkungsorientiert, systematisch und praxisnah umsetzt.",
  },
  {
    icon: "map",
    title: "Roadmap entwickeln",
    text: "Unterstützt euch dabei, euren Handlungsspielraum zu verstehen und eine individuelle WSA Roadmap zu entwickeln und umzusetzen.",
  },
  {
    icon: "handshake",
    title: "Passendes finden",
    text: "Hilft euch dabei, passende Projekte, Partner und Förderungen zu finden.",
  },
  {
    icon: "forum",
    title: "Austauschraum",
    text: "Bietet euch einen geschützten Raum für Austausch von Best Practices und Fuck-Up Stories untereinander.",
  },
  {
    icon: "insights",
    title: "Sichtbarkeit und Fortschritt",
    text: "Gibt eurer BNE Arbeit Sichtbarkeit und ermöglicht messbare Evaluation, Reflexion und Steuerung des Fortschritts.",
  },
];

export const STATES = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
];

export const SCHOOL_POSITIONS = [
  "Schüler",
  "Lehrer",
  "Projektleitung",
  "Schulleitung",
  "BNE-Koordination",
];

export const PROJECT_GROUPS = [
  "Whole School Approach Community",
  "Projektgruppe Nachhaltigkeit",
  "BNE-Netzwerk Schule",
  "Pilotgruppe Schulentwicklung",
];

export const NAVIGATION_SYSTEM_ITEMS = [
  {
    title: "#WSA Navigator",
    description: "als Orientierung und Strukturierungshilfe",
  },
  {
    title: "#Wesentlichkeitsanalyse",
    description: "zur Standortbestimmung und Schwerpunktidentifikation",
  },
  {
    title: "#OKRs für Schulen",
    description: "zur Entwicklung eurer individuellen partizipativen Roadmap",
  },
  {
    title: "EdustainCONNECT Plattform",
    description: "zur Vernetzung und Austausch von Best Practices",
  },
  {
    title: "#Ideenlabor",
    description: "zur partizipativen Entwicklung von wirksamen Vorhaben",
  },
  {
    title: "Individuelles Coaching",
    description: "und Begleitung eures Entwicklungszyklus",
  },
  {
    title: "#Retrospektive und #kollegiale Fallberatung",
    description: "zur Evaluation und Reflexion",
  },
];

export const PARTNERS = [
  {
    name: "Leuphana",
    accent: "leuphana",
    title: "LEUPHANA",
    subtitle: "UNIVERSITÄT LÜNEBURG",
  },
  {
    name: "UNESCO",
    accent: "unesco",
    title: "unesco",
    subtitle: "Chair",
  },
  {
    name: "Bildungsträger",
    accent: "bildung",
    title: "Zertifizierter",
    subtitle: "Bildungsträger",
  },
];

export const MEMBER_HIGHLIGHTS = [
  {
    title: "Community-Austausch",
    text: "Neue Beiträge aus dem Netzwerk, Good Practices und Demo-Diskussionen aus anderen Schulen.",
  },
  {
    title: "Projektübersicht",
    text: "Ein Beispielbereich für laufende Vorhaben, To-dos und gemeinsame Umsetzungsschritte.",
  },
  {
    title: "Materialien",
    text: "Platzhalter für Leitfäden, Aufgabenblätter, Checklisten und Projektvorlagen.",
  },
];

export const MEMBER_PEOPLE = [
  { name: "Anna Becker", role: "Projektleitung", school: "Gesamtschule Nord" },
  { name: "Yusuf Demir", role: "Lehrer", school: "Gymnasium am Park" },
  { name: "Mila Hoffmann", role: "Schülervertretung", school: "Campus Süd" },
];

export const PARTNER_CATEGORIES = [
  { id: "nature", label: "Natur & Biodiversität", icon: "park", accent: "nature" },
  { id: "climate", label: "Energie & Klima", icon: "bolt", accent: "climate" },
  { id: "food", label: "Ernährung & Landwirtschaft", icon: "restaurant", accent: "food" },
  { id: "mobility", label: "Mobilität & Verkehr", icon: "directions_bike", accent: "mobility" },
  { id: "culture", label: "Kultur & Medien", icon: "theater_comedy", accent: "culture" },
  { id: "crafts", label: "Handwerk & Technik", icon: "handyman", accent: "crafts" },
  { id: "civic", label: "Kommune & Verwaltung", icon: "account_balance", accent: "civic" },
  { id: "health", label: "Gesundheit & Soziales", icon: "volunteer_activism", accent: "health" },
  { id: "education", label: "Bildung & Pädagogik", icon: "menu_book", accent: "education" },
  { id: "funding", label: "Förderung & Stiftungen", icon: "savings", accent: "funding" },
];

export const PARTNER_DIRECTORY = [
  {
    id: "nabu-ortsgruppe",
    name: "NABU Ortsgruppe Lüneburg",
    category: "nature",
    region: "Niedersachsen",
    type: "Naturschutzverband",
    description:
      "Begleitet Schulgärten, Artenvielfalt-AGs und Gewässer-Aktionen direkt vor Ort – inklusive Unterrichtsmaterial.",
    offerings: ["Schulgarten-Coaching", "Exkursionen", "Materialien"],
    contact: "schule@nabu-lueneburg.de",
    formats: ["Workshop", "Lernort"],
  },
  {
    id: "klimabildung-ev",
    name: "Klimabildung e.V.",
    category: "climate",
    region: "Deutschlandweit",
    type: "Bildungsverein",
    description:
      "Workshops zu Energie, Klimawandel und CO₂-Fußabdruck – mit fertigen Lernmodulen für alle Jahrgangsstufen.",
    offerings: ["Workshops", "Lernmodule", "Fortbildungen"],
    contact: "kontakt@klimabildung.de",
    formats: ["Workshop", "Fortbildung"],
  },
  {
    id: "gartenwerkstadt",
    name: "GartenWerkStadt e.V.",
    category: "food",
    region: "Nordrhein-Westfalen",
    type: "Urban-Gardening-Initiative",
    description:
      "Hilft Schulen beim Aufbau von Hochbeeten, Schulmensa-Partnerschaften und Bildung rund um regionale Ernährung.",
    offerings: ["Hochbeet-Aufbau", "Mensa-Kooperation", "Elternabende"],
    contact: "hallo@gartenwerkstadt.de",
    formats: ["Lernort", "Workshop"],
  },
  {
    id: "vcd-schulwege",
    name: "VCD Schulwege-Projekt",
    category: "mobility",
    region: "Deutschlandweit",
    type: "Verkehrsclub",
    description:
      "Unterstützt Schulen bei sicheren Schulwegen, Fahrrad-Aktionen und Mobilitätskonzepten im Stadtteil.",
    offerings: ["Mobilitätscheck", "Fahrrad-Aktionen", "Beratung"],
    contact: "schulwege@vcd.org",
    formats: ["Beratung", "Projekttag"],
  },
  {
    id: "fablab-kiel",
    name: "FabLab Kiel – Makerspace",
    category: "crafts",
    region: "Schleswig-Holstein",
    type: "Offene Werkstatt",
    description:
      "3D-Druck, Lasercutter und Elektronik-Kurse für Schulklassen mit Fokus auf nachhaltige Prototypen.",
    offerings: ["Makerspace-Tage", "Kurse", "Projektbegleitung"],
    contact: "schule@fablab-kiel.de",
    formats: ["Lernort", "Workshop"],
  },
  {
    id: "lokalradio-suedwest",
    name: "Lokalradio Südwest",
    category: "culture",
    region: "Rheinland-Pfalz",
    type: "Bürgermedien",
    description:
      "Produziert mit Schüler*innen eigene Radiobeiträge zu BNE-Themen – vom Interview bis zum fertigen Podcast.",
    offerings: ["Radio-Workshops", "Podcast-Produktion", "Studio-Tage"],
    contact: "schulfunk@lokalradio-swest.de",
    formats: ["Workshop", "Medienprojekt"],
  },
  {
    id: "jugendamt-musterstadt",
    name: "Jugendamt Musterstadt",
    category: "civic",
    region: "Bayern",
    type: "Kommunale Verwaltung",
    description:
      "Koordiniert Jugendbeteiligung, Fördermittel für Projekte und vermittelt Kontakte zu lokalen Akteuren.",
    offerings: ["Beteiligungsformate", "Mikroförderung", "Vernetzung"],
    contact: "jugend@musterstadt.de",
    formats: ["Beratung", "Förderung"],
  },
  {
    id: "deutsche-schulgesundheit",
    name: "Deutsche Schulgesundheit",
    category: "health",
    region: "Deutschlandweit",
    type: "Fachverband",
    description:
      "Begleitet Schulen bei gesunder Ernährung, Pausengestaltung und psychischer Gesundheit von Jugendlichen.",
    offerings: ["Beratung", "Fortbildungen", "Peer-Programme"],
    contact: "info@schulgesundheit.de",
    formats: ["Fortbildung", "Programm"],
  },
  {
    id: "bildungsakademie-sued",
    name: "Bildungsakademie Süd",
    category: "education",
    region: "Baden-Württemberg",
    type: "Fortbildungsträger",
    description:
      "Zertifizierte BNE-Fortbildungen für Lehrkräfte, Schulleitungen und ganze Kollegien – online wie vor Ort.",
    offerings: ["BNE-Zertifikat", "Kollegiumstage", "Coaching"],
    contact: "kontakt@bildungsakademie-sued.de",
    formats: ["Fortbildung", "Coaching"],
  },
  {
    id: "stiftung-mercator",
    name: "Stiftung Mercator",
    category: "funding",
    region: "Deutschlandweit",
    type: "Stiftung",
    description:
      "Fördert Projekte rund um Klimaschutz, Bildung und Teilhabe – mit mehrstufigen Ausschreibungen für Schulen.",
    offerings: ["Projektförderung", "Beratung", "Netzwerk"],
    contact: "foerderung@stiftung-mercator.de",
    formats: ["Förderung", "Netzwerk"],
  },
  {
    id: "stadtwerke-bildung",
    name: "Stadtwerke Bildungsinitiative",
    category: "climate",
    region: "Hessen",
    type: "Kommunaler Versorger",
    description:
      "Erlebnistage zu Energieerzeugung, Wasser und nachhaltiger Infrastruktur direkt in den Anlagen vor Ort.",
    offerings: ["Werksführungen", "Lehrmaterialien", "Projekttage"],
    contact: "bildung@stadtwerke-hessen.de",
    formats: ["Lernort", "Projekttag"],
  },
  {
    id: "ernaehrungsrat-region",
    name: "Ernährungsrat Region Nord",
    category: "food",
    region: "Hamburg",
    type: "Zivilgesellschaftliches Netzwerk",
    description:
      "Verbindet Schulen mit regionalen Erzeuger*innen, Mensen und Initiativen für eine nachhaltige Ernährung.",
    offerings: ["Hof-Besuche", "Mensa-Beratung", "Workshops"],
    contact: "hallo@ernaehrungsrat-nord.de",
    formats: ["Lernort", "Beratung"],
  },
];

export const QUICK_NAVIGATOR_STEPS = [
  {
    id: "goal",
    label: "Was möchtest du gerade tun?",
    description: "Wähle dein aktuelles Ziel.",
    options: [
      {
        value: "project-start",
        title: "Projekt starten",
        description: "Neues Vorhaben planen.",
      },
      {
        value: "inspiration",
        title: "Inspiration finden",
        description: "Ideen und Beispiele sehen.",
      },
      {
        value: "partner",
        title: "Partner finden",
        description: "Kontakte und Angebote finden.",
      },
      {
        value: "best-practices",
        title: "Best Practices entdecken",
        description: "Von anderen Schulen lernen.",
      },
      {
        value: "offer",
        title: "Angebot sichtbar machen",
        description: "Eigenes Angebot platzieren.",
      },
    ],
  },
  {
    id: "role",
    label: "Wer bist du auf EDUSTAIN Connect?",
    description: "Wähle deine Rolle.",
    options: [
      {
        value: "student",
        title: "Schüler",
        description: "Lerne und gestalte mit.",
      },
      {
        value: "teacher",
        title: "Lehrkraft",
        description: "Begleite Projekte und Unterricht.",
      },
      {
        value: "project-lead",
        title: "Projektleitung",
        description: "Koordiniere Team und Umsetzung.",
      },
      {
        value: "leadership",
        title: "Schulleitung",
        description: "Denke strategisch und langfristig.",
      },
      {
        value: "partner",
        title: "Externer Partner",
        description: "Biete Angebote oder Expertise an.",
      },
    ],
  },
  {
    id: "interest",
    label: "Wofür interessierst du dich im Moment besonders?",
    description: "Wähle dein Fokusthema.",
    options: [
      {
        value: "biodiversity",
        title: "Biodiversität",
        description: "Schulgarten und Artenvielfalt.",
      },
      {
        value: "energy",
        title: "Energie",
        description: "Energiesparen und Technik.",
      },
      {
        value: "nutrition",
        title: "Ernährung",
        description: "Mensa, Konsum und Ernährung.",
      },
      {
        value: "mobility",
        title: "Mobilität",
        description: "Schulwege und Bewegung.",
      },
      {
        value: "school-development",
        title: "Schulentwicklung",
        description: "Strategie und Veränderung.",
      },
      {
        value: "wsa",
        title: "Whole School Approach",
        description: "Ganzheitlicher Einstieg.",
      },
    ],
  },
];
