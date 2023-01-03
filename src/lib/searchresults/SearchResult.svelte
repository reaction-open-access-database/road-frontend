<script context="module">
    let drawings_loaded = false;
</script>

<script lang="ts">
    import { afterUpdate } from "svelte";

    export let result;

    afterUpdate(() => {
        if (!drawings_loaded) {
            drawings_loaded = true;
            SmiDrawer.apply();
        }
    });
</script>

<div class="search-result">
    <svg data-smiles="{result.smiles}" />
    <table class="other-info">
        <tr>
            <td>Name</td>
            <td>{result.name}</td>
        </tr>
        <tr>
            <td>Molecular Weight (g/mol)</td>
            <td>{result.mw.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Molecular Formula</td>
            <td>{result.formula}</td>
        </tr>
    </table>
</div>

<style>
    .search-result {
        background-color: var(--medium-grey);
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;

        padding: 10px;

        margin: 10px;
    }

    .other-info {
        margin-left: 2em;
        border-spacing: 1em 0.25em;
    }
</style>