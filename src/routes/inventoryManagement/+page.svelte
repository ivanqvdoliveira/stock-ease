<script>
  import BoxInventoryProduct from "../../components/products/BoxInventoryProduct.svelte";
  import { clientViewFullList } from "../../store/stores";

  let sortType = 'increasing';
  let sortBy

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
      clientViewFullList.set(increasingSort(newArray, type));
      return
    }

    sortType = 'increasing';
    clientViewFullList.set(decreasingSort(newArray, type));
  };

  const renderArrow = () => {
    return sortType === 'increasing' ? 'fa-arrow-up' : 'fa-arrow-down';
  }
</script>

<div>
  <div class="block mb-24 text-center w-full">
    Inventory Management
  </div>
  <section class="py-3 sm:py-5">
    <div class="px-4 mx-auto max-w-full">
      <div class="relative overflow-hidden shadow-md sm:rounded-lg">
        <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div class="flex items-center flex-1 space-x-4">
            <h5>
              <span class="text-gray-500">Total Produtos:</span>
              <span class="dark:text-white">123456</span>
            </h5>
            <h5>
              <span class="text-gray-500">Total vendido:</span>
              <span class="dark:text-white">R$ 88.4k</span>
            </h5>
          </div>
          <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            <button type="button" class="btn bg-blue-500 text-white">
              <i class="fa-solid fa-plus mr-1"></i>
              Adicionar novo
            </button>
            <button type="button" class="btn bg-blue-500 text-white">
              <i class="fa-solid fa-file-export mr-1"></i>
              Exportar
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('title')}>
                    Produto
                    {#if sortBy === 'title'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('brand')}>
                    Fornecedor
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('quantity')}>
                    Estoque
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('salePrice')}>
                    Preço de Compra
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                 </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('buyPrice')}>
                    Preço de Venda
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('category')}>
                    Categoria
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('register_date')}>
                    Cadastrado em
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3">
                  <button type="button" on:click={() => sortList('status')}>
                    Status
                    {#if sortBy === 'brand'}
                      <i class={`fa-solid ${renderArrow()}`}></i>
                    {/if}
                  </button>
                </th>
                <th scope="col" class="px-4 py-3 justify-end items-end flex">+ Detalhes</th>
              </tr>
            </thead>
            <tbody>
              <BoxInventoryProduct />
            </tbody>
          </table>
        </div>
        <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a href="/" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Previous</span>
                <i class="fa-solid fa-chevron-left"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >1</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >2</a
              >
            </li>
            <li>
              <a
                href="/"
                aria-current="page"
                class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >3</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >...</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >100</a
              >
            </li>
            <li>
              <a
                href="/"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
