<script lang="ts">
    import { Trash2 } from "lucide-svelte";
    import { shift, ctrl } from "../stores";

    export let url: string;

    export let textOnly: boolean = false;
    export let color: string = "#8080ff";

    let container: HTMLDivElement;

    let showEditOverlay: boolean = false;
    let showDeleteOverlay: boolean = false;

    shift.subscribe((v) => (showEditOverlay = v));
    ctrl.subscribe((v) => (showDeleteOverlay = v));

    function handleRemove() {
        if (!showDeleteOverlay) return;
        container.parentElement?.removeChild(container);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" bind:this={container} on:click={handleRemove}>
    <div class="content">
        {#if textOnly}
            <div class="text-entry" style="background-color: {color};">
                {url}
            </div>
        {:else}
            <img class:removable={showDeleteOverlay} src={url} alt="" />
        {/if}
    </div>

    <div class="overlay delete-overlay" class:shown={showDeleteOverlay}>
        <Trash2 />
    </div>
    <div class="overlay edit-overlay" class:shown={showEditOverlay && textOnly}>
        <Trash2 />
    </div>
</div>

<style>
    .container {
        position: relative;
    }

    .content {
        min-width: calc(var(--image-size) * 0.5);
        max-width: calc(var(--image-size) * 2);
        height: var(--image-size);
    }

    img,
    .text-entry {
        width: 100%;
        height: 100%;

        border-radius: 5px;
        transition: filter 0.2s;
    }
    img.removable:hover {
        filter: blur(2px) brightness(0.6);
    }

    img {
        object-fit: cover;
    }

    .text-entry {
        display: grid;
        place-items: center;

        color: #111;
        font-weight: bold;
        padding: 10px;

        user-select: none;
        -moz-user-select: none;
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

    .overlay.shown {
        display: flex;
    }
</style>
