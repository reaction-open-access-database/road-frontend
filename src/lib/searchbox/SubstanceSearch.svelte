<script lang="ts">
    import SearchTree from "./searchtree/SearchTree.svelte";

    let search_options = [
        {name: 'hi', operators: ['='], input: 'structure'},
        {name: 'ho', operators: ['>', '<', '>=', '<='], input: 'integer'},
    ]
</script>

<SearchTree search_options={search_options}></SearchTree>

<style>

</style>