<script lang="ts">
    import Sortable from "sortablejs";
    import { onMount } from "svelte";

    let list: HTMLDivElement;
    let nameSpan: HTMLSpanElement;

    export let name: string;
    export let color: string;

    onMount(() => {
        Sortable.create(list, {
            group: "images",
            animation: 100,
        });
    });

    function validateName() {
        if (nameSpan.textContent === "") nameSpan.children[0].remove();
    }
</script>

<div class="tier">
    <div class="header" style="background-color: {color}">
        <span
            class="name-span"
            contenteditable="true"
            placeholder="New Tier"
            bind:this={nameSpan}
            on:input={validateName}>{name}</span
        >
    </div>
    <div class="list" bind:this={list}></div>
    <div class="handle">
        <img src="src/assets/handle.svg" alt="..." />
    </div>
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

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.1s;
    }
    .handle:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    .handle > img {
        width: 80%;
        opacity: 0.15;
    }
</style>
