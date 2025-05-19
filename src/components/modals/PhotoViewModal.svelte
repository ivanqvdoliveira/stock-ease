<script>
  import { GENERATE_PHOTO_URL } from "../../utils/paths";

  export let imgSelected;
  export let closeModal
  export let showModal
  let modal;

  const handleModalClose = () => {
    closeModal()
    modal.close();
  };

  $: if (showModal && imgSelected.id) {
    modal.showModal();
  }
</script>

<dialog id={imgSelected.id} class="modal" bind:this={modal}>
  <div class="modal-box max-w-none w-auto shadow-none">
    <div class="flex justify-end items-start">
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-4">
      {#each imgSelected.images as image, index}
        <img
          src={image}
          alt={`produto - ${index}`}
          class="max-w-full max-h-[480px]"
        />
      {/each}
    </div>
    <div class="modal-action justify-center items-center">
      <button class="btn btn-sm bg-blue-500 text-white" on:click={handleModalClose}>Fechar</button>
    </div>
  </div>
</dialog>
