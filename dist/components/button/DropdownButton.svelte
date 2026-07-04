<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import type { MenuItemType } from "../../types";
  import { Dropdown, Button } from "../../components";

  type Props = {
    content: Snippet<[MenuItemType]>;
    children: Snippet;
    class?: ClassValue;
    menu: MenuItemType[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onhover?: () => void;
  };

  let {
    content,
    children,
    class: className,
    menu,
    open = false,
    onOpenChange,
    onhover,
  }: Props = $props();
</script>

<div class={className}>
  <Dropdown
    {open}
    {onOpenChange}
    {content}
    items={menu}
    onclick={() => onOpenChange?.(false)}
    class="absolute z-50 top-full left-0 mt-0.5 p-1"
  >
    {#snippet trigger({ props })}
      <Button
        {...props}
        fullWidth
        variant="toggle"
        class={["menu-button", "h-full text-[13px]"]}
        selected={open}
        onpointerenter={onhover}
      >
        {@render children?.()}
      </Button>
    {/snippet}
  </Dropdown>
</div>

<style>
  .menu-button {
    border-radius: var(--border-radius);
  }
</style>
