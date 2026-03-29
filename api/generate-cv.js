const Anthropic = require("@anthropic-ai/sdk").default;

const client = new Anthropic({
apiKey: process.env.CLÉ_API_ANTHROPIC,});

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content.map((i) => i.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const cvJson = JSON.parse(clean);

    res.status(200).json({ success: true, data: cvJson });
  } catch (err) {
    console.error("Erreur:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};