<script lang="ts">
  import { untrack } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Toolbar, Splitter, paneStore, type Pane } from "..";

  type Props = {
    class?: ClassValue;
    items: string[];
    bottomItems?: string[];
    size?: number;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapseThreshold?: number;
  };
  let {
    items,
    bottomItems = [],
    class: className,
    size = $bindable(260),
    defaultSize = 260,
    minSize = 180,
    maxSize = 480,
    collapseThreshold = 100,
  }: Props = $props();

  const topPanes = $derived(paneStore.list(items));
  const bottomPanes = $derived(paneStore.list(bottomItems));

  let activeId = $state<string | null>(untrack(() => items[0] ?? null));
  const activePane = $derived(
    [...topPanes, ...bottomPanes].find((p) => p.id === activeId) ?? null,
  );

  let panelEl: HTMLElement | undefined = $state();

  function handleSelect(pane: Pane) {
    if (activeId === pane.id) {
      activeId = null;
      return;
    }
    activeId = pane.id;
    if (size < minSize) size = defaultSize;
  }

  function handleCollapse() {
    activeId = null;
  }
</script>

<div class={["flex h-full", className]}>
  <Toolbar
    orientation="vertical"
    start={topPanes}
    end={bottomPanes}
    {activeId}
    onselect={handleSelect}
    ariaLabel="Sidebar"
  />

  {#if activePane?.content}
    <div
      bind:this={panelEl}
      class={["panel", "shrink-0 overflow-y-auto"]}
      style={`width: ${size}px;`}
    >
      <activePane.content {...activePane.props} />
    </div>
    <Splitter
      container={panelEl}
      orientation="horizontal"
      bind:size
      {defaultSize}
      {minSize}
      {maxSize}
      {collapseThreshold}
      oncollapse={handleCollapse}
    />
  {/if}
</div>

<style>
  .panel {
    border-right: 1px solid var(--color-surface-border);
    background: var(--color-view);
  }
</style>
