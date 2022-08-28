<script lang="ts">
    export let selected = null;
    export let options = [];

    let visible = false;

    function display_menu() {
        visible = !visible;
    }

    $: {
        selected; // Bind to whenever the selected option changes.
        visible = false;
    }
</script>

<div id="dropdown">
    <a on:click={display_menu} id="toggle-button">
        <p>{#if selected === null} Choose Option {:else} {selected} {/if}</p>
        <p>▼</p>
    </a>

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
        --button-height: 1em;
        --dropdown-width: 10em;
        --border-width: 1px;
        --total-button-height: calc(var(--button-height) + 2 * var(--button-padding) + 2 * var(--border-width));
        --total-dropdown-width: calc(var(--dropdown-width) + 2 * var(--button-padding) + 2 * var(--border-width));

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
        line-height: 1em;
    }
</style>