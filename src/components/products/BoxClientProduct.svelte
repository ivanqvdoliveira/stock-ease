<script>
  import { clientViewFullList } from "../../store/stores";
  import { GENERATE_PHOTO_URL } from "../../utils/paths";
  import { splitMoney } from "../../utils/splitMoney";
  import DetailClientViewProductModal from "../modals/DetailClientViewProductModal.svelte";

  let productSelected = {};
  let showModal = false

  const handleClickDetails = (product) => {
    productSelected = product;
    showModal = true;
  };

  const closeModal = () => {
    productSelected = {};
    showModal = false;
  }
</script>

<DetailClientViewProductModal {closeModal} {productSelected} {showModal} />

{#each $clientViewFullList as product}
  <div class="w-[385px] border border-primary">
    <div class="mb-5">
      <img
        src={(product.images && product.images.length > 0)
          ? product.images[0]
          : GENERATE_PHOTO_URL}
        alt={`produto - ${product.title}`}
        class="mr-3 rounded-sm object-cover w-full h-[385px]"
      /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2 text-secondary-content">{product.title}</h1>
      <p class="text-gray-500">{product.description}</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline text-secondary">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">{splitMoney(product.salePrice).integer}</span>
          <span class="text-sm">,{splitMoney(product.salePrice).decimal || '00'}</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button
        on:click={() => handleClickDetails(product)}
        class="border border-primary w-full bg-primary hover:bg-primary-dark text-primary-light font-bold p-3"
      >+ Detalhes</button>
    </div>
  </div>
{/each}
