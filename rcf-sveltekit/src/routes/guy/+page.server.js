const API_BASE = "https://api.dimecams.com/performers";

export async function load({ url, fetch }) {
  const page = url.searchParams.get("page") || 1;
  const size = url.searchParams.get("size") || 60;

  const apiUrl = `${API_BASE}?gender=m&page=${page}&size=${size}`;
  console.log("🔵 Fetching Guys:", apiUrl);

  const res = await fetch(apiUrl);
  const json = res.ok ? await res.json() : { performers: [], count: 0 };

  return {
    gender: "guy",
    performers: json.performers || [],
    count: json.count || 0,
    page: Number(page),
    size: Number(size)
  };
}
