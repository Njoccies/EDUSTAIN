import { useEffect, useMemo, useState } from "react";
import {
  PROJECT_GROUPS,
  SCHOOL_POSITIONS,
  STATES,
} from "../data/workflowSiteContent.js";
import { saveDemoMember } from "../lib/demoSession.js";

const DEFAULT_STEPS = [
  { id: "start", label: "Zugang wählen" },
  { id: "personal", label: "Persönliche Daten" },
  { id: "school", label: "Schulische Informationen" },
  { id: "project", label: "Projektinformationen" },
  { id: "legal", label: "Rechtliches" },
];

const WITHOUT_CODE_STEPS = DEFAULT_STEPS;

const WITH_CODE_STEPS = [
  { id: "start", label: "Zugang wählen" },
  { id: "personal", label: "Persönliche Daten" },
  { id: "legal", label: "Rechtliches" },
];

const DEFAULT_STEP_FIELDS = [
  ["registrationMode"],
  ["firstName", "lastName", "email", "password"],
  ["schoolName", "schoolRole", "state"],
  ["projectGroup"],
  ["consent"],
];

const WITHOUT_CODE_STEP_FIELDS = DEFAULT_STEP_FIELDS;

const WITH_CODE_STEP_FIELDS = [
  ["registrationMode", "accessCode"],
  ["firstName", "lastName", "email", "password"],
  ["consent"],
];

const INITIAL_FORM = {
  registrationMode: "",
  accessCode: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  schoolName: "",
  schoolRole: "",
  state: "",
  projectGroup: "",
  consent: false,
};

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getModeLabel(mode) {
  if (mode === "with-code") {
    return "Mit Zugangscode";
  }
  if (mode === "without-code") {
    return "Ohne Zugangscode";
  }
  return "Noch nicht gewählt";
}

