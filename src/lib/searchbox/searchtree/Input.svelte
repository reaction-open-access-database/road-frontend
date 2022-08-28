<script lang="ts">
    export let type;
</script>

{#if type === 'integer'}
    <input type="number">
{:else if type === 'structure'}
    <!--  TODO: Structure search  -->
{/if}

<style>

</style>