import { useMemo, useState } from "react";
import { STATES } from "./data/workflowSiteContent.js";

const STEPS = [
  { id: "basis", label: "Basisangaben" },
  { id: "intro", label: "Vorstellung" },
  { id: "context", label: "Verortung" },
  { id: "content", label: "Projektinhalt" },
  { id: "organisation", label: "Organisation & Abschluss" },
];

const STEP_FIELDS = [
  ["projectStatus", "visibility", "projectName", "state"],
  ["teaser", "contactName"],
  ["navigatorCards"],
  ["description"],
  ["participants", "execution", "funding"],
];

const PROJECT_STATUS_OPTIONS = [
  {
    value: "kickoff",
    icon: "rocket_launch",
    title: "Beginn / In Planung",
    description: "Das Projekt startet gerade / in Vorbereitung.",
  },
  {
    value: "active",
    icon: "play_circle",
    title: "Aktiv",
    description: "Das Projekt läuft aktuell an der Schule.",
  },
  {
    value: "completed",
    icon: "check_circle",
    title: "Abgeschlossen",
    description: "Das Projekt oder Konzept ist bereits durchgeführt.",
  },
];

const VISIBILITY_OPTIONS = [
  {
    value: "public",
    icon: "public",
    title: "Öffentlich",
    description:
      "Für alle EDUSTAIN-Connect Besucher*innen sichtbar.",
  },
  {
    value: "private",
    icon: "lock",
    title: "Privat",
    description:
      "Für alle EDUSTAIN-Connect Nutzer*innen sichtbar.",
  },
  {
    value: "internal",
    icon: "groups",
    title: "Intern",
    description:
      "Nur für die eigene Schule und zugeordnete Projektgruppen sichtbar.",
  },
];

const FUNDING_OPTIONS = [
  {
    value: "self",
    icon: "savings",
    title: "Selbst finanziert",
    description: "Eigenmittel der Schule oder Schulgemeinschaft.",
  },
  {
    value: "subsidized",
    icon: "volunteer_activism",
    title: "Über Fördermittel finanziert",
    description: "Stiftungen, Programme oder öffentliche Mittel.",
  },
];

const EXECUTION_OPTIONS = [
  {
    value: "internal",
    icon: "school",
    title: "Intern durchgeführt",
    description: "Die Schule setzt das Projekt eigenständig um.",
  },
  {
    value: "external",
    icon: "handshake",
    title: "Mit externem Partner",
    description:
      "NGO, Verein, Bildungsträger oder Unternehmen führen gemeinsam durch.",
  },
  {
    value: "cooperation",
    icon: "diversity_3",
    title: "Kooperation mit anderer Schule",
    description: "Zwei oder mehr Schulen setzen gemeinsam um.",
  },
];

const NAVIGATOR_CARDS = [
  {
    title: "Unterricht & Lernangebote",
    description:
      "BNE-Inhalte, Projektunterricht und fächerübergreifende Lernangebote.",
  },
  {
    title: "Nachhaltiges Schulmanagement",
    description: "Strategie, Leitbild und Steuerung auf Schulebene.",
  },
  {
    title: "Schulische Sozialarbeit",
    description: "Begleitung, Beratung und soziale Teilhabe im Schulalltag.",
  },
  {
    title: "Nachhaltige bauliche Gestaltung",
    description: "Gebäude, Außenflächen und Energieeffizienz der Schule.",
  },
  {
    title: "Nachhaltiges Schulleben",
    description: "Veranstaltungen, Rituale und Schulkultur mit BNE-Fokus.",
  },
  {
    title: "Nachhaltige Ausstattung & Bewirtschaftung",
    description: "Beschaffung, Materialien, Mensa und Ressourcennutzung.",
  },
  {
    title: "Netzwerke & Kooperationen",
    description: "Austausch mit Partnern, Kommunen und anderen Schulen.",
  },
];

