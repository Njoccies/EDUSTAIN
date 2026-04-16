import { useMemo, useState } from "react";
import ProjectsViewSwitcher from "./ProjectsViewSwitcher.jsx";
import {
  PROJECT_CATALOG_CATEGORIES,
  PROJECT_CATALOG_ITEMS,
} from "../data/workflowSiteContent.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function ProjectCatalogPage({
  currentView,
  onChangeView,
  onNavigateHome,
}) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);

  const categoryById = useMemo(
    () =>
      PROJECT_CATALOG_CATEGORIES.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
      }, {}),
    [],
  );

  const toggleCategory = (id) => {
    setActiveCategories((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategories([]);
  };

  const filteredProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return PROJECT_CATALOG_ITEMS.filter((project) => {
      if (activeCategories.length > 0 && !activeCategories.includes(project.category)) {
        return false;
      }

      if (!needle) {
        return true;
      }

      const haystack = [
        project.title,
        project.school,
        project.state,
        project.phase,
        project.timeframe,
        project.description,
        project.impact,
        ...(project.tags ?? []),
        categoryById[project.category]?.label ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [activeCategories, categoryById, query]);

  return (
    <div className="page-shell page-shell--projects">
      <ProjectsViewSwitcher currentView={currentView} onChangeView={onChangeView} />

      <section className="project-catalog-hero">
        <div className="project-catalog-hero__copy">
          <p className="project-catalog-hero__eyebrow">Projektkatalog</p>
          <h1>Schulprojekte entdecken und Inspiration sammeln</h1>
          <p>
            Durchsuche Beispielprojekte aus Schulen, filtere nach Themenfeldern und finde
            Formate, die als Vorlage fuer eure eigene Umsetzung dienen koennen.
          </p>
          <div className="project-catalog-hero__meta">
            <span>
              <strong>{PROJECT_CATALOG_ITEMS.length}</strong> Beispielprojekte
            </span>
            <span>
              <strong>{PROJECT_CATALOG_CATEGORIES.length}</strong> Themenfelder
            </span>
            <span>Demo-Inhalte</span>
          </div>
        </div>

        <div className="project-catalog-hero__actions">
          <button className="button button--ghost" onClick={onNavigateHome} type="button">
            <Icon name="home" />
            <span>Zur Hauptseite</span>
          </button>
          <button
            className="button button--primary"
            onClick={() => onChangeView("create")}
            type="button"
          >
            <Icon name="add_circle" />
            <span>Neues Projekt anlegen</span>
          </button>
        </div>
      </section>

      <section className="project-catalog-search">
        <div className="project-catalog-search__field">
          <Icon name="search" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Suche nach Projekttitel, Schule, Thema oder Bundesland..."
            autoFocus
          />
          {query && (
            <button
              type="button"
              className="project-catalog-search__clear"
              onClick={() => setQuery("")}
            >
              <Icon name="close" />
            </button>
          )}
        </div>

        <div className="project-catalog-search__filters">
          <div className="project-catalog-search__filters-head">
            <p>Themenfelder</p>
            {(activeCategories.length > 0 || query) && (
              <button
                type="button"
                className="project-catalog-search__reset"
                onClick={resetFilters}
              >
                <Icon name="restart_alt" />
                <span>Filter zuruecksetzen</span>
              </button>
            )}
          </div>

          <div className="project-catalog-search__chips">
            {PROJECT_CATALOG_CATEGORIES.map((category) => {
              const isActive = activeCategories.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`partner-chip partner-chip--${category.accent}${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="material-icons">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="project-catalog-results">
        <div className="project-catalog-results__header">
          <h2>{filteredProjects.length} Schulprojekte gefunden</h2>
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

        {filteredProjects.length === 0 ? (
          <div className="project-catalog-empty">
            <Icon name="search_off" />
            <h3>Keine passenden Projekte gefunden</h3>
            <p>Probiere andere Suchbegriffe oder waehle andere Themenfelder.</p>
            <button
              type="button"
              className="button button--ghost"
              onClick={resetFilters}
            >
              <Icon name="restart_alt" />
              <span>Filter zuruecksetzen</span>
            </button>
          </div>
        ) : (
          <div className="project-catalog-grid">
            {filteredProjects.map((project) => {
              const category = categoryById[project.category];

              return (
                <article
                  key={project.id}
                  className={`project-card project-card--${category?.accent ?? "education"}`}
                >
                  <div className="project-card__head">
                    <span
                      className={`project-card__badge project-card__badge--${
                        category?.accent ?? "education"
                      }`}
                    >
                      <span className="material-icons">{category?.icon ?? "assignment"}</span>
                      <span>{category?.label ?? "Projekt"}</span>
                    </span>
                    <span className="project-card__phase">{project.phase}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-card__school">
                    {project.school} · {project.state}
                  </p>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__insight">
                    <span className="material-icons">tips_and_updates</span>
                    <p>{project.impact}</p>
                  </div>

                  <div className="project-card__footer">
                    <div className="project-card__tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="project-card__timeframe">
                      <Icon name="schedule" />
                      <span>{project.timeframe}</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="project-catalog-cta">
        <div>
          <h2>Fehlt euer Projekt noch im Katalog?</h2>
          <p>
            Dokumentiert euer Vorhaben direkt im Projektersteller und macht daraus einen
            strukturierten Eintrag fuer die EDUSTAIN-Community.
          </p>
        </div>
        <button
          className="button button--primary"
          onClick={() => onChangeView("create")}
          type="button"
        >
          <Icon name="edit_note" />
          <span>Projekt jetzt anlegen</span>
        </button>
      </section>
    </div>
  );
}
