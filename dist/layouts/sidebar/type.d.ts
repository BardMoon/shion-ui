import type { Component } from "svelte";
import type { ToolbarItem } from "..";
export type SidebarItem = ToolbarItem & {
    panel?: Component;
};
