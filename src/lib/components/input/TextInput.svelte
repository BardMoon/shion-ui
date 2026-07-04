<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import type { ClassValue, HTMLInputAttributes } from "svelte/elements";

  type Props = HTMLInputAttributes & {
    ref?: HTMLInputElement | null;
    class?: ClassValue;
    icon?: Component;
    start?: Snippet;
    end?: Snippet;
    value?: string;
  };
  let {
    ref = $bindable(null),
    icon: Icon,
    class: className,
    start,
    end,
    value = $bindable(),
    ...props
  }: Props = $props();
</script>

<div class={["input-wrap", "relative flex flex-1 items-center", className]}>
  {#if start}
    <div class={["start", "absolute flex items-center left-2"]}>
      {@render start()}
    </div>
  {:else if Icon}
    <div class={["start", "absolute flex items-center"]}>
      <Icon size={14} class="text-(--color-text-muted)" />
    </div>
  {/if}

  <input
    bind:this={ref}
    {...props}
    bind:value
    class={[
      "w-full p-1",
      {
        "has-start": !!start || !!Icon,
        "has-end": !!end,
      },
    ]}
  />

  {#if end}
    <div class={["end", "right-1.5"]}>
      {@render end()}
    </div>
  {/if}
</div>

<style>
  .start,
  .end {
    color: var(--color-text-muted);
  }

  input {
    border: 1px solid var(--color-surface-border);
    border-radius: var(--border-radius);

    background: var(--color-view);
    color: var(--color-text);

    font-size: 13px;
    outline: none;
    appearance: none;

    transition: border-color 100ms;
  }

  input.has-start {
    padding-left: 32px;
  }

  input.has-end {
    padding-right: 32px;
  }

  input::placeholder {
    color: var(--color-text-muted);
  }

  input:focus {
    border-color: var(--color-highlight);
  }

  input::-webkit-search-cancel-button {
    display: none;
  }
</style>
