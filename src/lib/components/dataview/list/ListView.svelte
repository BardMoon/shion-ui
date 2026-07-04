<script lang="ts" generics="T extends { id: string | number }">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  type Props = {
    items: T[];
    cell: Snippet<[T]>;
    getKey?: (item: T) => string | number;
    class?: ClassValue;
    gap?: number;
  };

  let {
    items,
    cell,
    getKey = (item) => item.id,
    class: className,
    gap = 4,
  }: Props = $props();
</script>

<div class={["flex flex-col p-2", className]} style={`gap: ${gap}px;`}>
  {#each items as item (getKey(item))}
    {@render cell(item)}
  {/each}
</div>
