import type { Orientation } from "./types";
type Props = {
    container?: HTMLElement;
    orientation?: Orientation;
    size: number;
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    overlay?: boolean;
    onresize?: (size: number) => void;
    onresizeend?: (size: number) => void;
    ondoubleclick?: () => void;
};
declare const Splitter: import("svelte").Component<Props, {}, "size">;
type Splitter = ReturnType<typeof Splitter>;
export default Splitter;
