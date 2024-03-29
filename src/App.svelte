<script lang="ts">
    import { onMount } from "svelte";
    import type { TierData, TextEntryData } from "./main";
    import MainList from "./lib/MainList.svelte";
    import Tier from "./lib/Tier.svelte";
    import Image from "./lib/Image.svelte";
    import Logo from "./lib/Logo.svelte";
    import {
        ArrowDownToLine,
        Moon,
        Settings2,
        Trash2,
        Sun,
        Plus,
    } from "lucide-svelte";
    import Sortable from "sortablejs";
    import TextEntryDialog from "./lib/TextEntryDialog.svelte";
    import { shift, ctrl } from "./stores";
    import { get } from "svelte/store";

    let lightTheme: boolean = false;

    let tierList: HTMLDivElement;
    let textEntryDialog: HTMLDialogElement;

    let tiers: TierData[] = [
        {
            name: "S",
            color: "#80ff80",
            index: 0,
            list: {
                images: [],
            },
        },
        {
            name: "A",
            color: "#c0ff80",
            index: 1,
            list: {
                images: [],
            },
        },
        {
            name: "B",
            color: "#ffff80",
            index: 2,
            list: {
                images: [],
            },
        },
        {
            name: "C",
            color: "#ffc080",
            index: 3,
            list: {
                images: [],
            },
        },
        {
            name: "D",
            color: "#ff9e80",
            index: 4,
            list: {
                images: [],
            },
        },
        {
            name: "F",
            color: "#ff8080",
            index: 5,
            list: {
                images: [],
            },
        },
    ];

    let imageUrls: string[] = [];
    let textEntries: TextEntryData[] = [];

    let files: FileList;
    let tierlistFile: File;

    let hasUploaded: boolean = false;

    $: if (files) {
        for (let file of files) handleImage(file);
    }

    $: if (tierlistFile) {
        load(tierlistFile);
    }

    onMount(() => {
        Sortable.create(tierList, {
            group: "tiers",
            animation: 100,
            handle: ".sortable-handle",
            dragClass: "ghost",
        });
    });

    function addTier() {
        tiers = [
            ...tiers,
            {
                name: "",
                color: tiers.at(-1)?.color ?? "#80ff80",
                index: tiers.length,
                list: {
                    images: [],
                },
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
        hasUploaded = true;
    }

    function deleteTier(tier: TierData) {
        if (tiers.length <= 1) return;

        tiers = tiers.filter((t) => t !== tier);
    }

    function clearTier(tier: Tier) {}

    function showTextEntryDialog() {
        textEntryDialog.showModal();
    }

    function addTextEntries(data: TextEntryData[]) {
        textEntries = [...textEntries, ...data];
        hasUploaded = true;
    }

    function toggleShift() {
        shift.set(!get(shift));
        ctrl.set(false);
    }
    function toggleCtrl() {
        ctrl.set(!get(ctrl));
        shift.set(false);
    }
    function toggleTheme() {
        lightTheme = !lightTheme;
        document.documentElement.dataset.theme = lightTheme ? "light" : "dark";
    }

    function save() {
        let data = {
            tiers: tiers,
            imageUrls: imageUrls,
        };
        let json = JSON.stringify(data);
        console.log(json);

        let blob = new Blob([json], { type: "application/json" });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "tierlist.tierlist.json";
        a.click();
    }

    async function load(file: File) {
        let json = JSON.parse(await file.text());

        if (!json.tiers || !json.imageUrls) {
            return;
        }

        tiers = json.tiers;
        imageUrls = json.imageUrls;
    }
</script>

<svelte:window
    on:paste={handlePaste}
    on:drop={handleDrop}
    on:keydown={(e) => {
        if (e.key === "Shift") shift.set(true);
        if (e.key === "Control") ctrl.set(true);
    }}
    on:keyup={(e) => {
        if (e.key === "Shift") shift.set(false);
        if (e.key === "Control") ctrl.set(false);
    }}
    on:blur={() => {
        shift.set(false);
        ctrl.set(false);
    }}
/>

<header>
    <Logo />
    <div class="header-buttons">
        <button
            class="header-button save-button"
            class:active={shift}
            on:click={save}
        >
            <ArrowDownToLine />
        </button>
        <button
            class="header-button theme-button"
            class:light={lightTheme}
            on:click={toggleTheme}
        >
            {#if lightTheme}
                <Sun />
            {:else}
                <Moon />
            {/if}
        </button>
        <button
            class="header-button settings-button"
            class:active={get(shift)}
            on:click={toggleShift}
        >
            <Settings2 />
        </button>
        <button
            class="header-button remove-button"
            class:active={get(ctrl)}
            on:click={toggleCtrl}
        >
            <Trash2 />
        </button>
    </div>
</header>
<main>
    <div class="tier-container border">
        <div class="tier-list" bind:this={tierList}>
            {#each tiers as tier}
                <Tier bind:data={tier} {deleteTier} />
            {/each}
        </div>
        <button class="add-button" on:click={addTier}><Plus /></button>
    </div>
    <div class="image-list border">
        <MainList
            bind:files
            bind:tierlistFile
            bind:hasUploaded
            {showTextEntryDialog}
        >
            {#each imageUrls as url}
                <Image {url} />
            {/each}
            {#each textEntries as entry}
                <Image url={entry.text} color={entry.color} textOnly={true} />
            {/each}
        </MainList>
    </div>
    <dialog bind:this={textEntryDialog}>
        <TextEntryDialog onSubmit={addTextEntries} />
    </dialog>
</main>
<footer>
    <div>
        Made by <a href="https://github.com/elox5" target="_blank">elOx</a>
    </div>
</footer>

<style>
    header {
        position: sticky;
        top: 0;
        z-index: 1;

        background-color: var(--header-bg-color);

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
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
        background-color: var(--header-bg-color);

        display: flex;
        justify-content: start;
        align-items: center;
        padding: 20px;
    }

    .header-buttons {
        display: flex;
        gap: 5px;
    }

    .header-button {
        display: flex;
        place-items: center;
    }

    .save-button:hover {
        background-color: rgba(128, 255, 128, 0.5);
    }
    .save-button:active {
        background-color: rgba(128, 255, 128, 1);
    }

    .theme-button {
        background-color: var(--upload-button-color);
    }

    .settings-button {
        background-color: rgba(128, 128, 255, 0.5);
    }
    .settings-button.active {
        background-color: rgba(128, 128, 255, 1);
    }

    .remove-button {
        background-color: rgba(255, 128, 128, 0.5);
    }
    .remove-button.active {
        background-color: rgba(255, 128, 128, 1);
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
        background-color: var(--element-bg-color);
        border-radius: 15px;

        overflow: hidden;

        flex: 0 0 40%;
        max-width: 660px;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        transition:
            max-width 0.5s,
            border-radius 0.2s;
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

    @media (max-width: 550px) {
        main {
            padding: 10px;
        }
    }
</style>
