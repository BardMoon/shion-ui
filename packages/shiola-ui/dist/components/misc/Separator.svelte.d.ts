import type { ClassValue } from "svelte/elements";
type Props = {
    orientation?: "horizontal" | "vertical";
    class?: ClassValue;
};
declare const Separator: import("svelte").Component<Props, {}, "">;
type Separator = ReturnType<typeof Separator>;
export default Separator;
