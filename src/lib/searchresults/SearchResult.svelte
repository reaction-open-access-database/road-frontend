<script lang="ts">
    import { onMount } from "svelte";
    import type { Molecule } from "../../types";

    export let result: Molecule;

    const molecule_options = {
        terminalCarbons: true,
        padding: 1,
    };

    let molecule_structure;

    onMount(() => {
        let sd = new SmiDrawer(molecule_options);
        sd.drawMolecule(result.smiles, 'svg', 'light', (svg) => {
            sd.svgToCanvas(svg, molecule_structure);
        });
    })
</script>

<div class="search-result">
    <canvas class="molecule-structure" bind:this={molecule_structure}></canvas>
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

    .molecule-structure {
        max-width: 200px;
        /*height: 00px;*/
    }

    .other-info {
        margin-left: 2em;
        border-spacing: 1em 0.25em;
    }
</style>