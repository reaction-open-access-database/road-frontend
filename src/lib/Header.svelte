<script lang="ts">
    export let page_name;
</script>

<header>
    <a href="/">
        <img src="/logo.svg" alt="ROAD Logo">
    </a>

    <b>{$page_name}</b>

    <div id="login-section">
        <a href="/signup" id="signup-button">Sign Up</a>
        <a href="/login" id="login-button">Login</a>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #login-section {
        display: flex;
        align-items: center;
    }

    #signup-button, #login-button {
        display: block;
        border-radius: 0.25em;
        border: var(--light-accent-color) 2px solid;

        width: 4.5em;
        --height: 1.75em;

        height: var(--height);

        text-align: center;
        line-height: var(--height);
    }

    #signup-button {
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
</style>