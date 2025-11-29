const API_BASE = "https://api.dimecams.com/performers";

export async function load({ params, url, fetch }) {
  const page = url.searchParams.get("page") || 1;
  const size = url.searchParams.get("size") || 60;

  const brand = params.brand.toLowerCase(); // chaturbate, streamate, etc.

  const apiUrl =
    `${API_BASE}?gender=f&live=true&brands=${brand}&page=${page}&size=${size}`;

  console.log("🔵 Fetching:", apiUrl);

  const res = await fetch(apiUrl);
  const json = res.ok ? await res.json() : { performers: [], count: 0 };

  return {
    gender: "girl",
    brand,
    performers: json.performers || [],
    count: json.count || 0,
    page: Number(page),
    size: Number(size),
    basePath: `/girl/${brand}`,
    showBrandNav: true
  };
}
