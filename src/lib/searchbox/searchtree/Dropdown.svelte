<script lang="ts">
    export let selected: string | null;
    export let options: string[] = [];
    export let height = "calc(2em + 2px)"; // 2px for the border
    export let width = "12em";

    $: selected = options.length ? selected : null;

    let visible = false;
    let active: boolean;
    let contents: string;

    // If there is only one option available,
    // don't bother asking the user to select one
    $: active = options.length !== 1;

    // When an option is selected, hide the dropdown
    $: {
        active;
        selected; // Bind to whenever the selected option changes.
        visible = false;
    }

    // If no option has been selected, prompt the user to select one
    $: if (selected === null) {
        contents = "Choose Option";
    } else {
        contents = selected;
    }

    function set_selected(option) {
        selected = option;
        visible = false;
    }
</script>

<div id="dropdown" style="--total-button-height: {height}; --total-dropdown-width: {width}" on:mouseenter={() => {visible = true}} on:mouseleave={() => {visible = false}}>
    {#if active}
        <a id="toggle-button" on:click={() => {visible = !visible}}>
            <p>{contents}</p>
            <p>▼</p>
        </a>
    {:else}
        <p id="single-option">{contents}</p>
    {/if}

{#if visible && active}
    <div id="menu">
        {#each options as option}
            <button on:click={() => set_selected(option)}>{option}</button>
        {/each}
    </div>
{/if}
</div>

<style>
    #dropdown {
        --button-padding: 0.5em;
        --border-width: 1px;
        --button-height: calc(var(--total-button-height) - 2 * var(--button-padding) - 2 * var(--border-width));
        --dropdown-width: calc(var(--total-dropdown-width) - 2 * var(--button-padding) - 2 * var(--border-width));

        position: relative;
        height: var(--total-button-height);
        width: var(--total-dropdown-width);
    }

    #toggle-button {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--dropdown-width);
        text-align: left;
        padding: var(--button-padding);

        background-color: var(--medium-light-grey);
        border: var(--border-width) solid var(--medium-grey);

        display: flex;
        justify-content: space-between;
    }

    #menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: var(--total-button-height);
        left: 0;
        background: var(--light-background-color);
        width: var(--total-dropdown-width);
        z-index: 10;
    }

    #menu > button {
        background: none;

        padding: 0.5em;
    }

    #toggle-button > * {
        line-height: var(--button-height);
    }

    #single-option {
        width: var(--dropdown-width);
        line-height: var(--button-height);
        padding: var(--button-padding);

        background-color: var(--medium-light-grey);
        border: var(--border-width) solid var(--medium-grey);

        text-align: center;
    }
</style>