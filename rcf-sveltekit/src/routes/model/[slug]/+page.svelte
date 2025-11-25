<script>
  export let data;
  const m = data.model;
</script>

{#if !m}
  <h1>Model not found.</h1>
{:else}
  <h1 class="text-3xl font-bold mb-4">{m.name}</h1>

  <img src={m.thumbnailUrl} class="rounded w-48 mb-4" />

  <p class="text-lg mb-4">
    {m.description || "No description available."}
  </p>

  <div class="space-y-2">
    <div>Age: {m.age}</div>
    <div>Gender: {m.gender}</div>
    <div>Country: {m.country}</div>
    <div>Languages: {m.languages?.join(", ")}</div>
  </div>

  {#if m.live}
    <a href={m.roomUrl} target="_blank" class="mt-6 inline-block bg-green-500 px-6 py-2 rounded-lg text-lg">
      Watch Live
    </a>
  {/if}
{/if}
