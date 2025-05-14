<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  const auth = getAuth();

  async function loginForDevelopment() {
    try {
      const email = "ivanaugoli@hotmail.com";
      const password = "Contato@2012";
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário autenticado:", userCredential.user);
    } catch (error) {
      console.error("Erro ao autenticar:", error.message);
    }
  }

  loginForDevelopment();
</script>

<nav>
  <ul class="flex gap-5">
      <li><a href="/">Home / Produtos</a></li>
      <li><a href="/inventoryManagement">Administrar Estoque</a></li>
      <li><a href="/administration">Configurações</a></li>
      <li><a href="/financy">Financeiro</a></li>
      <li><a href="/register">Cadastro</a></li>
  </ul>
  <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={() => loginForDevelopment()}>Login</button>
</nav>
