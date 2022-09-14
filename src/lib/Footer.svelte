<script lang="ts">
    let footer_height;
</script>

<div id="footer-spacer" style="height: {footer_height}px"></div>

<footer bind:clientHeight={footer_height}>
    <div class="column">
        <a href="/about">About</a>
        <a href="">What is ROAD?</a> <!-- TODO: href -->
        <a href="/about/license">License</a>
        <a href="/about/privacy">Privacy Policy</a>
        <a href="">Disclaimer</a> <!-- TODO: href -->
    </div>
    <div class="column">
        <a href="">Tools</a> <!-- TODO: href -->
        <a href="">Substance Search</a> <!-- TODO: href -->
        <a href="">Reaction Search</a> <!-- TODO: href -->
        <a href="">Retrosynthesis</a> <!-- TODO: href -->
        <a href="">Add reaction</a> <!-- TODO: href -->
        <a href="">Batch Edit</a> <!-- TODO: href -->
    </div>
    <div class="column">
        <a href="/documentation">Documentation</a>
        <a href="">Substance Search</a> <!-- TODO: href -->
        <a href="">Reaction Search</a> <!-- TODO: href -->
        <a href="">Retrosynthesis</a> <!-- TODO: href -->
        <a href="">Adding Substances</a> <!-- TODO: href -->
        <a href="">Adding Reactions</a> <!-- TODO: href -->
    </div>
    <div class="column">
        <a href="">Download</a> <!-- TODO: href -->
        <a href="">Download Database</a> <!-- TODO: href -->
        <a href="">Download Schema</a> <!-- TODO: href -->
    </div>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-around;
        background-color: var(--dark-background-color);

        position: fixed;
        bottom: 0;

        --side-padding: 10vw;
        width: calc(100vw - 2 * var(--side-padding));

        padding-top: 1em;
        padding-bottom: 1.5em;
        padding-left: var(--side-padding);
        padding-right: var(--side-padding);
    }

    a {
        color: var(--light-text-color);
        text-decoration: none;
        display: block;
    }

    a:first-child {
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 0.5em;
    }
</style>