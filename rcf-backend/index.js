import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// Universal proxy for all filters
app.get("/performers", async (req, res) => {
  try {
    const API_KEY = process.env.PERFORMERS_API_KEY;
    const TOKEN = process.env.PERFORMERS_TOKEN;

    if (!API_KEY || !TOKEN) {
      return res.status(500).json({
        error: "Missing API credentials."
      });
    }

    // Forward all query params
    const params = new URLSearchParams(req.query);
    params.set("token", TOKEN); // required

    const upstreamUrl = `https://performersext-api.pcvdaa.com/performers-ext?${params.toString()}`;

    const upstream = await fetch(upstreamUrl, {
      headers: {
        "x-api-key": API_KEY,
        "User-Agent": "MyServer/1.0",
      },
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: "Upstream API error"
      });
    }

    const data = await upstream.json();
    res.json(data);

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 API running on port ${PORT}`));
