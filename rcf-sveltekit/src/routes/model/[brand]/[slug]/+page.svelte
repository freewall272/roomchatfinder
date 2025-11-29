<script>
  export let data;
  const p = data.performer;
</script>

<main class="p-4 bg-black text-white min-h-screen">

  <!-- NAME + Thumbnail -->
  <div class="flex items-center gap-4 mb-6">
    <img 
      src={p.thumbnailUrl}
      alt={p.name}
      class="w-32 h-32 object-cover rounded-lg border border-gray-700"
    />

    <div>
      <h1 class="text-3xl font-bold">{p.name}</h1>
      <p class="text-gray-400">@{p.nameClean}</p>

      {#if p.isLive}
        <a 
          href={p.roomUrl}
          target="_blank"
          class="mt-3 inline-block bg-green-500 text-black px-4 py-2 rounded-lg font-semibold"
        >
          ● Watch Live
        </a>
      {/if}
    </div>
  </div>

  <!-- LIVE FEED EMBED -->
  {#if p.isLive && p.iframeFeedUrl}
    <section class="my-6 w-full h-[70vh] rounded-lg overflow-hidden border border-gray-800">
      <a
        href={p.roomUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full h-full cursor-pointer"
        style="position:relative; width:100%; height:100%;"
      >
        <iframe
          src={p.iframeFeedUrl}
          frameborder="0"
          allow="autoplay; encrypted-media"
          class="w-full h-full"
          style="
            pointer-events:none;
            border:none;
            width:100%;
            height:100%;
          "
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      </a>
    </section>
  {/if}

  <!-- BASIC INFO -->
  <section class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 text-sm">
    <div><span class="text-gray-400">Age:</span> {p.characteristic?.age || "—"}</div>
    <div><span class="text-gray-400">Gender:</span> {p.characteristic?.gender}</div>
    <div><span class="text-gray-400">Country:</span> {p.characteristic?.country}</div>
    <div><span class="text-gray-400">Languages:</span> {p.characteristic?.languages?.join(", ")}</div>
    <div><span class="text-gray-400">Body:</span> {p.characteristic?.bodyTypes?.join(", ")}</div>
    <div><span class="text-gray-400">Ethnicity:</span> {p.characteristic?.ethnicities?.join(", ")}</div>
  </section>

  <!-- TAGS -->
  <section class="mb-10">
    <h2 class="text-xl font-semibold mb-3">Tags</h2>
    <div class="flex flex-wrap gap-2">
      {#each [
        ...(p.customTags || []),
        ...(p.characteristicsTags || []),
        ...(p.autoTags || [])
      ] as tag}
        <span class="px-2 py-1 text-xs bg-gray-800 rounded-full text-gray-300">
          #{tag}
        </span>
      {/each}
    </div>
  </section>

</main>
