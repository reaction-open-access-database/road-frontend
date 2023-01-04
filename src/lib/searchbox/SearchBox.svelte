<script lang="ts">
    import SubstanceSearch from "./SubstanceSearch.svelte";
    import ReactionSearch from "./ReactionSearch.svelte";
    import RetrosynthesisSearch from "./RetrosynthesisSearch.svelte";

    export let search_results: any;

    type SearchComponent = SubstanceSearch | ReactionSearch | RetrosynthesisSearch;
    type TypeOfSearchComponent = typeof SubstanceSearch | typeof ReactionSearch | typeof RetrosynthesisSearch;

    enum SearchType {
        Substance,
        Reaction,
        Retrosynthesis,
    }

    const search_type_component: { [key in SearchType] : TypeOfSearchComponent } = {
        [SearchType.Substance]: typeof SubstanceSearch,
        [SearchType.Reaction]: typeof ReactionSearch,
        [SearchType.Retrosynthesis]: typeof RetrosynthesisSearch,
    }

    let search_type: SearchType = SearchType.Substance;
    let search_component: SearchComponent;
</script>

<div id="search-box">
    <div id="options">
        <button class="option" on:click={() => search_type = SearchType.Substance}>Substance</button>
    </div>

    <svelte:component this={search_type_component[search_type]} bind:this={search_component} />

    <button id="search-button" on:click={() => {search_results = search_component.search()}}>Search</button>
</div>

<style>
    #search-box {
        border: var(--medium-grey) 1px solid;
        min-width: 50vw;

        display: flex;
        flex-direction: column;
        align-items: center;

        background: var(--light-grey);

        --border-radius: 10px;
        border-radius: var(--border-radius);

        padding-bottom: 30px;
    }

    #search-button {
        background-color: var(--dark-accent-color);
        color: var(--light-text-color);

        font-size: 1.4em;
        font-weight: bold;

        padding: 0.5em 1em;

        border-radius: 0.3em;
    }

    #options {
        display: flex;

        --option-border-width: 1px;

        width: calc(100% + 2 * var(--option-border-width));

        margin-top: calc(-1 * var(--option-border-width));
    }

    .option {
        width: 100%;
        text-align: center;
        background-color: var(--light-background-color);

        border: var(--dark-grey) solid;
        border-bottom-width: var(--option-border-width);
        border-top-width: var(--option-border-width);
        border-left-width: 0;
    }

    .option {
        border-right-width: var(--option-border-width);
        font-size: 1.2em;
        padding: 0.2em 0;
    }

    .option:first-child {
        border-left-width: var(--option-border-width);

        border-top-left-radius: var(--border-radius);
    }

    .option:last-child {
        border-top-right-radius: var(--border-radius);
    }
</style>