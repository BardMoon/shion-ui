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
    threshold?: number;
    onchange?: (payload: { rect: RubberBandRect | null }) => void;
    onselect?: (payload: { rect: RubberBandRect | null }) => void;
    oncancel?: () => void;
    children?: Snippet;
  };

  let {
    rect = $bindable(null),
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

  // 登録された選択候補要素。Map<id, element>
  const registry = new Map<symbol, HTMLElement>();
  // 現在選択中のID集合。$stateにして変更をリアクティブに伝播させる。
  let selectedIds = $state<Set<symbol>>(new Set());

  function register(id: symbol, el: HTMLElement) {
    registry.set(id, el);
    return () => {
      registry.delete(id);
      if (selectedIds.has(id)) {
        selectedIds.delete(id);
        selectedIds = new Set(selectedIds);
      }
    };
  }

  function isSelected(id: symbol): boolean {
    return selectedIds.has(id);
  }

  setRubberBandContext({ register, isSelected });

  // ドラッグ中の rect が変わるたびに、登録済み全要素との交差判定を一括で行う。
  function recomputeSelection() {
    if (!rect) {
      if (selectedIds.size > 0) selectedIds = new Set();
      return;
    }
    const viewRect = viewEl.getBoundingClientRect();
    const next = new Set<symbol>();
    for (const [id, el] of registry) {
      const elRect = el.getBoundingClientRect();
      const local = {
        left: elRect.left - viewRect.left,
        right: elRect.right - viewRect.left,
        top: elRect.top - viewRect.top,
        bottom: elRect.bottom - viewRect.top,
      };
      if (intersects(rect, local)) {
        next.add(id);
      }
    }
    selectedIds = next;
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
    return !!el.closest(
      "button, a, input, select, textarea, [role='button'], [data-no-rubber-band]",
    );
  }

  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    if (isInteractive(e.target)) return;
    updateOrigin();
    startX = e.clientX - originX;
    startY = e.clientY - originY;
    dragging = true;
    rect = null;
    viewEl.setPointerCapture(e.pointerId);
    e.preventDefault();
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
    } else {
      rect = null;
    }
    recomputeSelection();
    onchange?.({ rect });
  }
  function onPointerUp(e: PointerEvent) {
    if (!dragging) return;
    if (viewEl.hasPointerCapture(e.pointerId)) {
      viewEl.releasePointerCapture(e.pointerId);
    }
    endDrag();
    onselect?.({ rect });
    rect = null;
    selectedIds = new Set();
  }
  function onPointerCancel(e: PointerEvent) {
    if (!dragging) return;
    if (viewEl.hasPointerCapture(e.pointerId)) {
      viewEl.releasePointerCapture(e.pointerId);
    }
    endDrag();
    rect = null;
    selectedIds = new Set();
    oncancel?.();
  }
  function onLostPointerCapture() {
    if (!dragging) return;
    endDrag();
    rect = null;
    selectedIds = new Set();
    oncancel?.();
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape" && dragging) {
      endDrag();
      rect = null;
      selectedIds = new Set();
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
