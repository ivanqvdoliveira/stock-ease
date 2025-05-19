<script>
  import { db } from "../../firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { NEW_MODEL } from "../../utils/defaultForm";
  import { saveImageToStorage } from "../../requests/saveImage";
  import { productSchema } from "../schemas/productSchema";
  import { modelSchema } from "../schemas/modelSchema";
  import BarcodeScanner from "../BarcodeScanner/BarcodeScanner.svelte";
  import { validateBySchema } from "../../utils/validateBySchema";
  import AddProductForm from "../forms/AddProductForm.svelte";
  import { generateID } from "../../utils/generateID";

  export let closeModal
  export let showModal
  let invalids = { models: [] };
  let modal;
  let form = {};
  let formModel = [{ ...NEW_MODEL, model_id: generateID() }];
  let showScanner = false;
  let showErrorNotFilledMSg = false;
  let loading = false;

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
    const { invalid, hasError } = validateBySchema({ models: formModel }, modelSchema);

    if (hasError) {
      invalids = invalid;
      return;
    }

    invalids = { models: [] };
    formModel = [...formModel, { ...NEW_MODEL, model_id: generateID() }];
  };

  const resetForm = () => {
    formModel = [{ ...NEW_MODEL, model_id: generateID() }];
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

  const handleClickSearch = (value) => {
    form = { ...form, code: value };
  };

  const onScanningClick = () => {
    showScanner = true;
  };

  const handleClose = () => {
    showScanner = false;
  };

  const handleSubmitProduct = async () => {
    const data = {
    ...form,
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    models: formModel,
  };

   const { invalid, hasError } = validateBySchema(data, productSchema)

    if (hasError) {
      invalids = invalid;
      showErrorNotFilledMSg = true
      return;
    }

    try {
      for (let i = 0; i < formModel.length; i++) {
        const model = formModel[i];
        if (model.images && model.images.length > 0) {
          const uploadedImages = [];
          for (const image of model.images) {
            const pathName = `products/${form.code}/models/${i}/${image.name}`;
            const imageUrl = await saveImageToStorage(pathName, image);
            uploadedImages.push(imageUrl);
          }
          formModel[i].images = uploadedImages;
        }
      }

      loading = true
      await addDoc(collection(db, "products"), data);
      handleModalClose();
      loading = false
    } catch (error) {
      console.error("Erro ao adicionar produto: ", error);
    }
  };

  const imagesList = (images, index) => {
    formModel[index].images = images;
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
  <div class="modal-box max-w-[1060px] lg:w-2/3 shadow-none p-4">
    <div class="flex justify-between items-start">
      <h3 class="text-[25px] font-bold mb-8">Adicionar produto</h3>
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>

    {#if showErrorNotFilledMSg}
      <div class="alert alert-error shadow-lg mb-10">
        <div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Preencha todos os campos obrigatórios destacados em vermelho</span>
        </div>
      </div>
    {/if}

    {#if loading}
      <div class="flex justify-center items-center py-60">
        <div class="text-center">
          <div class="loading loading-spinner loading-lg"></div>
          <div class="text-center">
            <h3 class="text-2xl font-bold">Adicionando produto...</h3>
            <p class="text-gray-500">Aguarde um momento.</p>
          </div>
        </div>
      </div>
    {:else}
      <div class="modal-action justify-between items-center">
        <AddProductForm
          {onScanningClick}
          {showScanner}
          {invalids}
          {form}
          {formModel}
          {imagesList}
          {onChangeForm}
          {handleClickAddModel}
          {onChangeModelForm}
        />
      </div>
      <div class="modal-action justify-between items-center">
        <button
          type="button"
          aria-label="clear-form"
          class="btn btn-neutral btn-outline btn-sm"
          on:click={resetForm}
        >Limpar Formulario</button>
        <button
          type="submit"
          class="submit-custom-button"
          on:click={handleSubmitProduct}
        >Enviar</button>
      </div>
    {/if}

  </div>
</dialog>

<style lang="scss">
  .submit-custom-button {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
  }
</style>
