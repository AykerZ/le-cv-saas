const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk").default;

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/generate-cv", async function(req, res) {
  try {
    const prompt = req.body.prompt;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content.map(function(i) { return i.text || ""; }).join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const cvJson = JSON.parse(clean);

    res.json({ success: true, data: cvJson });
  } catch (err) {
    console.error("Erreur:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3001, function() {
  console.log("Serveur démarré sur http://localhost:3001");
});