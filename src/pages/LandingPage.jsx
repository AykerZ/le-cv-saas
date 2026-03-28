import { useState, useEffect } from "react";

export default function LandingPage({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden",
      position: "relative"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />

      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "fixed", top: "60%", left: "-10%", width: "500px", height: "500px",
        borderRadius: "50%", background: "rgba(99,102,241,0.05)", filter: "blur(80px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", top: "20%", right: "-5%", width: "400px", height: "400px",
        borderRadius: "50%", background: "rgba(139,92,246,0.06)", filter: "blur(80px)", pointerEvents: "none"
      }} />

      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "700", color: "#fff"
          }}>C</div>
          <span style={{ color: "#fff", fontWeight: "500", fontSize: "16px", letterSpacing: "-0.02em" }}>CVGenius</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onStart} style={{
            padding: "9px 22px", borderRadius: "8px", fontSize: "13px",
            background: "rgba(99,102,241,0.15)", color: "#a5b4fc",
            border: "1px solid rgba(99,102,241,0.3)", cursor: "pointer", fontFamily: "inherit"
          }}>Se connecter</button>
          <button onClick={onStart} style={{
            padding: "9px 22px", borderRadius: "8px", fontSize: "13px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
            border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: "500"
          }}>Commencer gratuitement</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "100px 48px 60px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "6px 16px", borderRadius: "100px",
          background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
          marginBottom: "32px"
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} />
          <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: "500", letterSpacing: "0.05em" }}>
            PROPULSÉ PAR L'INTELLIGENCE ARTIFICIELLE
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 6vw, 72px)", fontWeight: "700",
          fontFamily: "'Playfair Display', serif",
          color: "#fff", lineHeight: "1.1", letterSpacing: "-0.02em",
          margin: "0 0 8px"
        }}>
          Votre CV parfait,
        </h1>
        <h1 style={{
          fontSize: "clamp(42px, 6vw, 72px)", fontWeight: "700",
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          background: "linear-gradient(135deg, #818cf8, #c084fc)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: "1.1", letterSpacing: "-0.02em", margin: "0 0 28px"
        }}>
          en quelques secondes.
        </h1>

        <p style={{
          fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7",
          maxWidth: "560px", margin: "0 auto 48px", fontWeight: "300"
        }}>
          Décrivez votre parcours, notre IA génère un CV professionnel et percutant. Exportez en PDF, postulez avec confiance.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onStart} style={{
            padding: "16px 36px", borderRadius: "12px", fontSize: "15px", fontWeight: "500",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
            border: "none", cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            transition: "all 0.2s ease"
          }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Créer mon CV gratuitement →
          </button>
          <button style={{
            padding: "16px 36px", borderRadius: "12px", fontSize: "15px",
            background: "transparent", color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", fontFamily: "inherit"
          }}>
            Voir un exemple
          </button>
        </div>

        <p style={{ marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          1 CV gratuit · Aucune carte bancaire requise
        </p>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: "900px", margin: "0 auto", padding: "0 48px 80px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px",
        opacity: visible ? 1 : 0,
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
      }}>
        {[
          { icon: "✦", title: "Rédigé par l'IA", desc: "L'IA formule vos expériences avec les mots qui font la différence." },
          { icon: "◈", title: "Design professionnel", desc: "Des modèles épurés et modernes, appréciés des recruteurs." },
          { icon: "⬡", title: "Export PDF instantané", desc: "Téléchargez votre CV en un clic, prêt à envoyer." },
        ].map((f, i) => (
          <div key={i} style={{
            padding: "28px", borderRadius: "16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "all 0.2s ease"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.07)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <div style={{ fontSize: "20px", color: "#818cf8", marginBottom: "14px" }}>{f.icon}</div>
            <div style={{ fontSize: "15px", fontWeight: "500", color: "#fff", marginBottom: "8px" }}>{f.title}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: "1.6" }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{
        maxWidth: "700px", margin: "0 auto", padding: "0 48px 100px", textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "32px", fontFamily: "'Playfair Display', serif",
          color: "#fff", marginBottom: "8px"
        }}>Simple et transparent</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "40px" }}>
          Commencez gratuitement, payez seulement pour exporter.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { plan: "Gratuit", price: "0 €", features: ["1 CV généré", "Prévisualisation complète", "Modification illimitée"], cta: "Commencer", accent: false },
            { plan: "Pro", price: "9 €/mois", features: ["CV illimités", "Export PDF", "Modèles premium", "Priorité support"], cta: "Passer Pro", accent: true },
          ].map((p, i) => (
            <div key={i} style={{
              padding: "32px 28px", borderRadius: "16px",
              background: p.accent ? "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))" : "rgba(255,255,255,0.03)",
              border: p.accent ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
              textAlign: "left"
            }}>
              <div style={{ fontSize: "12px", color: p.accent ? "#a5b4fc" : "rgba(255,255,255,0.4)", fontWeight: "500", letterSpacing: "0.08em", marginBottom: "8px" }}>{p.plan.toUpperCase()}</div>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#fff", marginBottom: "24px", fontFamily: "'Playfair Display', serif" }}>{p.price}</div>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                  <span style={{ color: p.accent ? "#818cf8" : "rgba(255,255,255,0.3)" }}>✓</span> {f}
                </div>
              ))}
              <button onClick={onStart} style={{
                marginTop: "24px", width: "100%", padding: "12px", borderRadius: "8px",
                fontSize: "13px", fontWeight: "500", fontFamily: "inherit", cursor: "pointer",
                background: p.accent ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                color: p.accent ? "#fff" : "rgba(255,255,255,0.5)",
                border: p.accent ? "none" : "1px solid rgba(255,255,255,0.12)"
              }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
