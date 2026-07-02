import type { Component } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ButtonToneType } from "../../types";
type Props = HTMLButtonAttributes & {
    label: string;
    icon?: Component;
    tone?: ButtonToneType;
    shortcut?: string;
    selected?: boolean;
    hasChildren?: boolean;
    onclick?: (e: MouseEvent) => void;
};
declare const DropdownItem: Component<Props, {}, "">;
type DropdownItem = ReturnType<typeof DropdownItem>;
export default DropdownItem;
