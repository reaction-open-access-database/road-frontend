<script lang="ts">
    import {page_name} from "../stores.ts";
    import SearchBox from "$lib/searchbox/SearchBox.svelte";
    import Contribute from "../lib/Contribute.svelte";
    import SearchResults from "../lib/searchresults/SearchResults.svelte";

    page_name.set("Home");

    let search_results = null;
</script>

<main>
    <div id="spacer-1"></div>

    <SearchBox bind:search_results={search_results} />

    {#if search_results}
        <div id="spacer-2"></div>
    {/if}

    <SearchResults {search_results} />

    <Contribute />

    <div id="spacer-3"></div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #spacer-1 {
        height: 10vh;
    }

    #spacer-2 {
        height: 5vh;
    }

    #spacer-3 {
        height: 5vh;
    }
</style>