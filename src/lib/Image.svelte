<script lang="ts">
    export let url: string;
</script>

<img src={url} alt="" />

<style>
    img {
        min-width: 60px;
        max-width: 240px;
        height: 120px;

        object-fit: cover;

        border-radius: 5px;
    }
</style>
