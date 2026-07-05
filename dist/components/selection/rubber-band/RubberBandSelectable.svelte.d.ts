import type { Snippet } from "svelte";
type Props = {
    key: string;
    children: Snippet<[{
        selected: boolean;
    }]>;
};
declare const RubberBandSelectable: import("svelte").Component<Props, {}, "">;
type RubberBandSelectable = ReturnType<typeof RubberBandSelectable>;
export default RubberBandSelectable;
