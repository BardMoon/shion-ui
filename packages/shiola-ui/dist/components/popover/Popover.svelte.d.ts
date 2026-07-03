import type { ClassValue, HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
type Props = HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    class?: ClassValue;
    onclose?: () => void;
    children?: Snippet;
};
declare const Popover: import("svelte").Component<Props, {}, "">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
