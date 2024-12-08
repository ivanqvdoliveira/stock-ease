<script>
  import AddProductModal from "../../components/modals/AddProductModal.svelte";
  import BoxInventoryProduct from "../../components/products/BoxInventoryProduct.svelte";
  import { clientViewFullList } from "../../store/stores";

  let sortType = 'increasing';
  let sortBy
  let arrowDirectionUp = true;
  let searchValue = '';
  let listToShow = $clientViewFullList;
  let showModal = false;

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
</script>

<div>
  <div class="block mb-24 text-center w-full">
    Inventory Management
  </div>
  <AddProductModal {showModal} {closeModal} />
  <section class="py-3 sm:py-5">
    <div class="sm:px-4 mx-auto max-w-full">
      <div class="relative shadow-md sm:rounded-lg bg-white">
        <div class="flex flex-wrap flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 ">
          <div class="flex items-center flex-1 space-x-4">
            <h5>
              <span class="text-gray-500">Total Produtos:</span>
              <span class="text-gray-800">123456</span>
            </h5>
            <h5>
              <span class="text-gray-500">Total vendido:</span>
              <span class="text-gray-800">R$ 88.4k</span>
            </h5>
          </div>
          <form class="form-custom md:w-full">
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

          <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <button
              type="button"
              class="btn bg-primary text-sky-100 hover:bg-primary-dark"
              on:click={() => showModal = true}
            >
              <i class="fa-solid fa-plus mr-1 "></i>
              Adicionar novo
            </button>
            <button type="button" class="btn bg-primary text-sky-100 hover:bg-primary-dark">
              <i class="fa-solid fa-file-export mr-1"></i>
              Exportar
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500  min-w-[1320px]">
            <thead class="text-xs text-gray-900 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('title')}>
                    Produto
                    {#if sortBy === 'title'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('brand')}>
                    Fornecedor
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('quantity')}>
                    Estoque
                    {#if sortBy === 'quantity'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('salePrice')}>
                    Preço de Compra
                    {#if sortBy === 'salePrice'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                 </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('buyPrice')}>
                    Preço de Venda
                    {#if sortBy === 'buyPrice'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('category')}>
                    Categoria
                    {#if sortBy === 'category'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('register_date')}>
                    Cadastrado em
                    {#if sortBy === 'register_date'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('status')}>
                    Status
                    {#if sortBy === 'status'}
                      <i class={`fa-solid ${arrowDirectionUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3 justify-end items-end flex">+ Detalhes</th>
              </tr>
            </thead>
            <BoxInventoryProduct {listToShow} />
          </table>
        </div>
        <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 ">
            Showing
            <span class="font-semibold text-gray-900 ">
              1-10
            </span>
            of
            <span class="font-semibold text-gray-900 ">
              1000
            </span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a href="/" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                <span class="sr-only">Previous</span>
                <i class="fa-solid fa-chevron-left"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >1</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >2</a
              >
            </li>
            <li>
              <a
                href="/"
                aria-current="page"
                class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700ark:bg-gray-700 "
                >3</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >...</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >100</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="sr-only">Next</span>
                <i class="fa-solid fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</div>


<style lang="scss">
  .form-custom {
    width: calc(100% - 680px);

    @media (max-width: 1024px) {
      width: 100%;
    }
  }
</style>
