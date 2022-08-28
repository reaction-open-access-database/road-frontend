<script lang="ts">
    import SearchTreeLeaf from "./SearchTreeLeaf.svelte";

    export let search_options;
</script>

<div id="search-tree">
    <SearchTreeLeaf {search_options}></SearchTreeLeaf>
</div>

<style>

</style>