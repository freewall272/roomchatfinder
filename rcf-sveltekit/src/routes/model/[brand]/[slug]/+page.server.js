import { error } from "@sveltejs/kit";

const API_BASE = "https://api.dimecams.com/performers";

export async function load({ params, fetch }) {
  const { brand, slug } = params;

  console.log("===============================================");
  console.log("🚀 MODEL PAGE LOAD START");
  console.log("➡️  URL Params:", { brand, slug });
  console.log("===============================================");

  // Safe fetch with retry + layered logging
  async function safeFetch(label, url, retries = 2) {
    console.log(`\n🟦 STEP: ${label}`);
    console.log(`🔵 Fetching URL: ${url}`);

    try {
      const res = await fetch(url);

      console.log(`📥 Response Status: ${res.status}`);

      if (!res.ok) {
        console.warn(`⚠️ API Error (${res.status}) on ${label}`);
        if (retries > 0) {
          console.log(`🔁 Retry Attempt (${3 - retries}/2)`);
          return safeFetch(label, url, retries - 1);
        }
        console.log("❌ No retries left for this step.");
        return null;
      }

      const json = await res.json();

      console.log(`📦 ${label} → Received performers: ${json.performers?.length || 0}`);
      return json;

    } catch (err) {
      console.error(`❌ NETWORK FAILURE during ${label}:`, err);
      if (retries > 0) {
        console.log(`🔁 Retrying ${label} (${3 - retries}/2)...`);
        return safeFetch(label, url, retries - 1);
      }
      console.log("❌ No retries left due to network error.");
      return null;
    }
  }

  // -------------------------------------------------------------
  // STEP 1 — Fetch BASE PROFILE (slug + brand)
  // -------------------------------------------------------------
  const baseUrl =
    `${API_BASE}?name=${slug}&brands=${brand}&size=1&page=1`;

  const baseJson = await safeFetch("BASE PROFILE LOOKUP", baseUrl);
  const base = baseJson?.performers?.[0];

  if (!base) {
    console.log("❌ Base performer not found. Throwing 404.");
    throw error(404, "Model not found");
  }

  console.log("\n🎯 BASE PERFORMER FOUND:");
  console.log({
    name: base.name,
    nameClean: base.nameClean,
    brand: base.systemSource,
    itemId: base.itemId
  });

  const realName = base.name;
  const realBrand = base.systemSource;

  // -------------------------------------------------------------
  // STEP 2 — Fetch LIVE DATA (name + brand + live=true)
  // -------------------------------------------------------------
  const liveUrl =
    `${API_BASE}?name=${realName}&brands=${realBrand}&live=true&size=1&page=1`;

  const liveJson = await safeFetch("LIVE CHECK", liveUrl);
  const live = liveJson?.performers?.[0];

  // -------------------------------------------------------------
  // STEP 3 — Merge live fields into base profile
  // -------------------------------------------------------------
  if (live) {
    console.log("\n🟢 PERFORMER IS LIVE!");
  } else {
    console.log("\n🔴 Performer is offline.");
  }

  base.isLive = !!live;

  // Normalize iframeFeedUrl casing from provider
  base.iframeFeedUrl =
    live?.iframeFeedUrl ||
    live?.iframeFeedURL ||
    null;

  // Live room URL, fallback to static profile URL
  base.roomUrl = live?.roomUrl || base.roomUrl;

  console.log("\n✔️ FINAL MERGED PERFORMER OBJECT:");
  console.log({
    name: base.name,
    nameClean: base.nameClean,
    brand: realBrand,
    isLive: base.isLive,
    roomUrl: base.roomUrl,
    iframeFeedUrl: base.iframeFeedUrl ? "iframe found" : "no iframe",
  });

  console.log("===============================================");
  console.log("🏁 MODEL PAGE LOAD COMPLETE");
  console.log("===============================================\n");

  return {
    performer: base
  };
}
