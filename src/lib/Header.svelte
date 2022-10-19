<script lang="ts">
    import { user } from '../stores';

    export let page_name;

    $: is_logged_in = $user !== null;

    $: if (is_logged_in) {
        console.log($user);
    }

    function logout() {
        user.set(null);
    }
</script>

<header>
    <a href="/">
        <img src="/logo.svg" alt="ROAD Logo">
    </a>

    <b id="page-title">{$page_name}</b>

    {#if is_logged_in}
        <p id="user-name">
            {$user.username} ▼
            <button id="logout-button" on:click={logout}>Logout</button>
        </p>
    {:else}
        <div id="login-section">
            <a href="/accounts/register" id="register-button">Register</a>
            <a href="/accounts/login" id="login-button">Login</a>
        </div>
    {/if}
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #page-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    #login-section {
        display: flex;
        align-items: center;
    }

    #register-button, #login-button {
        display: block;
        border-radius: 0.25em;
        border: var(--light-accent-color) 2px solid;

        width: 4.5em;
        --height: 1.75em;

        height: var(--height);

        text-align: center;
        line-height: var(--height);
    }

    #register-button {
        background-color: white;
        color: var(--light-accent-color);

        margin-right: 1.25em;
    }

    #login-button {
        background-color: var(--light-accent-color);
        color: var(--light-text-color);
    }

    a {
        text-decoration: none;
    }

    #user-name {
        cursor: pointer;
        position: relative;
    }

    #logout-button {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;

        font-size: inherit;
        font-family: inherit;
    }

    #user-name:hover #logout-button {
        display: block;
        background: none;
    }
</style>