function validateField(name, formData) {
  const value = formData[name];
  const requiresSchoolDetails = formData.registrationMode !== "with-code";

  if (name === "registrationMode" && value.trim().length === 0) {
    return "Bitte wähle aus, ob du mit oder ohne Code starten möchtest.";
  }
  if (
    name === "accessCode" &&
    formData.registrationMode === "with-code" &&
    value.trim().length === 0
  ) {
    return "Bitte gib den Zugangscode ein.";
  }

  if (name === "firstName" && value.trim().length === 0) {
    return "Bitte gib deinen Vornamen ein.";
  }
  if (name === "lastName" && value.trim().length === 0) {
    return "Bitte gib deinen Nachnamen ein.";
  }
  if (name === "email") {
    if (value.trim().length === 0) {
      return "Bitte gib deine E-Mail-Adresse ein.";
    }
    if (!isValidEmail(value)) {
      return "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
  }
  if (name === "password") {
    if (value.trim().length === 0) {
      return "Bitte gib ein Passwort ein.";
    }
    if (value.length < 8) {
      return "Das Passwort muss mindestens 8 Zeichen lang sein.";
    }
  }
  if (name === "schoolName" && requiresSchoolDetails && value.trim().length === 0) {
    return "Bitte gib den Namen der Schule ein.";
  }
  if (name === "schoolRole" && requiresSchoolDetails && value.trim().length === 0) {
    return "Bitte wähle deine Position innerhalb der Schule.";
  }
  if (name === "state" && requiresSchoolDetails && value.trim().length === 0) {
    return "Bitte wähle ein Bundesland.";
  }
  if (name === "projectGroup" && requiresSchoolDetails && value.trim().length === 0) {
    return "Bitte wähle eine Projektgruppe.";
  }
  if (name === "consent" && value !== true) {
    return "Bitte stimme den Demo-AGB und dem Datenschutz zu.";
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

function Stepper({ currentStep, steps }) {
  return (
    <ol className="registration-stepper" aria-label="Registrierungsschritte">
      {steps.map((step, index) => {
        const state =
          index < currentStep ? "done" : index === currentStep ? "active" : "upcoming";
        return (
          <li key={step.id} className={`registration-stepper__item is-${state}`}>
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

export default function RegistrationPage({ onNavigateHome, onNavigateMembers }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState("idle");

  const steps = useMemo(() => {
    if (formData.registrationMode === "with-code") {
      return WITH_CODE_STEPS;
    }
    if (formData.registrationMode === "without-code") {
      return WITHOUT_CODE_STEPS;
    }
    return DEFAULT_STEPS;
  }, [formData.registrationMode]);

  const stepFields = useMemo(() => {
    if (formData.registrationMode === "with-code") {
      return WITH_CODE_STEP_FIELDS;
    }
    if (formData.registrationMode === "without-code") {
      return WITHOUT_CODE_STEP_FIELDS;
    }
    return DEFAULT_STEP_FIELDS;
  }, [formData.registrationMode]);

  const errors = useMemo(() => collectErrors(formData), [formData]);
  const currentFields = stepFields[currentStep] ?? [];
  const isCurrentStepValid = currentFields.every((field) => !errors[field]);

  useEffect(() => {
    setCurrentStep((current) => Math.min(current, steps.length - 1));
  }, [steps.length]);

  useEffect(() => {
    if (submitState !== "success") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onNavigateMembers();
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [onNavigateMembers, submitState]);

  const markStepAsTouched = () => {
    setTouched((current) => {
      const nextTouched = { ...current };
      currentFields.forEach((field) => {
        nextTouched[field] = true;
      });
      return nextTouched;
    });
  };

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      ...(name === "registrationMode" && value === "without-code"
        ? { accessCode: "" }
        : null),
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  };

  const handleNext = () => {
    markStepAsTouched();
    if (!isCurrentStepValid) {
      return;
    }
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((current) => Math.max(current - 1, 0));
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
      setCurrentStep(stepFields.findIndex((fields) => fields.some((field) => allErrors[field])));
      return;
    }

    saveDemoMember(formData);
    setSubmitState("success");
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
          <p className="registration-hero__eyebrow">EDUSTAIN-Connect Registrierung</p>
          <h1>Werde Teil der EDUSTAIN-Connect Community</h1>
          <p>
            Dieser Flow ist ein klickbarer Frontend-Prototyp. Du kannst mit oder ohne
            Zugangscode starten. Es wird kein echtes Konto angelegt und keine E-Mail wirklich
            versendet.
          </p>
        </div>
      </section>

      <div className="registration-layout">
        <aside className="registration-sidebar">
          <Stepper currentStep={currentStep} steps={steps} />
          <div className="registration-sidebar__hint">
            <strong>Demo-Hinweis</strong>
            <p>
              Alle Eingaben bleiben nur im Frontend erhalten und werden ausschließlich für diesen
              prototypischen Ablauf simuliert. Mit Code verkürzt sich der Flow auf die nötigen
              Kerndaten.
            </p>
          </div>
        </aside>

        <section className="registration-panel">
          {submitState === "success" ? (
            <div className="success-state">
              <div className="success-state__icon">
                <Icon name="check_circle" />
              </div>
              <h2>Die Registrierung wurde erfolgreich abgeschlossen.</h2>
              <p>
                Eine Bestätigungs-E-Mail wurde versendet. Diese Nachricht ist Teil des Demo-Flows
                und wurde nicht wirklich verschickt.
              </p>
              <p>Du wirst jetzt in den Mitgliederbereich weitergeleitet.</p>
              <button className="button button--primary" onClick={onNavigateMembers} type="button">
                <Icon name="arrow_forward" />
                <span>Zum Mitgliederbereich</span>
              </button>
            </div>
          ) : (
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="registration-form__header">
                <div>
                  <p className="registration-form__step-label">
                    Schritt {currentStep + 1} von {steps.length}
                  </p>
                  <h2>{steps[currentStep].label}</h2>
                </div>
                <div className="registration-progress">
                  <div
                    className="registration-progress__bar"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {currentStep === 0 && (
                <div className="registration-fields">
                  <div className="mode-intro-card">
                    <h3>Wie möchtest du mit der Registrierung starten?</h3>
                    <p>
                      Ohne Code durchläufst du den vollständigen Demo-Flow. Mit Code startest du
                      in einer verkürzten Variante und bestätigst danach nur noch deine
                      persönlichen Daten und die rechtlichen Hinweise.
                    </p>
                  </div>

                  <fieldset className="mode-choice-group">
                    <legend>Registrierungsweg auswählen</legend>
                    <div className="mode-choice-grid">
                      <label
                        className={`mode-choice-card ${
                          formData.registrationMode === "without-code" ? "is-selected" : ""
                        }`}
                      >
                        <input
                          checked={formData.registrationMode === "without-code"}
                          name="registrationMode"
                          onBlur={handleFieldBlur}
                          onChange={handleFieldChange}
                          type="radio"
                          value="without-code"
                        />
                        <span className="mode-choice-card__content">
                          <span className="mode-choice-card__eyebrow">Ohne Code</span>
                          <strong>Zum vollständigen Registrierungsformular</strong>
                          <span>
                            Du gehst durch persönliche Daten, schulische Informationen,
                            Projektgruppe und Rechtliches.
                          </span>
                        </span>
                      </label>

                      <label
                        className={`mode-choice-card ${
                          formData.registrationMode === "with-code" ? "is-selected" : ""
                        }`}
                      >
                        <input
                          checked={formData.registrationMode === "with-code"}
                          name="registrationMode"
                          onBlur={handleFieldBlur}
                          onChange={handleFieldChange}
                          type="radio"
                          value="with-code"
                        />
                        <span className="mode-choice-card__content">
                          <span className="mode-choice-card__eyebrow">Mit Code</span>
                          <strong>Verkürzter Einstieg mit Admin-Code</strong>
                          <span>
                            Du gibst deinen Code direkt hier ein und springst danach in den
                            kompakten Demo-Flow mit Persönlichen Daten und Rechtlichem.
                          </span>
                        </span>
                      </label>
                    </div>
                    {renderError("registrationMode")}
                  </fieldset>

                  {formData.registrationMode === "with-code" && (
                    <div className="access-code-panel">
                      <div className="field-block">
                        <label htmlFor="accessCode">Zugangscode</label>
                        <input
                          id="accessCode"
                          name="accessCode"
                          value={formData.accessCode}
                          onChange={handleFieldChange}
                          onBlur={handleFieldBlur}
                          placeholder="Code eingeben"
                        />
                        <p className="field-help">
                          Jeder nicht-leere Code funktioniert in diesem Clickdummy.
                        </p>
                        {renderError("accessCode")}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 1 && (
                <div className="registration-fields">
                  <div className="field-row field-row--double">
                    <div className="field-block">
                      <label htmlFor="firstName">Vorname</label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        placeholder="Vorname"
                      />
                      {renderError("firstName")}
                    </div>
                    <div className="field-block">
                      <label htmlFor="lastName">Nachname</label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        placeholder="Nachname"
                      />
                      {renderError("lastName")}
                    </div>
                  </div>

                  <div className="field-block">
                    <label htmlFor="email">E-Mail-Adresse</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      placeholder="name@schule.de"
                    />
                    {renderError("email")}
                  </div>

                  <div className="field-block">
                    <label htmlFor="password">Passwort</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      placeholder="Mindestens 8 Zeichen"
                    />
                    {renderError("password")}
                  </div>
                </div>
              )}

              {steps[currentStep].id === "school" && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label htmlFor="schoolName">Name der Schule</label>
                    <input
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                      placeholder="Name der Schule"
                    />
                    {renderError("schoolName")}
                  </div>

                  <div className="field-row field-row--double">
                    <div className="field-block">
                      <label htmlFor="schoolRole">Position innerhalb der Schule</label>
                      <div className="select-wrap">
                        <select
                          id="schoolRole"
                          name="schoolRole"
                          value={formData.schoolRole}
                          onChange={handleFieldChange}
                          onBlur={handleFieldBlur}
                        >
                          <option value="">Bitte wählen ...</option>
                          {SCHOOL_POSITIONS.map((position) => (
                            <option key={position} value={position}>
                              {position}
                            </option>
                          ))}
                        </select>
                        <Icon name="chevron_right" />
                      </div>
                      {renderError("schoolRole")}
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
                          <option value="">Bitte wählen ...</option>
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
                </div>
              )}

              {steps[currentStep].id === "project" && (
                <div className="registration-fields">
                  <div className="field-block">
                    <label htmlFor="projectGroup">Projektgruppe</label>
                    <div className="select-wrap">
                      <select
                        id="projectGroup"
                        name="projectGroup"
                        value={formData.projectGroup}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                      >
                        <option value="">Bitte wählen ...</option>
                        {PROJECT_GROUPS.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron_right" />
                    </div>
                    <p className="field-help">
                      Wähle die Gruppe, mit der du in diesem Demo-Prototypen arbeiten möchtest.
                    </p>
                    {renderError("projectGroup")}
                  </div>
                </div>
              )}

              {steps[currentStep].id === "legal" && (
                <div className="registration-fields">
                  <div className="legal-card">
                    <h3>Rechtliches und Abschluss</h3>
                    <p>
                      Mit dem Abschluss der Registrierung wird ausschließlich ein Demo-Zustand im
                      Frontend simuliert. Es findet keine echte Speicherung und keine echte
                      Authentifizierung statt.
                    </p>

                    <label className="checkbox-field" htmlFor="consent">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                      />
                      <span>
                        Ich stimme den Demo-AGB sowie dem Datenschutz-Hinweis zu und bestätige,
                        dass dieser Ablauf nur prototypisch simuliert wird.
                      </span>
                    </label>
                    {renderError("consent")}
                  </div>

                  <div className="summary-card">
                    <h3>Zusammenfassung</h3>
                    <div className="summary-grid">
                      <span>Registrierungsweg</span>
                      <strong>{getModeLabel(formData.registrationMode)}</strong>
                      {formData.registrationMode === "with-code" && (
                        <>
                          <span>Zugangscode</span>
                          <strong>{formData.accessCode}</strong>
                        </>
                      )}
                      <span>Name</span>
                      <strong>
                        {formData.firstName} {formData.lastName}
                      </strong>
                      <span>E-Mail</span>
                      <strong>{formData.email}</strong>
                      {formData.registrationMode !== "with-code" && (
                        <>
                          <span>Schule</span>
                          <strong>{formData.schoolName}</strong>
                          <span>Position</span>
                          <strong>{formData.schoolRole}</strong>
                          <span>Bundesland</span>
                          <strong>{formData.state}</strong>
                          <span>Projektgruppe</span>
                          <strong>{formData.projectGroup}</strong>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="registration-actions">
                <button className="button button--ghost" onClick={onNavigateHome} type="button">
                  <Icon name="arrow_back" />
                  <span>Zur Hauptseite</span>
                </button>

                <div className="registration-actions__cluster">
                  {currentStep > 0 && (
                    <button className="button button--ghost" onClick={handleBack} type="button">
                      <Icon name="chevron_left" />
                      <span>Zurück</span>
                    </button>
                  )}

                  {currentStep < steps.length - 1 ? (
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
                      <span>Registrierung abschließen</span>
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
