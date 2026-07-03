<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import type { MenuItemType } from "$lib/types";
  import { Popover, Separator, rovingFocusItem } from "$lib/components";
  import Dropdown from "./Dropdown.svelte";
  import DropdownItem from "./DropdownItem.svelte";

  type Props = HTMLAttributes<HTMLUListElement> & {
    content?: Snippet<[MenuItemType]>;
    items: MenuItemType[];
    class?: ClassValue;
    open?: boolean;
    onclick?: () => void;
    onclose?: () => void;
    autofocus?: boolean;
  };
  let {
    content,
    items,
    class: className,
    open = true,
    onclick,
    onclose,
    autofocus = false,
    style,
    ...props
  }: Props = $props();

  let openSubmenuIndex = $state<number | null>(null);

  const itemEls = new Map<number, HTMLElement>();

  function registerFor(index: number) {
    return (node: HTMLElement) => {
      itemEls.set(index, node);
      return () => {
        itemEls.delete(index);
      };
    };
  }

  function orderedIndices(): number[] {
    return Array.from(itemEls.keys()).sort((a, b) => a - b);
  }

  function currentFocusedIndex(): number | null {
    for (const [index, el] of itemEls) {
      if (el === document.activeElement) return index;
    }
    return null;
  }

  function openSubmenu(i: number) {
    const item = items[i];
    if (item.type === "separator" || !item.children?.length) return;
    openSubmenuIndex = i;
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      const i = currentFocusedIndex();
      if (i === null) return;
      const item = items[i];
      if (item.type === "separator") return;
      e.preventDefault();
      if (item.children?.length) {
        openSubmenu(i);
      } else {
        item.onclick?.();
        onclick?.();
      }
    }
  }

  function onSubmenuClose() {
    if (openSubmenuIndex !== null) itemEls.get(openSubmenuIndex)?.focus();
    openSubmenuIndex = null;
  }

  $effect(() => {
    if (open && autofocus) {
      const indices = orderedIndices();
      itemEls.get(indices[0] ?? -1)?.focus();
    }
  });
</script>

<Popover {open} {onclose} class={["menu", className]} {style}>
  <ul
    role="menu"
    oncontextmenu={(e) => e.preventDefault()}
    {...props}
    onkeydown={onKeydown}
  >
    {#each items as item, i}
      {#if item.type === "separator"}
        <Separator />
      {:else if item.children?.length}
        <li
          role="none"
          class="relative"
          onpointerenter={() => (openSubmenuIndex = i)}
        >
          <DropdownItem
            shortcut={item.shortcut}
            disabled={item.disabled}
            tone={item.tone}
            hasChildren={true}
            selected={openSubmenuIndex === i}
            onclick={(e) => e.stopPropagation()}
            {@attach rovingFocusItem(registerFor(i))}
          >
            {content?.(item)}
          </DropdownItem>

          {#if openSubmenuIndex === i}
            <Popover
              open={openSubmenuIndex === i}
              class="absolute z-50 top-0 left-full"
              onclose={onSubmenuClose}
            >
              <Dropdown
                {content}
                items={item.children}
                class="p-1"
                autofocus
                {onclick}
                onclose={onSubmenuClose}
              />
            </Popover>
          {/if}
        </li>
      {:else}
        <DropdownItem
          shortcut={item.shortcut}
          disabled={item.disabled}
          tone={item.tone}
          onclick={() => {
            item.onclick?.();
            onclick?.();
          }}
          {@attach rovingFocusItem(registerFor(i))}
        >
          {content?.(item)}
        </DropdownItem>
      {/if}
    {/each}
  </ul>
</Popover>

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
