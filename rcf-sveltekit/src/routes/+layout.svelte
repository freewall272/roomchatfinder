<script>
  import "../app.css";
  import Footer from "$lib/Footer.svelte";
  import Header from '$lib/components/Header.svelte';
  import BrandNavBar from "$lib/components/BrandNavBar.svelte";
  export let data;
</script>

  <Header />  

    


<div class="bg-black text-white min-h-screen flex flex-col">

  <!-- UNIVERSAL BRAND NAV (can hide on model pages) -->
  {#if data.showBrandNav !== false}
    <BrandNavBar basePath="/girl" />

  {/if}

  <!-- PAGE CONTENT -->
  <div class="flex-1">
    <slot />
  </div>
</div>
 <Footer />