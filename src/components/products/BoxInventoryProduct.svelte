<script>
  import { GENERATE_PHOTO_URL } from "../../utils/paths";
  import { format } from "date-fns";
  import PhotoViewModal from "../modals/PhotoViewModal.svelte";
  import { formatterMoney } from "../../utils/formatter";
  import { onMount } from "svelte";

  export let listToShow;
  let detailID = null;
  let showModal = false
  let imgSelected = {};

  const handleClickDetails = (product) => {
    if (detailID === product.model_id) {
      detailID = null;
      return;
    }

    detailID = product.model_id;
  };

  const handleClickShowImage = (imgItem, id) => {
    imgSelected = { imgItem, id };
    showModal = true;
  }

  const closeModal = () => {
    imgSelected = {};
    showModal = false;
  }
</script>

<tbody>
  {#each listToShow as product}
    <tr class="border-b hover:bg-gray-100">
      <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        <button type="button" on:click={() => handleClickShowImage(product.imgItem, product.model_id)}>
          <img
            src={`${GENERATE_PHOTO_URL}${product.imgItem}`}
            alt={`produto - ${product.title}`}
            class="w-auto h-8 mr-3 min-w-6"
          />
        </button>
        {product.title}
      </th>
      <td class="px-4 py-2">
        <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
          {product.brand}
        </span>
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        <div class="flex items-center">
          {product.quantity}
        </div>
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {formatterMoney(product.salePrice)}
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {formatterMoney(product.buyPrice)}
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {product.category}
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
        {format(product.register_date, "dd/MM/yyyy")}
      </td>
      <td class="px-4 py-2">
        {#if product.status === "active"}
          <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
            Ativo
          </span>
        {:else}
          <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
            Inativo
          </span>
        {/if}
      </td>
      <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap justify-end items-end flex relative gap-4">
        <div class="inline-flex items-center flex-col relative w-9">
          <button
            type="button"
            aria-label="Botão de Detalhes"
            class="bg-primary hover:bg-primary-dark text-white w-9 h-9 items-center justify-center flex rounded-md"
            on:click={() => handleClickDetails(product)}
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          {#if detailID === product.model_id}
            <ul class="ul-custom mt-1 p-3 bg-slate-200 rounded whitespace-nowrap">
              <i class="tooltip-arrow fa-solid fa-caret-right"></i>
              <li class="description">
                <span>Description</span>
                <p>{product.description}</p>
              </li>
              <li>
                <span>Categoria do produto</span>
                <p>{product.categoy_product}</p>
              </li>
              <li>
                <span>Categoria do Modelo</span>
                <p>{product.category}</p>
              </li>
              <li>
                <span>Tamanho</span>
                <p>{product.size}</p>
              </li>
              <li>
                <span>Cor</span>
                <p>{product.color}</p>
              </li>
              <li>
                <span>Estilo</span>
                <p>{product.style}</p>
              </li>
              <li>
                <span>Material</span>
                <p>{product.material}</p>
              </li>
            </ul>
          {/if}
        </div>

        <button
          type="button"
          aria-label="Botão de Detalhes"
          class="bg-primary hover:bg-primary-dark border text-sky-100 w-9 h-9 items-center justify-center flex rounded-md"
        >
          <i class="fa-solid fa-pencil"></i>
        </button>
      </td>
    </tr>
  {/each}
</tbody>
<tfoot>
  <tr>
    <td>
      <PhotoViewModal {closeModal} {imgSelected} {showModal} />
    </td>
  </tr>
</tfoot>

<style>
  .ul-custom {
    position: absolute;
    z-index: 99;
    top: -20px;
    right: calc(100% + 7px);
    width: 480px;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 10px));
    gap: 20px;

    li {
      span {
        text-transform: uppercase;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 10px;
        display: block;
        color: #353535;
      }

      p {
        text-wrap: auto;
        color: #1d1d1d;
      }

      &.description {
        grid-column: 1 / -1;
      }
    }

    .tooltip-arrow {
      position: absolute;
      top: 27px;
      left: calc(100% - 3px);
      color: #373a3d;
    }
  }
</style>
