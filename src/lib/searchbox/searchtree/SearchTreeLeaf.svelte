<script lang="ts">
    export let search_options = [];

    import Dropdown from "./Dropdown.svelte";

    let selected_name = null;
    $: selected = search_options.find(option => option.name == selected_name);

    let dropdown_options = search_options.map(option => option.name);

    let selected_operator = null;
</script>

<div id="search-tree-leaf">
    <Dropdown bind:selected={selected_name} options={dropdown_options} />

    {#if selected != null}
        <Dropdown bind:selected={selected_operator} options={selected.operators} />
    {/if}
    <div class="value">

    </div>
</div>

<style>
    #search-tree-leaf {
        display: flex;
        flex-direction: row;
        --height: 2em;
        height: var(--height);
    }
</style>