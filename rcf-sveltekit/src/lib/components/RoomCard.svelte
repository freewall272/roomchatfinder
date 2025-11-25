<script>
  export let room;
  export let compact = false; // for smaller versions if needed later
</script>

<a
  href={room.chat_room_url_revshare}
  target="_blank"
  class="block hover:opacity-90 transition border border-gray-800 rounded-lg overflow-hidden bg-gray-900"
>
  <img
    src={room.image_url_360x270}
    alt={room.display_name}
    class={compact ? 'w-full h-[100px] object-cover' : 'w-full h-[190px] object-cover'}
  />
  <div class="p-2">
    <p class="text-sm font-semibold truncate text-white">{room.username}</p>
    <p class="text-xs text-gray-400">
      {room.age ? `${room.age} yrs` : 'Age hidden'}
    </p>
  </div>
</a>
