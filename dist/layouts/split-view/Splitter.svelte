<script lang="ts">
  import type { Orientation } from "./types";

  type Props = {
    container?: HTMLElement;
    orientation?: Orientation;
    size: number;
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    overlay?: boolean;
    collapseThreshold?: number;
    onresize?: (size: number) => void;
    onresizeend?: (size: number) => void;
    ondoubleclick?: () => void;
    oncollapse?: () => void;
  };

  let {
    container,
    orientation = "horizontal",
    size = $bindable(0),
    minSize = 0,
    maxSize = Infinity,
    defaultSize = 0,
    overlay = false,
    collapseThreshold,
    onresize,
    onresizeend,
    ondoubleclick,
    oncollapse,
  }: Props = $props();

  let dragging = $state(false);
  let collapsed = $state(false);

  function handlePointerDown(event: PointerEvent) {
    dragging = true;
    collapsed = false;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    document.body.style.cursor =
      orientation === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }

  function handlePointerMove(event: PointerEvent) {
    if (!dragging || !container) return;
    const rect = container.getBoundingClientRect();
    const rawSize =
      orientation === "horizontal"
        ? event.clientX - rect.left
        : event.clientY - rect.top;

    if (
      collapseThreshold !== undefined &&
      !collapsed &&
      rawSize < collapseThreshold
    ) {
      collapsed = true;
      oncollapse?.();
      return;
    }
    if (collapsed && rawSize >= collapseThreshold!) {
      collapsed = false;
    }
    if (collapsed) return;

    size = Math.max(minSize, Math.min(maxSize, rawSize));
    onresize?.(size);
  }

  function handlePointerUp() {
    if (!dragging) return;
    dragging = false;
    collapsed = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);

    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    onresizeend?.(size);
  }

  function handleDoubleClick() {
    size = defaultSize;
    onresize?.(size);
    onresizeend?.(size);
  }

  function handleKeyDown(event: KeyboardEvent) {
    const step = 10;
    let changed = false;

    if (orientation === "horizontal") {
      if (event.key === "ArrowLeft") {
        size = Math.max(minSize, size - step);
        changed = true;
      }
      if (event.key === "ArrowRight") {
        size = Math.min(maxSize, size + step);
        changed = true;
      }
    } else {
      if (event.key === "ArrowUp") {
        size = Math.max(minSize, size - step);
        changed = true;
      }
      if (event.key === "ArrowDown") {
        size = Math.min(maxSize, size + step);
        changed = true;
      }
    }

    if (changed) {
      event.preventDefault();
      onresize?.(size);
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    const relevant =
      orientation === "horizontal"
        ? event.key === "ArrowLeft" || event.key === "ArrowRight"
        : event.key === "ArrowUp" || event.key === "ArrowDown";
    if (relevant) {
      onresizeend?.(size);
    }
  }
</script>

<div
  class={["splitter", "relative transition-colors duration-150"]}
  class:bg-[var(--color-pressed-bg)]={dragging}
  class:cursor-col-resize={orientation === "horizontal"}
  class:cursor-row-resize={orientation === "vertical"}
  class:w-[1px]={orientation === "horizontal"}
  class:h-[1px]={orientation === "vertical"}
  style="touch-action: none;"
  role="slider"
  tabindex="0"
  aria-orientation={orientation}
  aria-valuemin={minSize}
  aria-valuemax={maxSize}
  aria-valuenow={size}
  onpointerdown={handlePointerDown}
  ondblclick={handleDoubleClick}
  onkeydown={handleKeyDown}
  onkeyup={handleKeyUp}
>
  <div
    class="absolute inset-0 z-10"
    class:-inset-x-1={orientation === "horizontal"}
    class:-inset-y-1={orientation === "vertical"}
  ></div>

  {#if dragging && overlay}
    <div class="fixed inset-0 z-50" style="pointer-events: none;"></div>
  {/if}
</div>

<style>
  .splitter {
    background: var(--color-surface-border);
  }
  .splitter:hover {
    background: var(--color-highlight);
  }
  [class*="cursor-"] {
    user-select: none;
  }
</style>
