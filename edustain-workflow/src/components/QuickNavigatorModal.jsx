import { useMemo, useState } from "react";
import { QUICK_NAVIGATOR_STEPS } from "../data/workflowSiteContent.js";
import { getQuickNavigatorRecommendations } from "../lib/quickNavigator.js";

const INITIAL_ANSWERS = {
  goal: "",
  role: "",
  interest: "",
};

function Icon({ name }) {
  return <span className="material-icons workflow-icon">{name}</span>;
}

export default function QuickNavigatorModal({ initialAnswers, onClose, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers ?? INITIAL_ANSWERS);

  const currentStep = QUICK_NAVIGATOR_STEPS[stepIndex];
  const isCurrentStepComplete = Boolean(answers[currentStep.id]);
  const recommendationPreview = useMemo(
    () => getQuickNavigatorRecommendations(answers),
    [answers],
  );

  const handleSelect = (value) => {
    setAnswers((current) => ({
      ...current,
      [currentStep.id]: value,
    }));
  };

  const handleNext = () => {
    if (!isCurrentStepComplete) {
      return;
    }

    if (stepIndex === QUICK_NAVIGATOR_STEPS.length - 1) {
      onComplete(answers);
      return;
    }

    setStepIndex((current) => current + 1);
  };

  return (
    <div className="quick-nav-modal" role="dialog" aria-modal="true" aria-labelledby="quick-nav-title">
      <div className="quick-nav-modal__backdrop" onClick={onClose} />
      <div className="quick-nav-modal__panel">
        <button
          className="quick-nav-modal__close"
          onClick={onClose}
          type="button"
          aria-label="Quick Navigator schließen"
        >
          <Icon name="close" />
        </button>

        <div className="quick-nav-modal__content">
          <aside className="quick-nav-sidebar">
            <p className="quick-nav-sidebar__eyebrow">Quick Navigator</p>
            <h2 id="quick-nav-title">Schneller Einstieg</h2>
            <p>Drei Fragen, dann zeigen wir dir passende Inhalte.</p>

            <ol className="quick-nav-phases">
              {QUICK_NAVIGATOR_STEPS.map((step, index) => (
                <li
                  key={step.id}
                  className={`quick-nav-phases__item ${
                    index === stepIndex ? "is-active" : answers[step.id] ? "is-done" : ""
                  }`}
                >
                  <span>{index + 1}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <section className="quick-nav-stage">
            <div className="quick-nav-stage__header">
              <div>
                <p className="quick-nav-stage__step">
                  Phase {stepIndex + 1} von {QUICK_NAVIGATOR_STEPS.length}
                </p>
                <h3>{currentStep.label}</h3>
                <p>{currentStep.description}</p>
              </div>
              <div className="registration-progress">
                <div
                  className="registration-progress__bar"
                  style={{ width: `${((stepIndex + 1) / QUICK_NAVIGATOR_STEPS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="quick-nav-options">
              {currentStep.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`quick-nav-option ${
                    answers[currentStep.id] === option.value ? "is-selected" : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <strong>{option.title}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>

            {recommendationPreview && (
              <div className="quick-nav-preview">
                <span className="quick-nav-preview__badge">{recommendationPreview.badge}</span>
                <h4>{recommendationPreview.title}</h4>
                <p>{recommendationPreview.summary}</p>
              </div>
            )}

            <div className="quick-nav-actions">
              <button className="button button--ghost" onClick={onClose} type="button">
                Jetzt überspringen
              </button>

              <div className="quick-nav-actions__cluster">
                {stepIndex > 0 && (
                  <button
                    className="button button--ghost"
                    onClick={() => setStepIndex((current) => current - 1)}
                    type="button"
                  >
                    <Icon name="chevron_left" />
                    <span>Zurück</span>
                  </button>
                )}
                <button
                  className="button button--primary"
                  onClick={handleNext}
                  type="button"
                  disabled={!isCurrentStepComplete}
                >
                  <span>
                    {stepIndex === QUICK_NAVIGATOR_STEPS.length - 1
                      ? "Empfehlungen anzeigen"
                      : "Weiter"}
                  </span>
                  <Icon
                    name={
                      stepIndex === QUICK_NAVIGATOR_STEPS.length - 1
                        ? "rocket_launch"
                        : "arrow_forward"
                    }
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
