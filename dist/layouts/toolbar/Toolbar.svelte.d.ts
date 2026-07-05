import type { Orientation, ToolbarItem, ToolbarGroups } from "./type";
type Props = ToolbarGroups & {
    orientation?: Orientation;
    activeId?: string | null;
    onselect?: (item: ToolbarItem) => void;
    ariaLabel?: string;
};
declare const Toolbar: import("svelte").Component<Props, {}, "">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
