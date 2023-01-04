<script lang="ts">
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";
    import SearchTreeModifier from "./SearchTreeModifier.svelte";
    import { Modifier, modifier_names } from "../../../types";
    import type { SearchOption, ChildNode } from "../../../types";

    const MODIFIER_TYPES = [
        Modifier.And,
        Modifier.Or,
        Modifier.Not,
    ]

    export let child_nodes: ChildNode[];
    export let search_options: SearchOption[];
    export let root_add_function: (() => void) | null = null;
    export let modifier = Modifier.And;

    export async function create_query() : Promise<any> {
        let promised_subqueries = child_elements.map(async (child) => await child.create_query());
        let unfiltered_subqueries = await Promise.all(promised_subqueries);
        let subqueries = unfiltered_subqueries.filter((query) => query != null);

        // If there are no subqueries, there's no point having the modifier
        if (subqueries.length == 0) {
            return null;
        }

        // If there is only one AND or OR subquery, we don't need to use the modifier
        if (subqueries.length == 1 && (modifier === Modifier.And || modifier === Modifier.Or)) {
            return subqueries[0];
        }

        if (modifier === Modifier.Not) {
            return {
                type: 'modifier',
                query: {
                    type: 'not',
                    query: subqueries[0],
                }
            }
        }

        return {
            type: 'modifier',
            query: {
                type: modifier_names[modifier],
                queries: subqueries,
            }
        };
    }

    let children: HTMLDivElement[] = [];
    let child_elements: (SearchTreeModifier | SearchTreeLeaf)[] = [];

    function add_child_leaf_node() {
        child_nodes.push({type: "leaf", data: {}});
        child_nodes = child_nodes;
    }

    function add_child_modifier_node() {
        child_nodes.push({type: "modifier", data: [], modifier: Modifier.And});
        child_nodes = child_nodes;
    }

    function change_modifier_type() {
        const current_modifier_index = MODIFIER_TYPES.indexOf(modifier);
        const next_modifier_index = (current_modifier_index + 1) % MODIFIER_TYPES.length;
        modifier = MODIFIER_TYPES[next_modifier_index];
    }

    function remove_child(child_index: number) {
        child_nodes.splice(child_index, 1);
        child_nodes = child_nodes;
    }
</script>

<div class="parent">
    <div class="parent-container">
        {#if root_add_function != null}
            <button on:click={root_add_function} class="add-parent-button add-button">+</button>
        {/if}
        <div class="parent-node" on:click={change_modifier_type}>
            {modifier_names[modifier].toUpperCase()}
        </div>
        <div class="horizontal-line" style="background: {child_nodes.length > 0 ? 'var(--child-line-color)' : 'none'}"></div>
        <div class="add-child-buttons">
            <button on:click={add_child_leaf_node} class="add-leaf-button add-button">+</button>
            <button on:click={add_child_modifier_node} class="add-modifier-button add-button">+</button>
        </div>
    </div>
    <div class="children">
        {#each child_nodes as child_node, i (i)}
            <div class="child" bind:this={children[i]}>
                <div class="vertical-line">
                    <div class="upper-vertical-line"></div>
                    <div class="central-vertical-line"></div>
                    <div class="lower-vertical-line"></div>
                </div>
                <div class="child-node-container">
                    <div class="before-child">
                        <div class="child-line"></div>
                        <button class="remove-child-button add-button" on:click={() => remove_child(i)}>-</button>
                    </div>
                    <div class="child-node">
                        {#if child_node.type === "modifier"}
                            <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:modifier={child_node.modifier} bind:this={child_elements[i]} />
                        {:else if child_node.type === "leaf"}
                            <SearchTreeLeaf {search_options} bind:this={child_elements[i]} />
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .parent {
        --parent-node-size: 2rem;
        --horizontal-child-line-length: 1rem;
        --child-line-thickness: 1px;
        --child-line-color: black;

        --modifier-gap: calc(var(--parent-node-size) + var(--horizontal-child-line-length));

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .parent-container {
        display: flex;
        align-items: center;

        position: relative;
    }

    .child {
        display: flex;
    }

    .child-node-container {
        display: flex;
        align-items: center;
    }

    .child:not(:only-child) > .child-node-container {
        padding: 10px 0;
    }

    .child-line {
        width: var(--horizontal-child-line-length);
        height: var(--child-line-thickness);
        background-color: var(--child-line-color);
    }

    .vertical-line {
        display: flex;
        flex-direction: column;
    }

    .lower-vertical-line {
        width: var(--child-line-thickness);
        height: 50%;
    }

    .central-vertical-line {
        width: var(--child-line-thickness);
        height: 1px;
        background-color: var(--child-line-color);
    }

    .upper-vertical-line {
        width: var(--child-line-thickness);
        height: 50%;
    }

    .child:not(:last-child) > .vertical-line > .lower-vertical-line {
        background-color: var(--child-line-color);
    }

    .child:not(:first-child) > .vertical-line > .upper-vertical-line {
        background-color: var(--child-line-color);
    }

    .parent-node {
        font-size: 0.75em;

        background-color: var(--medium-light-grey);
        border-radius: 50%;
        border: 1px solid var(--medium-grey);

        width: var(--parent-node-size);
        height: var(--parent-node-size);
        line-height: var(--parent-node-size);
        text-align: center;

        z-index: 1;

        cursor: pointer;
    }

    .horizontal-line {
        height: var(--child-line-thickness);
        width: var(--horizontal-child-line-length);
    }

    .add-child-buttons {
        display: none;
        flex-direction: column;
        position: relative;
        width: 0;

        font-size: 0.75em;

        left: -1.1em;
    }

    .add-button {
        font-size: inherit;
        background-color: var(--dark-background-color);
        width: 1em;
        color: var(--light-text-color);
        padding: 0;
    }

    .add-parent-button {
        display: none;

        font-size: 0.75em;
    }

    .add-modifier-button {
        margin-top: 0.5em;
        border-radius: 50%;
    }

    .parent-container:hover > .add-child-buttons {
        display: flex;
    }

    .parent-container:hover > .add-parent-button {
        display: block;
        position: absolute;
        left: 0;
        transform: translateX(-120%);
    }

    .parent-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1em;
        height: 100%;
        transform: translateX(-100%);
    }

    .remove-child-button {
        font-size: 0.75em;
        position: absolute;

        transform: translate(25%, 25%);

        z-index: 1;

        padding: 0;

        display: none;
    }

    .child-node-container:hover > .before-child > .remove-child-button {
        display: block;
    }
</style>