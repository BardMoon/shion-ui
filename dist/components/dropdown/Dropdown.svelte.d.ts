import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";
import type { MenuItemType } from "../../types/menu";
type Props = {
    trigger: Snippet<[{
        props: Record<string, unknown>;
    }]>;
    content?: Snippet<[MenuItemType]>;
    items: MenuItemType[];
    class?: ClassValue;
    open?: boolean;
    onclick?: () => void;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
};
declare const Dropdown: import("svelte").Component<Props, {}, "open">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
