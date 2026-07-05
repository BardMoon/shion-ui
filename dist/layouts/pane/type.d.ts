import type { Component } from "svelte";
export interface Pane {
    id: string;
    label: string;
    icon: Component;
    content?: Component;
    props?: Record<string, unknown>;
}
