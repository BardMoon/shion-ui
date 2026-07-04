<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import type { MenuItemType } from "../../types/menu";
  import DropdownItem from "./DropdownItem.svelte";
  import DropdownSubmenu from "./DropdownSubmenu.svelte";
  import Separator from "../misc/Separator.svelte";

  type MenuLeafType = Extract<MenuItemType, { type: "item" }>;

  type Props = {
    content?: Snippet<[MenuItemType]>;
    item: MenuLeafType;
    onclick?: () => void;
  };

  let { content, item, onclick }: Props = $props();
</script>

<DropdownMenu.Sub>
  <DropdownMenu.SubTrigger>
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
  </DropdownMenu.SubTrigger>

  <DropdownMenu.Portal>
    <DropdownMenu.SubContent
      class="menu p-1"
      side="right"
      align="start"
      sideOffset={-4}
      alignOffset={-4}
    >
      {#each item.children ?? [] as child}
        {#if child.type === "separator"}
          <Separator />
        {:else}
          {@const menuChild = child}
          {#if menuChild.children?.length}
            <DropdownSubmenu {content} item={menuChild} {onclick} />
          {:else}
            <DropdownMenu.Item
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
            </DropdownMenu.Item>
          {/if}
        {/if}
      {/each}
    </DropdownMenu.SubContent>
  </DropdownMenu.Portal>
</DropdownMenu.Sub>
