<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";
  import type { MenuItemType } from "../../types/menu";
  import DropdownItem from "../dropdown/DropdownItem.svelte";
  import Separator from "../misc/Separator.svelte";
  import ContextSubmenu from "./ContextSubmenu.svelte";

  type MenuLeafType = Extract<MenuItemType, { type: "item" }>;

  type Props = {
    content?: Snippet<[MenuItemType]>;
    item: MenuLeafType;
    onclick?: () => void;
  };

  let { content, item, onclick }: Props = $props();

  function isSeparator(
    m: MenuItemType,
  ): m is Extract<MenuItemType, { type: "separator" }> {
    return m.type === "separator";
  }
</script>

<ContextMenu.Sub>
  <ContextMenu.SubTrigger>
    {#snippet child({ props })}
      <DropdownItem
        {...props}
        shortcut={item.shortcut}
        disabled={item.disabled}
        tone={item.tone}
        hasChildren
      >
        {@render content?.(item)}
      </DropdownItem>
    {/snippet}
  </ContextMenu.SubTrigger>

  <ContextMenu.Portal>
    <ContextMenu.SubContent
      class="menu p-1"
      side="right"
      align="start"
      sideOffset={-2}
      alignOffset={-2}
    >
      {#each item.children ?? [] as menuChild}
        {#if isSeparator(menuChild)}
          <Separator />
        {:else if menuChild.children?.length}
          <ContextSubmenu {content} item={menuChild} {onclick} />
        {:else}
          <ContextMenu.Item
            disabled={menuChild.disabled}
            onSelect={() => {
              menuChild.onclick?.();
              onclick?.();
            }}
          >
            {#snippet child({ props })}
              <DropdownItem
                {...props}
                shortcut={menuChild.shortcut}
                tone={menuChild.tone}
              >
                {@render content?.(menuChild)}
              </DropdownItem>
            {/snippet}
          </ContextMenu.Item>
        {/if}
      {/each}
    </ContextMenu.SubContent>
  </ContextMenu.Portal>
</ContextMenu.Sub>
