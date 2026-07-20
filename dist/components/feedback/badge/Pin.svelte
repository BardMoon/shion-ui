<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  type Props = {
    class?: ClassValue;
  };

  let { class: className }: Props = $props();
</script>

<div class={["pin-dot", "rounded-full", className]} aria-label="Pinned"></div>

<style>
  .pin-dot {
    background: var(--color-highlight);
    box-shadow: 0 0 4px var(--color-primary-level4);
  }
</style>
