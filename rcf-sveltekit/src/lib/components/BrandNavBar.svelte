<script>
  export let basePath = "/girl"; // default, but can be overridden

  export let brands = [
    { id: "chaturbate", label: "Chaturbate", logo: "/logos/chaturbate.png" },
    { id: "streamate", label: "Streamate", logo: "/logos/streamate.png" },
    { id: "mfc", label: "MyFreeCams", logo: "/logos/bongacams.png" },
    { id: "stripchat", label: "Stripchat", logo: "/logos/sripchat.png" },
    { id: "jerkmate", label: "Jerkmate", logo: "/logos/jerkmate.png" }
  ];
</script>

<div class="w-full bg-gray-900 border-b border-gray-800 px-4 py-3 flex gap-4 overflow-x-auto">
  {#each brands as b}
    <a
  href={`${basePath}/${b.id}`}
  class="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700 transition whitespace-nowrap"
>
      <img src={b.logo} alt={b.label} class="w-5 h-5 object-contain" />
      <span class="text-sm">{b.label}</span>
    </a>
  {/each}
</div>
