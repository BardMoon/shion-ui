import { getContext, setContext } from "svelte";

export type RubberBandRect = { x: number; y: number; w: number; h: number };

type RubberBandContextValue = {
  register: (id: symbol, el: HTMLElement) => () => void;
  isSelected: (id: symbol) => boolean;
};

const RUBBER_BAND_KEY = Symbol("rubber-band");

export function setRubberBandContext(value: RubberBandContextValue) {
  setContext(RUBBER_BAND_KEY, value);
}

export function getRubberBandContext(): RubberBandContextValue {
  const ctx = getContext<RubberBandContextValue | undefined>(RUBBER_BAND_KEY);
  if (!ctx) {
    throw new Error(
      "getRubberBandContext() called without a matching <RubberBandArea> ancestor.",
    );
  }
  return ctx;
}

export function intersects(
  a: RubberBandRect,
  b: { left: number; right: number; top: number; bottom: number },
): boolean {
  return !(
    a.x + a.w < b.left ||
    a.x > b.right ||
    a.y + a.h < b.top ||
    a.y > b.bottom
  );
}
