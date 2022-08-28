<script lang="ts">
    import Input from "./Input.svelte";
    import Dropdown from "./Dropdown.svelte";

    export let search_options = [];

    let selected_name = null;
    let selected_operator = null;
    let dropdown_options = search_options.map(option => option.name);

    $: selected = search_options.find(option => option.name == selected_name);
</script>

<div id="search-tree-leaf">
    <Dropdown bind:selected={selected_name} options={dropdown_options} />

    {#if selected != null}
        <Dropdown bind:selected={selected_operator} options={selected.operators} width="4em" />
        <Input type={selected.input} />
    {/if}
</div>

<style>
    #search-tree-leaf {
        display: flex;
        flex-direction: row;
        --height: 2em;
        height: var(--height);
    }
</style>