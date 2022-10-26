<script lang="ts">
    import SearchResult from "./SearchResult.svelte";

    export let search_results;
</script>

{#await search_results}
    Querying results...
{:then value}
    {#if value === undefined}
        Invalid query
    {:else if value != null}
        {#if value.length > 0}
            {#each value as result}
                <SearchResult {result} />
            {/each}
        {:else}
            <p>No results found</p>
        {/if}
    {/if}
{/await}

<style>

</style>