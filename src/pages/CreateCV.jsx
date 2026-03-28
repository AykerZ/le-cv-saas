import { useState } from "react";

const steps = ["Infos personnelles", "Expériences", "Formation", "Compétences"];

export default function CreateCV({ onBack, onGenerate }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", ville: "", poste: "",
    experiences: [{ poste: "", entreprise: "", periode: "", description: "" }],
    formations: [{ diplome: "", etablissement: "", annee: "" }],
    competences: "", langues: "", resume: ""
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const updateExp = (i, field, value) => {
    const exps = [...form.experiences];
    exps[i][field] = value;
    setForm(prev => ({ ...prev, experiences: exps }));
  };
  const updateForm = (i, field, value) => {
    const forms = [...form.formations];
    forms[i][field] = value;
    setForm(prev => ({ ...prev, formations: forms }));
  };

  const addExp = () => setForm(prev => ({
    ...prev, experiences: [...prev.experiences, { poste: "", entreprise: "", periode: "", description: "" }]
  }));
  const addForm = () => setForm(prev => ({
    ...prev, formations: [...prev.formations, { diplome: "", etablissement: "", annee: "" }]
  }));

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Tu es un expert en rédaction de CV professionnels en français. 
            
À partir des informations suivantes, génère un CV professionnel complet et percutant. 
Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks.

Format JSON attendu:
{
  "nom_complet": "...",
  "poste_cible": "...",
  "email": "...",
  "telephone": "...",
  "ville": "...",
  "resume_professionnel": "Un résumé accrocheur de 3-4 phrases",
  "experiences": [
    {
      "poste": "...",
      "entreprise": "...",
      "periode": "...",
      "description": "Description professionnelle et percutante de 2-3 lignes avec les réalisations clés"
    }
  ],
  "formations": [
    {
      "diplome": "...",
      "etablissement": "...",
      "annee": "..."
    }
  ],
  "competences": ["compétence 1", "compétence 2", "..."],
  "langues": ["langue 1", "langue 2"]
}

Informations du candidat:
- Prénom: ${form.prenom}
- Nom: ${form.nom}
- Email: ${form.email}
- Téléphone: ${form.telephone}
- Ville: ${form.ville}
- Poste visé: ${form.poste}
- Résumé personnel: ${form.resume}
- Expériences: ${JSON.stringify(form.experiences)}
- Formations: ${JSON.stringify(form.formations)}
- Compétences: ${form.competences}
- Langues: ${form.langues}

Améliore et professionnalise les descriptions. Utilise des verbes d'action forts.`;

const response = await fetch("https://le-cv-saas-production.up.railway.app/api/generate-cv", {
```        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      const cvJson = data.data;
      onGenerate(cvJson);
    } catch (err) {
      console.error("Erreur IA:", err);
      alert("Une erreur est survenue. Vérifiez votre clé API dans le fichier App.jsx");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "8px", fontSize: "14px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s"
  };
  const labelStyle = { fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "6px", display: "block", fontWeight: "500" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "20px", padding: "4px" }}>←</button>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" }}>C</div>
          <span style={{ fontWeight: "500" }}>CVGenius</span>
        </div>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Steps indicator */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: "3px", borderRadius: "2px", background: i <= step ? "linear-gradient(90deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.1)", marginBottom: "8px", transition: "all 0.3s" }} />
              <span style={{ fontSize: "11px", color: i <= step ? "#a5b4fc" : "rgba(255,255,255,0.3)", fontWeight: i === step ? "500" : "400" }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 0 — Infos perso */}
        {step === 0 && (
          <div>
            <h2 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>Informations personnelles</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>Ces informations apparaîtront en haut de votre CV.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[["prenom", "Prénom"], ["nom", "Nom"], ["email", "Email"], ["telephone", "Téléphone"], ["ville", "Ville"], ["poste", "Poste visé"]].map(([key, label]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input style={inputStyle} value={form[key]} onChange={e => update(key, e.target.value)}
                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    placeholder={label} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Résumé personnel (optionnel)</label>
              <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                value={form.resume} onChange={e => update("resume", e.target.value)}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                placeholder="Décrivez brièvement votre profil..." />
            </div>
          </div>
        )}

        {/* Step 1 — Expériences */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>Expériences professionnelles</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>L'IA va enrichir et professionnaliser vos descriptions.</p>
            {form.experiences.map((exp, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", color: "#818cf8", fontWeight: "500", marginBottom: "16px" }}>Expérience {i + 1}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  {[["poste", "Poste occupé"], ["entreprise", "Entreprise"], ["periode", "Période (ex: 2022-2024)"]].map(([key, label]) => (
                    <div key={key} style={{ gridColumn: key === "periode" ? "1 / -1" : "auto" }}>
                      <label style={labelStyle}>{label}</label>
                      <input style={inputStyle} value={exp[key]} onChange={e => updateExp(i, key, e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder={label} />
                    </div>
                  ))}
                </div>
                <label style={labelStyle}>Description des missions</label>
                <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
                  value={exp.description} onChange={e => updateExp(i, "description", e.target.value)}
                  onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  placeholder="Décrivez vos missions, même brièvement. L'IA s'occupe du reste." />
              </div>
            ))}
            <button onClick={addExp} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "transparent", border: "1px dashed rgba(99,102,241,0.3)", color: "#818cf8", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
              + Ajouter une expérience
            </button>
          </div>
        )}

        {/* Step 2 — Formation */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>Formation</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>Vos diplômes et certifications.</p>
            {form.formations.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", color: "#818cf8", fontWeight: "500", marginBottom: "16px" }}>Formation {i + 1}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[["diplome", "Diplôme / Titre"], ["etablissement", "Établissement"], ["annee", "Année"]].map(([key, label]) => (
                    <div key={key}>
                      <label style={labelStyle}>{label}</label>
                      <input style={inputStyle} value={f[key]} onChange={e => updateForm(i, key, e.target.value)}
                        onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        placeholder={label} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={addForm} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "transparent", border: "1px dashed rgba(99,102,241,0.3)", color: "#818cf8", cursor: "pointer", fontFamily: "inherit", fontSize: "13px" }}>
              + Ajouter une formation
            </button>
          </div>
        )}

        {/* Step 3 — Compétences */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "24px", fontFamily: "'Playfair Display', serif", marginBottom: "6px" }}>Compétences & langues</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginBottom: "32px" }}>L'IA va les formater et les organiser pour vous.</p>
            <div>
              <label style={labelStyle}>Compétences (séparées par des virgules)</label>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                value={form.competences} onChange={e => update("competences", e.target.value)}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                placeholder="Ex: Excel, Gestion de projet, Communication, JavaScript, Adobe Photoshop..." />
            </div>
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Langues (séparées par des virgules)</label>
              <input style={inputStyle} value={form.langues} onChange={e => update("langues", e.target.value)}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                placeholder="Ex: Français (natif), Anglais (courant), Arabe (bilingue)" />
            </div>

            {/* Preview info */}
            <div style={{ marginTop: "32px", padding: "20px", borderRadius: "12px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div style={{ fontSize: "13px", color: "#a5b4fc", fontWeight: "500", marginBottom: "8px" }}>✦ Ce qui va se passer</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                L'IA va analyser toutes vos informations et générer un CV professionnel complet avec un résumé accrocheur, des descriptions de poste percutantes, et une mise en forme optimale pour les recruteurs.
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} style={{ padding: "12px 24px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
              ← Retour
            </button>
          ) : <div />}

          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} style={{ padding: "12px 32px", borderRadius: "8px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "500" }}>
              Continuer →
            </button>
          ) : (
            <button onClick={handleGenerate} disabled={loading} style={{ padding: "12px 32px", borderRadius: "8px", background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
              {loading ? (
                <>
                  <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  L'IA génère votre CV...
                </>
              ) : "✦ Générer mon CV"}
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
