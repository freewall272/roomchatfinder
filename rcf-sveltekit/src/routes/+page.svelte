<script>
  export let data;
</script>

<section class="px-6 py-12 text-white">
  <h1 class="text-3xl font-bold mb-6">Live Models</h1>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
    {#each data.performers as p}
      <a href={"/model/" + p.nameClean} class="block">
        <img
          src={p.thumbnailUrl}
          alt={p.name}
          class="w-full h-48 object-cover rounded-lg"
        />
        <p class="mt-2 font-semibold">{p.name}</p>
      </a>
    {/each}
  </div>
</section>
