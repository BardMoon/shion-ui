export type TreeNodeData = {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNodeData[];
  meta?: Record<string, unknown>;
};
export type TreeViewController = {
  expandAll: () => void;
  collapseAll: () => void;
};
