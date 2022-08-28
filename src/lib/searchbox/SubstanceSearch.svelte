<script lang="ts">
    import SearchTree from "./searchtree/SearchTree.svelte";

    let search_options = [
        {name: 'hi', operators: ['=']},
        {name: 'ho', operators: ['>', '<', '>=', '<=']},
    ]
</script>

<SearchTree search_options={search_options}></SearchTree>

<style>

</style>