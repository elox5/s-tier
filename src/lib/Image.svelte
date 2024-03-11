<script lang="ts">
    export let url: string;
</script>

<img src={url} alt="" />

<style>
    img {
        min-width: calc(var(--image-size) * 0.5);
        max-width: calc(var(--image-size) * 2);
        height: var(--image-size);

        object-fit: cover;

        border-radius: 5px;
    }
</style>
