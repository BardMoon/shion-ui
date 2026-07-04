<script lang="ts">
  import { Separator } from "$lib/components";
  import type { Orientation, ToolbarItem, ToolbarGroups } from "./type";
  import ToolbarButton from "./ToolbarButton.svelte";

  type Props = ToolbarGroups & {
    orientation?: Orientation;
    activeId?: string | null;
    onselect?: (item: ToolbarItem) => void;
    ariaLabel?: string;
  };

  let {
    start = [],
    center = [],
    end = [],
    orientation = "vertical",
    activeId = null,
    onselect,
    ariaLabel = "Toolbar",
  }: Props = $props();
</script>

<nav
  class={["toolbar", "flex gap-0.5 p-1.5 shrink-0", orientation]}
  aria-label={ariaLabel}
>
  {#if start.length > 0}
    <div class={["toolbar-group start", "flex gap-0.5"]}>
      {#each start as item (item.id)}
        <ToolbarButton
          icon={item.icon}
          label={item.label}
          active={activeId === item.id}
          onclick={() => onselect?.(item)}
        />
      {/each}
    </div>
  {/if}

  {#if center.length > 0}
    <div class={["toolbar-group", "flex-1 justify-center"]}>
      {#each center as item (item.id)}
        <ToolbarButton
          icon={item.icon}
          label={item.label}
          active={activeId === item.id}
          onclick={() => onselect?.(item)}
        />
      {/each}
    </div>
  {/if}

  {#if end.length > 0}
    <div class="toolbar-group end">
      {#if start.length > 0 || center.length > 0}
        <Separator />
      {/if}
      {#each end as item (item.id)}
        <ToolbarButton
          icon={item.icon}
          label={item.label}
          active={activeId === item.id}
          onclick={() => onselect?.(item)}
        />
      {/each}
    </div>
  {/if}
</nav>

<style>
  .toolbar {
    background: var(--color-bg);
  }
  .toolbar.vertical {
    flex-direction: column;
    align-items: center;
    width: 44px;
    border-right: 1px solid var(--color-surface-border);
  }
  .toolbar.horizontal {
    flex-direction: row;
    align-items: center;
    height: 44px;
    border-bottom: 1px solid var(--color-surface-border);
  }

  .toolbar.vertical .toolbar-group {
    flex-direction: column;
    align-items: center;
  }
  .toolbar.horizontal .toolbar-group {
    flex-direction: row;
    align-items: center;
  }
  .toolbar.vertical .toolbar-group.start {
    flex: 1;
  }
  .toolbar.horizontal .toolbar-group.start {
    flex: 1;
  }
</style>
