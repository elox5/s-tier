<script lang="ts">
</script>

<main>
  <div class="tier-container border"></div>
  <div class="image-list border"></div>
</main>

<style>
  main {
    width: 1280px;
    height: 800px;
    display: grid;

    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    gap: 10px;
  }

  .border {
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 15px;
  }

  .tier-container {
    grid-area: 1 / 1 / 2 / 2;

    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .image-list {
    grid-area: 1 / 2 / 2 / 3;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>
