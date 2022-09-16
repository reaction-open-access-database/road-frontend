<script lang="ts">
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";
    import SearchTreeModifier from "./SearchTreeModifier.svelte";

    const MODIFIER_TYPES = [
        "and",
        "or",
        "not",
    ]

    let current_modifier_index = 0;

    export let child_nodes;
    export let search_options;

    export function create_query() {
        let subqueries = child_elements
            .map((child) => child.create_query())
            .filter((query) => query != null);
        let modifier = MODIFIER_TYPES[current_modifier_index];

        // If there are no subqueries, there's no point having the modifier
        if (subqueries.length == 0) {
            return null;
        }

        // If there is only one AND or OR subquery, we don't need to use the modifier
        if (subqueries.length == 1 && (modifier == "and" || modifier == "or")) {
            return subqueries[0];
        }

        return {
            type: 'modifier',
            query: {
                type: modifier,
                queries: subqueries,
            }
        };
    }

    let children = [];
    let child_elements = [];
    let parent;

    function add_child_leaf_node() {
        child_nodes.push({type: "leaf", data: {}});
        child_nodes = child_nodes;
    }

    function add_child_modifier_node() {
        child_nodes.push({type: "modifier", data: []});
        child_nodes = child_nodes;
    }

    function change_modifier_type() {
        current_modifier_index++;
        current_modifier_index %= MODIFIER_TYPES.length;
    }
</script>

<div class="parent" bind:this={parent}>
    <div class="parent-container">
        <div class="parent-node" on:click={change_modifier_type}>
            {MODIFIER_TYPES[current_modifier_index].toUpperCase()}
        </div>
        <div class="horizontal-line" style="background: {child_nodes.length > 0 ? 'var(--child-line-color)' : 'none'}"></div>
        <div class="add-child-buttons">
            <button on:click={add_child_leaf_node} class="add-leaf-button">+</button>
            <button on:click={add_child_modifier_node} class="add-modifier-button">+</button>
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
                    <div class="child-line"></div>
                    <div class="child-node">
                        {#if child_node.type === "modifier"}
                            <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:this={child_elements[i]} />
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

        font-size: 0.8em;

        left: -1.1em;
    }

    .add-child-buttons > button {
        background-color: var(--dark-background-color);
        width: 1em;
        color: var(--light-text-color);
    }

    .add-modifier-button {
        margin-top: 0.5em;
        border-radius: 50%;
    }

    .parent-container:hover > .add-child-buttons {
        display: flex;
    }
</style>