import {
  PARTNER_DIRECTORY,
  PROJECT_CATALOG_ITEMS,
} from "../data/workflowSiteContent.js";
import { getDemoMember, getQuickNavigatorAnswers } from "../lib/demoSession.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

function buildFocusAreas(member, quickNavAnswers) {
  const focusAreas = new Set();

  if (member?.projectGroup) {
    focusAreas.add(member.projectGroup);
  }

  focusAreas.add("Schulentwicklung");

  if (quickNavAnswers?.interest === "school-development") {
    focusAreas.add("Whole School Approach");
  }
  if (quickNavAnswers?.interest === "energy") {
    focusAreas.add("Energie & Klima");
  }
  if (quickNavAnswers?.interest === "nutrition") {
    focusAreas.add("Ernaehrung & Beschaffung");
  }
  if (quickNavAnswers?.interest === "biodiversity") {
    focusAreas.add("Biodiversitaet & Schulgelaende");
  }
  if (quickNavAnswers?.interest === "mobility") {
    focusAreas.add("Mobilitaet");
  }

  if (focusAreas.size === 0) {
    focusAreas.add("Schulentwicklung");
    focusAreas.add("Projektgruppen-Aufbau");
    focusAreas.add("Praxisnahe Pilotprojekte");
  }

  return [...focusAreas].slice(0, 5);
}

function buildMilestones(member) {
  return [
    {
      title: "Profil geschärft",
      text: `Die Schule arbeitet innerhalb von ${
        member.projectGroup || "einer Projektgruppe"
      } an einem klaren Entwicklungsrahmen.`,
    },
    {
      title: "Pilotvorhaben vorbereitet",
      text: `Fuer ${member.state || "das Schulumfeld"} werden erste sichtbare Schritte und passende Kooperationsformate priorisiert.`,
    },
    {
      title: "Vernetzung anschlussfaehig",
      text: "Beispielprojekte, externe Partner und Good Practices koennen direkt an die Schulentwicklung angebunden werden.",
    },
  ];
}

function getSuggestedProjects(member, quickNavAnswers) {
  const normalizedState = member?.state?.toLowerCase() ?? "";
  const interest = quickNavAnswers?.interest;

  const scoredProjects = PROJECT_CATALOG_ITEMS.map((project) => {
    let score = 0;

    if (normalizedState && project.state.toLowerCase() === normalizedState) {
      score += 3;
    }
    if (interest === "school-development" && project.category === "school-development") {
      score += 3;
    }
    if (interest === "energy" && project.category === "climate-energy") {
      score += 3;
    }
    if (interest === "nutrition" && project.category === "nutrition") {
      score += 3;
    }
    if (interest === "biodiversity" && project.category === "biodiversity") {
      score += 3;
    }
    if (interest === "mobility" && project.category === "mobility") {
      score += 3;
    }
    if (interest === "wsa" && project.category === "school-development") {
      score += 2;
    }

    return { project, score };
  })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.project);

  return scoredProjects.slice(0, 3);
}

function getSuggestedPartners(member, quickNavAnswers) {
  const normalizedState = member?.state?.toLowerCase() ?? "";
  const interest = quickNavAnswers?.interest;

  const scoredPartners = PARTNER_DIRECTORY.map((partner) => {
    let score = 0;

    if (partner.region.toLowerCase() === normalizedState || partner.region === "Deutschlandweit") {
      score += 2;
    }
    if (interest === "school-development" && partner.category === "education") {
      score += 3;
    }
    if (interest === "energy" && partner.category === "climate") {
      score += 3;
    }
    if (interest === "nutrition" && partner.category === "food") {
      score += 3;
    }
    if (interest === "biodiversity" && partner.category === "nature") {
      score += 3;
    }
    if (interest === "mobility" && partner.category === "mobility") {
      score += 3;
    }

    return { partner, score };
  })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.partner);

  return scoredPartners.slice(0, 3);
}

