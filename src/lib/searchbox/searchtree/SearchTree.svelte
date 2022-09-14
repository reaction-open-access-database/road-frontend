<script lang="ts">
    import SearchTreeModifier from "./SearchTreeModifier.svelte";
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";

    export let search_options;

    let child_node = {type: "modifier", data: [{type: "leaf", data: {}}, {type: "modifier", data: []}]};
    let child_element;

    export function create_query() {
        return child_element.create_query();
    }
</script>

<div id="search-tree">
    {#if child_node.type === "modifier"}
        <SearchTreeModifier child_nodes={child_node.data} {search_options} bind:this={child_element}/>
    {:else if child_node.type === "leaf"}
        <SearchTreeLeaf {search_options} bind:this={child_element} />
    {/if}
</div>

<style>

</style>