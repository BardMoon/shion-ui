<script lang="ts" generics="T extends { id: string | number }">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  type Props = {
    items: T[];
    cell: Snippet<[T]>;
    getKey?: (item: T) => string | number;
    class?: ClassValue;
    minCellWidth?: number;
    gap?: number;
  };

  let {
    items,
    cell,
    getKey = (item) => item.id,
    class: className,
    minCellWidth = 140,
    gap = 8,
  }: Props = $props();
</script>

<div
  class={["grid p-2", className]}
  style={`grid-template-columns: repeat(auto-fill, minmax(${minCellWidth}px, 1fr)); gap: ${gap}px;`}
>
  {#each items as item (getKey(item))}
    {@render cell(item)}
  {/each}
</div>