export default function SchoolProfilePage({ onNavigateRegistration, onOpenProjects }) {
  const member = getDemoMember();
  const quickNavAnswers = getQuickNavigatorAnswers();

  const schoolProfile = member
    ? {
        schoolName: member.schoolName || "EDUSTAIN Demo-Schule",
        state: member.state || "Deutschland",
        projectGroup: member.projectGroup || "Projektgruppe Nachhaltigkeit",
      }
    : {
        schoolName: "EDUSTAIN Demo-Schule",
        state: "Baden-Wuerttemberg",
        projectGroup: "Projektgruppe Nachhaltigkeit",
      };

  const focusAreas = buildFocusAreas(schoolProfile, quickNavAnswers);
  const milestones = buildMilestones(schoolProfile);
  const suggestedProjects = getSuggestedProjects(schoolProfile, quickNavAnswers);
  const suggestedPartners = getSuggestedPartners(schoolProfile, quickNavAnswers);

  return (
    <div className="page-shell page-shell--school">
      <section className="school-profile-hero">
        <div className="school-profile-hero__copy">
          <p className="school-profile-hero__eyebrow">Unsere Schule</p>
          <h1>{schoolProfile.schoolName}</h1>
          <p>
            Dieses Schulprofil spiegelt die in der Demo hinterlegten Schuldaten wider und bleibt
            bewusst anonymisiert. Personenbezogene Daten werden hier nicht angezeigt.
          </p>
          <div className="school-profile-hero__meta">
            <span>
              <Icon name="location_on" />
              <strong>{schoolProfile.state}</strong>
            </span>
            <span>
              <Icon name="groups" />
              <strong>{schoolProfile.projectGroup}</strong>
            </span>
          </div>
        </div>

        <div className="school-profile-hero__card">
          <span className="school-profile-hero__badge">Anonymisiertes Demo-Profil</span>
          <h2>Schulprofil auf einen Blick</h2>
          <p>
            Schwerpunkt auf einer klaren Projektgruppe, einem sichtbaren Entwicklungsfokus und
            anschlussfaehigen Pilotprojekten fuer den Whole School Approach.
          </p>
          <div className="school-profile-hero__actions">
            <button className="button button--primary" onClick={onOpenProjects} type="button">
              <Icon name="assignment" />
              <span>Passende Projekte ansehen</span>
            </button>
            {!member && (
              <button
                className="button button--ghost"
                onClick={onNavigateRegistration}
                type="button"
              >
                <Icon name="group_add" />
                <span>Schuldaten hinterlegen</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="school-profile-grid">
        <article className="school-profile-card">
          <div className="school-profile-card__header">
            <p>Rahmendaten</p>
            <Icon name="inventory_2" />
          </div>
          <div className="school-profile-facts">
            <div>
              <span>Schule</span>
              <strong>{schoolProfile.schoolName}</strong>
            </div>
            <div>
              <span>Bundesland</span>
              <strong>{schoolProfile.state}</strong>
            </div>
            <div>
              <span>Projektgruppe</span>
              <strong>{schoolProfile.projectGroup}</strong>
            </div>
          </div>
        </article>

        <article className="school-profile-card">
          <div className="school-profile-card__header">
            <p>Aktuelle Fokusfelder</p>
            <Icon name="track_changes" />
          </div>
          <div className="school-profile-tags">
            {focusAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
          <p className="school-profile-card__note">
            Die Schwerpunkte leiten sich aus Schulrolle, Projektgruppe und optionalen Navigator-
            Angaben ab.
          </p>
        </article>
      </section>

      <section className="school-profile-section">
        <div className="school-profile-section__header">
          <h2>Entwicklungsstand</h2>
          <p>So wirkt die Schule im aktuellen Demo-Setup anschlussfaehig fuer die Plattform.</p>
        </div>
        <div className="school-profile-milestones">
          {milestones.map((milestone) => (
            <article key={milestone.title} className="school-profile-card school-profile-card--milestone">
              <div className="school-profile-milestone__icon">
                <Icon name="check_circle" />
              </div>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="school-profile-section">
        <div className="school-profile-section__header">
          <h2>Passende Beispielprojekte</h2>
          <p>Diese Projekte passen thematisch oder regional gut zu eurem aktuellen Profil.</p>
        </div>
        <div className="school-profile-recommendations">
          {suggestedProjects.map((project) => (
            <article key={project.id} className="school-profile-card">
              <span className="school-profile-card__kicker">{project.phase}</span>
              <h3>{project.title}</h3>
              <p className="school-profile-card__subline">
                {project.school} · {project.state}
              </p>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="school-profile-section">
        <div className="school-profile-section__header">
          <h2>Potenzielle Partner</h2>
          <p>Diese Partner koennen als naechste Kontakte fuer Vernetzung oder Umsetzung dienen.</p>
        </div>
        <div className="school-profile-recommendations">
          {suggestedPartners.map((partner) => (
            <article key={partner.id} className="school-profile-card">
              <span className="school-profile-card__kicker">{partner.region}</span>
              <h3>{partner.name}</h3>
              <p className="school-profile-card__subline">{partner.type}</p>
              <p>{partner.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
