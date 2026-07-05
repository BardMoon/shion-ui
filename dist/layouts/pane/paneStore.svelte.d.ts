import type { Pane } from "./type";

declare class PaneStore {
  panes: Pane[];
  register(pane: Pane): void;
  unregister(id: string): void;
  get(id: string): Pane | undefined;
  list(ids: string[]): Pane[];
}
export declare const paneStore: PaneStore;
