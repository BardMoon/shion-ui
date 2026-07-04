<script lang="ts">
  import { DropdownButton, Separator } from "../../components";
  import type { MenuItemType } from "../../types";

  type Props = {
    menus?: MenuItemType[];
  };
  let { menus }: Props = $props();

  let openMenu: string | null = $state(null);

  function hover(label: string) {
    console.log("hover", label);
    if (openMenu !== null && openMenu !== label) {
      openMenu = label;
    }
  }
</script>

<div class="flex h-full">
  {#each menus as menu}
    {#if menu.type === "separator"}
      <Separator orientation="vertical" />
    {:else}
      <DropdownButton
        class="relative h-full"
        menu={menu.children ?? []}
        bind:open={
          () => openMenu === menu.label,
          (next) => (openMenu = next ? menu.label : null)
        }
        onhover={() => hover(menu.label)}
      >
        {menu.label}

        {#snippet content(item: MenuItemType)}
          {#if item.type === "separator"}
            <Separator orientation="vertical" />
          {:else}
            {item.label}
          {/if}
        {/snippet}
      </DropdownButton>
    {/if}
  {/each}
</div>
