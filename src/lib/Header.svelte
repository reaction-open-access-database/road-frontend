<script lang="ts">
    export let page_name;
</script>

<header>
    <a href="/">
        <img src="/logo.svg" alt="ROAD Logo">
    </a>

    {$page_name}

    <div id="login-section">
        <a href="/signup" id="signup-button">Sign Up</a>
        <a href="/login" id="login-button">Login</a>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    #signup-button {
        background-color: white;
    }
</style>