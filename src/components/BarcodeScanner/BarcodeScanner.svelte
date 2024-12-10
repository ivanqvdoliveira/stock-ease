<script>
  import ModalError from "./ModalError.svelte";
  import Scanner from "./Scanner.svelte";

  export let showScanner = false
  export let handleClose

  export let handleClickSearch;
  let msgError = null;
  let showModal = false;

  const stopScanner = () => {
    msgError = null;
    handleClose()
  };

  const closeModal = () => {
    showModal = false;
    handleClose()
  };

  const handleError = (err) => {
    msgError = err;
    showModal = true;
  };

  const handleDetected = (value) => {
    handleClickSearch(value);
    stopScanner();
  };

</script>

<div>
  <ModalError {showModal} {closeModal} {msgError}/>
  {#if showScanner}
    <div class="fixed w-screen h-screen bg-zinc-900 bg-opacity-70 top-0 left-0 z-[100] overflow-x-auto pb-8 flex-col items-center justify-center">
      <Scanner onDetected={handleDetected} onError={handleError} />
      <button
        class="btn bg-sky-800 text-sky-200 button-close"
        on:click={stopScanner}
        theme="danger"
        size="s"
      >
        Cancelar Scanner
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
  .button-close {
    position: fixed;
    bottom: 15px;
    left: 15px;
    width: calc(100% - 30px);
    z-index: 999;
  }
</style>
