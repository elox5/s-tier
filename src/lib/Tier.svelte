<script lang="ts">
    import { GripVertical, Settings2, Trash2 } from "lucide-svelte";
    import type { TierData } from "../main";
    import SettingsModal from "./SettingsModal.svelte";
    import ImageList from "./ImageList.svelte";
    import { shift, ctrl } from "../stores";

    export let data: TierData;
    export let deleteTier: (tier: TierData) => void;

    let list: HTMLDivElement;
    let nameSpan: HTMLSpanElement;
    let settingsModal: HTMLDialogElement;

    let showSettingsButton: boolean = false;
    let showDeleteButton: boolean = false;

    shift.subscribe((v) => (showSettingsButton = v));
    ctrl.subscribe((v) => (showDeleteButton = v));

    function validateName() {
        if (nameSpan.textContent === "") nameSpan.children[0].remove();
    }
</script>

<div class="tier">
    <div class="header sortable-handle" style="background-color: {data.color}">
        <span
            class="name-span"
            contenteditable="true"
            spellcheck="false"
            placeholder="New Tier"
            bind:this={nameSpan}
            bind:innerText={data.name}
            on:input={validateName}
        >
            {data.name}
        </span>
    </div>
    <ImageList bind:data={data.list} />
    <div class="handle sortable-handle">
        {#if showSettingsButton}
            <button
                class="handle-button settings-button"
                on:click={() => settingsModal.showModal()}
            >
                <Settings2 />
            </button>
        {:else if showDeleteButton}
            <button
                class="handle-button remove-button"
                on:click={() => deleteTier(data)}
            >
                <Trash2 />
            </button>
        {:else}
            <GripVertical />
        {/if}
    </div>

    <dialog bind:this={settingsModal}>
        <SettingsModal bind:tier={data} />
    </dialog>
</div>

<style>
    .tier {
        width: 100%;
        min-height: calc(var(--image-size) * 0.5 + 20px);

        display: flex;
        flex-direction: row;

        background-color: var(--element-bg-color);
        border-radius: 5px;

        transition: border-radius 0.2s;
    }
    .tier:first-of-type,
    .tier:first-of-type > .header {
        border-top-left-radius: 15px;
    }
    .tier:last-of-type,
    .tier:last-of-type > .header {
        border-bottom-left-radius: 15px;
    }

    .header {
        width: calc(var(--image-size) + 20px);

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.2rem;
        font-weight: bold;
        word-break: break-word;

        border-radius: 5px;
    }

    .name-span {
        width: calc(100% - 10px);
        white-space: pre-wrap;
        color: #111;
    }
    .name-span:empty:not(:focus):before {
        content: attr(placeholder);
        pointer-events: none;
        display: inline-block;
        font-style: italic;
        color: rgba(0, 0, 0, 0.7);
    }

    .handle {
        width: 65px;

        background-color: var(--handle-color);
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0;

        transition: background-color 0.2s;
    }
    .handle:hover {
        background-color: var(--handle-color-hover);
    }

    .handle-button {
        width: 100%;
        height: 100%;
        background-color: transparent;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .handle:has(.settings-button) {
        background-color: rgba(128, 128, 255, 0.5);
    }
    .handle:has(.settings-button):hover {
        background-color: rgba(128, 128, 255, 1);
    }

    .handle:has(.remove-button) {
        background-color: rgba(255, 128, 128, 0.5);
    }
    .handle:has(.remove-button):hover {
        background-color: rgba(255, 128, 128, 1);
    }

    dialog {
        border: none;
        padding: 0px;
    }

    @media (max-width: 1200px) {
        .tier:first-of-type,
        .tier:first-of-type > .handle {
            border-top-right-radius: 15px;
        }

        .tier:last-of-type,
        .tier:last-of-type > .header {
            border-bottom-left-radius: 5px;
        }
    }

    @media (max-width: 550px) {
        .tier {
            flex-direction: column;
        }

        .tier:first-of-type,
        .tier:first-of-type > .header {
            border-top-right-radius: 15px;
        }

        .header {
            width: 100%;
        }

        .name-span {
            padding: 0px 20px;
            width: auto;
            max-width: calc(100% - 50px);
        }

        .handle {
            display: none;
        }
    }
</style>
