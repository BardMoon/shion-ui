import type { Component } from "svelte";

type Props = {
  icon: Component;
  label: string;
  active?: boolean;
  onclick?: () => void;
};
declare const ToolbarButton: Component<Props, {}, "">;
type ToolbarButton = ReturnType<typeof ToolbarButton>;
export default ToolbarButton;
