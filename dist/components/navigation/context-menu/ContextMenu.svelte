<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import type { MenuItemType } from "../../../types";
  import { Separator } from "../..";
  import SubMenu from "../SubMenu.svelte";
  import MenuItem from "../MenuItem.svelte";
  import { getContextMenu } from "./context-menu.svelte";

  const contextMenu = getContextMenu();

  type Props = {
    content?: Snippet<[MenuItemType]>;
  };

  let { content }: Props = $props();

  let anchor: HTMLElement | null = $state(null);

  function isSeparator(
    m: MenuItemType,
  ): m is Extract<MenuItemType, { type: "separator" }> {
    return m.type === "separator";
  }
</script>

<div
  bind:this={anchor}
  style={`position: fixed; left: ${contextMenu.x}px; top: ${contextMenu.y}px; width: 1px; height: 1px; pointer-events: none;`}
></div>

<DropdownMenu.Root
  open={contextMenu.open}
  onOpenChange={(v) => {
    if (!v) contextMenu.hide();
  }}
>
  <DropdownMenu.Portal>
    {#if anchor}
      <DropdownMenu.Content
        class="menu p-1"
        customAnchor={anchor}
        side="bottom"
        align="start"
      >
        {#each contextMenu.items as item}
          {#if isSeparator(item)}
            <Separator />
          {:else if item.children?.length}
            <SubMenu {content} {item} onclick={contextMenu.hide} />
          {:else}
            <DropdownMenu.Item
              disabled={item.disabled}
              onSelect={() => {
                item.onclick?.();
                contextMenu.hide();
              }}
            >
              {#snippet child({ props })}
                <MenuItem {...props} shortcut={item.shortcut} tone={item.tone}>
                  {@render content?.(item)}
                </MenuItem>
              {/snippet}
            </DropdownMenu.Item>
          {/if}
        {/each}
      </DropdownMenu.Content>
    {/if}
  </DropdownMenu.Portal>
</DropdownMenu.Root>

<style>
  :global(.menu) {
    min-width: 10rem;
    max-width: 18rem;
    background: var(--color-view);
    border: 1px solid var(--color-surface-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
</style>
