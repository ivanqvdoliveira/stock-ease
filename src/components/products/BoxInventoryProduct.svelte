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

  const handleClickShowImage = (images, id) => {
    if (!images || images.length === 0) {
      return;
    }
    imgSelected = { images, id };
    showModal = true;
  }

  const closeModal = () => {
    imgSelected = {};
    showModal = false;
  }
</script>

{#each listToShow as product}
  <div class="lineItem">
    <div class="imgSection">
      <button type="button" on:click={() => handleClickShowImage(product.images, product.model_id)}>
        <img
          src={(product.images && product.images.length > 0)
            ? product.images[0]
            : GENERATE_PHOTO_URL}
          alt={`produto - ${product.title}`}
          class="mr-3 rounded-sm object-cover"
        />
      </button>
    </div>

    <div class="informationSection">
      <div class="itemsInfo">
        <span>
          <span class="label">Produto</span>
          {product.title}
        </span>
      </div>
      <div class="itemsInfo">
        <span>
          <span class="label">Fornecedor</span>
          {product.brand}
        </span>
      </div>
      <div class="itemsInfo">
        <span>
          <span class="label">Estoque</span>
          {product.quantity}
        </span>
      </div>
      <div class="itemsInfo">
        <span>
          <span class="label">Preço de Venda</span>
          {formatterMoney(product.salePrice)}
        </span>
      </div>
      <div class="itemsInfo">
        <span>
          <span class="label">Preço de Compra</span>
          {formatterMoney(product.buyPrice)}
        </span>
      </div>
      <div class="itemsInfo">
        <span>
          <span class="label">Cadastrado em</span>
          {format(product.createDate, "dd/MM/yyyy")}
        </span>
      </div>
      <div class="itemsInfo">
        <span class="text-center">
          <span class="label">Status</span>
          {#if product.isActive}
            <span class="bg-green-100 font-bold text-green-800 px-2 py-0.5 rounded">
              <b>Ativo</b>
            </span>
          {:else}
            <span class="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
              <b>Inativo</b>
            </span>
          {/if}
        </span>
      </div>
    </div>

    <div class="buttonSection">
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
          <ul class="ul-custom">
            <i class="tooltip-arrow fa-solid fa-caret-right"></i>
            <li class="description">
              <span>Description</span>
              <p>{product.description || '-'}</p>
            </li>
            <li>
              <span>Categoria do produto</span>
              <p>{product.categoy_product || '-'}</p>
            </li>
            <li>
              <span>Categoria do Modelo</span>
              <p>{product.category || '-'}</p>
            </li>
            <li>
              <span>Tamanho</span>
              <p>{product.size || '-'}</p>
            </li>
            <li>
              <span>Cor</span>
              <p>{product.color || '-'}</p>
            </li>
            <li>
              <span>Estilo</span>
              <p>{product.style || '-'}</p>
            </li>
            <li>
              <span>Material</span>
              <p>{product.material || '-'}</p>
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
    </div>
  </div>
{/each}
<PhotoViewModal {closeModal} {imgSelected} {showModal} />


<style lang="scss">
  .lineItem {
    @apply border-b hover:bg-gray-100 flex items-center flex-wrap justify-center;

    .imgSection {
      @apply flex items-center p-2 font-medium text-gray-900 whitespace-nowrap;
      @apply w-full;

      button {
        @apply w-full;
      }

      img {
        @apply w-full object-cover h-20;
      }

      @media (min-width: 580px) {
        @apply w-52 h-44;

        img {
          @apply h-44;
        }
      }

      @media (min-width: 1280px) {
        @apply w-14 h-14;

        img {
          @apply w-12 h-12;
        }
      }
    }

    .informationSection {
      @apply p-2 flex flex-wrap gap-5 justify-center;

      .itemsInfo {
        & > span {
          @apply font-bold text-gray-700 text-base;

          span {
            @apply font-normal block uppercase text-[11px];
          }
        }
      }

      @media (min-width: 580px) {
        @apply  w-full justify-between;
      }

      @media (min-width: 1280px) {
        display: grid;
        grid-template-columns: 2fr repeat(6, 1fr);

        .itemsInfo {
          &:nth-child(1n+2) {
            & > span {
              @apply font-normal;
            }
          }
          & > span {
            span.label {
              display: none;
            }
          }
        }
      }
    }

    .buttonSection {
      @apply px-4 py-2 font-medium text-gray-900 whitespace-nowrap justify-end;
      @apply items-end flex relative gap-4;

      @media (min-width: 580px) {
        @apply w-32;
      }
    }

    @media (min-width: 580px) {
      @apply flex-nowrap;
    }

    @media (min-width: 1280px) {
      @apply gap-1;
    }
  }

  .ul-custom {
    @apply mt-1 p-3 bg-slate-200 rounded whitespace-nowrap flex flex-wrap gap-5;

    @media (max-width: 580px) {
      width: calc(100vw - 30px);
      left: 25px;
      position: relative;

      .tooltip-arrow {
        display: none;
      }
    }

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

    @media (min-width: 580px) {
      position: absolute;
      z-index: 99;
      top: -20px;
      right: calc(100% + 7px);
      width: 380px;
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 10px));
      gap: 20px;

      .tooltip-arrow {
        position: absolute;
        top: 27px;
        left: calc(100% - 3px);
        color: #373a3d;
      }
    }
  }
</style>
