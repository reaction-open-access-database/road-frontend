<script lang="ts">
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";

    export let child_nodes;
    export let search_options;

    let children = [];
    let vertical_line_top = "0px";
    let vertical_line_height = "0px";
    let parent_node_top = "0px";

    function get_node_position(node) {
        let rect = node.children[0].getBoundingClientRect();
        return (rect.top + rect.bottom) / 2;
    }

    $: if (children.length >= 1) {
        let first_node = children[0];
        let final_node = children[children.length - 1];

        let top = get_node_position(first_node);
        let bottom = get_node_position(final_node);

        vertical_line_top = top.toString() + "px";
        vertical_line_height = (bottom - top).toString() + "px";
        parent_node_top = ((top + bottom) / 2).toString() + "px";
    }
</script>

<div class="parent">
    <div class="parent-node" style="--parent-node-top: {parent_node_top}">
        AND
    </div>
    <div class="vertical-line" style="--vertical-line-top: {vertical_line_top}; --vertical-line-height: {vertical_line_height}"></div>
    {#each child_nodes as child_node, i}
        <div class="child" bind:this={children[i]}>
            <div class="child-line"></div>
            <div class="child-node">
                <SearchTreeLeaf {...child_node} {search_options} />
            </div>
        </div>
    {/each}
</div>

<style>
    .parent {
        --horizontal-child-line-length: 25px;
        --child-line-width: 1px;
        --child-line-color: black;
    }

    .child {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .child-line {
        width: var(--horizontal-child-line-length);
        height: var(--child-line-width);
        background-color: var(--child-line-color);
    }

    .parent-node {
        font-size: 0.75em;

        position: absolute;
        top: var(--parent-node-top);
        transform: translate(-50%, -50%);
        background-color: var(--medium-light-grey);
        border-radius: 50%;
        border: 1px solid var(--medium-grey);

        --parent-node-size: 2.5em;
        width: var(--parent-node-size);
        height: var(--parent-node-size);
        line-height: var(--parent-node-size);
        text-align: center;

        z-index: 1;
    }

    .vertical-line {
        width: var(--child-line-width);
        background-color: var(--child-line-color);
        position: absolute;
        top: var(--vertical-line-top);
        height: var(--vertical-line-height);
    }
</style>