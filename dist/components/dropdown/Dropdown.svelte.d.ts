import type { ClassValue, HTMLAttributes } from "svelte/elements";
import type { MenuItemType } from "../../types";
import Dropdown from "./Dropdown.svelte";
type Props = HTMLAttributes<HTMLUListElement> & {
    class?: ClassValue;
    items: MenuItemType[];
    open?: boolean;
    onclick?: () => void;
    onclose?: () => void;
};
declare const Dropdown: import("svelte").Component<Props, {}, "">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
