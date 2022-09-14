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
    let vertical_line_top = "0px";
    let vertical_line_height = "0px";
    let parent_node_top = "0px";
    let parent;

    function get_node_position(node) {
        let rect = node.children[0].getBoundingClientRect();
        return (rect.top + rect.bottom) / 2;
    }

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

    $: if (children.length >= 1) {
        let first_node = children[0];
        let final_node = children[children.length - 1];

        let top = get_node_position(first_node);
        let bottom = get_node_position(final_node);

        vertical_line_top = top.toString() + "px";
        vertical_line_height = (bottom - top).toString() + "px";
        parent_node_top = ((top + bottom) / 2).toString() + "px";
    } else {
        try {
            let rect = parent.getBoundingClientRect();
            parent_node_top = rect.top.toString() + "px";
        } catch {

        }
    }
</script>

<div class="parent" bind:this={parent}>
    <div class="parent-node" style="--parent-node-top: {parent_node_top}" on:click={change_modifier_type}>
        {MODIFIER_TYPES[current_modifier_index].toUpperCase()}
    </div>
    <div class="vertical-line" style="--vertical-line-top: {vertical_line_top}; --vertical-line-height: {vertical_line_height}"></div>
    <div class="horizontal-line" style="--horizontal-line-top: {parent_node_top}"></div>
    {#each child_nodes as child_node, i}
        <div class="child" bind:this={children[i]}>
            <div class="child-line"></div>
            <div class="child-node">
                {#if child_node.type === "modifier"}
                    <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:this={child_elements[i]} />
                {:else if child_node.type === "leaf"}
                    <SearchTreeLeaf {search_options} bind:this={child_elements[i]} />
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .parent {
        --parent-node-size: 2rem;
        --horizontal-child-line-length: 35px;
        --child-line-thickness: 1px;
        --child-line-color: black;

        --modifier-gap: calc(var(--parent-node-size) + 0.75rem);
        padding-left: var(--modifier-gap);
    }

    .child {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .child-line {
        width: var(--horizontal-child-line-length);
        height: var(--child-line-thickness);
        background-color: var(--child-line-color);
    }

    .parent-node {
        font-size: 0.75em;

        position: absolute;
        top: var(--parent-node-top);
        transform: translate(calc(-1 * var(--modifier-gap)), -50%);
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

    .vertical-line {
        width: var(--child-line-thickness);
        background-color: var(--child-line-color);
        position: absolute;
        top: var(--vertical-line-top);
        height: var(--vertical-line-height);
    }

    .horizontal-line {
        height: var(--child-line-thickness);
        width: var(--modifier-gap);
        position: absolute;
        top: var(--horizontal-line-top);
        transform: translateX(-100%);
        background-color: var(--child-line-color);
    }
</style>