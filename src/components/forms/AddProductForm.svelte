<script>
  import ImageUploader from "../ImageUploader.svelte";
  import { formatterMoney } from "../../utils/formatter";

  export let onScanningClick
  export let showScanner
  export let invalids
  export let form
  export let formModel
  export let imagesList
  export let onChangeForm
  export let handleClickAddModel
  export let onChangeModelForm
  export let onChangeMoneyModelForm
</script>

<form class="mx-auto form-styled w-full">
  <div class="z-0 md:gap-6 md:grid-cols-2 grid ">
    <div class="z-0 w-full mb-5 group">
      <div class="flex gap-3 items-center">
        <button
          type="button"
          aria-label="button-scanner"
          class="w-12 h-12 btn btn-square mb-[14px]"
          on:click={onScanningClick}
          disabled={showScanner}
        >
          <i class="fa-solid fa-barcode"></i>
        </button>
        <div class={`field relative z-0 w-full mb-5 group ${invalids.code ? 'invalid' : ''}`}>
          <input
            type="text"
            name="code"
            id="code"
            class="input-modal peer"
            placeholder=" "
            required
            value={form?.code}
            on:change={onChangeForm}
          />
          <label
            for="code"
            class="label-modal rtl:peer-focus:translate-x-1/4"
          >
            Código de barras / QRcode
          </label>
        </div>
      </div>
    </div>
    <div class={`field relative z-0 w-full mb-5 group ${invalids.brand ? 'invalid' : ''}`}>
      <input
        type="text"
        name="brand"
        id="brand"
        class="input-modal peer"
        placeholder=" "
        required
        value={form?.brand}
        on:change={onChangeForm}
      />
      <label for="brand" class="label-modal rtl:peer-focus:translate-x-1/4">Fornecedor</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class={`field relative z-0 w-full mb-5 group ${invalids.type ? 'invalid' : ''}`}>
      <input
        type="text"
        name="type"
        id="type"
        class="input-modal peer"
        placeholder=" "
        required
        value={form?.type}
        on:change={onChangeForm}
      />
      <label for="type" class="label-modal rtl:peer-focus:translate-x-1/4">Tipo</label>
    </div>
    <div class={`field relative z-0 w-full mb-5 group ${invalids.title ? 'invalid' : ''}`}>
      <input
        type="text"
        name="title"
        id="title"
        class="input-modal peer"
        placeholder=" "
        required
        value={form?.title}
        on:change={onChangeForm}
      />
      <label for="title" class="label-modal rtl:peer-focus:translate-x-1/4">Título</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
      <textarea
        type="text"
        name="description"
        id="description"
        class="input-modal peer"
        placeholder=" "
        required
        value={form?.description}
        on:change={onChangeForm}
      ></textarea>
      <label for="description" class="label-modal rtl:peer-focus:translate-x-1/4">Descrição</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
      <label class="mt-7 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name="isActive"
          value={form?.isActive}
          class="sr-only peer"
          checked={form?.isActive}
          on:change={onChangeForm}
        >
        <span class="me-2 text-sm font-medium text-gray-900 dark:text-gray-300">Produto ativo</span>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      </label>
    </div>
  </div>
  <div class="bg-gray-700 bg-opacity-70 p-3">
    <h3 class="w-full text-center border-b border-gray-500 pb-2 mb-10">Modelos</h3>

    <div class="flex gap-3 flex-wrap">
      {#each formModel as model, index}
        <div class="w-full md:w-[320px] grid grid-cols-2 gap-2">
          <div class="w-full col-span-2 p-2 border border-gray-400 mb-3">
            <h5 class="mb-3 w-full text-center uppercase text-sm">Imagens</h5>
            <ImageUploader {imagesList} indexNumber={index}/>
          </div>
          <div class={`field relative z-0 w-full mb-5 group ${invalids?.models[index]?.color ? 'invalid' : ''}`}>
            <input
              type="text"
              name="color"
              id="color"
              class="input-modal peer"
              placeholder=" "
              required
              value={model.color}
              on:change={(e) => onChangeModelForm(e, index)}
            />
            <label for="color" class="label-modal rtl:peer-focus:translate-x-1/4">Cor</label>
          </div>
          <div class={`field relative z-0 w-full mb-5 group ${invalids?.models[index]?.size ? 'invalid' : ''}`}>
            <input
              type="text"
              name="size"
              id="size"
              class="input-modal peer"
              placeholder=" "
              required
              value={model.size}
              on:change={(e) => onChangeModelForm(e, index)}
            />
            <label for="size" class="label-modal rtl:peer-focus:translate-x-1/4">Tamanho</label>
          </div>
          <div class={`field relative z-0 w-full mb-5 group ${invalids?.models[index]?.quantity ? 'invalid' : ''}`}>
            <input
              type="text"
              name="quantity"
              id="quantity"
              class="input-modal peer"
              placeholder=" "
              required
              value={model.quantity}
              on:change={(e) => onChangeModelForm(e, index)}
            />
            <label for="quantity" class="label-modal rtl:peer-focus:translate-x-1/4">Quantidade</label>
          </div>
          <div class={`field relative z-0 w-full mb-5 group ${invalids?.models[index]?.salePrice ? 'invalid' : ''}`}>
            <input
              type="text"
              name="salePrice"
              id="salePrice"
              class="input-modal peer"
              placeholder=" "
              required
              value={formatterMoney(model.salePrice)}
              on:change={(e) => onChangeMoneyModelForm(e, index)}
            />
            <label for="salePrice" class="label-modal rtl:peer-focus:translate-x-1/4">Preço de venda</label>
          </div>
          <div class={`field relative z-0 w-full mb-5 group ${invalids?.models[index]?.color ? 'invalid' : ''}`}>
            <input
              type="text"
              name="buyPrice"
              id="buyPrice"
              class="input-modal peer"
              placeholder=" "
              required
              value={formatterMoney(model.buyPrice)}
              on:change={(e) => onChangeMoneyModelForm(e, index)}
            />
            <label for="buyPrice" class="label-modal rtl:peer-focus:translate-x-1/4">Preço de compra</label>
          </div>
        </div>
      {/each}
      <button
        type="button"
        aria-label="button-add-model"
        class="border-2 border-dashed border-gray-400 w-full md:w-[320px] min-h-64"
        on:click={handleClickAddModel}
      >
        <i class="fa-solid fa-plus text-4xl"></i>
      </button>
    </div>
  </div>
</form>

<style lang="scss">
  .input-modal {
    @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600;
  }
  .label-modal {
    @apply peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6;
  }
  .form-styled {
    input, textarea {
      padding-left: 10px;
    }
  }
  .field.invalid {
    input {
      @apply border-red-500;
    }
    .label-modal {
      @apply text-red-500;
    }
  }
</style>