const PARTICIPANTS = [
  "Lehrkräfte",
  "Schulleitung",
  "Schüler*innen",
  "Eltern",
  "Schulsozialarbeit",
  "Schulverwaltungspersonal",
  "Schulträger",
  "Außerschulische Bildungspartner",
  "Nachmittagsbetreuung",
  "Kommune",
  "Vereine / NGOs",
  "Caterer",
  "Sonstiges",
];

const INITIAL_FORM = {
  projectStatus: "",
  visibility: "",
  projectName: "",
  titleImage: "",
  state: "",
  teaser: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  navigatorCards: [],
  okrSet: "",
  timeline: "",
  description: "",
  learnings: "",
  participants: [],
  execution: "",
  executionPartners: "",
  funding: "",
  gallery: "",
};

const MAX_NAME = 50;
const MAX_TEASER = 200;

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateField(name, formData) {
  const value = formData[name];

  if (name === "projectStatus" && !value) {
    return "Bitte wähle den Projekt-Status.";
  }
  if (name === "visibility" && !value) {
    return "Bitte wähle, ob euer Projekt öffentlich oder privat ist.";
  }
  if (name === "projectName") {
    if (value.trim().length === 0) {
      return "Bitte gib dem Projekt einen Titel.";
    }
    if (value.length > MAX_NAME) {
      return `Der Titel darf maximal ${MAX_NAME} Zeichen lang sein.`;
    }
  }
  if (name === "state" && value.trim().length === 0) {
    return "Bitte wähle das Bundesland, in dem das Projekt stattfindet.";
  }
  if (name === "teaser") {
    if (value.trim().length === 0) {
      return "Bitte formuliere eine kurze Teaser-Beschreibung.";
    }
    if (value.length > MAX_TEASER) {
      return `Der Teaser darf maximal ${MAX_TEASER} Zeichen lang sein.`;
    }
  }
  if (name === "contactName" && value.trim().length === 0) {
    return "Bitte gib den Namen der Ansprechpartner*in an.";
  }
  if (name === "contactEmail" && value.trim().length > 0 && !isValidEmail(value)) {
    return "Bitte gib eine gültige E-Mail-Adresse ein.";
  }
  if (name === "navigatorCards" && value.length === 0) {
    return "Bitte wähle mindestens eine passende Navigator-Karte.";
  }
  if (name === "description" && value.trim().length === 0) {
    return "Bitte beschreibe euer Projekt oder Konzept im Detail.";
  }
  if (name === "participants" && value.length === 0) {
    return "Bitte gib an, wer am Projekt beteiligt ist.";
  }
  if (name === "execution" && !value) {
    return "Bitte wähle, wie das Projekt durchgeführt wird.";
  }
  if (name === "funding" && !value) {
    return "Bitte wähle eine Finanzierungsform.";
  }

  return "";
}

function collectErrors(formData) {
  return Object.keys(formData).reduce((accumulator, fieldName) => {
    const error = validateField(fieldName, formData);
    if (error) {
      accumulator[fieldName] = error;
    }
    return accumulator;
  }, {});
}

function charCountClass(length, max) {
  if (length >= max) return "char-count is-max";
  if (length >= max * 0.85) return "char-count is-warn";
  return "char-count";
}

