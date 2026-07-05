import type { Snippet } from "svelte";
import type { MenuItemType } from "../../../types";
import ContextSubmenu from "./ContextSubmenu.svelte";

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
declare const ContextSubmenu: import("svelte").Component<Props, {}, "">;
type ContextSubmenu = ReturnType<typeof ContextSubmenu>;
export default ContextSubmenu;
