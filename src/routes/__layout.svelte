<script lang="ts">
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import '../app.css';
    import {page_name} from '../stores.ts';
</script>

<div id="page-container">
    <Header {page_name} />

    <slot />

    <Footer />
</div>

<style>
    #page-container {
        min-height: 100vh;
        position: relative;
    }
</style>