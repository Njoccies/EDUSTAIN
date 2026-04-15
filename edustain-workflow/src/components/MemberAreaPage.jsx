import { useState } from "react";
import QuickNavigatorModal from "./QuickNavigatorModal.jsx";
import {
  MEMBER_HIGHLIGHTS,
  MEMBER_PEOPLE,
} from "../data/workflowSiteContent.js";
import { getQuickNavigatorRecommendations } from "../lib/quickNavigator.js";
import {
  consumeWelcomeBanner,
  getDemoMember,
  getQuickNavigatorAnswers,
  markQuickNavigatorSeen,
  resetQuickNavigator,
  saveQuickNavigatorAnswers,
  shouldShowQuickNavigator,
} from "../lib/demoSession.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function MemberAreaPage({ onNavigateHome, onNavigateRegistration }) {
  const [member] = useState(() => getDemoMember());
  const [quickNavAnswers, setQuickNavAnswers] = useState(() => getQuickNavigatorAnswers());
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(() => {
    const currentMember = getDemoMember();
    return currentMember ? consumeWelcomeBanner() : false;
  });
  const [showQuickNavigator, setShowQuickNavigator] = useState(() => {
    const currentMember = getDemoMember();
    return currentMember ? shouldShowQuickNavigator() : false;
  });

  const quickNavRecommendations = getQuickNavigatorRecommendations(quickNavAnswers);

  if (!member) {
    return (
      <div className="page-shell page-shell--members">
        <section className="member-access-card">
          <div className="member-access-card__icon">
            <Icon name="lock" />
          </div>
          <h1>Demo-Mitgliederbereich</h1>
          <p>
            Dieser Bereich wirkt wie ein geschützter Mitgliederzugang, ist aber vollständig
            prototypisch. Für den Demo-Zugang musst du zuerst die Registrierung abschließen.
          </p>
          <div className="member-access-card__actions">
            <button className="button button--primary" onClick={onNavigateRegistration} type="button">
              <Icon name="how_to_reg" />
              <span>Zur Registrierung</span>
            </button>
            <button className="button button--ghost" onClick={onNavigateHome} type="button">
              <Icon name="home" />
              <span>Zur Hauptseite</span>
            </button>
          </div>
        </section>
      </div>
    );
  }

  const handleQuickNavigatorClose = () => {
    markQuickNavigatorSeen();
    setShowQuickNavigator(false);
  };

  const handleQuickNavigatorComplete = (answers) => {
    saveQuickNavigatorAnswers(answers);
    setQuickNavAnswers(answers);
    setShowQuickNavigator(false);
  };

  const handleQuickNavigatorRestart = () => {
    resetQuickNavigator();
    setShowQuickNavigator(true);
  };

  return (
    <div className="page-shell page-shell--members">
      {showQuickNavigator && (
        <QuickNavigatorModal
          initialAnswers={quickNavAnswers}
          onClose={handleQuickNavigatorClose}
          onComplete={handleQuickNavigatorComplete}
        />
      )}

      <div className="member-dashboard">
        {showWelcomeBanner && (
          <div className="welcome-banner">
            <div>
              <strong>Willkommen bei EDUSTAIN-Connect</strong>
              <p>Schön, dass du da bist. Dieser Hinweis erscheint im Demo-Flow nur einmal.</p>
            </div>
            <button type="button" onClick={() => setShowWelcomeBanner(false)}>
              <Icon name="close" />
            </button>
          </div>
        )}

        {quickNavRecommendations ? (
          <section className="personalized-start">
            <div className="personalized-start__top">
              <span className="personalized-start__badge">{quickNavRecommendations.badge}</span>
              <div className="personalized-start__actions">
                <button className="button button--ghost" onClick={handleQuickNavigatorRestart} type="button">
                  <Icon name="restart_alt" />
                  <span>Quick Navigator</span>
                </button>
                <button className="button button--ghost" onClick={onNavigateHome} type="button">
                  <Icon name="home" />
                  <span>Zur Hauptseite</span>
                </button>
              </div>
            </div>

            <div className="personalized-start__copy">
              <h2>{quickNavRecommendations.title}</h2>
            </div>

            <div className="personalized-start__embedded">
              <article className="embedded-recommendation">
                <div className="embedded-recommendation__header">
                  <h3>Empfohlene Projekte</h3>
                  <span>2 Beispiele</span>
                </div>
                <div className="embedded-recommendation__stack">
                  {quickNavRecommendations.projects.map((project) => (
                    <div key={project.title} className="embedded-recommendation__card">
                      <strong>{project.title}</strong>
                      <p>{project.description}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="embedded-recommendation">
                <div className="embedded-recommendation__header">
                  <h3>Empfohlene Partner</h3>
                  <span>2 passende Kontakte</span>
                </div>
                <div className="embedded-recommendation__stack">
                  {quickNavRecommendations.partners.map((partner) => (
                    <div key={partner.name} className="embedded-recommendation__card">
                      <strong>{partner.name}</strong>
                      <p>{partner.type}</p>
                      <p>{partner.fit}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        ) : (
          <section className="personalized-start personalized-start--empty">
            <div className="personalized-start__top">
              <span className="personalized-start__badge">Quick Navigator</span>
              <div className="personalized-start__actions">
                <button className="button button--ghost" onClick={onNavigateHome} type="button">
                  <Icon name="home" />
                  <span>Zur Hauptseite</span>
                </button>
              </div>
            </div>

            <div className="personalized-start__copy">
              <h2>Starte mit einer kurzen Orientierung</h2>
              <p>
                Mit drei kurzen Antworten zeigen wir dir direkt passende Projekte, Kontakte und
                Best Practices für deinen Einstieg auf EDUSTAIN Connect.
              </p>
            </div>
            <div className="personalized-start__panel">
              <h3>Warum das hilfreich ist</h3>
              <ul>
                <li>Weniger Suchen, mehr passender Einstieg</li>
                <li>Relevante Inhalte auf Basis deiner aktuellen Absicht</li>
                <li>Jederzeit erneut startbar, wenn sich dein Fokus ändert</li>
              </ul>
              <button className="button button--primary" onClick={handleQuickNavigatorRestart} type="button">
                <Icon name="flag" />
                <span>Quick Navigator starten</span>
              </button>
            </div>
          </section>
        )}

        <section className="member-hero">
          <div>
            <p className="member-hero__eyebrow">Mitgliederbereich</p>
            <h1>Willkommen zurück, {member.firstName}</h1>
            <p>
              Dieser Bereich simuliert einen geschützten Zugang für registrierte Personen. Die
              Inhalte sind Platzhalter, damit der Ablauf realistisch wirkt.
            </p>
          </div>
          <div className="member-profile-card">
            <span className="member-profile-card__badge">Aktiv</span>
            <h2>
              {member.firstName} {member.lastName}
            </h2>
            <p>{member.schoolRole}</p>
            <p>{member.schoolName}</p>
            <p>{member.state}</p>
            <p>{member.projectGroup}</p>
          </div>
        </section>

        <section className="member-grid">
          {MEMBER_HIGHLIGHTS.map((item) => (
            <article key={item.title} className="member-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        {quickNavRecommendations && (
          <section className="member-section">
            <div className="member-section__header">
              <h2>Best Practices für dich</h2>
            </div>

            <div className="recommendation-columns recommendation-columns--practices">
              {quickNavRecommendations.practices.map((practice) => (
                <article key={practice} className="recommendation-card recommendation-card--practice">
                  <p>{practice}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="member-section">
          <div className="member-section__header">
            <h2>Beispielhafte registrierte Personen</h2>
            <div className="member-section__actions">
              <button className="button button--ghost" onClick={onNavigateHome} type="button">
                <Icon name="explore" />
                <span>Zur Hauptseite</span>
              </button>
            </div>
          </div>

          <div className="member-list">
            {MEMBER_PEOPLE.map((person) => (
              <article key={person.name} className="member-list__item">
                <div className="member-avatar">{person.name.charAt(0)}</div>
                <div>
                  <strong>{person.name}</strong>
                  <p>{person.role}</p>
                  <p>{person.school}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
