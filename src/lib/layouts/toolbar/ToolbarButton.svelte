<script lang="ts">
  import type { Component } from "svelte";
  import { Button } from "$lib/components";

  type Props = {
    icon: Component;
    label: string;
    active?: boolean;
    onclick?: () => void;
  };
  let { icon: Icon, label, active = false, onclick }: Props = $props();
</script>

<Button
  variant="toggle"
  selected={active}
  {onclick}
  class="toolbar-button shrink-0 size-8 p-0 justify-center"
  style="padding: 0;"
  aria-label={label}
  title={label}
>
  <Icon size={18} aria-hidden="true" />
</Button>
