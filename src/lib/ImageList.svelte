<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import Sortable from "sortablejs";
    import type { ListData } from "../main";

    export let data: ListData;
    export let empty: boolean = true;

    let list: HTMLDivElement;

    onMount(() => {
        Sortable.create(list, {
            group: "images",
            animation: 100,
            dragClass: "ghost",
            onAdd: updateEmpty,
            onRemove: updateEmpty,
        });
    });

    afterUpdate(updateEmpty);

    function updateEmpty() {
        empty = list.children.length === 0;
    }
</script>

<div class="list" bind:this={list}><slot /></div>

<style>
    .list {
        flex: 1;

        display: flex;
        flex-wrap: wrap;
        align-content: start;
        padding: 10px;
        gap: 10px;
    }
</style>
