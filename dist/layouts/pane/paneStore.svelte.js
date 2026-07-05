class PaneStore {
    panes = $state([]);
    register(pane) {
        if (this.panes.some((p) => p.id === pane.id)) {
            console.warn(`Pane "${pane.id}" is already registered`);
            return;
        }
        this.panes.push(pane);
    }
    unregister(id) {
        this.panes = this.panes.filter((p) => p.id !== id);
    }
    get(id) {
        return this.panes.find((p) => p.id === id);
    }
    list(ids) {
        return ids
            .map((id) => this.get(id))
            .filter((p) => p !== undefined);
    }
}
export const paneStore = new PaneStore();
