<script>
  import Menu from "./Menu.svelte";
  import { ADD_PRODUCT } from "../__mocks__/mock_add_product";
  import { listClientProducts } from "../utils/listClientProducts";
  import { onMount } from "svelte";

  onMount(() => {
    listClientProducts(ADD_PRODUCT);
  });

</script>

<div class="p-5 flex gap-11">
  Logo Aqui
  <Menu />
</div>
