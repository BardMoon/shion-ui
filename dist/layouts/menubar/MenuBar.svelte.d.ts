import type { MenuItemType } from "../../types";

type Props = {
  menus?: MenuItemType[];
};
declare const MenuBar: import("svelte").Component<Props, {}, "">;
type MenuBar = ReturnType<typeof MenuBar>;
export default MenuBar;
