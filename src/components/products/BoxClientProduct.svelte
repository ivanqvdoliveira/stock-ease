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
  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src={`${GENERATE_PHOTO_URL}${product.imgItem}`} alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">{product.title}</h1>
      <p class="text-gray-500">{product.description}</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">{splitMoney(product.salePrice).integer}</span>
          <span class="text-sm">,{splitMoney(product.salePrice).decimal}</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={() => handleClickDetails(product)} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>
{/each}
