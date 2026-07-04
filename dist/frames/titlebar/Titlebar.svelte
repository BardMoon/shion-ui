<script lang="ts">
  import type { MenuItemType } from "../../types";
  import MenuBar from "../menubar/MenuBar.svelte";
  import WindowControls from "../window/WindowControls.svelte";

  type Props = {
    menus?: MenuItemType[];
    title?: string;
  };
  let { menus, title }: Props = $props();
</script>

<header
  class={[
    "titlebar",
    "z-40 grid grid-cols-[auto_1fr_auto] items-center h-7.5 select-none border-b",
  ]}
>
  <MenuBar {menus} />

  <div class={["title", "text-center text-[13px] pointer-events-none"]}>
    {title}
  </div>

  <WindowControls />
</header>

<style>
  .titlebar {
    background: var(--color-bg);
    border-color: var(--color-surface-border);
    color: var(--color-text);
  }
  .title {
    color: var(--color-text-muted);
  }
</style>
