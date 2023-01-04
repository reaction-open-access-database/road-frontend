<script lang="ts">
    import Input from "./Input.svelte";
    import Dropdown from "./Dropdown.svelte";
    import { operator_symbols, symbol_operators } from "../../../types";

    export let search_options = [];

    export async function create_query() {
        return {
            type: 'quantity',
            query: await selected.get_query(selected_operator, await input.get_value()),
        };
    }

    let selected_name = null;
    let selected_operator_symbol: string;
    let dropdown_options = search_options.map(option => option.name);
    let input = null;

    $: selected_operator = symbol_operators[selected_operator_symbol];
    $: selected = search_options.find(option => option.name == selected_name);
</script>

<div id="search-tree-leaf">
    <Dropdown bind:selected={selected_name} options={dropdown_options} />

    {#if selected != null}
        <Dropdown bind:selected={selected_operator_symbol} options={selected.operators.map(o => operator_symbols[o])} width="4em" />
        <Input type={selected.input} operator={selected_operator} bind:this={input} />
    {/if}
</div>

<style>
    #search-tree-leaf {
        display: flex;
        flex-direction: row;

        align-items: center;
    }
</style>