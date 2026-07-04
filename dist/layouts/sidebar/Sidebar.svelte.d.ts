import type { ClassValue } from "svelte/elements";
import type { SidebarItem } from "./type";
type Props = {
    class?: ClassValue;
    items: SidebarItem[];
    bottomItems?: SidebarItem[];
    size?: number;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
};
declare const Sidebar: import("svelte").Component<Props, {}, "size">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
