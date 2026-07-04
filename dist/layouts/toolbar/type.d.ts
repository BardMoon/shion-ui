import type { Component } from "svelte";
export type Orientation = "horizontal" | "vertical";
export type ToolbarItem = {
    id: string;
    icon: Component;
    label: string;
};
export type ToolbarGroups = {
    start?: ToolbarItem[];
    center?: ToolbarItem[];
    end?: ToolbarItem[];
};
