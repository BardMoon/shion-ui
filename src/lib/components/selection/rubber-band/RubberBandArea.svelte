<script lang="ts">
  import type { Snippet } from "svelte";
  import {
    setRubberBandContext,
    intersects,
    type RubberBandRect,
  } from "./rubber-band-context.js";
  import RubberBandBand from "./RubberBandBand.svelte";

  type Props = {
    rect?: RubberBandRect | null;
    selected?: string[];
    threshold?: number;
    onchange?: (payload: { rect: RubberBandRect | null }) => void;
    onselect?: (payload: {
      rect: RubberBandRect | null;
      selected: string[];
    }) => void;
    oncancel?: () => void;
    children?: Snippet;
  };

  let {
    rect = $bindable(null),
    selected = $bindable([]),
    threshold = 4,
    onchange,
    onselect,
    oncancel,
    children,
  }: Props = $props();

  let viewEl: HTMLElement;
  let dragging = $state(false);

  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;

  const current: RubberBandRect = { x: 0, y: 0, w: 0, h: 0 };

  const registry = new Map<string, HTMLElement>();
  let selectedKeys = $state<Set<string>>(new Set());

  function register(key: string, el: HTMLElement) {
    registry.set(key, el);
    return () => {
      registry.delete(key);
    };
  }

  function isSelected(key: string): boolean {
    return selectedKeys.has(key);
  }

  setRubberBandContext({ register, isSelected });

  function recomputeSelection() {
    if (!rect) return;
    const viewRect = viewEl.getBoundingClientRect();
    const next = new Set<string>();
    for (const [key, el] of registry) {
      const elRect = el.getBoundingClientRect();
      const local = {
        left: elRect.left - viewRect.left,
        right: elRect.right - viewRect.left,
        top: elRect.top - viewRect.top,
        bottom: elRect.bottom - viewRect.top,
      };
      if (intersects(rect, local)) {
        next.add(key);
      }
    }
    selectedKeys = next;
  }

  function updateOrigin() {
    const r = viewEl.getBoundingClientRect();
    originX = r.left;
    originY = r.top;
  }
  function computeRect(cx: number, cy: number) {
    current.x = Math.min(startX, cx);
    current.y = Math.min(startY, cy);
    current.w = Math.abs(cx - startX);
    current.h = Math.abs(cy - startY);
  }
  function endDrag() {
    dragging = false;
  }
  function isInteractive(el: EventTarget | null): boolean {
    if (!(el instanceof Element)) return false;
    return !!el.closest("a, input, select, textarea, [data-no-rubber-band]");
  }

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    if (isInteractive(e.target)) return;
    updateOrigin();
    startX = e.clientX - originX;
    startY = e.clientY - originY;
    dragging = true;
    rect = null;
    // ドラッグ開始時に既存の選択をリセットするかは要件次第。
    // ここでは Shift 等の追加選択キーを見ていないため、新規ドラッグ開始で常にクリアする。
    selectedKeys = new Set();
    viewEl.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const cx = e.clientX - originX;
    const cy = e.clientY - originY;

    const dx = cx - startX;
    const dy = cy - startY;

    if (dx * dx + dy * dy > threshold * threshold) {
      computeRect(cx, cy);
      rect = { x: current.x, y: current.y, w: current.w, h: current.h };
      recomputeSelection();
    } else {
      rect = null;
    }
    onchange?.({ rect });
  }
  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    if (viewEl.hasPointerCapture(e.pointerId)) {
      viewEl.releasePointerCapture(e.pointerId);
    }
    endDrag();
    selected = [...selectedKeys];
    onselect?.({ rect, selected });
    rect = null;
  }
  function onPointerCancel(e: PointerEvent) {
    if (!dragging) return;
    if (viewEl.hasPointerCapture(e.pointerId)) {
      viewEl.releasePointerCapture(e.pointerId);
    }
    endDrag();
    rect = null;
    selectedKeys = new Set();
    oncancel?.();
  }
  function onLostPointerCapture() {
    if (!dragging) return;
    endDrag();
    rect = null;
    selectedKeys = new Set();
    oncancel?.();
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape" && dragging) {
      endDrag();
      rect = null;
      selectedKeys = new Set();
      oncancel?.();
    }
  }
</script>

<svelte:window onkeydown={onKeyDown} />
<div
  class={["rb-view", "relative overflow-hidden size-full"]}
  bind:this={viewEl}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerCancel}
  onlostpointercapture={onLostPointerCapture}
  role="presentation"
>
  {@render children?.()}
  <RubberBandBand {rect} />
</div>

<style>
  .rb-view {
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
  }
</style>
