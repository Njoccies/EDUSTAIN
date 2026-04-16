import { useEffect, useRef, useState } from "react";
import {
  MEMBER_HIGHLIGHTS,
  MEMBER_PEOPLE,
} from "../data/workflowSiteContent.js";
import { getQuickNavigatorRecommendations } from "../lib/quickNavigator.js";
import {
  consumeWelcomeBanner,
  getDemoMember,
  isDemoMemberAuthenticated,
  loginDemoMember,
  logoutDemoMember,
  shouldShowQuickNavigator,
} from "../lib/demoSession.js";

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function MemberAreaPage({
  onNavigateHome,
  onNavigateRegistration,
  onOpenQuickNavigator,
  onRestartQuickNavigator,
  quickNavAnswers,
}) {
  const [member] = useState(() => getDemoMember());
  const [isAuthenticated, setIsAuthenticated] = useState(() => isDemoMemberAuthenticated());
  const [loginForm, setLoginForm] = useState(() => ({
    email: getDemoMember()?.email ?? "",
    password: "",
  }));
  const [loginError, setLoginError] = useState("");
  const [showGuestLoginPanel, setShowGuestLoginPanel] = useState(false);
  const [guestLoginForm, setGuestLoginForm] = useState({
    email: "",
    password: "",
  });
  const [guestLoginError, setGuestLoginError] = useState("");
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(() => {
    const currentMember = getDemoMember();
    return currentMember && isDemoMemberAuthenticated() ? consumeWelcomeBanner() : false;
  });
  const hasAutoOpenedQuickNavigatorRef = useRef(false);
  const loginEmailInputRef = useRef(null);
  const guestLoginEmailInputRef = useRef(null);

  const quickNavRecommendations = getQuickNavigatorRecommendations(quickNavAnswers);

  useEffect(() => {
    if (!member || !isAuthenticated || hasAutoOpenedQuickNavigatorRef.current || !shouldShowQuickNavigator()) {
      return;
    }

    hasAutoOpenedQuickNavigatorRef.current = true;
    onOpenQuickNavigator();
  }, [isAuthenticated, member, onOpenQuickNavigator]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const result = loginDemoMember(loginForm);

    if (!result.ok) {
      setLoginError(result.error);
      return;
    }

    setLoginError("");
    hasAutoOpenedQuickNavigatorRef.current = false;
    setIsAuthenticated(true);
    setShowWelcomeBanner(consumeWelcomeBanner());
  };

  const handleLogout = () => {
    logoutDemoMember();
    hasAutoOpenedQuickNavigatorRef.current = false;
    setIsAuthenticated(false);
    setShowWelcomeBanner(false);
    setLoginForm((current) => ({
      ...current,
      password: "",
    }));
  };

  const focusLoginForm = () => {
    loginEmailInputRef.current?.focus();
  };

  const handleGuestLoginChange = (event) => {
    const { name, value } = event.target;

    setGuestLoginForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleGuestLoginOpen = () => {
    setShowGuestLoginPanel(true);
    window.requestAnimationFrame(() => {
      guestLoginEmailInputRef.current?.focus();
    });
  };

  const handleGuestLoginSubmit = (event) => {
    event.preventDefault();

    const result = loginDemoMember(guestLoginForm);

    if (!result.ok) {
      setGuestLoginError(result.error);
      return;
    }

    setGuestLoginError("");
  };

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
            <button className="button button--ghost" onClick={handleGuestLoginOpen} type="button">
              <Icon name="login" />
              <span>Login</span>
            </button>
            <button className="button button--primary" onClick={onNavigateRegistration} type="button">
              <Icon name="how_to_reg" />
              <span>Zur Registrierung</span>
            </button>
            <button className="button button--ghost" onClick={onNavigateHome} type="button">
              <Icon name="home" />
              <span>Zur Hauptseite</span>
            </button>
          </div>

          {showGuestLoginPanel && (
            <form className="member-login-panel member-login-panel--compact" onSubmit={handleGuestLoginSubmit}>
              <div className="member-login-panel__header">
                <p className="registration-form__step-label">Demo-Login</p>
                <h2>Login ausprobieren</h2>
                <p>
                  Lege zuerst über die Registrierung einen Demo-Zugang an. Danach kannst du dich
                  hier mit E-Mail und Passwort anmelden.
                </p>
              </div>

              <div className="field-row">
                <div className="field-block">
                  <label htmlFor="guest-member-login-email">E-Mail-Adresse</label>
                  <input
                    id="guest-member-login-email"
                    ref={guestLoginEmailInputRef}
                    name="email"
                    type="email"
                    value={guestLoginForm.email}
                    onChange={handleGuestLoginChange}
                    autoComplete="email"
                    placeholder="name@schule.de"
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-block">
                  <label htmlFor="guest-member-login-password">Passwort</label>
                  <input
                    id="guest-member-login-password"
                    name="password"
                    type="password"
                    value={guestLoginForm.password}
                    onChange={handleGuestLoginChange}
                    autoComplete="current-password"
                    placeholder="Passwort eingeben"
                  />
                </div>
              </div>

              {guestLoginError ? <p className="field-error">{guestLoginError}</p> : null}

              <div className="member-access-card__actions member-access-card__actions--login">
                <button className="button button--primary" type="submit">
                  <Icon name="login" />
                  <span>Anmelden</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="page-shell page-shell--members">
        <section className="member-access-card member-access-card--login">
          <div className="member-access-card__split">
            <div className="member-access-card__content">
              <div className="member-access-card__icon">
                <Icon name="lock" />
              </div>
              <p className="member-hero__eyebrow">Demo-Login</p>
              <h1>Mitgliederbereich anmelden</h1>
              <p>
                Melde dich mit der E-Mail-Adresse und dem Passwort aus der Registrierung an. Der
                Login ist vollständig simuliert und dient nur dem klickbaren Frontend-Prototypen.
              </p>
              <p>
                Hinterlegt fuer: <strong>{member.schoolName}</strong>
              </p>
              <div className="member-access-card__actions member-access-card__actions--login member-access-card__actions--login-hero">
                <button className="button button--primary" onClick={focusLoginForm} type="button">
                  <Icon name="login" />
                  <span>Login</span>
                </button>
                <button className="button button--ghost" onClick={onNavigateRegistration} type="button">
                  <Icon name="how_to_reg" />
                  <span>Zur Registrierung</span>
                </button>
                <button className="button button--ghost" onClick={onNavigateHome} type="button">
                  <Icon name="home" />
                  <span>Zur Hauptseite</span>
                </button>
              </div>
            </div>

            <form className="member-login-panel" onSubmit={handleLoginSubmit}>
              <div className="member-login-panel__header">
                <p className="registration-form__step-label">Zugang</p>
                <h2>Demo-Login</h2>
                <p>Nutze die Zugangsdaten aus deiner zuvor abgeschlossenen Registrierung.</p>
              </div>

              <div className="field-row">
                <div className="field-block">
                  <label htmlFor="member-login-email">E-Mail-Adresse</label>
                  <input
                    id="member-login-email"
                    ref={loginEmailInputRef}
                    name="email"
                    type="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    autoComplete="email"
                    placeholder="name@schule.de"
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-block">
                  <label htmlFor="member-login-password">Passwort</label>
                  <input
                    id="member-login-password"
                    name="password"
                    type="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                    placeholder="Passwort eingeben"
                  />
                </div>
              </div>

              {loginError ? <p className="field-error">{loginError}</p> : null}

              <div className="member-login-panel__hint">
                <strong>Demo-Hinweis</strong>
                <p>
                  Es findet keine echte Authentifizierung statt. Die Eingaben werden nur im
                  Frontend mit dem gespeicherten Demo-Zugang abgeglichen.
                </p>
              </div>

              <div className="member-access-card__actions member-access-card__actions--login">
                <button className="button button--primary" type="submit">
                  <Icon name="login" />
                  <span>Anmelden</span>
                </button>
              </div>
            </form>
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

        {quickNavRecommendations ? (
          <section className="personalized-start">
            <div className="personalized-start__top">
              <span className="personalized-start__badge">{quickNavRecommendations.badge}</span>
              <div className="personalized-start__actions">
                <button className="button button--ghost" onClick={onRestartQuickNavigator} type="button">
                  <Icon name="restart_alt" />
                  <span>Quick Navigator</span>
                </button>
                <button className="button button--ghost" onClick={handleLogout} type="button">
                  <Icon name="logout" />
                  <span>Abmelden</span>
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
                <button className="button button--ghost" onClick={handleLogout} type="button">
                  <Icon name="logout" />
                  <span>Abmelden</span>
                </button>
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
              <button className="button button--primary" onClick={onRestartQuickNavigator} type="button">
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
