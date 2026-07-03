<script lang="ts">
  import { getContextMenu } from "./context-menu.svelte.js";
  import { Dropdown } from "@shiola/ui";

  const contextMenu = getContextMenu();
</script>

<Dropdown
  class="fixed z-50 p-1"
  style={`left:${contextMenu.x}px;top:${contextMenu.y}px;`}
  items={contextMenu.items}
  open={contextMenu.open}
  onclose={contextMenu.hide}
  onclick={contextMenu.hide}
/>
