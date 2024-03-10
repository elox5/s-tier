<script lang="ts">
    import Sortable from "sortablejs";
    import { onMount } from "svelte";

    let element: HTMLDivElement;

    onMount(() => {
        Sortable.create(element, {
            group: "images",
            animation: 100,
        });
    });
</script>

<div bind:this={element}>
    <img src="https://picsum.photos/seed/1/120" alt="a" />
    <img src="https://picsum.photos/seed/2/120" alt="b" />
    <img src="https://picsum.photos/seed/3/120" alt="c" />
    <img src="https://picsum.photos/seed/4/120" alt="d" />
    <img src="https://picsum.photos/seed/5/120" alt="e" />
    <img src="https://picsum.photos/seed/6/120" alt="f" />
    <img src="https://picsum.photos/seed/7/120" alt="g" />
    <img src="https://picsum.photos/seed/8/120" alt="h" />
    <img src="https://picsum.photos/seed/9/120" alt="i" />
    <img src="https://picsum.photos/seed/10/120" alt="j" />
    <img src="https://picsum.photos/seed/11/120" alt="k" />
    <img src="https://picsum.photos/seed/12/120" alt="l" />
    <img src="https://picsum.photos/seed/13/120" alt="m" />
    <img src="https://picsum.photos/seed/14/120" alt="n" />
    <img src="https://picsum.photos/seed/15/120" alt="o" />
    <img src="https://picsum.photos/seed/16/120" alt="p" />
    <img src="https://picsum.photos/seed/17/120" alt="q" />
    <img src="https://picsum.photos/seed/18/120" alt="r" />
    <img src="https://picsum.photos/seed/19/120" alt="s" />
    <img src="https://picsum.photos/seed/20/120" alt="t" />
    <img src="https://picsum.photos/seed/21/120" alt="u" />
    <img src="https://picsum.photos/seed/22/120" alt="v" />
    <img src="https://picsum.photos/seed/23/120" alt="w" />
    <img src="https://picsum.photos/seed/24/120" alt="x" />
    <img src="https://picsum.photos/seed/25/120" alt="y" />
    <img src="https://picsum.photos/seed/26/120" alt="z" />
</div>

<style>
    div {
        width: 100%;
        height: 100%;

        padding: 10px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: start;
        justify-content: center;
        gap: 10px;

        overflow-y: scroll;
    }
</style>
