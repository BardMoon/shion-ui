<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import { Toolbar, Splitter } from "$lib/layouts";
  import type { SidebarItem } from "./types.js";

  type Props = {
    class?: ClassValue;
    items: SidebarItem[];
    bottomItems?: SidebarItem[];
    size?: number;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
  };
  let {
    items,
    bottomItems = [],
    class: className,
    size = $bindable(260),
    defaultSize = 260,
    minSize = 180,
    maxSize = 480,
  }: Props = $props();

  let activeId = $state<string | null>(items[0]?.id ?? null);

  const activeItem = $derived(
    [...items, ...bottomItems].find((i) => i.id === activeId) ?? null,
  );

  let container: HTMLElement | undefined = $state();
  let panelEl: HTMLElement | undefined = $state();

  function handleSelect(item: SidebarItem) {
    activeId = activeId === item.id ? null : item.id;
  }
</script>

<div bind:this={container} class={["flex h-full", className]}>
  <Toolbar
    orientation="vertical"
    start={items}
    end={bottomItems}
    {activeId}
    onselect={handleSelect}
    ariaLabel="Sidebar"
  />

  {#if activeItem?.panel}
    <div
      bind:this={panelEl}
      class={["panel", "shrink-0 overflow-y-auto"]}
      style={`width: ${size}px;`}
    >
      <activeItem.panel />
    </div>
    <Splitter
      container={panelEl}
      orientation="horizontal"
      bind:size
      {defaultSize}
      {minSize}
      {maxSize}
    />
  {/if}
</div>

<style>
  .panel {
    border-right: 1px solid var(--color-surface-border);
    background: var(--color-view);
  }
</style>
