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

        <section className="content-section content-section--bordered platform-pathways">
          <div className="platform-pathways__intro">
            <p className="platform-pathways__eyebrow">Zusammenarbeit mit EDUSTAIN</p>
            <h2>Für Anbieter, Programme und wirksame Schulentwicklung</h2>
            <p>
              EDUSTAIN Connect soll Schulen, BNE-Anbieter und Programme in einer gemeinsamen,
              praxisnahen Struktur zusammenbringen. So entstehen passende Kontakte, klare Einstiege
              und anschlussfähige Entwicklungspfade.
            </p>
          </div>

          <div className="platform-pathways__grid">
            <article className="pathway-card pathway-card--provider">
              <div className="pathway-card__icon">
                <Icon name="storefront" />
              </div>
              <p className="pathway-card__eyebrow">Für Anbieter</p>
              <h3>BNE-Angebote sichtbar machen</h3>
              <p>
                Ihr bietet Lernorte, Workshops oder Dienstleistungen für Schulen an? Dann merkt euch
                unverbindlich vor. Wir informieren euch, sobald die Aufnahme auf die Plattform
                startet.
              </p>
              <div className="pathway-card__chips">
                <span>Lernorte</span>
                <span>Workshops</span>
                <span>Dienstleistungen</span>
              </div>
              <button className="button button--ghost" type="button">
                <Icon name="edit" />
                <span>Unverbindlich vormerken</span>
              </button>
            </article>

            <article className="pathway-card pathway-card--program">
              <div className="pathway-card__icon">
                <Icon name="hub" />
              </div>
              <p className="pathway-card__eyebrow">Für Programme & Träger</p>
              <h3>EDUSTAIN Connect im Bildungsprogramm nutzen</h3>
              <p>
                Ihr möchtet die Plattform für ein WSA-Bildungsprogramm einsetzen oder ihre
                Weiterentwicklung unterstützen? Dann lasst uns ins Gespräch kommen.
              </p>
              <div className="pathway-card__contact">
                <strong>EDUSTAIN</strong>
                <a href="mailto:support@edustainconnect.org">support@edustainconnect.org</a>
                <a href="https://www.edustain.org" target="_blank" rel="noreferrer">
                  www.edustain.org
                </a>
                <span>Fortbildungen | Workshops | Vorträge | Coaching</span>
              </div>
              <a className="button button--primary pathway-card__cta" href="mailto:support@edustainconnect.org">
                <Icon name="mail" />
                <span>Kontakt aufnehmen</span>
              </a>
            </article>
          </div>
        </section>

        <section className="content-section navigator-showcase" ref={navigationRef} id="navigation">
          <div className="navigator-showcase__header">
            <p className="navigator-showcase__eyebrow">#EDUSTAIN Navigationssystem</p>
            <h2>Schulentwicklung in klaren, machbaren Etappen</h2>
            <p>
              Whole School Approach entsteht nicht in einem großen Sprung, sondern in kleinen,
              kontinuierlichen Schritten. EDUSTAIN verbindet dafür Orientierung, Analyse,
              Vernetzung und Begleitung zu einem praxistauglichen Entwicklungszyklus.
            </p>
          </div>

          <div className="navigator-showcase__layout">
            <div className="navigator-showcase__steps">
              {NAVIGATION_SYSTEM_ITEMS.map((item) => (
                <article key={item.title} className="navigator-step-card">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            <aside className="navigator-showcase__aside">
              <div className="navigator-showcase__aside-card">
                <p className="navigator-showcase__aside-label">Begleitung durch EDUSTAIN</p>
                <h3>Von der Standortbestimmung bis zur Reflexion</h3>
                <p>
                  Unsere Bausteine basieren auf bewährten Methoden aus Pädagogik, Wirtschaft und
                  Nachhaltigkeitswissenschaft und sind gezielt auf die Praxis von Schulen
                  zugeschnitten.
                </p>
                <div className="navigator-showcase__highlights">
                  <span>Orientierung</span>
                  <span>Roadmaps</span>
                  <span>Coaching</span>
                  <span>Kollegiale Beratung</span>
                </div>
                <a className="button button--ghost" href="mailto:info@edustain.org">
                  <Icon name="north_east" />
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </aside>
          </div>
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
