<script lang="ts">
    import Input from "./Input.svelte";
    import Dropdown from "./Dropdown.svelte";
    import {operator_symbols, symbol_operators} from "../../../types";
    import type { SearchOption } from "../../../types";

    export let search_options: SearchOption[] = [];
    export let remove_self_function: (() => void) | null = null;

    export async function create_query() : Promise<any> {
        return {
            type: 'quantity',
            query: await selected?.get_query(selected_operator, await input.get_value()),
        };
    }

    let selected_name: string;
    let selected_operator_symbol: string;
    let dropdown_options = search_options.map(option => option.name);
    let input: Input;
    let selected: SearchOption | undefined;

    $: selected_operator = symbol_operators[selected_operator_symbol];
    $: selected = search_options.find(option => option.name == selected_name);
</script>

<div id="search-tree-leaf">
    {#if remove_self_function != null}
        <button class="remove-self-button" on:click={remove_self_function}>-</button>
    {/if}
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

        position: relative;
    }

    .remove-self-button {
        font-size: 0.75em;

        position: absolute;
        left: 0;
        transform: translate(-120%, 75%);

        z-index: 1;

        padding: 0;

        display: none;

        background-color: var(--dark-background-color);
        color: var(--light-text-color);

        width: 1em;
    }

    #search-tree-leaf:hover > .remove-self-button {
        display: block;
    }

    #search-tree-leaf::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1em;
        height: 100%;
        transform: translateX(-100%);
    }
</style>