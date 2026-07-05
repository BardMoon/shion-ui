import type { Snippet } from "svelte";
import type { Orientation } from "./types";
type $$ComponentProps = {
    first: Snippet;
    second: Snippet;
    defaultSize?: number;
    size?: number;
    minSize?: number;
    maxSize?: number;
    orientation?: Orientation;
    overlay?: boolean;
};
declare const SplitView: import("svelte").Component<$$ComponentProps, {}, "size">;
type SplitView = ReturnType<typeof SplitView>;
export default SplitView;
