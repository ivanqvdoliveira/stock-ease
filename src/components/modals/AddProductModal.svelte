<script>
  import { onMount } from "svelte";
  import { NEW_MODEL } from "../../utils/defaultForm";
  import BarcodeScanner from "../BarcodeScanner/BarcodeScanner.svelte";

  export let closeModal
  export let showModal
  let modal;
  let form = {};
  let formModel = [NEW_MODEL];
  let showScanner = false;

  const handleModalClose = () => {
    closeModal()
    if (modal) {
      modal.close();
    }
  };

  $: if (showModal && modal) {
    modal.showModal();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleModalClose();
    }
  };

  const handleClickAddModel = () => {
    formModel = [...formModel, NEW_MODEL];
  };

  const resetForm = () => {
    formModel = [NEW_MODEL];
    form = {};
  }

  const onChangeForm = (event) => {
    const { name, value } = event.target;
    form = { ...form, [name]: value };
  };

  const onChangeModelForm = (event, index) => {
    const { name, value } = event.target;
    formModel[index] = { ...formModel[index], [name]: value };
  };

  const onSubmitProduct = (event) => {
    event.preventDefault();
  };

  const handleClickSearch = (value) => {
    form = { ...form, code: value };
  };

  const onScanningClick = () => {
    showScanner = true;
  };

  const handleClose = () => {
    showScanner = false;
  };

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<dialog id="add_product_modal" class="modal" bind:this={modal}>
  <BarcodeScanner {handleClickSearch} {showScanner} {handleClose} />
  <div class="modal-box max-w-[980px] lg:w-1/2 shadow-none">
    <div class="flex justify-between items-start">
      <h3 class="text-[25px] font-bold mb-8">Adicionar produto</h3>
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>

    <form class="mx-auto" on:submit={onSubmitProduct}>
      <div class="z-0 md:gap-6 md:grid-cols-2 grid ">
        <div class="z-0 w-full mb-5 group">
          <div class="flex gap-3 items-center barcode-section">
              <button
                type="button"
                aria-label="button-scanner"
                class="w-12 h-12 btn btn-square"
                on:click={onScanningClick}
                disabled={showScanner}
              >
                <i class="fa-solid fa-barcode"></i>
              </button>

            <input
              type="text"
              name="code"
              id="code"
              class="input-modal peer"
              placeholder=" "
              required
              value={form?.code}
              on:change={onChangeForm}
            />
          </div>
          <label for="code"
            class="label-modal barcode rtl:peer-focus:translate-x-1/4">Código de barras / QRcode</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="brand"
            id="brand"
            class="input-modal peer"
            placeholder=" "
            required
            value={form?.brand}
            on:change={onChangeForm}
          />
          <label for="brand" class="label-modal rtl:peer-focus:translate-x-1/4">Fornecedor</label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="type"
            id="type"
            class="input-modal peer"
            placeholder=" "
            required
            value={form?.type}
            on:change={onChangeForm}
          />
          <label for="type" class="label-modal rtl:peer-focus:translate-x-1/4">Tipo</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            class="input-modal peer"
            placeholder=" "
            required
            value={form?.title}
            on:change={onChangeForm}
          />
          <label for="title" class="label-modal rtl:peer-focus:translate-x-1/4">Título</label>
        </div>
      </div>
      <div class="relative z-0 w-full mb-5 group">
        <textarea
          type="text"
          name="description"
          id="description"
          class="input-modal peer"
          placeholder=" "
          required
          value={form?.description}
          on:change={onChangeForm}
        ></textarea>
        <label for="description" class="label-modal rtl:peer-focus:translate-x-1/4">Descrição</label>
      </div>
      <div class="bg-white bg-opacity-70 p-3">
        <h3 class="w-full text-center mb-5">Modelos</h3>

        <div class="flex gap-3 flex-wrap">
          {#each formModel as model, index}
            <div class="w-full md:w-[280px]">
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="image"
                  id="image"
                  class="input-modal peer"
                  placeholder=" "
                  value={formModel[index].image}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="image" class="label-modal rtl:peer-focus:translate-x-1/4">Modelo</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="color"
                  id="color"
                  class="input-modal peer"
                  placeholder=" "
                  required
                  value={formModel[index].color}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="color" class="label-modal rtl:peer-focus:translate-x-1/4">Cor</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="size"
                  id="size"
                  class="input-modal peer"
                  placeholder=" "
                  required
                  value={formModel[index].size}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="size" class="label-modal rtl:peer-focus:translate-x-1/4">Tamanho</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  class="input-modal peer"
                  placeholder=" "
                  required
                  value={formModel[index].quantity}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="quantity" class="label-modal rtl:peer-focus:translate-x-1/4">Quantidade</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="salePrice"
                  id="salePrice"
                  class="input-modal peer"
                  placeholder=" "
                  required
                  value={formModel[index].salePrice}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="salePrice" class="label-modal rtl:peer-focus:translate-x-1/4">Preço de venda</label>
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="buyPrice"
                  id="buyPrice"
                  class="input-modal peer"
                  placeholder=" "
                  required
                  value={formModel[index].buyPrice}
                  on:change={(e) => onChangeModelForm(e, index)}
                />
                <label for="buyPrice" class="label-modal rtl:peer-focus:translate-x-1/4">Preço de compra</label>
              </div>
            </div>
          {/each}
          <button
            type="button"
            aria-label="button-add-model"
            class="border-2 border-dashed w-full md:w-[280px] min-h-64"
            on:click={handleClickAddModel}
          >
            <i class="fa-solid fa-plus text-4xl"></i>
          </button>
        </div>
      </div>
      <div class="modal-action justify-between items-center">
        <button
          type="button"
          aria-label="clear-form"
          class="btn btn-neutral btn-outline btn-sm"
          on:click={resetForm}
        >Limpar Formulario</button>
        <button type="submit" class="submit-custom-button">Enviar</button>
      </div>
    </form>

  </div>
</dialog>

<style lang="scss">
  .input-modal {
    @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600;
  }
  .label-modal {
    @apply peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6;

    &.barcode {
      left: 60px;
    }
  }
  .submit-custom-button {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
  }
  .barcode-section {
    input {
      width: calc(100% - 70px);
    }
  }
</style>
