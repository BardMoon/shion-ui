import type { Attachment } from "svelte/attachments";

export function rovingFocusItem(
  register: (node: HTMLElement) => () => void,
): Attachment<HTMLElement> {
  return (node) => {
    const unregister = register(node);
    return unregister;
  };
}
