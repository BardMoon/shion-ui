import type { Snippet } from "svelte";
import type { MenuItemType } from "../../../types";
import DropdownSubmenu from "./DropdownSubmenu.svelte";
type MenuLeafType = Extract<MenuItemType, {
    type: "item";
}>;
type Props = {
    content?: Snippet<[MenuItemType]>;
    item: MenuLeafType;
    onclick?: () => void;
};
declare const DropdownSubmenu: import("svelte").Component<Props, {}, "">;
type DropdownSubmenu = ReturnType<typeof DropdownSubmenu>;
export default DropdownSubmenu;
