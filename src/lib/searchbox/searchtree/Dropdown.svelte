<script lang="ts">
    export let selected;
    export let options = [];
    export let height = "2em";
    export let width = "10em";

    let visible = false;
    let active;
    let contents;

    // If there is only one option available,
    // don't bother asking the user to select one
    $: if (options.length === 1) {
        active = false;
        selected = options[0];
    } else {
        active = true;
        selected = null;
    }

    function display_menu() {
        visible = !visible;
    }

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
</script>

<div id="dropdown" style="--total-button-height: {height}; --total-dropdown-width: {width}">
    {#if active}
        <a on:click={display_menu} id="toggle-button">
            <p>{contents}</p>
            <p>▼</p>
        </a>
    {:else}
        <p id="single-option">{contents}</p>
    {/if}

{#if visible}
    <div id="menu">
        {#each options as option}
            <button on:click={() => {selected = option}}>{option}</button>
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