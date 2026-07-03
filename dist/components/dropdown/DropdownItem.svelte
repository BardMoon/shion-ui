<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { ChevronRight } from "@lucide/svelte";
  import { Button } from "@shiola/ui";
  import type { ButtonToneType } from "../../types";

  type Props = HTMLButtonAttributes & {
    children: Snippet;
    tone?: ButtonToneType;
    shortcut?: string;
    selected?: boolean;
    hasChildren?: boolean;
    onclick?: (e: MouseEvent) => void;
  };
  let {
    children,
    tone,
    shortcut,
    selected = false,
    hasChildren = false,
    onclick,

    class: _class,
    ...rest
  }: Props = $props();
</script>

<Button
  fullWidth
  class={["menu-item"]}
  role="menuitem"
  {selected}
  {tone}
  {onclick}
  onpointerdown={(e) => e.stopPropagation()}
  {...rest}
>
  {@render children?.()}
  {#if hasChildren}
    <span class={["chevron", "absolute right-1"]}>
      <ChevronRight size={16} />
    </span>
  {/if}
</Button>

<style>
  :global(.menu-item) {
    font-size: 0.8125rem;
  }
  .chevron {
    color: var(--color-text-sub);
  }
</style>
