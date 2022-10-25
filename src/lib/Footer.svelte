<script lang="ts">
    let footer_height;
</script>

<div id="footer-spacer" style="height: {footer_height}px"></div>

<footer bind:clientHeight={footer_height}>
    <div class="column">
        <p>Tools</p>
        <a href="/">Substance Search</a>
        <a href="/create-molecule">Create Molecule</a>
        <a href="/molecules">View Molecules</a>
    </div>
    <div class="column">
        <p>Account</p>
        <a href="/accounts/register">Register</a>
        <a href="/accounts/login">Login</a>
    </div>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-around;
        background-color: var(--dark-background-color);

        position: absolute;
        bottom: 0;

        --side-padding: 10%;
        width: calc(100% - 2 * var(--side-padding));

        z-index: 10;

        padding: 1em var(--side-padding) 1.5em;
    }

    a, p {
        color: var(--light-text-color);
        text-decoration: none;
        display: block;
    }

    a:first-child, p:first-child {
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 0.5em;
    }
</style>