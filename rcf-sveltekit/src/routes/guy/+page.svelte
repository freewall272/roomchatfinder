<script>
  import RoomCard from "$lib/components/RoomCard.svelte";
  export let data;

  const { performers, page, size, count } = data;
</script>

<main class="p-4 bg-black text-white min-h-screen">

  <h1 class="text-3xl font-bold mb-4">Guys</h1>
  <p class="text-gray-400 mb-6">
    Showing {performers.length} models (Page {page})
  </p>

  <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    {#each performers as p}
      <RoomCard room={p} />
    {/each}
  </div>

  <div class="flex justify-center mt-10 gap-4">
    {#if page > 1}
      <a
        href={`/girl?page=${page - 1}&size=${size}`}
        class="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
      >← Prev</a>
    {/if}

    {#if page * size < count}
      <a
        href={`/girl?page=${page + 1}&size=${size}`}
        class="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700"
      >Next →</a>
    {/if}
  </div>

</main>
