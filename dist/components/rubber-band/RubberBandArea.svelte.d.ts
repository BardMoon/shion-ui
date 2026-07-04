import type { Snippet } from "svelte";
import { type RubberBandRect } from "./rubber-band-context.js";
type Props = {
    rect?: RubberBandRect | null;
    threshold?: number;
    onchange?: (payload: {
        rect: RubberBandRect | null;
    }) => void;
    onselect?: (payload: {
        rect: RubberBandRect | null;
    }) => void;
    oncancel?: () => void;
    children?: Snippet;
};
declare const RubberBandArea: import("svelte").Component<Props, {}, "rect">;
type RubberBandArea = ReturnType<typeof RubberBandArea>;
export default RubberBandArea;
