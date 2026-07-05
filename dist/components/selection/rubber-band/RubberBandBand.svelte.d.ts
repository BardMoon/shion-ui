import type { RubberBandRect } from "./rubber-band-context";

type Props = {
  rect: RubberBandRect | null;
};
declare const RubberBandBand: import("svelte").Component<Props, {}, "">;
type RubberBandBand = ReturnType<typeof RubberBandBand>;
export default RubberBandBand;
