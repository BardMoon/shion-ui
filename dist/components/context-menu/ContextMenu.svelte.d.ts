import type { Snippet } from "svelte";
import type { MenuItemType } from "../../types";
type Props = {
    content: Snippet<[MenuItemType]>;
};
declare const ContextMenu: import("svelte").Component<Props, {}, "">;
type ContextMenu = ReturnType<typeof ContextMenu>;
export default ContextMenu;
