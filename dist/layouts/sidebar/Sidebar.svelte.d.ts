import type { ClassValue } from "svelte/elements";
type Props = {
    class?: ClassValue;
    items: string[];
    bottomItems?: string[];
    size?: number;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapseThreshold?: number;
};
declare const Sidebar: import("svelte").Component<Props, {}, "size">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
