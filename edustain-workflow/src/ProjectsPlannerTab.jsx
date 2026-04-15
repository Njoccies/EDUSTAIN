import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Projekt anlegen",
    subtitle: "Idee & Rahmen definieren",
    icon: "🌱",
    color: "#224DB7",
    lightColor: "#E8EDF8",
    description:
      "Der Lehrer erstellt ein neues Nachhaltigkeitsprojekt und definiert Titel, Beschreibung und Themenfeld. Edustain bietet Vorlagen aus vergangenen Projekten als Inspiration.",
    mockup: "project_create",
  },
  {
    id: 2,
    title: "Partner finden",
    subtitle: "NGOs & Umsetzungspartner",
    icon: "🤝",
    color: "#1739A5",
    lightColor: "#DDE4F5",
    description:
      "Basierend auf Themenfeld und Region schlägt Edustain automatisch passende NGOs und Umsetzungspartner vor - aus einer Datenbank vergangener Projekte und Listings.",
    mockup: "partner_find",
  },
  {
    id: 3,
    title: "Schritte planen",
    subtitle: "Aufgaben & Kosten strukturieren",
    icon: "📋",
    color: "#445588",
    lightColor: "#E8EDF8",
    description:
      "Einzelne Aufgabenschritte werden definiert, mit Zeitrahmen und Kostenschätzung versehen. Jeder Schritt wird einer verantwortlichen Person zugeordnet.",
    mockup: "step_plan",
  },
  {
    id: 4,
    title: "Aufgaben zuweisen",
    subtitle: "Lehrer- & Schüleraufgaben trennen",
    icon: "👩‍🏫",
    color: "#72ab47",
    lightColor: "#EAF4DF",
    description:
      "Aufgaben werden als Lehrer- oder Schüleraufgaben markiert. Schüleraufgaben werden automatisch als druckbare Aufgabenblätter formatiert - mit Anleitung, Checkliste und Platz für Notizen.",
    mockup: "task_assign",
  },
  {
    id: 5,
    title: "Exportieren & Umsetzen",
    subtitle: "PDF-Export & Druck",
    icon: "🖨️",
    color: "#38454A",
    lightColor: "#ECEEEF",
    description:
      "Der komplette Projektplan sowie die einzelnen Aufgabenblätter für Schüler können als PDF exportiert und direkt ausgedruckt werden. Die Umsetzung kann beginnen!",
    mockup: "export",
  },
];

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "0.9rem 1rem",
  border: "1px solid #cbd5e1",
  borderRadius: 16,
  fontSize: 14,
  color: "#111827",
  background: "#ffffff",
  fontFamily: "'Nunito Sans', sans-serif",
  outline: "none",
};

const tagStyle = (active) => ({
  padding: "0.45rem 0.85rem",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 800,
  background: active ? "linear-gradient(135deg, #2f8f3a, #0077b6)" : "transparent",
  color: active ? "#fff" : "#374151",
  border: active ? "1px solid transparent" : "1px solid #d1d5db",
  cursor: "pointer",
  fontFamily: "'Nunito Sans', sans-serif",
});

const MockupProjectCreate = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 800, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Montserrat', sans-serif" }}>
        Projektname
      </label>
      <div style={{ ...inputStyle, color: "#0077b6", fontWeight: 500 }}>
        Schulhof-Biodiversitätsgarten
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 800, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Montserrat', sans-serif" }}>
        Themenfeld
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Biodiversität", "Energie", "Ernährung", "Mobilität", "Konsum"].map((topic, index) => (
          <span key={topic} style={tagStyle(index === 0)}>
            {topic}
          </span>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 800, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Montserrat', sans-serif" }}>
        Kurzbeschreibung
      </label>
      <div style={{ ...inputStyle, minHeight: 52, color: "#374151", lineHeight: 1.6 }}>
        Wir gestalten einen Teil des Schulhofs als Biodiversitätsgarten mit heimischen Pflanzen, Insektenhotel und Kompoststation...
      </div>
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
      <span
        style={{
          background: "#e9f6ec",
          border: "1px solid #b5d98b",
          borderRadius: 999,
          padding: "0.4rem 0.8rem",
          fontSize: 12,
          color: "#2f8f3a",
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 500,
        }}
      >
        📄 3 ähnliche Projekte als Vorlage verfügbar
      </span>
    </div>
  </div>
);

