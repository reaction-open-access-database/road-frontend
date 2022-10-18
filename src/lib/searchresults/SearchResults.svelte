<script lang="ts">
    import SearchResult from "./SearchResult.svelte";

    export let search_results;
</script>

{#await search_results then value}
    {#if value != null}
        {#each value as result}
            <SearchResult {result} />
        {/each}
    {/if}
{/await}

<style>

</style>