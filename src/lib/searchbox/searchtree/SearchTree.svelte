<script lang="ts">
    import SearchTreeModifier from "./SearchTreeModifier.svelte";
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";

    export let search_options;

    export function create_query() {
        return child_element.create_query();
    }

    let child_node = {type: "modifier", data: [], modifier: "and"};
    let child_element;

    function create_root_node() {
        console.log(child_node);
        child_node = {type: "modifier", data: [child_node], modifier: "and"};
        console.log(child_node);
    }
</script>

<div id="search-tree">
    {#if child_node.type === "modifier"}
        <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:modifier={child_node.modifier} bind:this={child_element} root_add_function={create_root_node} />
    {:else if child_node.type === "leaf"}
        <SearchTreeLeaf {search_options} bind:this={child_element} root_add_function={create_root_node} />
    {/if}
</div>

<style>
    #search-tree {
        padding: 10px;
    }
</style>