<script lang="ts">
  import { getContextMenu } from "./context-menu.svelte.js";
  import { Dropdown } from "$lib/components";
  import type { MenuItemType } from "$lib/types";

  const contextMenu = getContextMenu();
</script>

<Dropdown
  class="fixed z-50 p-1"
  style={`left:${contextMenu.x}px;top:${contextMenu.y}px;`}
  items={contextMenu.items}
  open={contextMenu.open}
  onclose={contextMenu.hide}
  onclick={contextMenu.hide}
>
  {#snippet content(item: MenuItemType)}
    {#if item.type === "item"}
      {@const Icon = item.icon}
      {#if Icon}
        <Icon size={13} />
      {/if}
      <span
        class={[
          "flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
        ]}>{item.label}</span
      >
      {#if item.shortcut}
        <span class={["shortcut", "shrink-0 mr-0.5"]}>{item.shortcut}</span>
      {/if}
    {/if}
  {/snippet}
</Dropdown>
