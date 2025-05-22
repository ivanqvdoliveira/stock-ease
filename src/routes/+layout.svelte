<script>
  import Header from "../components/Header.svelte";
  import "../app.css";
</script>

<div class="app bg-gray-200">
  <Header />

  <main>
    <slot />
  </main>
</div>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.4rem;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
