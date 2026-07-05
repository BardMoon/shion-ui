<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import { Button } from "$lib/components";
  import type { TreeNodeData, TreeViewController } from "./types.js";
  import { treeStore } from "./treeStore.svelte.js";

  type Props = {
    class?: ClassValue;
    nodes: TreeNodeData[];
    selected?: string | null;
    onselect?: (node: TreeNodeData) => void;
    oncontextmenu?: (e: { x: number; y: number; node: TreeNodeData }) => void;
    item: Snippet<[TreeNodeData, { isOpen: boolean; isSelected: boolean }]>;
    controller?: TreeViewController;
  };

  let {
    class: className,
    nodes,
    selected = $bindable(null),
    onselect,
    oncontextmenu,
    item,
    controller = $bindable(),
  }: Props = $props();

  function allIds(list: TreeNodeData[]): string[] {
    return list.flatMap((n) => [n.id, ...allIds(n.children ?? [])]);
  }

  controller = {
    expandAll: () => treeStore.expandAll(allIds(nodes)),
    collapseAll: () => treeStore.collapseAll(),
  };

  function handleSelect(node: TreeNodeData) {
    selected = node.id;
    onselect?.(node);
  }
</script>

{#snippet nodeRow(node: TreeNodeData, depth: number)}
  {@const hasChildren = !!node.children?.length}
  {@const isOpen = treeStore.isOpen(node.id)}
  {@const isSelected = selected === node.id}

  <li
    role="treeitem"
    aria-expanded={hasChildren ? isOpen : undefined}
    aria-selected={isSelected}
    class="tree-item"
  >
    <Button
      fullWidth
      selected={isSelected}
      onclick={() => {
        if (hasChildren) treeStore.toggle(node.id);
        handleSelect(node);
      }}
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (hasChildren) treeStore.toggle(node.id);
          handleSelect(node);
        }
      }}
      oncontextmenu={(e) => {
        if (!oncontextmenu) return;
        e.preventDefault();
        oncontextmenu({ x: e.clientX, y: e.clientY, node });
      }}
      class="group text-[13px]"
      style="padding-left: calc(0.5rem + {depth} * var(--indent-size));"
    >
      <!-- Chevron -->
      {#if hasChildren}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-3.5 shrink-0 transition-transform duration-150 {isOpen
            ? 'rotate-90'
            : ''}"
          style="color: var(--color-text-muted)"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      {:else}
        <span class="size-3.5 shrink-0" aria-hidden="true"></span>
      {/if}

      {@render item(node, { isOpen, isSelected })}
    </Button>

    {#if hasChildren && isOpen}
      <ul
        role="group"
        class="tree-group"
        style="--guide-left: calc(0.875rem + {depth} * var(--indent-size));"
      >
        {#each node.children! as child (child.id)}
          {@render nodeRow(child, depth + 1)}
        {/each}
      </ul>
    {/if}
  </li>
{/snippet}

<ul
  role="tree"
  aria-label="Tree"
  class={["select-none space-y-0.5", className]}
  style="container-type: inline-size;"
>
  {#each nodes as node (node.id)}
    {@render nodeRow(node, 0)}
  {/each}
</ul>

<style>
  .tree-group {
    position: relative;
    margin-top: 0.125rem;
  }

  .tree-group > :global(.tree-item) {
    position: relative;
  }

  .tree-group > :global(.tree-item)::before {
    content: "";
    position: absolute;
    left: var(--guide-left);
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--color-guide);
    pointer-events: none;
  }

  .tree-group > :global(.tree-item:last-child)::before {
    bottom: 50%;
  }

  .tree-group > :global(.tree-item:last-child)::after {
    content: "";
    position: absolute;
    left: var(--guide-left);
    top: 50%;
    width: calc(var(--indent-size) * 0.5);
    height: 1px;
    background: var(--color-guide);
    pointer-events: none;
  }
</style>
