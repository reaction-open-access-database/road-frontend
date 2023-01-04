<script context="module" lang="ts">
  export function load(data: { error: { message: string }, status: number }) {
      return {
          props: {
              title: `${data.status}: ${data.error.message}`
          }
      };
  }
</script>

<script lang="ts">
  export let title: string;
</script>

<h1>{title}</h1>