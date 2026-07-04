<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Search, Mail, Eye } from "@lucide/svelte";
  import { TextInput } from "../../../lib/components";

  const { Story } = defineMeta({
    title: "Components/TextInput",
    component: TextInput,
    tags: ["autodocs"],
    argTypes: {
      placeholder: { control: "text" },
      disabled: { control: "boolean" },
      value: { control: "text" },
    },
    args: {
      placeholder: "Type something...",
      disabled: false,
      value: "",
    },
  });
</script>

<Story name="Default">
  {#snippet template(args)}
    <div style="width: 240px;">
      <TextInput {...args} />
    </div>
  {/snippet}
</Story>

<Story name="WithIcon" args={{ placeholder: "Search..." }}>
  {#snippet template(args)}
    <div style="width: 240px;">
      <TextInput {...args} icon={Search} />
    </div>
  {/snippet}
</Story>

<Story name="WithStartSnippet" args={{ placeholder: "you@example.com" }}>
  {#snippet template(args)}
    <div style="width: 240px;">
      <TextInput {...args}>
        {#snippet start()}
          <Mail size={14} />
        {/snippet}
      </TextInput>
    </div>
  {/snippet}
</Story>

<Story name="WithEndSnippet" args={{ placeholder: "Password" }}>
  {#snippet template(args)}
    <div style="width: 240px;">
      <TextInput {...args} type="password">
        {#snippet end()}
          <button
            type="button"
            style="display: flex; align-items: center; background: none; border: none; cursor: pointer; padding: 0;"
          >
            <Eye size={14} />
          </button>
        {/snippet}
      </TextInput>
    </div>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, value: "Can't edit this" }}>
  {#snippet template(args)}
    <div style="width: 240px;">
      <TextInput {...args} />
    </div>
  {/snippet}
</Story>

<Story name="AllVariants">
  {#snippet template()}
    <div style="display: flex; gap: 8px; flex-direction: column; width: 240px;">
      <TextInput placeholder="Default" />
      <TextInput placeholder="Search..." icon={Search} />
      <TextInput placeholder="Disabled" disabled />
    </div>
  {/snippet}
</Story>
