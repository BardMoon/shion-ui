import type { Snippet } from "svelte";
import { type RubberBandRect } from "./rubber-band-context.js";
type Props = {
    rect?: RubberBandRect | null;
    selected?: string[];
    threshold?: number;
    onchange?: (payload: {
        rect: RubberBandRect | null;
    }) => void;
    onselect?: (payload: {
        rect: RubberBandRect | null;
        selected: string[];
    }) => void;
    oncancel?: () => void;
    children?: Snippet;
};
declare const RubberBandArea: import("svelte").Component<Props, {}, "selected" | "rect">;
type RubberBandArea = ReturnType<typeof RubberBandArea>;
export default RubberBandArea;
