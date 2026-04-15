export function getQuickNavigatorRecommendations(answers) {
  if (!answers) {
    return null;
  }

  const goalMap = {
    "project-start": {
      title: "Dein empfohlener Einstieg: Projektplanung",
      summary:
        "Starte mit einem klaren Projekt-Flow und arbeite dich von der Idee bis zur Umsetzung vor.",
      actions: [
        "Öffne zuerst den Projekte-Planer und skizziere dein Vorhaben in wenigen Schritten.",
        "Nutze danach passende Vorlagen und Aufgabenblätter, um dein Team mitzunehmen.",
      ],
    },
    inspiration: {
      title: "Dein empfohlener Einstieg: Inspiration und Überblick",
      summary:
        "Beginne mit Beispielen und Orientierung, bevor du dich auf ein konkretes Projekt festlegst.",
      actions: [
        "Sieh dir Best Practices aus ähnlichen Schulen an.",
        "Notiere dir 2 bis 3 Ideen, die zu eurer Schule passen könnten.",
      ],
    },
    partner: {
      title: "Dein empfohlener Einstieg: Kontakte und Kooperationen",
      summary:
        "Fokussiere dich zuerst auf passende Mitstreitende, Partner und externe Unterstützer.",
      actions: [
        "Prüfe mögliche Partnerprofile und Netzwerkkontakte.",
        "Formuliere klar, welches Vorhaben oder welche Unterstützung du suchst.",
      ],
    },
    "best-practices": {
      title: "Dein empfohlener Einstieg: Best Practices",
      summary:
        "Lass dich von funktionierenden Beispielen inspirieren und übertrage erfolgreiche Muster auf eure Schule.",
      actions: [
        "Vergleiche ähnliche Projekte und bewährte Formate.",
        "Übernimm ein Modell, das ihr als Pilot schnell testen könnt.",
      ],
    },
    offer: {
      title: "Dein empfohlener Einstieg: Angebot sichtbar machen",
      summary:
        "Bereite dein Angebot so auf, dass Schulen schnell verstehen, wie du sie unterstützen kannst.",
      actions: [
        "Formuliere dein Angebot knapp und praxisnah.",
        "Ordne es einem klaren Bedarf oder Thema auf der Plattform zu.",
      ],
    },
  };

  const roleMap = {
    student: "Starte niedrigschwellig und suche Formate, die Mitschüler direkt aktivieren.",
    teacher:
      "Achte auf schnelle Umsetzbarkeit im Schulalltag und auf gute Vorlagen für den Unterricht.",
    "project-lead":
      "Strukturiere den Einstieg so, dass Zuständigkeiten, Partner und nächste Schritte sofort sichtbar sind.",
    leadership:
      "Verbinde operative Ideen früh mit Schulentwicklungszielen und langfristiger Verankerung.",
    partner:
      "Zeige Schulen möglichst konkret, welchen Mehrwert, welche Ressourcen oder welches Know-how du einbringst.",
  };

  const interestMap = {
    biodiversity: {
      badge: "Biodiversität",
      modules: ["Schulgarten", "Artenvielfalt auf dem Campus", "Lernort Natur"],
      projects: [
        {
          title: "Schulhof-Biodiversitätsgarten",
          description: "Gemeinsam Beete, Insektenhotel und heimische Pflanzen anlegen.",
        },
        {
          title: "Artenvielfalt auf dem Schulgelände",
          description: "Flächen analysieren und kleine Lebensräume sichtbar verbessern.",
        },
      ],
      partners: [
        { name: "NABU Ortsgruppe Freiburg", type: "NGO", fit: "Schulgarten & Artenvielfalt" },
        { name: "Bodensee-Stiftung", type: "Stiftung", fit: "Ökosysteme & Schulprojekte" },
      ],
      practices: [
        "Projektwochen mit Pflanzaktionen und Pflegeplänen verbinden.",
        "Naturflächen als dauerhaften Lernort in den Unterricht einbauen.",
      ],
    },
    energy: {
      badge: "Energie",
      modules: ["Energiesparen", "Technikprojekte", "Ressourcen im Schulbetrieb"],
      projects: [
        {
          title: "Energie-Detektive an der Schule",
          description: "Verbrauch sichtbar machen und Sparmaßnahmen testen.",
        },
        {
          title: "Klimafreundlicher Klassenraum",
          description: "Licht, Lüften und Geräte gemeinsam neu organisieren.",
        },
      ],
      partners: [
        { name: "Lokale Energieagentur", type: "Beratung", fit: "Analyse & Einsparpotenziale" },
        { name: "Stadtwerke CampusLab", type: "Partner", fit: "Praxisnahe Energieprojekte" },
      ],
      practices: [
        "Energie-Audits mit Schülerteams und klaren Verantwortlichkeiten durchführen.",
        "Messbare Mini-Ziele pro Monat statt großer Einmalmaßnahmen setzen.",
      ],
    },
    nutrition: {
      badge: "Ernährung",
      modules: ["Nachhaltige Verpflegung", "Konsum", "Küche und Mensa als Lernort"],
      projects: [
        {
          title: "Nachhaltige Mensa-Woche",
          description: "Gerichte, Herkunft und Lebensmittelabfälle gemeinsam untersuchen.",
        },
        {
          title: "Pausenbrot mit Wirkung",
          description: "Schulweite Aktionen zu regionaler und fairer Ernährung starten.",
        },
      ],
      partners: [
        { name: "Foodsharing Campus", type: "Initiative", fit: "Lebensmittelwertschätzung" },
        { name: "Regionale Bio-Küche", type: "Anbieter", fit: "Workshops & Mensaformate" },
      ],
      practices: [
        "Mensa, Unterricht und Projektgruppe in einem Format zusammenführen.",
        "Schülerfeedback direkt in Speiseplan- und Einkaufsentscheidungen integrieren.",
      ],
    },
    mobility: {
      badge: "Mobilität",
      modules: ["Schulwege", "Fahrradprojekte", "Klimafreundliche Bewegung"],
      projects: [
        {
          title: "Sicherer Schulweg",
          description: "Schulwege kartieren und Verbesserungen mit der Kommune anstoßen.",
        },
        {
          title: "Fahrradfreundliche Schule",
          description: "Aktionen, Stellplätze und Reparaturtage verbinden.",
        },
      ],
      partners: [
        { name: "ADFC Regionalgruppe", type: "Verein", fit: "Fahrradmobilität & Sicherheit" },
        { name: "Verkehrswende Netzwerk", type: "Netzwerk", fit: "Schulweg & Beteiligung" },
      ],
      practices: [
        "Schulwegdaten mit Schülern erheben und direkt visualisieren.",
        "Mobilität mit Gesundheit, Klima und Teilhabe zusammendenken.",
      ],
    },
    "school-development": {
      badge: "Schulentwicklung",
      modules: ["Strategie", "Partizipation", "Langfristige Verankerung"],
      projects: [
        {
          title: "Nachhaltigkeitsleitbild für die Schule",
          description: "Mit Kollegium, Schülern und Leitung ein gemeinsames Zielbild entwickeln.",
        },
        {
          title: "WSA-Roadmap in 90 Tagen",
          description: "Erste Prioritäten sichtbar machen und Verantwortlichkeiten klären.",
        },
      ],
      partners: [
        { name: "Schulentwicklungs-Coaching", type: "Coaching", fit: "Strategie & Moderation" },
        { name: "BNE Netzwerk BW", type: "Netzwerk", fit: "Transfer & Austausch" },
      ],
      practices: [
        "Mit kleinen Pilotvorhaben starten und früh sichtbar machen.",
        "Leitung, Lehrkräfte und Schüler in gemeinsame Review-Routinen holen.",
      ],
    },
    wsa: {
      badge: "Whole School Approach",
      modules: ["Ganzheitlicher Einstieg", "Bausteine des WSA", "Schrittweise Entwicklung"],
      projects: [
        {
          title: "WSA Kick-off an eurer Schule",
          description: "Mit einer kompakten Standortbestimmung und ersten Schritten starten.",
        },
        {
          title: "BNE als Schulentwicklungsprojekt",
          description: "Nachhaltigkeit systematisch in Kultur, Unterricht und Alltag verankern.",
        },
      ],
      partners: [
        { name: "EDUSTAIN Coaching", type: "Coaching", fit: "Begleitung im Whole School Approach" },
        { name: "WSA Community Schulen", type: "Community", fit: "Praxisbeispiele & Austausch" },
      ],
      practices: [
        "Nicht alles gleichzeitig machen, sondern in klaren Entwicklungsphasen denken.",
        "Unterricht, Betrieb und Schulkultur von Anfang an zusammen betrachten.",
      ],
    },
  };

  const goalContent = goalMap[answers.goal] ?? goalMap.inspiration;
  const interestContent = interestMap[answers.interest] ?? interestMap.wsa;

  return {
    title: goalContent.title,
    summary: goalContent.summary,
    roleHint: roleMap[answers.role] ?? roleMap.teacher,
    badge: interestContent.badge,
    modules: interestContent.modules,
    actions: goalContent.actions,
    projects: interestContent.projects,
    partners: interestContent.partners,
    practices: interestContent.practices,
  };
}
