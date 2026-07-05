import type { MenuItemType } from "../../types";

declare function createContextMenu(): {
  readonly open: boolean;
  readonly x: number;
  readonly y: number;
  readonly items: MenuItemType[];
  show: (x: number, y: number, items: MenuItemType[]) => void;
  hide: () => void;
};
export type ContextMenu = ReturnType<typeof createContextMenu>;
/**
 * Call once near the root of the app/route (e.g. a root layout's <script>),
 * before any descendant calls `getContextMenu()`. Creates a fresh instance
 * per component-tree instantiation via Svelte context, so SSR requests
 * never share state (unlike a module-level singleton).
 */
export declare function setContextMenu(): ContextMenu;
/**
 * Retrieve the context menu instance set up by an ancestor via
 * `setContextMenu()`. Throws if none was set, to fail loudly instead of
 * silently falling back to a shared/global instance.
 */
export declare function getContextMenu(): ContextMenu;
