import type { Snippet } from "svelte";
import type { MenuItemType } from "../../types";
import SubMenu from "./SubMenu.svelte";

type MenuLeafType = Extract<
  MenuItemType,
  {
    type: "item";
  }
>;
type Props = {
  content?: Snippet<[MenuItemType]>;
  item: MenuLeafType;
  onclick?: () => void;
};
declare const SubMenu: import("svelte").Component<Props, {}, "">;
type SubMenu = ReturnType<typeof SubMenu>;
export default SubMenu;
