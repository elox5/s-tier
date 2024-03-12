<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import type { TextEntryData } from "../main";
    import { Trash2 } from "lucide-svelte";

    export let onSubmit: (data: TextEntryData[]) => void;

    let element: HTMLDivElement;

    let data: TextEntryData[] = [];

    function addEntry() {
        data = [
            ...data,
            {
                text: "",
                color: "#8080ff",
            },
        ];
    }

    function close() {
        (element.parentElement as HTMLDialogElement).close();
        data = [];
    }

    function submit() {
        onSubmit(data);
        data = [];
    }
</script>

<div class="element" bind:this={element}>
    <form method="dialog" on:submit={submit}>
        <div>
            <h3>Create text entries</h3>

            <button type="button" class="add-button" on:click={addEntry}>
                New
            </button>

            {#each data as d}
                <p>
                    <input
                        id="entry-{d.text}"
                        type="text"
                        bind:value={d.text}
                        placeholder="Entry name..."
                        autocomplete="off"
                    />
                    <ColorPicker
                        bind:hex={d.color}
                        label="Entry color"
                        isDark={true}
                        isAlpha={false}
                        --cp-bg-color="#333"
                        --cp-border-color="white"
                        --cp-input-color="#555"
                        --cp-button-hover-color="#777"
                    />
                    <button
                        type="button"
                        on:click={() => (data = data.filter((e) => e != d))}
                    >
                        <Trash2 />
                    </button>
                </p>
            {/each}
        </div>
        <div>
            <button class="close-button" type="submit">Add</button>
            <button class="close-button" on:click={close}>Cancel</button>
        </div>
    </form>
</div>

<style>
    .element {
        width: 550px;
        height: 500px;
    }

    form {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
    }
</style>
