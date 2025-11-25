import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Forward ALL performer queries
app.get("/performers", async (req, res) => {
  try {
    const API_KEY = process.env.PERFORMERS_API_KEY;
    const TOKEN = process.env.PERFORMERS_TOKEN;

    if (!API_KEY || !TOKEN) {
      return res.status(500).json({ error: "Missing API credentials." });
    }

    // Clone query params from frontend
    const params = new URLSearchParams(req.query);

    // ALWAYS enforce token
    params.set("token", TOKEN);

    // Build upstream URL
    const upstreamUrl = `https://performersext-api.pcvdaa.com/performers-ext?${params.toString()}`;

    console.log("🔵 Forwarding to upstream:", upstreamUrl);

    const upstream = await fetch(upstreamUrl, {
      headers: {
        "x-api-key": API_KEY,
        "User-Agent": "MyServer/1.0",
      }
    });

    if (!upstream.ok) {
      console.error("❌ Upstream failed:", upstream.status);
      return res.status(upstream.status).json({
        error: "Upstream API error",
      });
    }

    const data = await upstream.json();
    console.log("🟢 Upstream success");

    res.json(data);

  } catch (err) {
    console.error("🔥 Proxy error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 API running on port ${PORT}`));
