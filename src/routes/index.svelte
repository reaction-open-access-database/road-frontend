<script lang="ts">
    import {page_name} from "../stores.ts";
    import SearchBox from "$lib/searchbox/SearchBox.svelte";
    import Contribute from "../lib/Contribute.svelte";
    import SearchResults from "../lib/searchresults/SearchResults.svelte";

    page_name.set("Home");

    let search_results = null;
</script>

<main>
    <div id="spacer"></div>

    <SearchBox bind:search_results={search_results} />

    <SearchResults {search_results} />

    <Contribute />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #spacer {
        height: 10vh;
    }
</style>