import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";
import type { MenuItemType } from "../../types";
type Props = {
    content: Snippet<[MenuItemType]>;
    children: Snippet;
    class?: ClassValue;
    menu: MenuItemType[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onhover?: () => void;
};
declare const DropdownButton: import("svelte").Component<Props, {}, "open">;
type DropdownButton = ReturnType<typeof DropdownButton>;
export default DropdownButton;
