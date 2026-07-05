<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import { Toolbar, Splitter, paneStore, type Pane } from "$lib/layouts";

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

  let activeId = $state<string | null>(items[0] ?? null);
  let collapsed = $state(false);

  const activePane = $derived(
    [...topPanes, ...bottomPanes].find((p) => p.id === activeId) ?? null,
  );

  let panelEl: HTMLElement | undefined = $state();

  function handleSelect(pane: Pane) {
    if (activeId === pane.id) {
      // 同じアイコンをもう一度押したらトグルで畳む/開く
      collapsed = !collapsed;
      return;
    }
    activeId = pane.id;
    collapsed = false;
    if (size < minSize) size = defaultSize;
  }

  function handleCollapse() {
    collapsed = true;
  }

  function handleResize() {
    // ドラッグでしきい値を超えて押し戻されたら自動的に展開扱いにする
    if (collapsed) collapsed = false;
  }

  function handleDoubleClick() {
    collapsed = false;
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
      style={`width: ${collapsed ? 0 : size}px;`}
    >
      {#if !collapsed}
        <activePane.content {...activePane.props} />
      {/if}
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
      onresize={handleResize}
      ondoubleclick={handleDoubleClick}
    />
  {/if}
</div>

<style>
  .panel {
    border-right: 1px solid var(--color-surface-border);
    background: var(--color-view);
  }
</style>
