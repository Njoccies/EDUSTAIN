const PROJECT_VIEWS = [
  {
    value: "catalog",
    label: "Projektkatalog",
    description: "Beispielprojekte entdecken",
  },
  {
    value: "create",
    label: "Neues Projekt anlegen",
    description: "Eigenes Projekt dokumentieren",
  },
];

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function ProjectsViewSwitcher({ currentView, onChangeView }) {
  const activeView =
    PROJECT_VIEWS.find((view) => view.value === currentView) ?? PROJECT_VIEWS[0];

  return (
    <section className="projects-switcher" aria-label="Projektbereich umschalten">
      <div className="projects-switcher__copy">
        <p className="projects-switcher__eyebrow">Projekte</p>
        <strong>{activeView.label}</strong>
        <span>{activeView.description}</span>
      </div>

      <label className="projects-switcher__control">
        <span>Ansicht</span>
        <div className="projects-switcher__select-wrap">
          <Icon name="expand_more" />
          <select
            value={currentView}
            onChange={(event) => onChangeView(event.target.value)}
          >
            {PROJECT_VIEWS.map((view) => (
              <option key={view.value} value={view.value}>
                {view.label}
              </option>
            ))}
          </select>
        </div>
      </label>
    </section>
  );
}
