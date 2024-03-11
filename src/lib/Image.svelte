<script lang="ts">
    import { Trash2 } from "lucide-svelte";

    export let url: string;
    export let ctrl: boolean;

    let container: HTMLDivElement;

    function handleRemove() {
        if (!ctrl) return;
        container.parentElement?.removeChild(container);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" bind:this={container} on:click={handleRemove}>
    <img class:removable={ctrl} src={url} alt="" />
    <div class="overlay">
        <Trash2 />
    </div>
</div>

<style>
    .container {
        position: relative;
    }

    img {
        min-width: calc(var(--image-size) * 0.5);
        max-width: calc(var(--image-size) * 2);
        height: var(--image-size);

        object-fit: cover;

        border-radius: 5px;

        transition: filter 0.2s;
    }
    img.removable:hover {
        filter: blur(2px);
    }

    .overlay {
        position: absolute;
        top: 0px;
        left: 0px;

        width: 100%;
        height: 100%;

        display: none;
        align-items: center;
        justify-content: center;

        color: rgba(255, 128, 128, 0.8);

        pointer-events: none;
    }

    .container:has(.removable:hover) > .overlay {
        display: flex;
    }
</style>
