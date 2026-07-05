function createTreeStore() {
  let expanded = $state<Set<string>>(new Set());

  return {
    get expanded() {
      return expanded;
    },

    toggle(id: string) {
      const next = new Set(expanded);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      expanded = next;
    },

    isOpen(id: string): boolean {
      return expanded.has(id);
    },

    expandAll(ids: string[]) {
      expanded = new Set(ids);
    },

    collapseAll() {
      expanded = new Set();
    },
  };
}

export const treeStore = createTreeStore();