const PartnerCard = ({ partner }) => (
  <div
    style={{
      background: "#f8fafb",
      borderRadius: 20,
      padding: "14px 18px",
      border: "1px solid #e8edf2",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <div style={{ fontWeight: 800, fontSize: 14, color: "#111827", fontFamily: "'Nunito Sans', sans-serif" }}>
        {partner.name}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: 10,
            background: "rgba(0, 119, 182, 0.1)",
            color: "#0077b6",
            padding: "2px 8px",
            borderRadius: 999,
            fontWeight: 800,
          }}
        >
          {partner.type}
        </span>
        {partner.tags.map((tag) => (
          <span
            key={tag}
            style={{ fontSize: 10, background: "#e9f6ec", color: "#2f8f3a", padding: "2px 8px", borderRadius: 999 }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div
      style={{
        background: `conic-gradient(#0077b6 ${partner.match * 3.6}deg, #e5e7eb 0deg)`,
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginLeft: 12,
      }}
    >
      <div
        style={{
          background: "#f8fafb",
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 800,
          color: "#0077b6",
        }}
      >
        {partner.match}%
      </div>
    </div>
  </div>
);

const MockupPartnerFind = () => {
  const [query, setQuery] = useState("");
  const allPartners = [
    { name: "NABU Ortsgruppe Freiburg", type: "NGO", match: 94, tags: ["Biodiversität", "Gartenprojekte"] },
    { name: "Bodensee-Stiftung", type: "Stiftung", match: 87, tags: ["Ökosysteme", "Schulprojekte"] },
    { name: "GartenWerkStadt e.V.", type: "Verein", match: 82, tags: ["Urban Gardening", "Kompost"] },
  ];

  const searchResults = query.trim()
    ? allPartners.filter((partner) => {
        const normalizedQuery = query.toLowerCase();
        return (
          partner.name.toLowerCase().includes(normalizedQuery) ||
          partner.type.toLowerCase().includes(normalizedQuery) ||
          partner.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
        );
      })
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 800, color: "#4b5563", textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Montserrat', sans-serif" }}>
          Partner manuell suchen
        </label>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 14,
              color: "#cbd5e1",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, Typ oder Thema eingeben..."
            style={{ ...inputStyle, paddingLeft: 36, transition: "border-color 0.2s" }}
            onFocus={(event) => {
              event.target.style.borderColor = "#0077b6";
              event.target.style.outline = "2px solid rgba(0, 119, 182, 0.18)";
            }}
            onBlur={(event) => {
              event.target.style.borderColor = "#cbd5e1";
              event.target.style.outline = "none";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                color: "#cbd5e1",
                padding: "0 4px",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {searchResults !== null && (
        <>
          <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}>
            {searchResults.length > 0 ? `${searchResults.length} Ergebnis${searchResults.length !== 1 ? "se" : ""} gefunden` : "Keine Ergebnisse"}
          </div>
          {searchResults.length === 0 ? (
            <div
              style={{
                background: "#f3f4f6",
                borderRadius: 20,
                padding: "14px 16px",
                fontSize: 13,
                color: "#6b7280",
                textAlign: "center",
                border: "1px dashed #d1d5db",
              }}
            >
              Kein Partner gefunden - andere Suche versuchen
            </div>
          ) : (
            searchResults.map((partner) => <PartnerCard key={partner.name} partner={partner} />)
          )}
          <div style={{ height: 1, background: "#e5e7eb", margin: "4px 0" }} />
        </>
      )}

      <div style={{ fontSize: 11, color: "#2f8f3a", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}>
        ✨ KI-Vorschläge basierend auf vergangenen Projekten
      </div>
      {allPartners.map((partner) => (
        <PartnerCard key={partner.name} partner={partner} />
      ))}
    </div>
  );
};

const MockupStepPlan = () => {
  const steps = [
    { step: "Bestandsaufnahme Schulhof", who: "Schüler", days: "3 Tage", cost: "0 €", done: true },
    { step: "Pflanzplan erstellen", who: "Lehrer + NABU", days: "5 Tage", cost: "0 €", done: true },
    { step: "Material beschaffen", who: "Lehrer", days: "7 Tage", cost: "280 €", done: false },
    { step: "Beete anlegen & bepflanzen", who: "Schüler", days: "2 Tage", cost: "0 €", done: false },
    { step: "Insektenhotel bauen", who: "Schüler", days: "3 Tage", cost: "45 €", done: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {steps.map((step, index) => (
        <div
          key={step.step}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 0",
            borderBottom: index < steps.length - 1 ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: step.done ? "linear-gradient(135deg, #2f8f3a, #0077b6)" : "#f3f4f6",
              color: step.done ? "#fff" : "#d1d5db",
              fontSize: 13,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {step.done ? "✓" : index + 1}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", fontFamily: "'Nunito Sans', sans-serif" }}>
              {step.step}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
              {step.who} · {step.days}
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 800, color: step.cost === "0 €" ? "#d1d5db" : "#0077b6", flexShrink: 0 }}>
            {step.cost}
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 10,
          padding: "8px 14px",
          background: "rgba(0, 119, 182, 0.08)",
          borderRadius: 999,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 800,
          color: "#0077b6",
        }}
      >
        <span>Gesamtkosten</span>
        <span>325 €</span>
      </div>
    </div>
  );
};

const MockupTaskAssign = () => {
  const tasks = [
    { task: "Schulhof vermessen & kartieren", type: "schueler", sheet: true },
    { task: "Bodenproben nehmen & analysieren", type: "schueler", sheet: true },
    { task: "Genehmigung Schulleitung einholen", type: "lehrer", sheet: false },
    { task: "Insektenhotel: Bauanleitung folgen", type: "schueler", sheet: true },
    { task: "Pflanzaktion koordinieren", type: "lehrer", sheet: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {tasks.map((task) => (
        <div
          key={task.task}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            background: "#f8fafb",
            borderRadius: 20,
            border: task.type === "schueler" ? "1px solid #b5d98b" : "1px solid #e8edf2",
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>{task.type === "schueler" ? "🎒" : "👩‍🏫"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", fontFamily: "'Nunito Sans', sans-serif" }}>
              {task.task}
            </div>
            <div style={{ fontSize: 10, color: task.type === "schueler" ? "#2f8f3a" : "#6b7280", fontWeight: 800, marginTop: 2 }}>
              {task.type === "schueler" ? "Schüleraufgabe" : "Lehreraufgabe"}
            </div>
          </div>
          {task.sheet && (
            <div
              style={{
                background: "#e9f6ec",
                borderRadius: 999,
                padding: "4px 10px",
                fontSize: 10,
                fontWeight: 800,
                color: "#2f8f3a",
                whiteSpace: "nowrap",
              }}
            >
              📄 Aufgabenblatt
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MockupExport = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
    <div
      style={{
        background: "#FAFBFC",
        borderRadius: 10,
        padding: 20,
        border: "1.5px solid #D0D8E8",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 11, color: "#4b5563", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.2, fontFamily: "'Montserrat', sans-serif" }}>
        Export-Optionen
      </div>
      {[
        { label: "Gesamter Projektplan", desc: "Titel, Beschreibung, Schritte, Partner, Kosten", icon: "📑" },
        { label: "Aufgabenblätter (3)", desc: "Druckfertige Arbeitsblätter für Schüler", icon: "🖨️" },
        { label: "Kostenübersicht", desc: "Detaillierte Aufstellung aller Ausgaben", icon: "💶" },
      ].map((entry) => (
        <div
          key={entry.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            background: "#f3f4f6",
            borderRadius: 20,
            cursor: "pointer",
            border: "1px solid transparent",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 20 }}>{entry.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#111827", fontFamily: "'Nunito Sans', sans-serif" }}>
              {entry.label}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280" }}>{entry.desc}</div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #2f8f3a, #0077b6)",
              color: "#fff",
              borderRadius: 999,
              padding: "6px 14px",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            PDF ↓
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        background: "#e9f6ec",
        borderRadius: 999,
        padding: "10px 18px",
        fontSize: 12,
        color: "#2f8f3a",
        fontWeight: 800,
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      ✅ Projekt bereit zur Umsetzung - viel Erfolg!
    </div>
  </div>
);

const mockupComponents = {
  project_create: MockupProjectCreate,
  partner_find: MockupPartnerFind,
  step_plan: MockupStepPlan,
  task_assign: MockupTaskAssign,
  export: MockupExport,
};

export default function ProjectsPlannerTab() {
  const [active, setActive] = useState(0);
  const phase = phases[active];
  const MockupComponent = mockupComponents[phase.mockup];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, rgba(47, 143, 58, 0.08), transparent 28%), radial-gradient(circle at top right, rgba(0, 119, 182, 0.08), transparent 26%), #f8fafc",
        fontFamily: "'Nunito Sans', sans-serif",
        padding: "104px 16px 48px",
        boxSizing: "border-box",
      }}
    >

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "0.4rem 0.8rem",
            borderRadius: 999,
            background: "rgba(47, 143, 58, 0.12)",
            color: "#2f8f3a",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: "0.02em",
            marginBottom: 12,
          }}
        >
          Edustain Connect · Feature Konzept
        </div>
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            color: "#111827",
            margin: 0,
            lineHeight: 1.12,
            fontWeight: 800,
          }}
        >
          Nachhaltigkeitsprojekte
          <br />
          <span style={{ color: "#0077b6" }}>planen und umsetzen</span>
        </h1>
        <p
          style={{
            color: "#374151",
            fontSize: "1.02rem",
            marginTop: 12,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Von der Idee zum fertigen Aufgabenblatt - alles in Edustain
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginBottom: 28,
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        {phases.map((phaseItem, index) => (
          <div key={phaseItem.id} style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setActive(index)}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: active === index ? "3px solid #2f8f3a" : "2px solid #d1d5db",
                background: active === index ? "linear-gradient(135deg, #2f8f3a, #0077b6)" : active > index ? "#e5e7eb" : "#ffffff",
                color: active === index ? "#fff" : active > index ? "#4b5563" : "#d1d5db",
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                transform: active === index ? "scale(1.15)" : "scale(1)",
                boxShadow: active === index ? "0 16px 35px rgba(15, 23, 42, 0.16)" : "none",
              }}
            >
              {phaseItem.icon}
            </button>
            {index < phases.length - 1 && (
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: active > index ? "#0077b6" : "#e5e7eb",
                  transition: "all 0.3s",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, gap: 26, flexWrap: "wrap" }}>
        {phases.map((phaseItem, index) => (
          <div
            key={phaseItem.id}
            style={{ textAlign: "center", width: 68, opacity: active === index ? 1 : 0.35, transition: "all 0.3s" }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, color: "#111827", lineHeight: 1.3 }}>{phaseItem.title}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid #dbe4ee",
          boxShadow: "0 24px 50px rgba(15, 23, 42, 0.06)",
        }}
      >
        <div
          style={{
            padding: "20px 24px 16px",
            background: `linear-gradient(135deg, ${phase.color}18, ${phase.lightColor}CC)`,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                background: "linear-gradient(135deg, #2f8f3a, #0077b6)",
                borderRadius: 999,
                padding: "0.3rem 0.7rem",
                letterSpacing: 0.5,
              }}
            >
              Phase {phase.id}/5
            </span>
            <span style={{ fontSize: 11, color: "#4b5563" }}>{phase.subtitle}</span>
          </div>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 21,
              color: "#111827",
              margin: 0,
              fontWeight: 800,
            }}
          >
            {phase.title}
          </h2>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
            {phase.description}
          </p>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 14,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            UI Vorschau
          </div>
          <MockupComponent />
        </div>
      </div>

      <div
        style={{
          maxWidth: 520,
          margin: "20px auto 0",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          style={{
            flex: 1,
            padding: "0.85rem 1.2rem",
            borderRadius: 999,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            color: active === 0 ? "#d1d5db" : "#111827",
            fontSize: 14,
            fontWeight: 800,
            cursor: active === 0 ? "default" : "pointer",
            fontFamily: "'Nunito Sans', sans-serif",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          ← Zurück
        </button>
        <button
          onClick={() => setActive(Math.min(phases.length - 1, active + 1))}
          disabled={active === phases.length - 1}
          style={{
            flex: 1,
            padding: "0.85rem 1.2rem",
            borderRadius: 999,
            border: "none",
            background: active === phases.length - 1 ? "#e5e7eb" : "linear-gradient(135deg, #2f8f3a, #0077b6)",
            color: active === phases.length - 1 ? "#9ca3af" : "#fff",
            fontSize: 14,
            fontWeight: 800,
            cursor: active === phases.length - 1 ? "default" : "pointer",
            fontFamily: "'Nunito Sans', sans-serif",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: active < phases.length - 1 ? "0 16px 35px rgba(15, 23, 42, 0.16)" : "none",
          }}
        >
          Weiter →
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, color: "#6b7280", fontSize: 11 }}>
        Hackathon Konzept · EdustainConnect.org
      </div>
    </div>
  );
}
