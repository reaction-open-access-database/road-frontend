<script lang="ts">
    import SearchTree from "./searchtree/SearchTree.svelte";

    let search_options = [
        {name: 'hi', operators: ['='], input: 'structure', get_query: () => {}},
        {name: 'ho', operators: ['>', '<', '>=', '<='], input: 'integer', get_query: () => {}},
    ]

    let search_tree;

    export function search() {
        let query = search_tree.create_query();
        console.log(JSON.stringify(query));
    }
</script>

<SearchTree search_options={search_options} bind:this={search_tree}></SearchTree>

<style>

</style>