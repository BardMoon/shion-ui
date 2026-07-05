import type { Snippet } from "svelte";
import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";
import type { ButtonToneType, ButtonVariantType } from "../../../types";

type Props = HTMLButtonAttributes & {
  ref?: HTMLButtonElement | null;
  class?: ClassValue;
  children?: Snippet;
  variant?: ButtonVariantType;
  tone?: ButtonToneType;
  selected?: boolean;
  fullWidth?: boolean;
};
declare const Button: import("svelte").Component<Props, {}, "ref">;
type Button = ReturnType<typeof Button>;
export default Button;
