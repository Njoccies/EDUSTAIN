import {
  BENEFITS,
  NAVIGATION_SYSTEM_ITEMS,
  PARTNERS,
  PARTNER_CATEGORIES,
  PARTNER_DIRECTORY,
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
  partnersRef,
  navigationRef,
  onOpenProjects,
  onOpenRegistration,
  onOpenQuickNavigator,
  onOpenPartners,
}) {
  const featuredPartners = PARTNER_DIRECTORY.slice(0, 3);
  const categoryById = PARTNER_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});
  const featuredCategories = PARTNER_CATEGORIES.slice(0, 6);
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

        <section className="content-section content-section--bordered partner-widget" ref={partnersRef} id="partners">
          <div className="partner-widget__intro">
            <p className="partner-widget__eyebrow">Partner für Schulen</p>
            <h2>Finde Partner für dein nächstes BNE-Vorhaben</h2>
            <p>
              Externe Expert*innen, Lernorte und Förderer aus unterschiedlichsten Branchen –
              gebündelt in einem Verzeichnis. Durchsuche die Partner nach Thema, Region und Format.
            </p>
          </div>

          <div className="partner-widget__search">
            <div className="partner-widget__search-field">
              <Icon name="search" />
              <input
                type="text"
                placeholder="Suche nach Name, Thema oder Region..."
                onFocus={onOpenPartners}
                readOnly
              />
            </div>
            <button className="button button--primary" onClick={onOpenPartners} type="button">
              <Icon name="travel_explore" />
              <span>Partner suchen</span>
            </button>
          </div>

          <div className="partner-widget__categories">
            {featuredCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`partner-chip partner-chip--${cat.accent}`}
                onClick={onOpenPartners}
              >
                <span className="material-icons">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
            <button type="button" className="partner-chip partner-chip--more" onClick={onOpenPartners}>
              <Icon name="more_horiz" />
              <span>Weitere Kategorien</span>
            </button>
          </div>

          <div className="partner-widget__featured">
            {featuredPartners.map((partner) => {
              const cat = categoryById[partner.category];
              return (
                <article key={partner.id} className={`partner-card partner-card--${cat?.accent ?? "default"}`}>
                  <div className="partner-card__head">
                    <span className={`partner-card__badge partner-card__badge--${cat?.accent ?? "default"}`}>
                      <span className="material-icons">{cat?.icon ?? "handshake"}</span>
                      <span>{cat?.label ?? "Partner"}</span>
                    </span>
                    <span className="partner-card__region">{partner.region}</span>
                  </div>
                  <h3>{partner.name}</h3>
                  <p className="partner-card__type">{partner.type}</p>
                  <p className="partner-card__desc">{partner.description}</p>
                  <div className="partner-card__tags">
                    {partner.offerings.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="partner-widget__footer">
            <button className="button button--ghost" onClick={onOpenPartners} type="button">
              <Icon name="arrow_forward" />
              <span>Zum vollständigen Partnerverzeichnis</span>
            </button>
            <span className="partner-widget__count">{PARTNER_DIRECTORY.length} Partner im Demo-Verzeichnis</span>
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
