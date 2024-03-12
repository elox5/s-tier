<script lang="ts">
    import Sortable from "sortablejs";
    import { onMount } from "svelte";

    let list: HTMLDivElement;

    export let files: FileList;

    export let tierlistFile: File;

    let tierlistUpload: FileList;
    $: if (tierlistUpload && tierlistUpload.length > 0) {
        tierlistFile = tierlistUpload[0];
    }

    onMount(() => {
        Sortable.create(list, {
            group: "images",
            animation: 100,
            filter: ".fallback",
        });
    });
</script>

<div class="element">
    <div class="main">
        <div class="image-list" bind:this={list}>
            <slot />
        </div>
        <div class="fallback">
            <h3>Drag or paste images here to get started</h3>
        </div>
    </div>
    <div>
        <hr />
        <div class="buttons">
            <label class="upload-button"
                >Upload images<input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    bind:files
                /></label
            >
            <label class="upload-button"
                >Upload a tierlist file<input
                    type="file"
                    accept=".tierlist.json"
                    hidden
                    bind:files={tierlistUpload}
                /></label
            >
        </div>
    </div>
</div>

<style>
    .element {
        position: relative;

        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: 1fr auto;
    }

    .main {
        position: relative;
        overflow-y: scroll;

        --mask: linear-gradient(
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%
        );
        -webkit-mask: var(--mask);
        mask: var(--mask);
    }

    .image-list,
    .fallback {
        position: absolute;

        width: 100%;
        height: 100%;

        padding: 10px;

        display: flex;
    }

    .image-list {
        flex-direction: row;
        flex-wrap: wrap;
        align-content: start;
        gap: 10px;
    }

    .fallback {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .buttons {
        margin: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .main:has(.image-list:not(:empty)) > .fallback {
        display: none;
    }

    .upload-button {
        background-color: var(--upload-button-color);
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;

        transition: background-color 0.2s;
    }
    .upload-button:hover {
        background-color: var(--upload-button-color-hover);
    }
    .upload-button:active {
        background-color: var(--upload-button-color-active);
    }

    hr {
        width: 50%;
    }
</style>
