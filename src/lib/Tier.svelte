<script lang="ts">
    import Sortable from "sortablejs";
    import { onMount } from "svelte";

    let list: HTMLDivElement;

    export let name: string;
    export let color: string;

    onMount(() => {
        Sortable.create(list, {
            group: "images",
            animation: 100,
        });
    });
</script>

<div class="tier">
    <div class="header" style="background-color: {color}">
        <span class="name-span" contenteditable="true">{name}</span>
    </div>
    <div class="list" bind:this={list}></div>
</div>

<style>
    .tier {
        width: 100%;
        min-height: 140px;

        display: flex;
        flex-direction: row;

        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 5px;
        overflow: hidden;
    }
    .tier:first-of-type {
        border-top-left-radius: 15px;
    }
    .tier:last-of-type {
        border-bottom-left-radius: 15px;
    }

    .header {
        max-width: 140px;
        aspect-ratio: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.2rem;
        font-weight: bold;
        word-break: break-word;
    }

    .name-span {
        width: 100%;
    }

    .list {
        flex: 1;

        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        gap: 10px;
    }
</style>
