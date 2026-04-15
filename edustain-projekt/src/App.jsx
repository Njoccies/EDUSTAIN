import { useState } from "react";

// EDUSTAIN.org Design Tokens
// Primary: #445588 / #224DB7 (blue)
// Accent:  #72ab47 (green)
// Dark bg: #0A1821 / #1D2233 (navy)
// Fonts:   Roboto Slab (headings), Roboto (body)

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
      "Basierend auf Themenfeld und Region schlägt Edustain automatisch passende NGOs und Umsetzungspartner vor – aus einer Datenbank vergangener Projekte und Listings.",
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
      "Aufgaben werden als Lehrer- oder Schüleraufgaben markiert. Schüleraufgaben werden automatisch als druckbare Aufgabenblätter formatiert – mit Anleitung, Checkliste und Platz für Notizen.",
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
  padding: "10px 14px",
  border: "1.5px solid #D0D8E8",
  borderRadius: 8,
  fontSize: 13,
  color: "#0A1821",
  background: "#FAFBFC",
  fontFamily: "'Roboto', sans-serif",
  outline: "none",
};

const tagStyle = (active) => ({
  padding: "5px 14px",
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
  background: active ? "#224DB7" : "transparent",
  color: active ? "#fff" : "#445588",
  border: active ? "1.5px solid #224DB7" : "1.5px solid #B0BEDD",
  cursor: "pointer",
  fontFamily: "'Roboto', sans-serif",
});

