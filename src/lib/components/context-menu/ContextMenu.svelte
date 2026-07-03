<script lang="ts">
  import type { Snippet } from "svelte";
  import type { MenuItemType } from "$lib/types";
  import { Dropdown } from "$lib/components";
  import { getContextMenu } from "./context-menu.svelte.js";

  const contextMenu = getContextMenu();
  type Props = {
    content: Snippet<[MenuItemType]>;
  };

  let { content }: Props = $props();
</script>

<Dropdown
  {content}
  class="fixed z-50 p-1"
  style={`left:${contextMenu.x}px;top:${contextMenu.y}px;`}
  items={contextMenu.items}
  open={contextMenu.open}
  onclose={contextMenu.hide}
  onclick={contextMenu.hide}
/>
