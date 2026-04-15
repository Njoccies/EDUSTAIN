import { useState } from "react";
import {
  MEMBER_HIGHLIGHTS,
  MEMBER_PEOPLE,
} from "../data/workflowSiteContent.js";
import { consumeWelcomeBanner, getDemoMember } from "../lib/demoSession.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function MemberAreaPage({ onNavigateHome, onNavigateRegistration }) {
  const [member] = useState(() => getDemoMember());
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(() => {
    const currentMember = getDemoMember();
    return currentMember ? consumeWelcomeBanner() : false;
  });

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

  return (
    <div className="page-shell page-shell--members">
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

        <section className="member-section">
          <div className="member-section__header">
            <h2>Beispielhafte registrierte Personen</h2>
            <button className="button button--ghost" onClick={onNavigateHome} type="button">
              <Icon name="explore" />
              <span>Zur Hauptseite</span>
            </button>
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
