<script>
  export let room;
  export let compact = false;

const modelUrl = `/model/${room.systemSource}/${room.nameClean}`;


</script>

<a
  href={modelUrl}
  class="block hover:opacity-90 transition border border-gray-800 rounded-lg overflow-hidden bg-gray-900"
>
  <img
    src={room.thumbnailUrl}
    alt={room.name}
    class={compact
      ? 'w-full h-[100px] object-cover'
      : 'w-full h-[190px] object-cover'}
  />

  <div class="p-2">
    <p class="text-sm font-semibold truncate text-white">{room.name}</p>
    <p class="text-xs text-gray-400">
      {room.characteristic?.age ? `${room.characteristic.age} yrs` : 'Age hidden'}
    </p>

    {#if room.characteristic?.country}
      <p class="text-xs text-gray-500">{room.characteristic.country}</p>
    {/if}

    {#if room.live}
      <span class="inline-block mt-1 text-xs text-green-400 font-semibold">● LIVE</span>
    {/if}
  </div>
</a>
