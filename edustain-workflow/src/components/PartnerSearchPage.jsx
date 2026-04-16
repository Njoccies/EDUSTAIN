import { useMemo, useState } from "react";
import {
  PARTNER_CATEGORIES,
  PARTNER_DIRECTORY,
} from "../data/workflowSiteContent.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function PartnerSearchPage({ onNavigateHome }) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);

  const categoryById = useMemo(
    () =>
      PARTNER_CATEGORIES.reduce((acc, cat) => {
        acc[cat.id] = cat;
        return acc;
      }, {}),
    [],
  );

  const toggleCategory = (id) => {
    setActiveCategories((current) =>
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id],
    );
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategories([]);
  };

  const filteredPartners = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PARTNER_DIRECTORY.filter((partner) => {
      if (activeCategories.length > 0 && !activeCategories.includes(partner.category)) {
        return false;
      }
      if (!needle) {
        return true;
      }
      const haystack = [
        partner.name,
        partner.type,
        partner.region,
        partner.description,
        ...partner.offerings,
        ...partner.formats,
        categoryById[partner.category]?.label ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [activeCategories, categoryById, query]);

  return (
    <div className="page-shell page-shell--partners">
      <section className="partner-hero">
        <div className="partner-hero__copy">
          <p className="partner-hero__eyebrow">Partnerverzeichnis</p>
          <h1>Finde passende Partner für deine Schule</h1>
          <p>
            Lernorte, Vereine, Stiftungen und kommunale Akteure – gebündelt in einem Verzeichnis.
            Filtere nach Thema und Region und entdecke, wer euer BNE-Vorhaben konkret unterstützen
            kann.
          </p>
          <div className="partner-hero__meta">
            <span>
              <strong>{PARTNER_DIRECTORY.length}</strong> Partner
            </span>
            <span>
              <strong>{PARTNER_CATEGORIES.length}</strong> Branchen
            </span>
            <span>Demo-Datensatz</span>
          </div>
        </div>
        <div className="partner-hero__actions">
          <button className="button button--ghost" onClick={onNavigateHome} type="button">
            <Icon name="home" />
            <span>Zur Hauptseite</span>
          </button>
        </div>
      </section>

      <section className="partner-search">
        <div className="partner-search__field">
          <Icon name="search" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Suche nach Name, Thema, Region oder Format..."
            autoFocus
          />
          {query && (
            <button type="button" className="partner-search__clear" onClick={() => setQuery("")}>
              <Icon name="close" />
            </button>
          )}
        </div>

        <div className="partner-search__filters">
          <div className="partner-search__filters-head">
            <p>Branchen</p>
            {(activeCategories.length > 0 || query) && (
              <button type="button" className="partner-search__reset" onClick={resetFilters}>
                <Icon name="restart_alt" />
                <span>Filter zurücksetzen</span>
              </button>
            )}
          </div>
          <div className="partner-search__chips">
            {PARTNER_CATEGORIES.map((cat) => {
              const isActive = activeCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`partner-chip partner-chip--${cat.accent}${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <span className="material-icons">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="partner-results">
        <div className="partner-results__header">
          <h2>
            {filteredPartners.length}{" "}
            {filteredPartners.length === 1 ? "Partner" : "Partner"} gefunden
          </h2>
          {activeCategories.length > 0 && (
            <p>
              Aktive Filter:{" "}
              {activeCategories
                .map((id) => categoryById[id]?.label)
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </div>

        {filteredPartners.length === 0 ? (
          <div className="partner-empty">
            <Icon name="search_off" />
            <h3>Keine Partner gefunden</h3>
            <p>Passe deine Suche oder die Branchen-Filter an.</p>
            <button type="button" className="button button--ghost" onClick={resetFilters}>
              <Icon name="restart_alt" />
              <span>Filter zurücksetzen</span>
            </button>
          </div>
        ) : (
          <div className="partner-grid">
            {filteredPartners.map((partner) => {
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
                    {partner.offerings.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="partner-card__footer">
                    <div className="partner-card__formats">
                      {partner.formats.map((format) => (
                        <span key={format} className="partner-card__format">
                          {format}
                        </span>
                      ))}
                    </div>
                    <a
                      className="partner-card__contact"
                      href={`mailto:${partner.contact}`}
                    >
                      <Icon name="mail" />
                      <span>Kontakt</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="partner-cta">
        <div>
          <h2>Ihr wollt selbst als Partner gelistet werden?</h2>
          <p>
            Schickt uns eine kurze Nachricht mit eurem Angebot, wir nehmen euch in das Demo-Verzeichnis
            auf und melden uns, sobald die Aufnahme auf der Plattform regulär startet.
          </p>
        </div>
        <a className="button button--primary" href="mailto:support@edustainconnect.org">
          <Icon name="mail" />
          <span>Partner werden</span>
        </a>
      </section>
    </div>
  );
}
