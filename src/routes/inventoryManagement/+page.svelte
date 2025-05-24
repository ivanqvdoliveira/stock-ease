<script>
  import AddProductModal from "../../components/modals/AddProductModal.svelte";
  import Pagination from "../../components/Pagination/Pagination.svelte";
  import BoxInventoryProduct from "../../components/products/BoxInventoryProduct.svelte";
  import { getProducts } from "../../requests/getProductList";
  import { clientViewFullList } from "../../store/stores";
  import { listClientProducts } from "../../utils/listClientProducts";
  import { onMount } from "svelte";

  let sortType = 'increasing';
  let sortBy
  let arrowDirectionUp = true;
  let searchValue = '';
  let listToShow = $clientViewFullList;
  let showModal = false;
  let pagination = {
    pageSize: 10,
    lastVisible: null,
    cursors: [null]
  };

  const increasingSort = (data, type) => {
    return data.sort((a, b) => {
      if (a[type] < b[type]) {
        return -1;
      }
      if (a[type] > b[type]) {
        return 1;
      }
      return 0;
    });
  }

  const decreasingSort = (data, type) => {
    return data.sort((a, b) => {
      if (a[type] > b[type]) {
        return -1;
      }
      if (a[type] < b[type]) {
        return 1;
      }
      return 0;
    });
  }

  const sortList = (type) => {
    const newArray = [...$clientViewFullList];
    sortBy = type;

    if (!sortBy || sortType === 'increasing') {
      sortType = 'decreasing';
      arrowDirectionUp = true;
      listToShow = increasingSort(newArray, type);
      return
    }

    arrowDirectionUp = false;
    sortType = 'increasing';
    listToShow = decreasingSort(newArray, type);
  };

  const onSearchItem = (value) => {
    searchValue = value;
    const param = value.toLowerCase();
    const newArray = [];

    Array.prototype.push.apply(newArray, $clientViewFullList.filter((item) => {
      return item.title.toLowerCase().includes(param)
        || item.brand.toLowerCase().includes(param)
        || item.category.toLowerCase().includes(param)
        || item.description.toLowerCase().includes(param)
        || item.color.toLowerCase().includes(param)
        || item.material.toLowerCase().includes(param)
        || item.style.toLowerCase().includes(param);
    }));

    listToShow = newArray;
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchItem(searchValue);
    }
  }

  $: if ($clientViewFullList.length > 0) {
    listToShow = $clientViewFullList;
  }

  const closeModal = () => {
    showModal = false;
  }


    // testar essas duas berrações aqui
  // const handleNextPage = async () => {
  //   const { products, lastVisible } = await getProducts({
  //     pageSize: 10,
  //     lastDoc: cursors[currentPage - 1],
  //     filterBy: 'title'
  //   });
  //   listClientProducts(products);
  //   cursors[currentPage] = lastVisible;
  //   currentPage += 1;
  // }

  // const handlePrevPage = async () => {
  //   if (currentPage > 1) {
  //     currentPage -= 1;
  //     const { products } = await getProducts({
  //       pageSize: 10,
  //       lastDoc: cursors[currentPage - 1],
  //       filterBy: 'title'
  //     });
  //     listClientProducts(products);
  //   }
  // }

  onMount(async () => {
   if (!listToShow.length) {
      const { products, lastVisible } = await getProducts({ pageSize: 10, filterBy: 'title' });
      console.log({ products, lastVisible })
      listClientProducts(products);
   }
  });
</script>

<div>
  <div class="block mb-24 text-center w-full">
    Inventory Management
  </div>
  <AddProductModal {showModal} {closeModal} />
  <section class="py-3 sm:py-5">
    <div class="sm:px-4 mx-auto max-w-full">
      <div class="relative shadow-md sm:rounded-lg bg-white">
        <div class="flex flex-wrap flex-col py- space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 ">
          <div class="flex items-center flex-1 space-x-4">
            <h5>
              <span class="text-gray-500">Produtos cadastrados:</span>
              <span class="text-gray-800">{listToShow.length}</span>
            </h5>
          </div>
          <form class="form-custom md:w-full mr-8">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Buscar</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-[14px] ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Buscar produto, fornecedor, categoria..."
                bind:value={searchValue}
                on:change={(e) => onSearchItem(e.target.value)}
                on:keypress={(e) => onKeyPress(e)}
              />
              <button type="button" class="text-white absolute end-2.5 bottom-[7px] bg-primary hover:bg-primary-dark font-medium rounded-lg text-sm px-4 py-2 ">Buscar</button>
            </div>
          </form>

          <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-7">
            <button
              type="button"
              class="btn bg-primary text-sky-100 hover:bg-primary-dark"
              on:click={() => showModal = true}
            >
              <i class="fa-solid fa-plus mr-1"></i>
              Adicionar novo
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="w-full text-sm text-left text-gray-500">
            <div class="tableHeader">
              <div class="fakeImg"></div>
              <div class="labelsHeader">
                <div class="py-3">
                  <button type="button" on:click={() => sortList('title')}>
                    Produto
                    {#if sortBy === 'title'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('brand')}>
                    Fornecedor
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('quantity')}>
                    Estoque
                    {#if sortBy === 'quantity'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('salePrice')}>
                    Preço de Compra
                    {#if sortBy === 'salePrice'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('buyPrice')}>
                    Preço de Venda
                    {#if sortBy === 'buyPrice'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('register_date')}>
                    Cadastrado em
                    {#if sortBy === 'register_date'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
                <div class="py-3">
                  <button type="button" on:click={() => sortList('status')} class="w-full text-center">
                    Status
                    {#if sortBy === 'status'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </div>
              </div>
              <div class="details p-3">
                <div class="py-3 justify-center items-center flex">+ Detalhes</div>
              </div>
            </div>

            <BoxInventoryProduct {listToShow} />
          </div>
        </div>
        <Pagination
          currentPage={pagination.pageSize}
          goToNextPage={handleNextPage}
          goToPrevPage={handlePrevPage}
          hasNextPage={pagination.cursors[pagination.pageSize] !== null}
        />
      </div>
    </div>
  </section>
</div>


<style lang="scss">
  .form-custom {
    width: calc(100% - 430px);

    @media (max-width: 1024px) {
      width: 100%;
    }
  }

  .tableHeader {
    @apply text-gray-900 uppercase bg-gray-100 flex gap-1;

    .labelsHeader {
      @apply w-full justify-between p-2 font-bold;
      display: grid;
      grid-template-columns: 2fr repeat(6, 1fr);

      & > div {
        button {
          @apply uppercase text-xs;
        }
      }
    }

    .fakeImg {
      @apply w-10;
    }

    .details {
      @apply w-32;

      & > div {
        @apply w-full text-center uppercase text-xs p-2 font-bold;
      }
    }
  }
</style>
