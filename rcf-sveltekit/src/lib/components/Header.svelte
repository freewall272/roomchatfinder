<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { tags, fetchRooms, selectedTag, selectedGender } from '$lib/roomsStore.js';

  $: currentPath = $page.url.pathname; // to detect if we're on the homepage

  onMount(async () => {
    if ($tags.length === 0) await fetchRooms();
  });

  function selectTag(tag) {
    // Toggle selection
    const isSameTag = tag === $selectedTag;
    selectedTag.set(isSameTag ? null : tag);

    // 🏠 If we're on the homepage, navigate to /f
    if (currentPath === '/' && !isSameTag) {
      selectedGender.set('f');
      goto('/f');
    }
  }

  function changeGender(g) {
    selectedGender.set(g);
    selectedTag.set(null);
    goto(`/${g}`);
  }
</script>

<header class="w-full bg-black border-b border-gray-800 text-white">
  <!-- 🖼️ Logo -->
  <div class="flex items-center justify-center sm:justify-start px-6 py-3 border-b border-gray-800">
    <a href="/" class="flex items-center gap-3">
      <img src="/logo.png" alt="Logo" class="h-18 w-auto object-contain" />
      <h1 class="text-xl sm:text-2xl font-semibold tracking-wide">RoomChatFinder</h1>
    </a>
  </div>

  <!-- 🌈 TAG SCROLLER -->
  <div class="px-4 py-2 bg-black">
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {#each $tags as tag}
        <button
          on:click={() => selectTag(tag)}
          class="snap-start whitespace-nowrap flex-shrink-0 cursor-pointer px-3 py-1.5 rounded-full
                 text-sm sm:text-base transition
                 { $selectedTag === tag
                    ? 'bg-pink-600 text-white'
                    : 'bg-zinc-800 text-white hover:bg-pink-600' }"
        >
          #{tag}
        </button>
      {/each}
    </div>
  </div>

  <!-- 🚻 GENDER LINKS -->
  <div class="flex justify-between gap-2 px-4 pb-3 overflow-x-auto border-t border-gray-800 bg-black">
    {#each [
      { label: 'Girls', value: 'f' },
      { label: 'Guys', value: 'm' },
      { label: 'Couples', value: 'c' },
      { label: 'Trans', value: 't' }
    ] as g}
      <button
        on:click={() => changeGender(g.value)}
        class="flex-1 min-w-[70px] py-3 rounded-md font-semibold text-xs sm:text-sm uppercase tracking-wide text-center
               transition { $selectedGender === g.value
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-pink-600' }"
      >
        {g.label}
      </button>
    {/each}
  </div>
</header>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
