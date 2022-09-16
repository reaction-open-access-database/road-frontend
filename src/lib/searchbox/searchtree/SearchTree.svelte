<script lang="ts">
    import SearchTreeModifier from "./SearchTreeModifier.svelte";
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";

    export let search_options;

    export function create_query() {
        return child_element.create_query();
    }

    let child_node = {type: "modifier", data: []};
    let child_element;
</script>

<div id="search-tree">
    {#if child_node.type === "modifier"}
        <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:this={child_element}/>
    {:else if child_node.type === "leaf"}
        <SearchTreeLeaf {search_options} bind:this={child_element} />
    {/if}
</div>

<style>
    #search-tree {
        padding: 10px;
    }
</style>