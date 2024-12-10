<script>
  export let showModal;
  export let closeModal;
  export let msgError;
  let modal;

  const handleModalClose = () => {
    closeModal()
    if (modal) {
      modal.close();
    }
  };

  $: if (showModal && modal) {
    modal.showModal();
  }

  $: if (msgError) {
    msgError = msgError;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleModalClose();
    }
  };
</script>

<dialog id="barcode-scanner" class="modal" bind:this={modal}>
  <div class="modal-box max-w-[980px] w-[calc(100% - 30px)] md:w-1/2 shadow-none">
    <div class="flex justify-between items-start">
      <h3 class="text-[25px] font-bold mb-8">Erro encontrado!</h3>
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>
    <div class="block">
      <p class="font-bold">Houve um erro ao tentar capturar o código de barras, motivo:</p>
      {#if msgError}
        <p>- {msgError}</p>
      {/if}
    </div>
    <div class="modal-action justify-end items-center">
      <button type="button" on:click={handleModalClose} class="submit-custom-button">Ok</button>
    </div>
  </div>
</dialog>
