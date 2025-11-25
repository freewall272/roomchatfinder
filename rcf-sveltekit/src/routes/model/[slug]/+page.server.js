import { fetchCams } from "$lib/api/cams.js";

export async function load({ params }) {
  const searchName = params.slug;

  const data = await fetchCams({
    nameClean: searchName,
    size: 1
  });

  const model = data[0] || null;

  return { model };
}
