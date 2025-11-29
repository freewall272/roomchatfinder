<script>
  import { onMount } from "svelte";
  import RoomCard from "$lib/components/RoomCard.svelte";

  export let data;

  const performers = data.performers;

  // --------- TOP MODELS (by systemScore/stars/score) ----------
  const topModels = [...performers].sort((a, b) => {
    const A = a.systemScore ?? a.stars ?? a.score ?? 0;
    const B = b.systemScore ?? b.stars ?? b.score ?? 0;
    return B - A;
  });

  // --------- NEW MODELS (created in last 14 days) ----------
  const newModels = performers.filter((p) => {
    if (!p.createdDate) return false;
    const created = new Date(p.createdDate);
    const daysOld = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    return daysOld <= 44;
  });

  // --------- TAGS (combined & unique) ----------
  const tags = [
    ...new Set(
      performers.flatMap((p) => [
        ...(p.customTags || []),
        ...(p.characteristicsTags || []),
        ...(p.autoTags || [])
      ])
    )
  ].slice(0, 40);

  // --------- RESPONSIVE VISIBLE COUNT ----------
  let screenWidth = 1200;

  onMount(() => {
    screenWidth = window.innerWidth;
    const handler = () => (screenWidth = window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  $: visibleCount = screenWidth < 640 ? 6 : 14;
</script>

<main class="p-4 flex flex-col gap-12 bg-black text-white min-h-screen">

  <!-- 🏆 TOP MODELS -->
  <section class="border-t border-gray-800 pt-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-semibold">Top Models</h2>
      <a href="/cams/f" class="text-sm text-pink-500 hover:text-pink-400">
        Show All →
      </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {#each topModels.slice(0, visibleCount) as room}
        <RoomCard {room} />
      {/each}
    </div>
  </section>

  <!-- 🆕 NEW MODELS -->
  <section class="border-t border-gray-800 pt-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-semibold">New Models</h2>
      <a href="/cams/f" class="text-sm text-pink-500 hover:text-pink-400">
        Show All →
      </a>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {#each newModels.slice(0, visibleCount) as room}
        <RoomCard {room} />
      {/each}
    </div>
  </section>

  <!-- 🏷️ TAGS -->
  <section class="border-t border-gray-800 pt-10 pb-16">
    <h2 class="text-xl font-semibold text-center mb-6">Browse Tags</h2>

    <div class="max-w-5xl mx-auto text-center flex flex-wrap justify-center gap-3 text-gray-400">
      {#each tags as tag}
        <a
          href={`/cams/female/${tag}`}
          class="hover:text-pink-400 transition"
        >
          #{tag}
        </a>
      {/each}
    </div>
  </section>

</main>
