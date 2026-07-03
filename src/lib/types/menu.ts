import type { Component } from "svelte";
import type { ButtonToneType } from "$lib/types";

export type MenuItemType =
  | {
      type: "item";
      label: string;
      icon?: Component;
      shortcut?: string;
      disabled?: boolean;
      tone?: ButtonToneType;
      onclick?: () => void;
      children?: MenuItemType[];
    }
  | {
      type: "separator";
    };
