// src/routes/+page.server.js
const API_BASE = "http://api.dimecams.com/performers"; 
// ↑ change to your real backend URL in production

export async function load({ fetch }) {
  // Get a decent batch so we can sort/filter on the frontend
  const params = new URLSearchParams({
    live: "true",
    page: "1",
    size: "200"
  });

  const res = await fetch(`${API_BASE}?${params.toString()}`);

  if (!res.ok) {
    console.error("❌ Failed to fetch performers:", res.status);
    return {
      performers: []
    };
  }

  const json = await res.json();

  return {
    performers: json.performers || []
  };
}
