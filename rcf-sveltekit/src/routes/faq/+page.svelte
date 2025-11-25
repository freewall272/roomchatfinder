<svelte:head>
  <title>FAQ - RoomChatFinder</title>
  <meta
    name="description"
    content="Find answers to frequently asked questions for fans and models on RoomChatFinder."
  />
</svelte:head>

<script>
  import { fly } from 'svelte/transition';

  const fansFaqs = [
    {
      q: "What is RoomChatFinder?",
      a: "RoomChatFinder is one of the first independent source of information about everything related to cams. No more time wasted surfing on the web, RoomChatFinder groups and segments the data and all related information about the camming world, reinventing the way cam fans searches for shows."
    },
    {
      q: "Do I need an account to watch?",
      a: "No, you can browse freely without an account. However, to chat or tip a model, you’ll need to sign up on the model’s host network."
    },
    {
      q: "Why do some streams open in a new tab?",
      a: "Because we redirect you directly to the model’s live room on their network — ensuring you get the official experience with real-time chat and tipping features."
    },
    {
      q: "What’s an adult cam site?",
      a: "An adult live webcam site is a network offering the technologies for the reception and transmission of audio-video signals to livestream erotic or pornographic performances. This creates the illusion that the remote participants are in the same room or allowing you to get a custom specific personalized experience, a direct communication between people in real-time. A place for live cam chats and meet ups with amateurs and professionals performers. A community that makes the experience beyond traditional porn sites."
    },
        {
      q: "The cam sites, are they really safe and is it free?",
      a: "Yes! businesses who manage the live cam sites are just like any other business and under the same law. Cam sites are sometimes more safe than many other site because of the age and legal restrictions. If a website advertises that it’s free to become a member then don’t worry, no fees will be charged even if a credit card is required. The credit card is only required to verify that you’re not a robot and that you are over 18 years old."
    },
        {
      q: "What’s an adult cam site?",
      a: "An adult live webcam site is a network offering the technologies for the reception and transmission of audio-video signals to livestream erotic or pornographic performances. This creates the illusion that the remote participants are in the same room or allowing you to get a custom specific personalized experience, a direct communication between people in real-time. A place for live cam chats and meet ups with amateurs and professionals performers. A community that makes the experience beyond traditional porn sites."
    }
  ];

  const modelsFaqs = [
    {
      q: "What are the benefits to be listed on RoomChatFinder?",
      a: "Whether you are already listed and have a RoomChatFinder profile or are already on a camsite waiting to be discovered, we aim to empower your cam performance by helping you to grow your audience and be competitive in our marketplace. We can all agree that there are an incredible number of live cam websites and performers so it can be frustrating to find the right cam shows. The information is spread all over the internet, making your ideal room really hard to find for future fans. On RoomChatFinder.com, your show is easier to find and you have free advertising."
    },
    {
      q: "I have a profile on RoomChatFinder and i did not register?",
      a: "RoomChatFinder is not a cam site, it’s a search engine registry listing, reviewing and reporting everything about the cam community, the cam site and the models. In collaboration with the cam sites, we collect the information about your cam and add it in a profile in order to facilitate the search for the live cams fans in one database regrouping multiple cam sites."
    },
    {
      q: "How can I update or remove my profile?",
      a: "If your model data appears incorrectly or you’d like it removed, please reach out through our contact page and we’ll look into it."
    }
  ];

  // no defaults open
  let openFans = new Set();
  let openModels = new Set();

  function toggle(set, index) {
    if (set.has(index)) set.delete(index);
    else set.add(index);
    // force reactivity
    if (set === openFans) openFans = new Set(set);
    else openModels = new Set(set);
  }
</script>

<section class="max-w-4xl mx-auto py-20 px-6 text-gray-100">
  <h1 class="text-4xl font-bold mb-8 ">FAQ</h1>
  

  <!-- 🌸 FANS SECTION -->
  <div class="mb-16">
    <h2 class="text-2xl font-semibold text-white mb-6 text-center border-b border-gray-800 pb-2">
      For Fans
    </h2>

    <div class="space-y-4">
      {#each fansFaqs as { q, a }, i}
        <div class="border border-gray-800 rounded-lg overflow-hidden bg-gray-900 hover:border-pink-600 transition">
          <button
            class="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            on:click={() => toggle(openFans, i)}
          >
            <span class="font-semibold text-white text-lg">{q}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 transition-transform duration-300"
              class:rotate-180={openFans.has(i)}
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openFans.has(i)}
            <div
              class="px-4 pb-4 text-gray-400 leading-relaxed"
              transition:fly={{ y: 10, duration: 200 }}
            >
              {a}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- 💃 MODELS SECTION -->
  <div>
    <h2 class="text-2xl font-semibold text-white mb-6 text-center border-b border-gray-800 pb-2">
      For Models
    </h2>

    <div class="space-y-4">
      {#each modelsFaqs as { q, a }, i}
        <div class="border border-gray-800 rounded-lg overflow-hidden bg-gray-900 hover:border-pink-600 transition">
          <button
            class="w-full flex justify-between items-center p-4 text-left focus:outline-none"
            on:click={() => toggle(openModels, i)}
          >
            <span class="font-semibold text-white text-lg">{q}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 transition-transform duration-300"
              class:rotate-180={openModels.has(i)}
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openModels.has(i)}
            <div
              class="px-4 pb-4 text-gray-400 leading-relaxed"
              transition:fly={{ y: 10, duration: 200 }}
            >
              {a}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @reference "tailwindcss";
  :global(body) {
    background-color: #000;
  }
</style>
