<script lang="ts">
  import { type Snippet } from "svelte";
  type Props = {
    children?: Snippet;
  };
  let { children }: Props = $props();
</script>

<span class={["badge", "shrink-0"]}>{@render children?.()}</span>

<style>
  .badge {
    padding: 1px 6px;
    font-size: 11px;
    color: var(--color-text-muted);
    background: var(--color-surface-border);
    border-radius: 10px;
  }
</style>
