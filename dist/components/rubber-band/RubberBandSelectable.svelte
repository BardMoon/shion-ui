<script lang="ts">
  import type { Snippet } from "svelte";
  import { getRubberBandContext } from "./rubber-band-context.js";

  type Props = {
    children: Snippet<[{ selected: boolean }]>;
  };

  let { children }: Props = $props();

  const ctx = getRubberBandContext();
  const id = Symbol("rubber-band-item");

  let el: HTMLElement | undefined = $state();

  $effect(() => {
    if (!el) return;
    return ctx.register(id, el);
  });

  const selected = $derived(ctx.isSelected(id));
</script>

<div bind:this={el} style="display: contents;">
  {@render children({ selected })}
</div>
