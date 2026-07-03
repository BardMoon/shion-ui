<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import type { MenuItemType } from "../../types";
  import { Dropdown, Button } from "..";

  type Props = {
    content: Snippet<[MenuItemType]>;
    children: Snippet;
    class?: ClassValue;
    menu: MenuItemType[];
    selected: boolean;
    onopen: () => void;
    onhover?: () => void;
    onclose: () => void;
  };

  let {
    content,
    children,
    class: className,
    menu,
    selected,
    onopen,
    onhover,
    onclose,
  }: Props = $props();
</script>

<div class={className}>
  <Button
    fullWidth
    variant="toggle"
    class={["menu-button", "h-full text-[13px]"]}
    {selected}
    onclick={(e) => {
      e.stopPropagation();
      onopen();
    }}
    onpointerenter={onhover}
  >
    {@render children?.()}
  </Button>

  {#if selected}
    <Dropdown
      {content}
      items={menu}
      onclick={onclose}
      {onclose}
      autofocus
      class="absolute z-50 top-full left-0 mt-0.5 p-1"
    />
  {/if}
</div>

<style>
  .menu-button {
    border-radius: var(--border-radius);
  }
</style>
