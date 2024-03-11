<script lang="ts">
    import Sortable from "sortablejs";
    import { onMount } from "svelte";

    let list: HTMLDivElement;

    export let files: FileList;

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
                /></label
            >
        </div>
    </div>
    <div class="fallback">
        <h3>Drag or paste images here to get started</h3>
        <hr />
        <ul style="list-style: none; padding: 0">
            <li>
                <label class="upload-button"
                    >Upload images<input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        bind:files
                    /></label
                >
            </li>
            <li>
                <label class="upload-button"
                    >Upload a tierlist file<input
                        type="file"
                        accept=".tierlist.json"
                        hidden
                    /></label
                >
            </li>
        </ul>
    </div>
</div>

<style>
    .element {
        position: relative;

        width: 100%;
        height: 100%;

        overflow-y: scroll;
    }
    .element:empty {
        border: 1px solid red;
    }

    .main {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-rows: 1fr 70px;
        gap: 10px;
    }

    .image-list {
        width: 100%;
        height: 100%;

        padding: 10px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: start;
        gap: 10px;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-self: center;
        gap: 10px;
    }
    .main:has(.image-list:empty) > .buttons {
        display: none;
    }

    .fallback {
        position: absolute;
        left: 0px;
        top: 0px;

        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .element:has(.image-list:not(:empty)) > .fallback {
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

    li {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 5px 0px;
    }
</style>
