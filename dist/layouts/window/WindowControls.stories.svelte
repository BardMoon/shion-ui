<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import WindowControls from "./WindowControls.svelte";

  const { Story } = defineMeta({
    title: "Components/Window/WindowControls",
    component: WindowControls,
    tags: ["autodocs"],
  });
</script>

<Story name="Default">
  {#snippet template(args)}
    <div style="height: 30px; background: var(--color-bg);">
      <WindowControls
        {...args}
        onminimize={() => alert("minimize")}
        onmaximize={() => alert("maximize")}
        onclose={() => alert("close")}
      />
    </div>
  {/snippet}
</Story>
