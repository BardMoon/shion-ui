import { getContext, setContext } from "svelte";

const RUBBER_BAND_KEY = Symbol("rubber-band");
export function setRubberBandContext(value) {
  setContext(RUBBER_BAND_KEY, value);
}
export function getRubberBandContext() {
  const ctx = getContext(RUBBER_BAND_KEY);
  if (!ctx) {
    throw new Error(
      "getRubberBandContext() called without a matching <RubberBandArea> ancestor.",
    );
  }
  return ctx;
}
export function intersects(a, b) {
  return !(
    a.x + a.w < b.left ||
    a.x > b.right ||
    a.y + a.h < b.top ||
    a.y > b.bottom
  );
}
