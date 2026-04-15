export const NAV_TABS = [
  { id: "wsa", label: "WSA Navigator", icon: "explore", section: "welcome" },
  { id: "community", label: "Community", icon: "groups", section: "registration" },
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
