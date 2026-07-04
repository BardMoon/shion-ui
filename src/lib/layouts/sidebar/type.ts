import type { Component } from "svelte";
import type { ToolbarItem } from "$lib/layouts";

export type SidebarItem = ToolbarItem & {
  panel?: Component;
};
