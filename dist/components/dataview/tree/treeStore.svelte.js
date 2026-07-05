function createTreeStore() {
    let expanded = $state(new Set());
    return {
        get expanded() {
            return expanded;
        },
        toggle(id) {
            const next = new Set(expanded);
            if (next.has(id)) {
                next.delete(id);
            }
            else {
                next.add(id);
            }
            expanded = next;
        },
        isOpen(id) {
            return expanded.has(id);
        },
        expandAll(ids) {
            expanded = new Set(ids);
        },
        collapseAll() {
            expanded = new Set();
        },
    };
}
export const treeStore = createTreeStore();
