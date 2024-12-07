<script>
  import ModalError from "./ModalError.svelte";
  import Scanner from "./Scanner.svelte";

  export let handleClickSearch;
  export let isScanning
  let showVideo = false;
  let msgError = null;
  let showModal = false;

  const stopScanner = () => {
    showVideo = false;
    msgError = null;
  };

  const closeModal = () => {
    showModal = false;
  };

  const handleError = (err) => {
    msgError = err;
    showModal = true;
    showVideo = false;
  };

  const handleDetected = (value) => {
    handleClickSearch(value);
    stopScanner();
  };

  const onScanningClick = () => {
    isScanning();
    showVideo = true;
  }
</script>

<div>
  <ModalError {showModal} {closeModal} {msgError}/>
  {#if showVideo}
    <div class="fixed w-screen h-screen bg-zinc-900 bg-opacity-70 top-0 left-0 z-[100] overflow-x-auto pb-8 flex-col items-center justify-center">
      <Scanner onDetected={handleDetected} onError={handleError} />
      <button
        class="btn fixed bottom-4 z-[999] w-full mx-7 left-4"
        on:click={stopScanner}
        theme="danger"
        size="s"
      >
        Cancelar Scanner
      </button>
    </div>
  {/if}
  <button
    type="button"
    aria-label="button-scanner"
    class="w-12 h-12 btn btn-square"
    on:click={onScanningClick}
    disabled={showVideo}
  >
    <i class="fa-solid fa-barcode"></i>
  </button>
</div>
