<script lang="ts">
    import SearchResults from "../lib/searchresults/SearchResults.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { page_name } from "../stores";

    const molecule = $page.url.searchParams.get('molecule');

    let molecules: any[] = [];

    onMount(async () => {
        if (molecule === null) {
            page_name.set("Molecules");
            const molecule_url = new URL('/molecules/', import.meta.env.VITE_API_URL);
            const result = await fetch(molecule_url);

            if (result.ok) {
                molecules = await result.json();
            }
        } else {
            page_name.set("Molecule");
            const molecule_url = new URL('/molecules/' + molecule, import.meta.env.VITE_API_URL);
            const result = await fetch(molecule_url);

            if (result.ok) {
                molecules = [await result.json()];
            }
        }
    });
</script>

<main>
    <SearchResults search_results={molecules} />
</main>

<style>
    main {
        width: 40vw;
        margin: 0 auto;
    }
</style>