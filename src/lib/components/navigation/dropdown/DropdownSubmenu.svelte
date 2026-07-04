<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import type { MenuItemType } from "$lib/types";
  import { Separator } from "$lib/components";
  import DropdownItem from "./DropdownItem.svelte";
  import DropdownSubmenu from "./DropdownSubmenu.svelte";

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
        hasChildren
        shortcut={item.shortcut}
        disabled={item.disabled}
        selected={props["data-state"] === "open"}
        tone={item.tone}
      >
        {@render content?.(item)}
      </DropdownItem>
    {/snippet}
  </DropdownMenu.SubTrigger>

  <DropdownMenu.Portal>
    <DropdownMenu.SubContent
      class={["submenu", "p-1 z-50"]}
      side="right"
      align="start"
      sideOffset={0}
      alignOffset={0}
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

<style>
  :global(.submenu) {
    min-width: 10rem;
    max-width: 18rem;
    background: var(--color-view);
    border: 1px solid var(--color-surface-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
</style>
