const BACKEND = import.meta.env.VITE_BACKEND_URL; 

export async function fetchCams(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BACKEND}/performers?${query}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");

  return res.json();
}
