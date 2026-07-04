import type { Snippet } from "svelte";
type Props = {
    children: Snippet<[{
        selected: boolean;
    }]>;
};
declare const RubberBandSelectable: import("svelte").Component<Props, {}, "">;
type RubberBandSelectable = ReturnType<typeof RubberBandSelectable>;
export default RubberBandSelectable;
