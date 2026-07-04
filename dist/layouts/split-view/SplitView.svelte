<script lang="ts">
  import type { Snippet } from "svelte";
  import Splitter from "./Splitter.svelte";
  import type { Orientation } from "./types";

  let {
    first,
    second,
    defaultSize = 280,
    size = $bindable(280),
    minSize = 180,
    maxSize = 600,
    orientation = "horizontal",
    overlay = false,
  }: {
    first: Snippet;
    second: Snippet;
    defaultSize?: number;
    size?: number;
    minSize?: number;
    maxSize?: number;
    orientation?: Orientation;
    overlay?: boolean;
  } = $props();

  let container: HTMLElement | undefined = $state();

  const dimension = $derived(orientation === "horizontal" ? "width" : "height");
</script>

<div
  bind:this={container}
  class={[
    "flex h-full w-full",
    {
      "flex-col": orientation === "vertical",
      "flex-row": orientation === "horizontal",
    },
  ]}
>
  <div
    class="shrink-0"
    style={`${dimension}:${size}px; min-${dimension}:${minSize}px; max-${dimension}:${maxSize}px;`}
  >
    {@render first()}
  </div>

  <Splitter
    bind:size
    {container}
    {orientation}
    {defaultSize}
    {minSize}
    {maxSize}
    {overlay}
  />

  <div class="flex-1 overflow-auto">
    {@render second()}
  </div>
</div>
