<script>
  import { splitMoney } from "../../utils/splitMoney";
  import { GENERATE_PHOTO_URL } from "../../utils/paths";

  export let productSelected;
  export let closeModal
  export let showModal
  let modal;

  const handleModalClose = () => {
    closeModal()
    modal.close();
  };

  $: if (showModal && modal) {
    modal.showModal();
  }
</script>


<dialog id={productSelected.model_id} class="modal" bind:this={modal}>
  <div class="modal-box modal-size max-w-none">
    <div class="flex justify-between items-start">
      <h3 class="text-[25px] font-bold mb-8">Modal de detalhe do produto</h3>
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>
    <div class="grid-image gap-6">
      <div class="w-full">
        <img src={`${GENERATE_PHOTO_URL}${productSelected.imgItem}`} alt="nature" class="max-w-full h-auto md:h-full" />
      </div>
      <div class="sm:px-5">
        <h4 class="text-[24px] font-bold">{productSelected.title}</h4>
        <p class="text-gray-500">{productSelected.description}</p>
        <div class="flex flex-wrap gap-5 items-start justify-between mt-6">
          <p class="description">
            <span class="">Código</span>
            <span class="text-lg">{productSelected.model_id}</span>
          </p>
          <p class="description">
            <span>Categoria</span>
            <span>{productSelected.category}</span>
          </p>
          <p class="description">
            <span>Cor</span>
            <span>{productSelected.color}</span>
          </p>
          <p class="description">
            <span>Tamanho</span>
            <span>{productSelected.size}</span>
          </p>
          <p class="description">
            <span>Estoque</span>
            <span>{productSelected.quantity}</span>
          </p>
        </div>
        <div>
          <p class="font-bold flex justify-end items-baseline mt-6">
            <span class="text-sm mr-1">R$</span>
            <span class="text-[35px]">{splitMoney(productSelected.salePrice).integer}</span>
            <span class="text-sm">,{splitMoney(productSelected.salePrice).decimal || '00'}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn bg-blue-500 text-white" on:click={handleModalClose}>Fechar</button>
      </form>
    </div>
  </div>
</dialog>

<style lang="scss">
  .modal-size {
    width: calc(100% - 30px);
    max-width: 920px;
  }
  .grid-image {
    display: grid;
    grid-template-columns: 350px calc(100% - 370px);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 250px calc(100% - 260px);
      gap: 10px;
    }

    @media (max-width: 640px) {
      grid-template-columns: 100%;
    }
  }

  p {
    &.description {
      span {
        display: block;

        &:first-of-type {
          font-weight: bold;
          text-transform: uppercase;
          font-family: "Roboto", sans-serif;
          font-weight: 100;
          font-size: 12px;
        }

        &:last-of-type {
          font-size: 1.125rem;
        }
      }
    }
  }

  h3, h4 {
    font-family: "Roboto", sans-serif;
    font-weight: 100;
  }
</style>
