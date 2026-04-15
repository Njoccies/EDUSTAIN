function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function WorkflowHeader({
  tabs,
  activeTab,
  onTabChange,
  mobileMenuOpen,
  onToggleMobileMenu,
  scrolled,
  onHomeClick,
  onMembersClick,
  onRegistrationClick,
  showTabs = true,
}) {
  return (
    <header className={`workflow-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="workflow-header__inner">
        <button className="brand-mark" onClick={onHomeClick} type="button">
          <span className="brand-mark__ring" />
          <span className="brand-mark__text">
            <strong>Edustain</strong>
            <span>CONNECT</span>
          </span>
        </button>

        {showTabs && (
          <nav className="workflow-nav workflow-nav--desktop" aria-label="Hauptnavigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`workflow-nav__item ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon name={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        )}

        <div className="workflow-header__actions">
          <button className="workflow-login" onClick={onMembersClick} type="button">
            Mitgliederbereich
          </button>
          <button className="workflow-register-link" onClick={onRegistrationClick} type="button">
            Jetzt registrieren
          </button>
          <button
            type="button"
            className="workflow-menu-toggle"
            onClick={onToggleMobileMenu}
            aria-label="Navigation öffnen"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="workflow-nav workflow-nav--mobile" aria-label="Mobile Navigation">
          {showTabs &&
            tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`workflow-nav__item ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon name={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          <button className="workflow-nav__item" onClick={onRegistrationClick} type="button">
            <Icon name="how_to_reg" />
            <span>Jetzt registrieren</span>
          </button>
          <button className="workflow-nav__item" onClick={onMembersClick} type="button">
            <Icon name="lock_open" />
            <span>Mitgliederbereich</span>
          </button>
        </nav>
      )}
    </header>
  );
}
