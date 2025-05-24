<script>
  export let currentPage = 1;
  export let goToNextPage;
  export let goToPrevPage;
  export let hasNextPage = false;
</script>

<nav class="flex flex-col p-4 justify-center items-end" aria-label="Table navigation">
  <ul class="inline-flex items-stretch -space-x-px">
    <li>
      <button aria-label="previews-button" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" on:click={() => goToPrevPage()} disabled={currentPage === 1}>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </li>
    <li>
      <span class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{currentPage}</span>
    </li>
    <li>
      <button aria-label="next-page" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
       on:click={() => goToNextPage()} disabled={!hasNextPage}>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </li>
  </ul>
</nav>
