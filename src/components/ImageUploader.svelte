<script>
  import { onMount } from 'svelte';
  let images = Array(6).fill(null);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    images[index] = null;
  };
</script>

<div class="image-uploader">
  {#each images as image, index}
    <div class="image-slot border-gray-200">
      {#if image}
        <div class="image-preview">
          <img src={image} alt="Uploaded selected figure" />
          <button type="button" aria-label="remove-image-button" on:click={() => removeImage(index)}>
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      {:else}
        <label class="upload-label">
          <input type="file" accept="image/*" on:change={(e) => handleFileChange(e, index)} />
          <span>+</span>
        </label>
      {/if}
    </div>
  {/each}
</div>

<style>
  .image-uploader {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .image-slot {
    position: relative;
    width: 93px;
    height: 93px;
    border: 2px dashed;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .upload-label input {
    display: none;
  }

  .image-preview {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-preview button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
</style>
