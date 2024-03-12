<script lang="ts">
    import type { ListData } from "../main";
    import ImageList from "./ImageList.svelte";

    export let files: FileList;
    export let tierlistFile: File;
    export let hasUploaded: boolean;

    let empty: boolean = true;

    let data: ListData = {
        images: [],
    };

    let tierlistUpload: FileList;
    $: if (tierlistUpload && tierlistUpload.length > 0) {
        tierlistFile = tierlistUpload[0];
    }
</script>

<div class="element">
    <div class="main">
        <ImageList bind:data bind:empty>
            <slot />
        </ImageList>
        <div class="fallback" class:shown={empty}>
            {#if hasUploaded}
                <p class="empty-text">empty</p>
            {:else}
                <h3>Drag or paste images here to get started</h3>
            {/if}
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

        display: flex;

        --mask: linear-gradient(
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%
        );
        -webkit-mask: var(--mask);
        mask: var(--mask);
    }

    .fallback {
        position: absolute;

        left: 0px;
        top: 0px;

        width: 100%;
        height: 100%;

        padding: 10px;

        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        pointer-events: none;
    }
    .fallback.shown {
        display: flex;
    }

    .buttons {
        margin: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
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

    .empty-text {
        color: var(--subtle-text-color);
        font-weight: bold;
    }

    hr {
        width: 50%;
    }
</style>
