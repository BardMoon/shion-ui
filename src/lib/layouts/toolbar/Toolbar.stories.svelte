<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Files, Search, Settings, GitBranch, Bell } from "@lucide/svelte";
  import type { ToolbarItem } from "./type";
  import Toolbar from "./Toolbar.svelte";

  const start: ToolbarItem[] = [
    { id: "explorer", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
  ];
  const end: ToolbarItem[] = [
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const { Story } = defineMeta({
    title: "Components/Toolbar/Toolbar",
    component: Toolbar,
    tags: ["autodocs"],
    argTypes: {
      orientation: {
        control: { type: "select" },
        options: ["horizontal", "vertical"],
      },
    },
    args: {
      start,
      end,
      orientation: "vertical",
      activeId: "explorer",
    },
  });
</script>

<Story name="Vertical">
  {#snippet template(args)}
    <div style="height: 320px;">
      <Toolbar {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Horizontal" args={{ orientation: "horizontal" }}>
  {#snippet template(args)}
    <Toolbar {...args} />
  {/snippet}
</Story>