const MockupProjectCreate = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#445588", textTransform: "uppercase", letterSpacing: 1.2 }}>Projektname</label>
      <div style={{ ...inputStyle, color: "#1739A5", fontWeight: 500 }}>
        Schulhof-Biodiversitätsgarten
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#445588", textTransform: "uppercase", letterSpacing: 1.2 }}>Themenfeld</label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Biodiversität", "Energie", "Ernährung", "Mobilität", "Konsum"].map((t, i) => (
          <span key={t} style={tagStyle(i === 0)}>{t}</span>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: "#445588", textTransform: "uppercase", letterSpacing: 1.2 }}>Kurzbeschreibung</label>
      <div style={{ ...inputStyle, minHeight: 52, color: "#38454A", lineHeight: 1.6 }}>
        Wir gestalten einen Teil des Schulhofs als Biodiversitätsgarten mit heimischen Pflanzen, Insektenhotel und Kompoststation...
      </div>
    </div>
    <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
      <span style={{ background: "#EAF4DF", border: "1px solid #B5D98B", borderRadius: 8, padding: "6px 12px", fontSize: 11, color: "#4a7a28", fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
        📄 3 ähnliche Projekte als Vorlage verfügbar
      </span>
    </div>
  </div>
);

const PartnerCard = ({ p }) => (
  <div style={{
    background: "#FAFBFC",
    borderRadius: 10,
    padding: "12px 16px",
    border: "1.5px solid #D0D8E8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#0A1821", fontFamily: "'Roboto', sans-serif" }}>{p.name}</div>
      <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, background: "#E8EDF8", color: "#224DB7", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>{p.type}</span>
        {p.tags.map(tag => (
          <span key={tag} style={{ fontSize: 10, background: "#EAF4DF", color: "#4a7a28", padding: "2px 8px", borderRadius: 6 }}>{tag}</span>
        ))}
      </div>
    </div>
    <div style={{
      background: `conic-gradient(#224DB7 ${p.match * 3.6}deg, #D0D8E8 0deg)`,
      width: 40, height: 40, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, marginLeft: 12,
    }}>
      <div style={{
        background: "#FAFBFC", width: 30, height: 30, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, fontWeight: 800, color: "#224DB7",
      }}>
        {p.match}%
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
    ? allPartners.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Manuelle Suche */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: "#445588", textTransform: "uppercase", letterSpacing: 1.2 }}>
          Partner manuell suchen
        </label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: "#B0BEDD", pointerEvents: "none",
          }}>🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, Typ oder Thema eingeben…"
            style={{
              ...inputStyle,
              paddingLeft: 36,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#224DB7"; }}
            onBlur={(e) => { e.target.style.borderColor = "#D0D8E8"; }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, color: "#B0BEDD", padding: "0 4px", lineHeight: 1,
              }}
            >✕</button>
          )}
        </div>
      </div>

      {/* Suchergebnisse */}
      {searchResults !== null && (
        <>
          <div style={{ fontSize: 11, color: "#445588", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2 }}>
            {searchResults.length > 0 ? `${searchResults.length} Ergebnis${searchResults.length !== 1 ? "se" : ""} gefunden` : "Keine Ergebnisse"}
          </div>
          {searchResults.length === 0 ? (
            <div style={{
              background: "#F2F2F2", borderRadius: 10, padding: "14px 16px",
              fontSize: 13, color: "#7A7A7A", textAlign: "center", border: "1.5px dashed #D0D8E8",
            }}>
              Kein Partner gefunden — andere Suche versuchen
            </div>
          ) : (
            searchResults.map((p) => <PartnerCard key={p.name} p={p} />)
          )}
          <div style={{ height: 1, background: "#D0D8E8", margin: "4px 0" }} />
        </>
      )}

      {/* KI-Vorschläge */}
      <div style={{ fontSize: 11, color: "#72ab47", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2 }}>
        ✨ KI-Vorschläge basierend auf vergangenen Projekten
      </div>
      {allPartners.map((p) => <PartnerCard key={p.name} p={p} />)}
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
      {steps.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
          borderBottom: i < steps.length - 1 ? "1px solid #E8EDF8" : "none",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: s.done ? "#224DB7" : "#E8EDF8",
            color: s.done ? "#fff" : "#B0BEDD",
            fontSize: 13, fontWeight: 800, flexShrink: 0,
          }}>
            {s.done ? "✓" : i + 1}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1821", fontFamily: "'Roboto', sans-serif" }}>{s.step}</div>
            <div style={{ fontSize: 11, color: "#7A7A7A", marginTop: 2 }}>{s.who} · {s.days}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: s.cost === "0 €" ? "#B0BEDD" : "#224DB7", flexShrink: 0 }}>
            {s.cost}
          </div>
        </div>
      ))}
      <div style={{
        marginTop: 10, padding: "8px 14px", background: "#E8EDF8", borderRadius: 8,
        display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: "#1739A5",
      }}>
        <span>Gesamtkosten</span><span>325 €</span>
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
      {tasks.map((t, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          background: "#FAFBFC", borderRadius: 8,
          border: t.type === "schueler" ? "1.5px solid #72ab47" : "1.5px solid #D0D8E8",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{t.type === "schueler" ? "🎒" : "👩‍🏫"}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1821", fontFamily: "'Roboto', sans-serif" }}>{t.task}</div>
            <div style={{ fontSize: 10, color: t.type === "schueler" ? "#4a7a28" : "#7A7A7A", fontWeight: 600, marginTop: 2 }}>
              {t.type === "schueler" ? "Schüleraufgabe" : "Lehreraufgabe"}
            </div>
          </div>
          {t.sheet && (
            <div style={{
              background: "#EAF4DF", borderRadius: 6, padding: "4px 10px",
              fontSize: 10, fontWeight: 700, color: "#4a7a28", whiteSpace: "nowrap",
            }}>
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
    <div style={{
      background: "#FAFBFC", borderRadius: 10, padding: 20,
      border: "1.5px solid #D0D8E8", width: "100%",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ fontSize: 11, color: "#445588", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2 }}>Export-Optionen</div>
      {[
        { label: "Gesamter Projektplan", desc: "Titel, Beschreibung, Schritte, Partner, Kosten", icon: "📑" },
        { label: "Aufgabenblätter (3)", desc: "Druckfertige Arbeitsblätter für Schüler", icon: "🖨️" },
        { label: "Kostenübersicht", desc: "Detaillierte Aufstellung aller Ausgaben", icon: "💶" },
      ].map((e) => (
        <div key={e.label} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
          background: "#F2F2F2", borderRadius: 8, cursor: "pointer",
          border: "1px solid transparent", transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 20 }}>{e.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1821", fontFamily: "'Roboto', sans-serif" }}>{e.label}</div>
            <div style={{ fontSize: 11, color: "#7A7A7A" }}>{e.desc}</div>
          </div>
          <div style={{
            background: "#224DB7", color: "#fff", borderRadius: 6, padding: "6px 14px",
            fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>
            PDF ↓
          </div>
        </div>
      ))}
    </div>
    <div style={{
      background: "#EAF4DF", borderRadius: 8, padding: "10px 18px",
      fontSize: 12, color: "#4a7a28", fontWeight: 600, textAlign: "center", width: "100%", boxSizing: "border-box",
    }}>
      ✅ Projekt bereit zur Umsetzung — viel Erfolg!
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

export default function EdustainWorkflow() {
  const [active, setActive] = useState(0);
  const phase = phases[active];
  const MockupComponent = mockupComponents[phase.mockup];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0A1821 0%, #1D2233 55%, #38454A 100%)",
      fontFamily: "'Roboto', sans-serif",
      padding: "32px 16px",
      boxSizing: "border-box",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Slab:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#72ab47", textTransform: "uppercase", marginBottom: 8 }}>
          Edustain Connect · Feature Konzept
        </div>
        <h1 style={{
          fontFamily: "'Roboto Slab', serif",
          fontSize: "clamp(22px, 5vw, 34px)",
          color: "#FAFBFC",
          margin: 0, lineHeight: 1.25, fontWeight: 700,
        }}>
          Nachhaltigkeitsprojekte<br />
          <span style={{ color: "#72ab47" }}>planen & umsetzen</span>
        </h1>
        <p style={{ color: "#8A9BC0", fontSize: 14, marginTop: 10, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Von der Idee zum fertigen Aufgabenblatt — alles in Edustain
        </p>
      </div>

      {/* Phase Navigation */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 0,
        marginBottom: 28, position: "relative", flexWrap: "wrap",
      }}>
        {phases.map((p, i) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setActive(i)}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                border: active === i ? `3px solid #72ab47` : "2px solid #38454A",
                background: active === i ? "#224DB7" : active > i ? "#38454A" : "#1D223380",
                color: active === i ? "#fff" : active > i ? "#8A9BC0" : "#38454A",
                fontSize: 20, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s ease",
                transform: active === i ? "scale(1.15)" : "scale(1)",
                boxShadow: active === i ? "0 0 20px #224DB744" : "none",
              }}
            >
              {p.icon}
            </button>
            {i < phases.length - 1 && (
              <div style={{
                width: 24, height: 2,
                background: active > i ? "#445588" : "#38454A44",
                transition: "all 0.3s",
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Phase Labels */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, gap: 26, flexWrap: "wrap" }}>
        {phases.map((p, i) => (
          <div key={p.id} style={{
            textAlign: "center", width: 68,
            opacity: active === i ? 1 : 0.35, transition: "all 0.3s",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#FAFBFC", lineHeight: 1.3 }}>{p.title}</div>
          </div>
        ))}
      </div>

      {/* Content Card */}
      <div style={{
        maxWidth: 520, margin: "0 auto",
        background: "#ffffff",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px #38454A66",
      }}>
        {/* Card Header */}
        <div style={{
          padding: "20px 24px 16px",
          background: `linear-gradient(135deg, ${phase.color}18, ${phase.lightColor}CC)`,
          borderBottom: "1px solid #E8EDF8",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#fff",
              background: phase.color, borderRadius: 5, padding: "3px 10px", letterSpacing: 0.5,
            }}>
              Phase {phase.id}/5
            </span>
            <span style={{ fontSize: 11, color: "#54595F" }}>{phase.subtitle}</span>
          </div>
          <h2 style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: 21, color: "#0A1821",
            margin: 0, fontWeight: 700,
          }}>
            {phase.title}
          </h2>
          <p style={{ fontSize: 13, color: "#54595F", lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>
            {phase.description}
          </p>
        </div>

        {/* Mockup Area */}
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "#B0BEDD", textTransform: "uppercase",
            letterSpacing: 1.5, marginBottom: 14,
          }}>
            UI Vorschau
          </div>
          <MockupComponent />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        maxWidth: 520, margin: "20px auto 0",
        display: "flex", justifyContent: "space-between", gap: 12,
      }}>
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          style={{
            flex: 1, padding: "13px", borderRadius: 8,
            border: "1.5px solid #38454A",
            background: "transparent",
            color: active === 0 ? "#38454A" : "#8A9BC0",
            fontSize: 13, fontWeight: 600, cursor: active === 0 ? "default" : "pointer",
            fontFamily: "'Roboto', sans-serif", transition: "all 0.2s",
          }}
        >
          ← Zurück
        </button>
        <button
          onClick={() => setActive(Math.min(phases.length - 1, active + 1))}
          disabled={active === phases.length - 1}
          style={{
            flex: 1, padding: "13px", borderRadius: 8, border: "none",
            background: active === phases.length - 1 ? "#38454A" : "#224DB7",
            color: active === phases.length - 1 ? "#7A7A7A" : "#fff",
            fontSize: 13, fontWeight: 700, cursor: active === phases.length - 1 ? "default" : "pointer",
            fontFamily: "'Roboto', sans-serif", transition: "all 0.2s",
            boxShadow: active < phases.length - 1 ? "0 4px 16px #224DB744" : "none",
          }}
        >
          Weiter →
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 32, color: "#38454A", fontSize: 11 }}>
        Hackathon Konzept · EdustainConnect.org
      </div>
    </div>
  );
}
