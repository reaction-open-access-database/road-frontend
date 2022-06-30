<script lang="ts">
    import Header from '$lib/Header.svelte';
    import Footer from '$lib/Footer.svelte';
    import '../app.css';
    import {page_name} from '../stores.ts';
</script>

<Header {page_name} />

<slot />

<Footer />