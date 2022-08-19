<script>
    import { onMount } from 'svelte';

    let options = {
        oneMolecule: false,
        requireStartingAtom: false,
        includeQuery: true,
    };

    let sketcher_chemdoodle = null;

    onMount(() => {
        sketcher_chemdoodle = new ChemDoodle.SketcherCanvas('sketcher', 800, 500, options);
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/chemdoodle/ChemDoodleWeb.css" type="text/css">
    <script type="text/javascript" src="/chemdoodle/ChemDoodleWeb.js"></script>
    <link rel="stylesheet" href="/chemdoodle/jquery-ui-1.11.4.css" type="text/css">
    <script type="text/javascript" src="/chemdoodle/ChemDoodleWeb-uis.js"></script>
</svelte:head>

<main>
    <canvas id="sketcher" width="800" height="500"></canvas>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>