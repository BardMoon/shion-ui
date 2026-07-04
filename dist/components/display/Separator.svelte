<script lang="ts">
  import { Separator } from "bits-ui";
  import type { ClassValue } from "svelte/elements";

  type Props = {
    orientation?: "horizontal" | "vertical";
    class?: ClassValue;
  };

  let { orientation = "horizontal", class: className }: Props = $props();
</script>

<Separator.Root {orientation} class={["separator", className]} />

<style>
  :global(.separator) {
    flex-shrink: 0;
    background: var(--color-surface-border);
  }
  :global(.separator[data-orientation="horizontal"]) {
    height: 1px;
    margin: 0.25rem 0.5rem;
  }
  :global(.separator[data-orientation="vertical"]) {
    width: 1px;
    align-self: stretch;
    margin: 0.5rem 0.25rem;
  }
</style>
