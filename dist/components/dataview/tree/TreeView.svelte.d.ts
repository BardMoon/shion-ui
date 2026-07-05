import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";
import type { TreeNodeData, TreeViewController } from "./types.js";

type Props = {
  class?: ClassValue;
  nodes: TreeNodeData[];
  selected?: string | null;
  onselect?: (node: TreeNodeData) => void;
  oncontextmenu?: (e: { x: number; y: number; node: TreeNodeData }) => void;
  item: Snippet<
    [
      TreeNodeData,
      {
        isOpen: boolean;
        isSelected: boolean;
      },
    ]
  >;
  controller?: TreeViewController;
};
declare const TreeView: import("svelte").Component<
  Props,
  {},
  "selected" | "controller"
>;
type TreeView = ReturnType<typeof TreeView>;
export default TreeView;
