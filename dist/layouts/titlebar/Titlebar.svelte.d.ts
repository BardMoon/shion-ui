import type { MenuItemType } from "../../types";

type Props = {
  menus?: MenuItemType[];
  title?: string;
};
declare const Titlebar: import("svelte").Component<Props, {}, "">;
type Titlebar = ReturnType<typeof Titlebar>;
export default Titlebar;
