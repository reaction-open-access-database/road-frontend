<script lang="ts">
    import {page_name} from "../stores.ts";
    import SearchBox from "$lib/searchbox/SearchBox.svelte";
    import Contribute from "../lib/Contribute.svelte";

    page_name.set("Home");

    let num_reactions = 1234;
    let num_sources = 321;
</script>

<main>
    <p id="summary">Search through {num_reactions} reactions from {num_sources} sources.</p>

    <SearchBox />

    <Contribute />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>