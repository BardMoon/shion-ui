<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { DropdownMenu } from "bits-ui";
  import type { MenuItemType } from "../../types/menu";
  import DropdownItem from "./DropdownItem.svelte";
  import DropdownSubmenu from "./DropdownSubmenu.svelte";
  import Separator from "../misc/Separator.svelte";

  type Props = {
    trigger: Snippet<[{ props: Record<string, unknown> }]>;
    content?: Snippet<[MenuItemType]>;
    items: MenuItemType[];
    class?: ClassValue;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onclick?: () => void;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  };

  let {
    trigger,
    content,
    items,
    class: className,
    open = $bindable(false),
    onOpenChange,
    onclick,
    side = "bottom",
    align = "start",
    sideOffset = 4,
  }: Props = $props();
</script>

<DropdownMenu.Root bind:open {onOpenChange}>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      {@render trigger({ props })}
    {/snippet}
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal>
    <DropdownMenu.Content
      preventScroll={false}
      class={["menu", "p-1", className]}
      {side}
      {align}
      {sideOffset}
    >
      {#each items as item}
        {#if item.type === "separator"}
          <Separator />
        {:else}
          {@const menuItem = item}
          {#if menuItem.children?.length}
            <DropdownSubmenu
              {content}
              item={menuItem}
              {onclick}
              class={className}
            />
          {:else}
            <DropdownMenu.Item
              disabled={menuItem.disabled}
              onSelect={() => {
                menuItem.onclick?.();
                onclick?.();
              }}
            >
              {#snippet child({ props })}
                <DropdownItem
                  {...props}
                  shortcut={menuItem.shortcut}
                  tone={menuItem.tone}
                >
                  {@render content?.(menuItem)}
                </DropdownItem>
              {/snippet}
            </DropdownMenu.Item>
          {/if}
        {/if}
      {/each}
    </DropdownMenu.Content>
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
