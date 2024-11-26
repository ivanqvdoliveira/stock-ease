<script>
  import { onMount } from 'svelte';

  let modalDetails = {};
  let modal;

  const handleClickDetails = () => {
    modal.showModal();
  };

  const handleModalClose = () => {
    modal.close()
  };
</script>

<div class="block mb-24 text-center w-full">catalog page</div>

<dialog id="detail_modal" class="modal" bind:this={modal}>
  <div class="modal-box w-2/4 max-w-none">
    <div class="flex justify-between items-start">
      <h3 class="text-[35px] font-bold mb-8">Modal de detalhe do produto</h3>
      <button aria-label="modal-fechar" on:click={handleModalClose}>
        <i class="fa-solid fa-xmark text-[30px]"></i>
      </button>
    </div>
    <div class="flex gap-6">
      <div class="w-[480px]">
        <img src="https://picsum.photos/700/700" alt="nature" class="w-[480px] h-full object-cover" />
      </div>
      <div class="px-5">
        <h4 class="text-[24px] font-bold">Product Title</h4>
        <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
        <div class="flex items-start justify-between mt-6">
          <p class="description">
            <span class="">Código</span>
            <span class="text-lg">1234567890</span>
          </p>
          <p class="description">
            <span>Tipo</span>
            <span>Camiseta</span>
          </p>
          <p class="description">
            <span>Cor</span>
            <span>Preto</span>
          </p>
          <p class="description">
            <span>Tamanho</span>
            <span>M</span>
          </p>
          <p class="description">
            <span>Estoque</span>
            <span>10</span>
          </p>
        </div>
        <div>
          <p class="font-bold flex justify-end items-baseline mt-6">
            <span class="text-sm mr-1">R$</span>
            <span class="text-[35px]">100</span>
            <span class="text-sm">,00</span>
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

<div class="flex justify-center items-center gap-7 w-full flex-wrap">

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/800/600" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/600/600" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 2</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/800/700" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/700/700" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/800/800" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/600/700" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/800/701" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

  <div class="w-[385px] border border-blue-500">
    <div class="mb-5">
      <img src="https://picsum.photos/701/700" alt="nature" class="w-[385px] h-[385px] object-cover" /> 
    </div>
    <div class="p-3 w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Product Title 3</h1>
      <p class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque delectus ducimus, atque eos amet, nesciunt, expedita sit adipisci ex totam numquam quibusdam magni. Saepe dolorem iste tenetur optio repudiandae officiis.</p>
    </div>
    <div>
      <div class="p-3">
        <h2 class="font-bold flex justify-center items-baseline">
          <span class="text-sm mr-1">R$</span>
          <span class="text-[26px]">100</span>
          <span class="text-sm">,00</span>
        </h2>
      </div>
    </div>
    <div class="p-4">
      <button on:click={handleClickDetails} class="border border-blue-500 w-full bg-white text-blue-500 font-bold p-3">+ Detalhes</button>
    </div>
  </div>

</div>

<style lang="scss">
  p {
    &.description {
      span {
        display: block;

        &:first-of-type {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.875rem;
        }

        &:last-of-type {
          font-size: 1.125rem;
        }
      }
    }
  }
</style>
