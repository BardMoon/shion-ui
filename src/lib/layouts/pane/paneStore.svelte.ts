import type { Pane } from "./type";

class PaneStore {
  panes = $state<Pane[]>([]);

  register(pane: Pane) {
    if (this.panes.some((p) => p.id === pane.id)) {
      console.warn(`Pane "${pane.id}" is already registered`);
      return;
    }
    this.panes.push(pane);
  }

  unregister(id: string) {
    this.panes = this.panes.filter((p) => p.id !== id);
  }

  get(id: string): Pane | undefined {
    return this.panes.find((p) => p.id === id);
  }

  list(ids: string[]): Pane[] {
    return ids
      .map((id) => this.get(id))
      .filter((p): p is Pane => p !== undefined);
  }
}

export const paneStore = new PaneStore();
