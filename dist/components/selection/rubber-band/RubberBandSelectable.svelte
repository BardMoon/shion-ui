<script lang="ts">
  import type { Snippet } from "svelte";
  import { getRubberBandContext } from "./rubber-band-context.js";

  type Props = {
    key: string;
    children: Snippet<[{ selected: boolean }]>;
  };

  let { key, children }: Props = $props();

  const ctx = getRubberBandContext();

  let el: HTMLElement | undefined = $state();

  $effect(() => {
    if (!el) return;
    return ctx.register(key, el);
  });

  const selected = $derived(ctx.isSelected(key));
</script>

<div bind:this={el} style="display: contents;">
  {@render children({ selected })}
</div>
