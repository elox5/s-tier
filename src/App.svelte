<script lang="ts">
    import { onMount } from "svelte";
    import ImageList from "./lib/ImageList.svelte";
    import Tier from "./lib/Tier.svelte";
    import Sortable from "sortablejs";

    let tierList: HTMLDivElement;

    let tiers: Tier[] = [];

    onMount(() => {
        Sortable.create(tierList, {
            group: "tiers",
            animation: 100,
            handle: ".header",
        });
    });

    function addTier() {
        tiers = [
            ...tiers,
            {
                name: "New Tier",
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            },
        ];
    }

    interface Tier {
        name: string;
        color: string;
    }
</script>

<main>
    <div class="tier-container border">
        <div class="tier-list" bind:this={tierList}>
            {#each tiers as tier}
                <Tier name={tier.name} color={tier.color} />
            {/each}
        </div>
        <button class="add-button" on:click={addTier}>+</button>
    </div>
    <div class="image-list border"><ImageList /></div>
</main>

<style>
    main {
        width: 100%;

        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .add-button {
        width: 100%;
        max-width: 100px;
        height: 50px;
        margin: 10px;
    }

    .tier-container {
        overflow: hidden;

        flex: 1 0 60%;
        max-width: calc(70% - 10px);

        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        text-align: center;
    }

    .tier-list {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .image-list {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 15px;

        overflow: hidden;

        flex: 0 0 40%;
        max-width: 660px;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        transition: max-width 0.5s;
    }

    @media (max-width: 1766px) {
        .image-list {
            max-width: 530px;
        }
    }

    @media (max-width: 1400px) {
        .image-list {
            max-width: 400px;
        }
    }

    @media (max-width: 900px) {
        .tier-container,
        .image-list {
            max-width: 100%;
        }
    }
</style>
