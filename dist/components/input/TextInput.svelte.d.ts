import type { Component, Snippet } from "svelte";
import type { ClassValue, HTMLInputAttributes } from "svelte/elements";
type Props = HTMLInputAttributes & {
    ref?: HTMLInputElement | null;
    class?: ClassValue;
    icon?: Component;
    start?: Snippet;
    end?: Snippet;
    value?: string;
};
declare const TextInput: Component<Props, {}, "ref" | "value">;
type TextInput = ReturnType<typeof TextInput>;
export default TextInput;
