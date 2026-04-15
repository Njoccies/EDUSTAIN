import {
  BENEFITS,
  NAVIGATION_SYSTEM_ITEMS,
  PARTNERS,
} from "../data/workflowSiteContent.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

function PartnerLogo({ partner }) {
  return (
    <div className={`partner-logo partner-logo--${partner.accent}`}>
      <div className="partner-logo__title">{partner.title}</div>
      <div className="partner-logo__subtitle">{partner.subtitle}</div>
    </div>
  );
}

export default function WebsiteHome({
  welcomeRef,
  registrationRef,
  navigationRef,
  onOpenProjects,
  onOpenRegistration,
  onOpenMembers,
  onOpenQuickNavigator,
}) {
  return (
    <div className="site-shell">
      <section className="hero-banner">
        <div className="hero-banner__burst" />
        <div className="hero-banner__content">
          <p className="hero-banner__eyebrow">Whole School Approach Vernetzungsplattform</p>
          <h1>Schule vernetzen · Zukunft gestalten · Nachhaltig wirken</h1>
          <div className="hero-banner__actions">
            <button className="button button--primary" onClick={onOpenRegistration} type="button">
              <Icon name="group_add" />
              <span>Jetzt registrieren</span>
            </button>
            <button className="button button--secondary" onClick={onOpenProjects} type="button">
              <Icon name="assignment" />
              <span>Projekte öffnen</span>
            </button>
            <button className="button button--secondary" onClick={onOpenQuickNavigator} type="button">
              <Icon name="explore" />
              <span>Quick Navigator</span>
            </button>
          </div>
        </div>
      </section>

      <main className="site-main">
        <section className="welcome-section" ref={welcomeRef} id="welcome">
          <div className="welcome-section__intro">
            <h2>Die Plattform für nachhaltige Schulentwicklung <span className="welcome-section__accent">(Whole School Approach)</span></h2>
            <p>
              Vernetzt euch mit anderen Schulen, findet Inspiration und setzt Bildung für
              nachhaltige Entwicklung (BNE) Schritt für Schritt an eurer Schule um.
            </p>
          </div>
          <div className="benefit-grid">
            {BENEFITS.map((b) => (
              <div className="benefit-card" key={b.title}>
                <span className="benefit-card__icon material-icons">{b.icon}</span>
                <h3 className="benefit-card__title">{b.title}</h3>
                <p className="benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section content-section--bordered" ref={registrationRef} id="registration">
          <h2>Community-Zugang</h2>
          <p>
            Du möchtest mit deiner Schule Teil der Whole School Approach Community werden? Dann
            starte jetzt den separaten Registrierungsprozess als klickbaren Demo-Flow.
          </p>
          <div className="registration-cta-card">
            <div className="registration-cta-card__content">
              <div className="registration-cta-card__badge">
                <Icon name="how_to_reg" />
                <span>4 Schritte</span>
              </div>
              <h3>Eigenständige Registrierungsseite</h3>
              <p>
                Der neue Ablauf führt Schritt für Schritt durch persönliche Daten, schulische
                Informationen, Projektgruppe und rechtliche Zustimmung. Alles ist vollständig im
                Frontend simuliert.
              </p>
              <div className="registration-cta-card__actions">
                <button className="button button--primary" onClick={onOpenRegistration} type="button">
                  <Icon name="arrow_forward" />
                  <span>Jetzt registrieren</span>
                </button>
                <button className="button button--ghost" onClick={onOpenMembers} type="button">
                  <Icon name="lock_open" />
                  <span>Mitgliederbereich ansehen</span>
                </button>
              </div>
            </div>
            <div className="registration-cta-card__steps">
              <div>
                <strong>1.</strong>
                <span>Persönliche Daten</span>
              </div>
              <div>
                <strong>2.</strong>
                <span>Schulische Informationen</span>
              </div>
              <div>
                <strong>3.</strong>
                <span>Projektgruppe</span>
              </div>
              <div>
                <strong>4.</strong>
                <span>AGB und Datenschutz</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section content-section--tight">
          <h2>Ihr seid Anbieter eines BNE Lernorts für Schulen oder bietet BNE Dienstleistungen für Schulen an?</h2>
          <p>
            Wir wollen auf dieser Plattform demnächst auch BNE Anbieter mit Schulen vernetzen.
          </p>
          <p>
            Wenn ihr als BNE Anbieter Interesse zur Aufnahme auf die Plattform habt, merkt euch hier
            unverbindlich vor. Wir melden uns dann mit weiteren Informationen bei euch, sobald wir
            soweit sind.
          </p>
          <button className="button button--ghost" type="button">
            <Icon name="edit" />
            <span>Unverbindliche Vormerkung</span>
          </button>
        </section>

        <section className="content-section content-section--tight">
          <h2>Nutzung der Plattform in eurem WSA Bildungsprogramm</h2>
          <p>
            Ihr möchtet als Schulträger, Kultusministerium, Verein, NGO o. ä. die Plattform für
            euer Projekt/Programm zum Whole School Approach nutzen oder uns bei der
            Weiterentwicklung unterstützen? Dann kontaktiert uns!
          </p>
          <div className="contact-card">
            <p className="contact-card__title">EDUSTAIN</p>
            <p>
              E-Mail:{" "}
              <a href="mailto:support@edustainconnect.org">support@edustainconnect.org</a>
            </p>
            <p>
              Webseite:{" "}
              <a href="https://www.edustain.org" target="_blank" rel="noreferrer">
                www.edustain.org
              </a>
            </p>
            <p>Fortbildungen | Workshops | Vorträge | Coaching</p>
          </div>
          <a className="button button--ghost" href="mailto:support@edustainconnect.org">
            <Icon name="mail" />
            <span>Kontaktiere uns</span>
          </a>
        </section>

        <section className="content-section content-section--bordered" ref={navigationRef} id="navigation">
          <h2>Der Weg ist das Ziel - Das #EDUSTAIN Navigationssystem</h2>
          <p>
            Bei BNE im Whole School Approach geht es darum, in kleinen kontinuierlichen Schritten in
            Richtung einer nachhaltigen Entwicklung zu gehen - EDUSTAIN begleitet mit verschiedenen
            Bausteinen durch diesen WSA Entwicklungszyklus auf dem Weg von einem Lernort zu einem
            nachhaltigen Lebensraum:
          </p>
          <ul className="bullet-list">
            {NAVIGATION_SYSTEM_ITEMS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> {item.description}
              </li>
            ))}
          </ul>
          <p>
            Unsere Bausteine basieren auf bewährten Methoden aus Pädagogik, Wirtschaft und
            Nachhaltigkeitswissenschaft und sind speziell auf die Praxis von Schulen angepasst.
          </p>
          <p>
            Sprecht uns einfach an wenn ihr mehr erfahren möchtet:{" "}
            <a href="mailto:info@edustain.org">info@edustain.org</a>
          </p>
        </section>
      </main>

      <section className="partners-band">
        <div className="partners-band__inner">
          <h2>Unsere akademischen Partner</h2>
          <div className="partners-panel">
            {PARTNERS.map((partner) => (
              <PartnerLogo key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