function Stepper({ currentStep }) {
  return (
    <ol className="registration-stepper" aria-label="Leitfaden-Schritte">
      {STEPS.map((step, index) => {
        const state =
          index < currentStep
            ? "done"
            : index === currentStep
              ? "active"
              : "upcoming";
        return (
          <li
            key={step.id}
            className={`registration-stepper__item is-${state}`}
          >
            <div className="registration-stepper__marker">
              {state === "done" ? <Icon name="check" /> : <span>{index + 1}</span>}
            </div>
            <div className="registration-stepper__copy">
              <p>Schritt {index + 1}</p>
              <strong>{step.label}</strong>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ProjectsPlannerTab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState("idle");

  const errors = useMemo(() => collectErrors(formData), [formData]);
  const currentFields = STEP_FIELDS[currentStep];
  const isCurrentStepValid = currentFields.every((field) => !errors[field]);

  const markStepAsTouched = () => {
    setTouched((current) => {
      const next = { ...current };
      currentFields.forEach((field) => {
        next[field] = true;
      });
      return next;
    });
  };

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const setFieldValue = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const toggleArrayValue = (name, value) => {
    setFormData((current) => {
      const existing = current[name];
      const next = existing.includes(value)
        ? existing.filter((entry) => entry !== value)
        : [...existing, value];
      return { ...current, [name]: next };
    });
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleNext = () => {
    markStepAsTouched();
    if (!isCurrentStepValid) {
      return;
    }
    setCurrentStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((current) => Math.max(current - 1, 0));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setTouched({});
    setCurrentStep(0);
    setSubmitState("idle");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
    });
    setTouched(allTouched);

    const allErrors = collectErrors(formData);
    if (Object.keys(allErrors).length > 0) {
      const firstBrokenStep = STEP_FIELDS.findIndex((fields) =>
        fields.some((field) => allErrors[field]),
      );
      if (firstBrokenStep !== -1) {
        setCurrentStep(firstBrokenStep);
      }
      return;
    }

    setSubmitState("success");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderError = (field) => {
    if (!touched[field] || !errors[field]) {
      return null;
    }
    return <p className="field-error">{errors[field]}</p>;
  };

  return (
    <div className="page-shell page-shell--registration">
      <section className="registration-hero">
        <div className="registration-hero__copy">
          <p className="registration-hero__eyebrow">
            EDUSTAIN-Connect Projekt-Leitfaden
          </p>
          <h1>Projekt oder Konzept strukturiert dokumentieren</h1>
          <p>
            Dieser Leitfaden begleitet eure Schule Frage für Frage durch den
            Aufbau der Projektbeschreibung — von der Basisinformation bis zur
            Veröffentlichung in der EDUSTAIN-Community. Alle Angaben bleiben im
            Prototyp lokal.
          </p>
        </div>
      </section>

      <div className="registration-layout">
        <aside className="registration-sidebar">
          <Stepper currentStep={currentStep} />
          <div className="registration-sidebar__hint">
            <strong>Hinweis</strong>
            <p>
              Euer Projekt wird nach Abschluss in der Community sichtbar.
              Dokumentiert so viel wie möglich — Learnings und Fuck-Up-Stories
              helfen anderen Schulen genauso wie eure Erfolgsgeschichten.
            </p>
          </div>
        </aside>

        <section className="registration-panel">
          {submitState === "success" ? (
            <div className="success-state">
              <div className="success-state__icon">
                <Icon name="check_circle" />
              </div>
              <h2>Projekt-Leitfaden abgeschlossen.</h2>
              <p>
                Eure Eingaben wurden für diesen Prototyp strukturiert
                zusammengefasst. In der vollständigen Plattform würde euer
                Projekt jetzt in der EDUSTAIN-Community sichtbar werden.
              </p>

              <div
                className="guideline-summary-card"
                style={{ textAlign: "left" }}
              >
                <h3>Zusammenfassung</h3>
                <div className="guideline-summary-grid">
                  <span>Status</span>
                  <strong>
                    {
                      PROJECT_STATUS_OPTIONS.find(
                        (entry) => entry.value === formData.projectStatus,
                      )?.title
                    }
                  </strong>

                  <span>Sichtbarkeit</span>
                  <strong>
                    {
                      VISIBILITY_OPTIONS.find(
                        (entry) => entry.value === formData.visibility,
                      )?.title
                    }
                  </strong>

                  <span>Projektname</span>
                  <strong>{formData.projectName}</strong>

                  <span>Bundesland</span>
                  <strong>{formData.state}</strong>

                  <span>Teaser</span>
                  <strong>{formData.teaser}</strong>

                  <span>Ansprechpartner*in</span>
                  <strong>
                    {formData.contactName}
                    {formData.contactEmail
                      ? ` · ${formData.contactEmail}`
                      : ""}
                    {formData.contactPhone
                      ? ` · ${formData.contactPhone}`
                      : ""}
                  </strong>

                  <span>Navigator-Karten</span>
                  <strong>
                    {formData.navigatorCards.length > 0
                      ? formData.navigatorCards.join(", ")
                      : "—"}
                  </strong>

                  <span>Laufzeit</span>
                  <strong>
                    {formData.timeline ? (
                      formData.timeline
                    ) : (
                      <em>Keine Angabe</em>
                    )}
                  </strong>

                  <span>OKR Set</span>
                  <strong>
                    {formData.okrSet ? (
                      formData.okrSet
                    ) : (
                      <em>Keine Angabe</em>
                    )}
                  </strong>

                  <span>Beteiligte</span>
                  <strong>{formData.participants.join(", ")}</strong>

                  <span>Durchführung</span>
                  <strong>
                    {
                      EXECUTION_OPTIONS.find(
                        (entry) => entry.value === formData.execution,
                      )?.title
                    }
                    {formData.executionPartners
                      ? ` · ${formData.executionPartners}`
                      : ""}
                  </strong>

                  <span>Finanzierung</span>
                  <strong>
                    {
                      FUNDING_OPTIONS.find(
                        (entry) => entry.value === formData.funding,
                      )?.title
                    }
                  </strong>

                  <span>Learnings</span>
                  <strong>
                    {formData.learnings ? (
                      formData.learnings
                    ) : (
                      <em>Keine Angabe</em>
                    )}
                  </strong>
                </div>
              </div>

              <div className="registration-actions__cluster">
                <button
                  className="button button--ghost"
                  onClick={handleReset}
                  type="button"
                >
                  <Icon name="refresh" />
                  <span>Neuen Leitfaden starten</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="registration-form__header">
                <div>
                  <p className="registration-form__step-label">
                    Schritt {currentStep + 1} von {STEPS.length}
                  </p>
                  <h2>{STEPS[currentStep].label}</h2>
                </div>
                <div className="registration-progress">
                  <div
                    className="registration-progress__bar"
                    style={{
                      width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* ======================== SCHRITT 1: BASIS ======================== */}
              {currentStep === 0 && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label>Projekt-Status</label>
                    <p className="field-help">
                      Wählt aus, ob euer Projekt oder Konzept gerade läuft oder
                      bereits abgeschlossen ist.
                    </p>
                    <div className="option-cards">
                      {PROJECT_STATUS_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`option-card${
                            formData.projectStatus === option.value
                              ? " is-active"
                              : ""
                          }`}
                          onClick={() =>
                            setFieldValue("projectStatus", option.value)
                          }
                        >
                          <span className="option-card__head">
                            <Icon name={option.icon} />
                            {option.title}
                          </span>
                          <span>{option.description}</span>
                        </button>
                      ))}
                    </div>
                    {renderError("projectStatus")}
                  </div>

                  <div className="field-block">
                    <label>Sichtbarkeit</label>
                    <p className="field-help">
                      Bestimmt, ob euer Projekt für die gesamte
                      EDUSTAIN-Community sichtbar ist oder vorerst nur intern.
                    </p>
                    <div className="option-cards">
                      {VISIBILITY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`option-card${
                            formData.visibility === option.value
                              ? " is-active"
                              : ""
                          }`}
                          onClick={() =>
                            setFieldValue("visibility", option.value)
                          }
                        >
                          <span className="option-card__head">
                            <Icon name={option.icon} />
                            {option.title}
                          </span>
                          <span>{option.description}</span>
                        </button>
                      ))}
                    </div>
                    {renderError("visibility")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="projectName">Projektname</label>
                    <p className="field-help">
                      Gebt eurem Projekt oder Konzept einen Titel mit maximal{" "}
                      {MAX_NAME} Zeichen.
                    </p>
                    <input
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      maxLength={MAX_NAME}
                      placeholder="Wie heißt euer Projekt/Konzept?"
                    />
                    <div className="field-meta">
                      <span />
                      <span
                        className={charCountClass(
                          formData.projectName.length,
                          MAX_NAME,
                        )}
                      >
                        {formData.projectName.length}/{MAX_NAME} Zeichen
                      </span>
                    </div>
                    {renderError("projectName")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="state">Bundesland</label>
                    <div className="select-wrap">
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                      >
                        <option value="">Bitte wählen …</option>
                        {STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron_right" />
                    </div>
                    {renderError("state")}
                  </div>
                </div>
              )}

              {/* ======================== SCHRITT 2: VORSTELLUNG ======================== */}
              {currentStep === 1 && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label>Titelbild</label>
                    <p className="field-help">
                      Ladet hier ein aussagekräftiges Titelbild für euer
                      Projekt oder Konzept hoch. Achtet dabei unbedingt darauf,
                      dass alle abgebildeten Personen ihr Einverständnis gegeben
                      haben (Datenschutz).
                    </p>
                    <div className="upload-box" aria-hidden>
                      <Icon name="cloud_upload" />
                      <strong>Titelbild ablegen oder auswählen</strong>
                      <small>
                        JPG oder PNG, empfohlen 1600 × 900 px. Im Prototyp wird
                        kein Bild tatsächlich hochgeladen.
                      </small>
                    </div>
                  </div>

                  <div className="field-block">
                    <label htmlFor="teaser">Kurzbeschreibung (Teaser)</label>
                    <p className="field-help">
                      Beschreibt den Kerninhalt eures Projekts in maximal{" "}
                      {MAX_TEASER} Zeichen. Der Teaser wird in der Vorschau
                      zusammen mit dem Projekttitel angezeigt.
                    </p>
                    <textarea
                      id="teaser"
                      name="teaser"
                      value={formData.teaser}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      maxLength={MAX_TEASER}
                      rows={3}
                      placeholder="Kerninhalt eures Projekts/Konzepts in max 200 Zeichen"
                    />
                    <div className="field-meta">
                      <span />
                      <span
                        className={charCountClass(
                          formData.teaser.length,
                          MAX_TEASER,
                        )}
                      >
                        {formData.teaser.length}/{MAX_TEASER} Zeichen
                      </span>
                    </div>
                    {renderError("teaser")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="contactName">
                      Ansprechpartner*in (Vor- und Nachname)
                    </label>
                    <p className="field-help">
                      Wer ist die Hauptansprechpartner*in für das Projekt oder
                      Konzept?
                    </p>
                    <input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      placeholder="Vor- und Nachname"
                    />
                    {renderError("contactName")}
                  </div>

                  <div className="field-row field-row--double">
                    <div className="field-block">
                      <label htmlFor="contactEmail">
                        E-Mail-Adresse (optional)
                      </label>
                      <p className="field-help">
                        Damit andere Schulen euch direkt kontaktieren können.
                      </p>
                      <input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        placeholder="kontakt@schule.de"
                      />
                      {renderError("contactEmail")}
                    </div>

                    <div className="field-block">
                      <label htmlFor="contactPhone">
                        Telefonnummer (optional)
                      </label>
                      <p className="field-help">
                        Die Telefonnummer ist für alle Nutzer*innen der
                        Community sichtbar.
                      </p>
                      <input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        placeholder="+49 …"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ======================== SCHRITT 3: VERORTUNG ======================== */}
              {currentStep === 2 && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label>Zugehörige Navigator-Karte(n)</label>
                    <p className="field-help">
                      Wählt passende Handlungsfelder aus dem Whole School
                      Approach, die euer Projekt inhaltlich verankern.
                      Mehrfachauswahl möglich.
                    </p>
                    <div className="navigator-card-list">
                      {NAVIGATOR_CARDS.map((item, index) => {
                        const isActive = formData.navigatorCards.includes(
                          item.title,
                        );
                        return (
                          <button
                            type="button"
                            key={item.title}
                            className={`navigator-card-toggle${
                              isActive ? " is-active" : ""
                            }`}
                            onClick={() =>
                              toggleArrayValue("navigatorCards", item.title)
                            }
                          >
                            <span className="navigator-card-toggle__index">
                              {index + 1}
                            </span>
                            <span className="navigator-card-toggle__text">
                              <strong>{item.title}</strong>
                              <span>{item.description}</span>
                            </span>
                            <Icon name="check_circle" />
                          </button>
                        );
                      })}
                    </div>
                    {renderError("navigatorCards")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="okrSet">
                      Zugehöriges OKR Set (optional)
                    </label>
                    <p className="field-help">
                      Tragt hier — wenn vorhanden — euer zugehöriges OKR Set
                      ein (1 Objective + 3–5 Key Results).
                    </p>
                    <textarea
                      id="okrSet"
                      name="okrSet"
                      value={formData.okrSet}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      rows={4}
                      placeholder="Objective: …&#10;Key Result 1: …&#10;Key Result 2: …"
                    />
                  </div>

                  <div className="field-block">
                    <label htmlFor="timeline">
                      Projektlaufzeit und Meilensteine (optional)
                    </label>
                    <p className="field-help">
                      In welchem Zeitraum wird / wurde das Projekt umgesetzt?
                      Bei einem etablierten Konzept: Seit wann arbeitet ihr
                      damit? Welche Meilensteine gibt es?
                    </p>
                    <textarea
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      rows={3}
                      placeholder="z. B. Seit Schuljahr 2023/24 · Kickoff · Pilotphase · Evaluation …"
                    />
                  </div>
                </div>
              )}

              {/* ======================== SCHRITT 4: INHALT ======================== */}
              {currentStep === 3 && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label htmlFor="description">Projektbeschreibung</label>
                    <p className="field-help">
                      Beschreibt hier euer Projekt oder Konzept im Detail: Was
                      wird/wurde gemacht? Wie sieht das Konzept aus? Wie seid
                      ihr vorgegangen? Was soll erreicht werden / wurde
                      erreicht?
                    </p>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      rows={8}
                      placeholder="Beschreibt Ziel, Vorgehen und Wirkung eures Projekts oder Konzepts."
                    />
                    {renderError("description")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="learnings">Learnings (optional)</label>
                    <p className="field-help">
                      Was waren besondere Herausforderungen? Eher Best Practice
                      oder Fuck-Up-Story? Was hat besonders zum Erfolg
                      beigetragen? Eure Erfahrungen helfen anderen Schulen.
                    </p>
                    <textarea
                      id="learnings"
                      name="learnings"
                      value={formData.learnings}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      rows={6}
                      placeholder="Stolpersteine, Aha-Momente, Erfolgsfaktoren …"
                    />
                  </div>
                </div>
              )}

              {/* ======================== SCHRITT 5: ORGANISATION ======================== */}
              {currentStep === 4 && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label>Beteiligte</label>
                    <p className="field-help">
                      Wer ist/war alles am Projekt oder Konzept beteiligt?
                      Mehrfachauswahl möglich.
                    </p>
                    <div className="chip-group">
                      {PARTICIPANTS.map((entry) => {
                        const isActive =
                          formData.participants.includes(entry);
                        return (
                          <button
                            type="button"
                            key={entry}
                            className={`chip-toggle${
                              isActive ? " is-active" : ""
                            }`}
                            onClick={() =>
                              toggleArrayValue("participants", entry)
                            }
                          >
                            {isActive && <Icon name="check" />}
                            {entry}
                          </button>
                        );
                      })}
                    </div>
                    {renderError("participants")}
                  </div>

                  <div className="field-block">
                    <label>Projekt-Durchführung</label>
                    <p className="field-help">
                      Wer führt das Projekt konkret durch? Damit andere Schulen
                      einschätzen können, ob sie Vergleichbares intern oder mit
                      Partnern aufsetzen können.
                    </p>
                    <div className="option-cards">
                      {EXECUTION_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`option-card${
                            formData.execution === option.value
                              ? " is-active"
                              : ""
                          }`}
                          onClick={() =>
                            setFieldValue("execution", option.value)
                          }
                        >
                          <span className="option-card__head">
                            <Icon name={option.icon} />
                            {option.title}
                          </span>
                          <span>{option.description}</span>
                        </button>
                      ))}
                    </div>
                    {renderError("execution")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="executionPartners">
                      Externe Partner benennen (optional)
                    </label>
                    <p className="field-help">
                      Falls externe Partner beteiligt sind: Wer führt konkret
                      mit durch? Nennt NGOs, Vereine, Bildungsträger oder
                      kooperierende Schulen.
                    </p>
                    <input
                      id="executionPartners"
                      name="executionPartners"
                      value={formData.executionPartners}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      placeholder="z. B. NABU Ortsgruppe, GartenWerkStadt e.V., Grundschule Süd"
                    />
                  </div>

                  <div className="field-block">
                    <label>Finanzierung</label>
                    <p className="field-help">
                      Wie ist das Projekt finanziert?
                    </p>
                    <div className="option-cards">
                      {FUNDING_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={`option-card${
                            formData.funding === option.value
                              ? " is-active"
                              : ""
                          }`}
                          onClick={() => setFieldValue("funding", option.value)}
                        >
                          <span className="option-card__head">
                            <Icon name={option.icon} />
                            {option.title}
                          </span>
                          <span>{option.description}</span>
                        </button>
                      ))}
                    </div>
                    {renderError("funding")}
                  </div>

                  <div className="field-block">
                    <label>Bildergalerie (optional)</label>
                    <p className="field-help">
                      Ladet hier aussagekräftige Bilder über euer Projekt hoch.
                      Achtet bitte unbedingt auf den Datenschutz aller
                      abgebildeten Personen.
                    </p>
                    <div className="upload-box" aria-hidden>
                      <Icon name="photo_library" />
                      <strong>Mehrere Bilder ablegen oder auswählen</strong>
                      <small>
                        JPG oder PNG. Im Prototyp wird kein Bild tatsächlich
                        hochgeladen.
                      </small>
                    </div>
                  </div>

                  <div className="legal-card">
                    <h3>Bereit zur Veröffentlichung</h3>
                    <p>
                      Mit dem Abschluss des Leitfadens wird euer Projekt im
                      Prototyp zusammengefasst. Auf der vollständigen
                      EDUSTAIN-Plattform würde es damit in der Community
                      sichtbar werden — sichtbar für andere Schulen, die von
                      euch lernen möchten.
                    </p>
                  </div>
                </div>
              )}

              <div className="registration-actions">
                <button
                  className="button button--ghost"
                  onClick={handleReset}
                  type="button"
                >
                  <Icon name="restart_alt" />
                  <span>Zurücksetzen</span>
                </button>

                <div className="registration-actions__cluster">
                  {currentStep > 0 && (
                    <button
                      className="button button--ghost"
                      onClick={handleBack}
                      type="button"
                    >
                      <Icon name="chevron_left" />
                      <span>Zurück</span>
                    </button>
                  )}

                  {currentStep < STEPS.length - 1 ? (
                    <button
                      className="button button--primary"
                      onClick={handleNext}
                      type="button"
                      disabled={!isCurrentStepValid}
                    >
                      <span>Weiter</span>
                      <Icon name="arrow_forward" />
                    </button>
                  ) : (
                    <button
                      className="button button--primary"
                      type="submit"
                      disabled={!isCurrentStepValid}
                    >
                      <span>Leitfaden abschließen</span>
                      <Icon name="check_circle" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
