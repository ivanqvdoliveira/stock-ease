<script>
  import { clientViewFullList } from "../../store/stores";
  import { GENERATE_PHOTO_URL } from "../../utils/paths";
  import { format } from "date-fns";

  let detailID = null;

  const handleClickDetails = (product) => {
    if (detailID === product.model_id) {
      detailID = null;
      return;
    }

    detailID = product.model_id;
  };
</script>

{#each $clientViewFullList as product}
  <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
    <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <img
        src={`${GENERATE_PHOTO_URL}${product.imgItem}`}
        alt={`produto - ${product.title}`}
        class="w-auto h-8 mr-3"
      />
      {product.title}
    </th>
    <td class="px-4 py-2">
      <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
        {product.brand}
      </span>
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <div class="flex items-center">
        {product.quantity}
      </div>
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      R$ {product.salePrice}
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      R$ {product.buyPrice}
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {product.category}
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {format(product.register_date, "dd/MM/yyyy")}
    </td>
    <td class="px-4 py-2">
      {#if product.status === "active"}
        <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Ativo
        </span>
      {:else}
        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Inativo
        </span>
      {/if}
    </td>
    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white justify-end items-end flex relative gap-4">
      <div class="inline-flex items-center flex-col relative w-9">
        <button
          type="button"
          aria-label="Botão de Detalhes"
          class="bg-blue-500 text-white w-9 h-9 items-center justify-center flex rounded-md"
          on:click={() => handleClickDetails(product)}
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        {#if detailID === product.model_id}
          <ul class="ul-custom mt-1 p-3 bg-slate-600 text-slate-300 rounded whitespace-nowrap">
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
        class="bg-gray-700 border border-white text-white w-9 h-9 items-center justify-center flex rounded-md"
        on:click={() => handleClickDetails(product)}
      >
        <i class="fa-solid fa-pencil"></i>
      </button>
    </td>
  </tr>
{/each}

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
        font-weight: 100;
        font-size: 12px;
        display: block;
      }

      p {
        text-wrap: auto;
        color: #3f3f3f;
      }

      &.description {
        grid-column: 1 / -1;
      }
    }

    .tooltip-arrow {
      position: absolute;
      top: 27px;
      left: calc(100% - 3px);
      color: #8195b1;
    }
  }
</style>
