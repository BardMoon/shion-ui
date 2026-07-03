import type { Snippet } from "svelte";
import type { ClassValue, HTMLAttributes } from "svelte/elements";
import type { MenuItemType } from "../../types";
import Dropdown from "./Dropdown.svelte";
type Props = HTMLAttributes<HTMLUListElement> & {
    content?: Snippet<[MenuItemType]>;
    items: MenuItemType[];
    class?: ClassValue;
    open?: boolean;
    onclick?: () => void;
    onclose?: () => void;
    autofocus?: boolean;
};
declare const Dropdown: import("svelte").Component<Props, {}, "">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
