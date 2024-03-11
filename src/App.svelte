<script lang="ts">
    import { onMount } from "svelte";
    import ImageList from "./lib/ImageList.svelte";
    import Tier from "./lib/Tier.svelte";
    import Sortable from "sortablejs";
    import type { TierData } from "./main";
    import Image from "./lib/Image.svelte";
    import Logo from "./lib/Logo.svelte";

    let tierList: HTMLDivElement;

    let tiers: TierData[] = [
        {
            name: "S",
            color: "#80ff80",
        },
        {
            name: "A",
            color: "#c0ff80",
        },
        {
            name: "B",
            color: "#ffff80",
        },
        {
            name: "C",
            color: "#ffc080",
        },
        {
            name: "D",
            color: "#ff9e80",
        },
        {
            name: "F",
            color: "#ff8080",
        },
    ];

    let imageUrls: string[] = [];

    let files: FileList;

    $: if (files) {
        for (let file of files) handleImage(file);
    }

    onMount(() => {
        Sortable.create(tierList, {
            group: "tiers",
            animation: 100,
            handle: ".handle",
            dragClass: "ghost",
        });
    });

    function addTier() {
        tiers = [
            ...tiers,
            {
                name: "New Tier",
                color: tiers.at(-1)?.color ?? "#80ff80",
            },
        ];
    }

    function handlePaste(event: ClipboardEvent) {
        let data = event.clipboardData;
        if (!data) return;

        data = data as DataTransfer;
        let items = data.items;

        for (let key in items) {
            let item = items[key];

            if (item.kind === "file") {
                let file = item.getAsFile() as File;

                handleImage(file);
            } else if (item.kind === "string") {
                console.log("todo");
            }
        }
    }

    function handleDrop(event: DragEvent) {
        var data = event.dataTransfer;
        if (!data) return;

        data = data as DataTransfer;

        for (let key in data.items) {
            let item = data.items[key];

            if (item.kind === "file") {
                let file = item.getAsFile() as File;

                handleImage(file);
            } else if (item.kind === "string") {
                console.log("todo");
            }
        }
    }

    function handleImage(image: File) {
        let url = URL.createObjectURL(image);

        let element = document.createElement("img");
        element.src = url;

        imageUrls = [...imageUrls, url];
    }

    function deleteTier(tier: TierData) {
        if (tiers.length <= 1) return;

        tiers = tiers.filter((t) => t !== tier);
    }

    function clearTier(tier: Tier) {}
</script>

<svelte:window on:paste={handlePaste} on:drop={handleDrop} />

<header>
    <Logo />
</header>
<main>
    <div class="tier-container border">
        <div class="tier-list" bind:this={tierList}>
            {#each tiers as tier}
                <Tier bind:data={tier} {deleteTier} />
            {/each}
        </div>
        <button class="add-button" on:click={addTier}>+</button>
    </div>
    <div class="image-list border">
        <ImageList bind:files>
            {#each imageUrls as url}
                <Image {url} />
            {/each}
        </ImageList>
    </div>
</main>
<footer></footer>

<style>
    header {
        background-color: #444;
    }

    main {
        width: 100%;
        min-height: calc(100vh - 140px);

        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        padding: 2rem;
    }

    footer {
        background-color: #444;
    }

    .add-button {
        width: 100%;
        max-width: 100px;
        height: 50px;
        margin: 10px 0px;

        padding: 0px;

        transition: max-width 0.5s;
    }

    .tier-container {
        overflow: hidden;

        flex: 1 0 60%;
        /* max-width: calc(70% - 10px); */

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
        transition: border-radius 0.2s;
    }

    @media (max-width: 1766px) {
        .image-list {
            max-width: 530px;
        }
    }

    @media (max-width: 1450px) {
        .image-list {
            max-width: 400px;
        }
    }

    @media (max-width: 1200px) {
        .add-button {
            max-width: 100%;
        }

        main {
            align-content: start;
            gap: 0px;
        }

        .tier-container,
        .image-list {
            max-width: 100%;
        }

        .image-list {
            flex: 0 0 100%;
            min-height: 310px;

            border-top-right-radius: 5px;
            border-bottom-left-radius: 15px;
        }
    }
</style>
