<script lang="ts">
    import { InputType, Operation } from "../../../types";

    export let type: InputType;
    export let operator: Operation;
    export async function get_value() {
        if (type === InputType.Structure) {
            const ketcher = ketcher_frame.contentWindow.ketcher;
            return await ketcher.getSmiles();
        } else if (type === InputType.Float) {
            return {value: float_value, tolerance: float_tolerance};
        } else if (type === InputType.String) {
            return string_value;
        }
    }

    let ketcher_frame: HTMLIFrameElement;
    let float_value: number;
    let float_tolerance: number = 0.5;
    let string_value: string;
</script>

{#if type === InputType.Structure}
    <iframe id="ketcher-frame" src="ketcher/index.html" width="800" height="600" bind:this={ketcher_frame}></iframe>
{:else if type === InputType.Float}
    <input type="number" step="0.1" bind:value={float_value}>
    {#if operator === Operation.Equal}
        ±<input type="number" step="0.1" bind:value={float_tolerance}>
    {/if}
{:else if type === InputType.String}
    <input type="text" bind:value={string_value}>
{/if}

<style>
    input {
        font-family: inherit;
        font-size: inherit;
        height: calc(2em - 2px);
        width: 10em;
    }
</style>