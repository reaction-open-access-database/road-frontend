<script lang="ts">
    export let result;
</script>

<div class="search-result">
    {@html result.svg}
    <p class="result-name">{result.name}</p>
</div>

<style>
    .search-result {
        background-color: var(--medium-grey);
        border-radius: 10px;

        display: flex;
        flex-direction: row;
        align-items: center;

        padding: 10px;

        margin: 10px;
    }

    .result-name {
        margin-left: 2em;
    }
</style>