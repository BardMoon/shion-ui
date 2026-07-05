import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ButtonToneType } from "../../types";
type Props = HTMLButtonAttributes & {
    children: Snippet;
    tone?: ButtonToneType;
    shortcut?: string;
    selected?: boolean;
    hasChildren?: boolean;
    onclick?: (e: MouseEvent) => void;
};
declare const MenuItem: import("svelte").Component<Props, {}, "">;
type MenuItem = ReturnType<typeof MenuItem>;
export default MenuItem;
