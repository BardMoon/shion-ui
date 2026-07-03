import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";
import type { MenuItemType } from "../../types";
type Props = {
    content: Snippet<[MenuItemType]>;
    children: Snippet;
    class?: ClassValue;
    menu: MenuItemType[];
    selected: boolean;
    onopen: () => void;
    onhover?: () => void;
    onclose: () => void;
};
declare const DropdownButton: import("svelte").Component<Props, {}, "">;
type DropdownButton = ReturnType<typeof DropdownButton>;
export default DropdownButton;
