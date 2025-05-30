<script>
  export let productSelected;
  let currentImage = 0;

  const prevImage = () => {
    if (currentImage > 0) currentImage -= 1;
  }

  const nextImage = () => {
    if (currentImage < productSelected.images.length - 1) currentImage += 1;
  }
</script>

<div class="relative w-full">
  <img
    src={productSelected.images[currentImage] || GENERATE_PHOTO_URL}
    alt={`produto - ${currentImage}`}
    class="w-full max-h-[480px] mx-auto"
  />

  {#if currentImage > 0}
    <button class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
      on:click={prevImage} aria-label="Imagem anterior">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  {/if}

  {#if currentImage < productSelected.images.length - 1}
    <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
      on:click={nextImage} aria-label="Próxima imagem">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  {/if}
</div>
