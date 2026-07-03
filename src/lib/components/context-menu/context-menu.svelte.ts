import { getContext, setContext } from "svelte";
import type { MenuItemType } from "../../types";

type ContextMenuState = {
  open: boolean;
  x: number;
  y: number;
  items: MenuItemType[];
};

const CONTEXT_MENU_KEY = Symbol("context-menu");

function createContextMenu() {
  let state = $state<ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
    items: [],
  });

  function show(x: number, y: number, items: MenuItemType[]) {
    state.x = x;
    state.y = y;
    // Defensive copy: don't hold a reference to a caller-owned array —
    // the caller might mutate it later, or reuse/pool it.
    state.items = [...items];
    state.open = true;
  }

  function hide() {
    state.open = false;
  }

  return {
    get open() {
      return state.open;
    },
    get x() {
      return state.x;
    },
    get y() {
      return state.y;
    },
    get items() {
      // Defensive copy on read too, so consumers can't mutate
      // internal state via the returned reference.
      return [...state.items];
    },
    show,
    hide,
  };
}

export type ContextMenu = ReturnType<typeof createContextMenu>;

/**
 * Call once near the root of the app/route (e.g. a root layout's <script>),
 * before any descendant calls `getContextMenu()`. Creates a fresh instance
 * per component-tree instantiation via Svelte context, so SSR requests
 * never share state (unlike a module-level singleton).
 */
export function setContextMenu(): ContextMenu {
  const menu = createContextMenu();
  setContext(CONTEXT_MENU_KEY, menu);
  return menu;
}

/**
 * Retrieve the context menu instance set up by an ancestor via
 * `setContextMenu()`. Throws if none was set, to fail loudly instead of
 * silently falling back to a shared/global instance.
 */
export function getContextMenu(): ContextMenu {
  const menu = getContext<ContextMenu | undefined>(CONTEXT_MENU_KEY);
  if (!menu) {
    throw new Error(
      "getContextMenu() called without a matching setContextMenu() in an ancestor component.",
    );
  }
  return menu;
}
