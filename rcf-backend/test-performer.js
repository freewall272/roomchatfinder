import fetch from "node-fetch";
import "dotenv/config";

async function testLiveFeed(name, brand) {
  const API_KEY = process.env.PERFORMERS_API_KEY;
  const TOKEN = process.env.PERFORMERS_TOKEN;

  const params = new URLSearchParams({
    token: TOKEN,
    name: name,         // EXACT MATCH
    brands: brand,      // MUST match systemSource
    live: "true",
    size: "1",
    page: "1"
  });

  const url = `https://performersext-api.pcvdaa.com/performers-ext?${params}`;
  console.log("FETCH:", url);

  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY, "User-Agent": "MyServer" }
  });

  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

testLiveFeed("uwunikaa", "chaturbate");

