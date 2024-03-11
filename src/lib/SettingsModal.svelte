<script lang="ts">
    import ColorPicker from "svelte-awesome-color-picker";
    import type { TierData } from "../main";

    export let tier: TierData;
</script>

<div class="settings">
    <form method="dialog">
        <h3>Settings</h3>
        <p>
            Name: <input
                type="text"
                bind:value={tier.name}
                placeholder="Tier name..."
            />
        </p>
        <p>
            <ColorPicker
                bind:hex={tier.color}
                label="Header Color"
                isDark={true}
                isAlpha={false}
                --cp-bg-color="#333"
                --cp-border-color="white"
                --cp-input-color="#555"
                --cp-button-hover-color="#777"
            />
        </p>

        <button class="close-button" type="submit">Close</button>
    </form>
</div>

<style>
    .settings {
        width: 400px;
        height: 500px;

        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 5px;
        overflow: hidden;

        text-align: center;
    }
</style>
