import type { Component } from "svelte";
import type { ToolbarItem } from "../toolbar/type";

export type SidebarItem = ToolbarItem & {
  panel?: Component;
};
