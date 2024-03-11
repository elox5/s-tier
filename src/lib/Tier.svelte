<script lang="ts">
    import { GripVertical, Settings2 } from "lucide-svelte";
    import Sortable from "sortablejs";
    import { onMount } from "svelte";
    import SettingsModal from "./SettingsModal.svelte";
    import type { TierData } from "../main";

    export let data: TierData;

    let list: HTMLDivElement;
    let nameSpan: HTMLSpanElement;
    let settingsModal: HTMLDialogElement;

    let shift: boolean = false;

    onMount(() => {
        Sortable.create(list, {
            group: "images",
            animation: 100,
            dragClass: "ghost",
        });
    });

    function validateName() {
        if (nameSpan.textContent === "") nameSpan.children[0].remove();
    }

    function openSettingsModal() {
        if (!shift) return;
        settingsModal.showModal();
    }
</script>

<svelte:window
    on:keydown={(e) => {
        if (e.key === "Shift") shift = true;
    }}
    on:keyup={(e) => {
        if (e.key === "Shift") shift = false;
    }}
/>

<div class="tier">
    <div class="header" style="background-color: {data.color}">
        <span
            class="name-span"
            contenteditable="true"
            spellcheck="false"
            placeholder="New Tier"
            bind:this={nameSpan}
            on:input={validateName}>{data.name}</span
        >
    </div>
    <div class="list" bind:this={list}></div>
    <button class="handle" on:click={openSettingsModal}>
        {#if shift}
            <Settings2 />
        {:else}
            <div
                style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center"
            >
                <GripVertical />
            </div>
        {/if}
    </button>

    <dialog bind:this={settingsModal}>
        <SettingsModal bind:tier={data} />
    </dialog>
</div>

<style>
    .tier {
        width: 100%;
        min-height: 140px;

        display: flex;
        flex-direction: row;

        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 5px;
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
        width: 140px;

        aspect-ratio: 1 / 1;

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

    .list {
        flex: 1;

        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        gap: 10px;
    }

    .handle {
        width: 65px;

        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0;

        transition: background-color 0.1s;
    }
    .handle:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    dialog {
        border: none;
        padding: 0px;
    }
</style>
