import { useRef } from "react";

export default function PreviewCV({ cvData, onBack, onRestart }) {
  const cvRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  if (!cvData) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .cv-container { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Top bar */}
      <div className="no-print" style={{ padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a0f" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "18px" }}>←</button>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#fff" }}>C</div>
            <span style={{ color: "#fff", fontWeight: "500", fontSize: "15px" }}>CVGenius</span>
          </div>
          <div style={{ padding: "4px 12px", borderRadius: "100px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", fontSize: "11px", color: "#a5b4fc" }}>
            ✦ Généré par IA
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onRestart} style={{ padding: "9px 20px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
            Nouveau CV
          </button>
          <button onClick={handlePrint} style={{ padding: "9px 20px", borderRadius: "8px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "500" }}>
            ↓ Exporter en PDF
          </button>
        </div>
      </div>

      {/* CV Preview */}
      <div style={{ padding: "40px 24px", display: "flex", justifyContent: "center" }}>
        <div ref={cvRef} className="cv-container" style={{
          width: "794px", minHeight: "1123px", background: "#fff",
          borderRadius: "4px", overflow: "hidden",
          boxShadow: "0 0 80px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.6s ease forwards",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          {/* CV Header */}
          <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "44px 48px 36px", color: "#fff" }}>
            <h1 style={{ margin: "0 0 6px", fontSize: "32px", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em", fontWeight: "700" }}>
              {cvData.nom_complet}
            </h1>
            <p style={{ margin: "0 0 20px", fontSize: "16px", color: "rgba(165,180,252,0.9)", fontWeight: "400" }}>
              {cvData.poste_cible}
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                cvData.email && { icon: "✉", val: cvData.email },
                cvData.telephone && { icon: "✆", val: cvData.telephone },
                cvData.ville && { icon: "◎", val: cvData.ville },
              ].filter(Boolean).map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                  <span style={{ fontSize: "11px" }}>{item.icon}</span> {item.val}
                </span>
              ))}
            </div>
          </div>

          {/* CV Body */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: "calc(1123px - 160px)" }}>

            {/* Left column */}
            <div style={{ padding: "36px 40px", borderRight: "1px solid #f1f5f9" }}>

              {/* Résumé */}
              {cvData.resume_professionnel && (
                <section style={{ marginBottom: "32px" }}>
                  <h2 style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 12px", paddingBottom: "8px", borderBottom: "2px solid #e0e7ff" }}>
                    Profil
                  </h2>
                  <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.75", margin: 0 }}>
                    {cvData.resume_professionnel}
                  </p>
                </section>
              )}

              {/* Expériences */}
              {cvData.experiences?.length > 0 && (
                <section style={{ marginBottom: "32px" }}>
                  <h2 style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 16px", paddingBottom: "8px", borderBottom: "2px solid #e0e7ff" }}>
                    Expériences professionnelles
                  </h2>
                  {cvData.experiences.map((exp, i) => (
                    <div key={i} style={{ marginBottom: "22px", paddingLeft: "16px", borderLeft: "2px solid #e0e7ff" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: "600", color: "#111827" }}>{exp.poste}</div>
                          <div style={{ fontSize: "13px", color: "#6366f1", fontWeight: "500" }}>{exp.entreprise}</div>
                        </div>
                        <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: "12px", marginTop: "2px" }}>{exp.periode}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.65", margin: "8px 0 0" }}>{exp.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Formations */}
              {cvData.formations?.length > 0 && (
                <section>
                  <h2 style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 16px", paddingBottom: "8px", borderBottom: "2px solid #e0e7ff" }}>
                    Formation
                  </h2>
                  {cvData.formations.map((f, i) => (
                    <div key={i} style={{ marginBottom: "16px", paddingLeft: "16px", borderLeft: "2px solid #e0e7ff" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>{f.diplome}</div>
                          <div style={{ fontSize: "13px", color: "#6b7280" }}>{f.etablissement}</div>
                        </div>
                        <span style={{ fontSize: "11px", color: "#9ca3af" }}>{f.annee}</span>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>

            {/* Right column */}
            <div style={{ padding: "36px 28px", background: "#f8fafc" }}>

              {/* Compétences */}
              {cvData.competences?.length > 0 && (
                <section style={{ marginBottom: "32px" }}>
                  <h2 style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 14px", paddingBottom: "8px", borderBottom: "2px solid #e0e7ff" }}>
                    Compétences
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {cvData.competences.map((comp, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "#374151" }}>{comp}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Langues */}
              {cvData.langues?.length > 0 && (
                <section>
                  <h2 style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", margin: "0 0 14px", paddingBottom: "8px", borderBottom: "2px solid #e0e7ff" }}>
                    Langues
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {cvData.langues.map((lang, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", color: "#374151" }}>{lang}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
