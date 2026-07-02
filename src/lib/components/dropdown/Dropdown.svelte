<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import type { MenuItemType } from "$lib/types";
  import { Separator, Popover, rovingFocusItem } from "$lib/components";
  import Dropdown from "./Dropdown.svelte";
  import DropdownItem from "./DropdownItem.svelte";

  type Props = HTMLAttributes<HTMLUListElement> & {
    class?: ClassValue;
    items: MenuItemType[];
    open?: boolean;
    onclick?: () => void;
    onclose?: () => void;
    autofocus?: boolean;
  };
  let {
    class: className = "",
    items,
    open = true,
    onclick,
    onclose,
    autofocus = false,
    style,
    ...props
  }: Props = $props();

  let activeIndex = $state<number | null>(null);

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

  function focusIndex(i: number | null) {
    activeIndex = i;
    if (i !== null) itemEls.get(i)?.focus();
  }

  function moveFocus(delta: 1 | -1) {
    const indices = orderedIndices();
    if (indices.length === 0) return;
    const currentPos = activeIndex === null ? -1 : indices.indexOf(activeIndex);
    const nextPos = (currentPos + delta + indices.length) % indices.length;
    focusIndex(indices[nextPos]);
  }

  function openSubmenu(i: number) {
    const item = items[i];
    if (item.type === "separator" || !item.children?.length) return;
    activeIndex = i;
  }

  function onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "ArrowRight": {
        if (activeIndex === null) break;
        const item = items[activeIndex];
        if (item.type !== "separator" && item.children?.length) {
          e.preventDefault();
          openSubmenu(activeIndex);
        }
        break;
      }
      case "ArrowLeft":
        e.preventDefault();
        onclose?.();
        break;
      case "Enter":
      case " ": {
        if (activeIndex === null) break;
        const item = items[activeIndex];
        if (item.type === "separator") break;
        e.preventDefault();
        if (item.children?.length) {
          openSubmenu(activeIndex);
        } else {
          item.onclick?.();
          onclick?.();
        }
        break;
      }
    }
  }

  function onSubmenuClose() {
    if (activeIndex !== null) itemEls.get(activeIndex)?.focus();
  }

  $effect(() => {
    if (open && autofocus) {
      const indices = orderedIndices();
      if (indices.length > 0) focusIndex(indices[0]);
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
          onpointerenter={() => (activeIndex = i)}
        >
          <DropdownItem
            label={item.label}
            icon={item.icon}
            shortcut={item.shortcut}
            disabled={item.disabled}
            tone={item.tone}
            hasChildren={true}
            selected={activeIndex === i}
            onclick={(e) => e.stopPropagation()}
            {@attach rovingFocusItem(registerFor(i))}
          />
          {#if activeIndex === i}
            <Popover
              open={activeIndex === i}
              class="absolute z-50 top-0 left-full"
              onclose={onSubmenuClose}
            >
              <Dropdown
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
          label={item.label}
          icon={item.icon}
          shortcut={item.shortcut}
          disabled={item.disabled}
          tone={item.tone}
          selected={activeIndex === i}
          onclick={() => {
            item.onclick?.();
            onclick?.();
          }}
          {@attach rovingFocusItem(registerFor(i))}
        />
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
