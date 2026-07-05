export declare const treeStore: {
  readonly expanded: Set<string>;
  toggle(id: string): void;
  isOpen(id: string): boolean;
  expandAll(ids: string[]): void;
  collapseAll(): void;
};
