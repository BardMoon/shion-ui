<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { FileText, Save, Trash2, Settings } from "@lucide/svelte";
  import type { MenuItemType } from "$lib/types";
  import DropdownButton from "./DropdownButton.svelte";

  const { Story } = defineMeta({
    title: "Components/DropdownButton",
    component: DropdownButton,
    tags: ["autodocs"],
  });

  const sampleMenu: MenuItemType[] = [
    {
      type: "item",
      label: "New File",
      icon: FileText,
      shortcut: "Ctrl+N",
      onclick: () => console.log("New File"),
    },
    {
      type: "item",
      label: "Save",
      icon: Save,
      shortcut: "Ctrl+S",
      onclick: () => console.log("Save"),
    },
    { type: "separator" },
    {
      type: "item",
      label: "Preferences",
      icon: Settings,
      children: [
        {
          type: "item",
          label: "General",
          onclick: () => console.log("General"),
        },
        {
          type: "item",
          label: "Appearance",
          onclick: () => console.log("Appearance"),
        },
      ],
    },
    { type: "separator" },
    {
      type: "item",
      label: "Delete",
      icon: Trash2,
      tone: "danger",
      onclick: () => console.log("Delete"),
    },
  ];
</script>

<!-- TODO: fix MenuBar Style -->
<Story name="Default">
  {#snippet template()}
    <div style="display: flex; height: 32px;">
      <DropdownButton menu={sampleMenu}>
        File

        {#snippet content(item: MenuItemType)}
          {#if item.type === "item"}
            {item.label}
          {/if}
        {/snippet}
      </DropdownButton>
    </div>
  {/snippet}
</Story>

<Story name="MenuBarStyle">
  {#snippet template()}
    <div
      style="display: flex; height: 32px; border: 1px solid var(--color-surface-border);"
    >
      {#each ["File", "Edit", "View"] as label}
        <DropdownButton menu={sampleMenu} class="relative h-full">
          {label}

          {#snippet content(item: MenuItemType)}
            {#if item.type === "item"}
              {item.label}
            {/if}
          {/snippet}
        </DropdownButton>
      {/each}
    </div>
  {/snippet}
</Story>
