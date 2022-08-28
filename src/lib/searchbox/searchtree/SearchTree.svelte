<script lang="ts">
    import SearchTreeModifier from "./SearchTreeModifier.svelte";

    export let search_options;

    let child_nodes = [
        {},
        {},
        {},
    ]
</script>

<div id="search-tree">
    <SearchTreeModifier {child_nodes} {search_options}></SearchTreeModifier>
</div>

<style>

</style>