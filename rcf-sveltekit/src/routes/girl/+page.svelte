export async function load({ fetch, url }) {
  const page = url.searchParams.get("page") || 1;
  const size = url.searchParams.get("size") || 50;

  const res = await fetch(
    `https://your-backend.com/performers?gender=f&page=${page}&size=${size}`
  );

  const performers = await res.json();
  return { performers };
}
