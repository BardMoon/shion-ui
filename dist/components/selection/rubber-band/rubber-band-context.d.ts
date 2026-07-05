export type RubberBandRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};
type RubberBandContextValue = {
  register: (key: string, el: HTMLElement) => () => void;
  isSelected: (key: string) => boolean;
};
export declare function setRubberBandContext(
  value: RubberBandContextValue,
): void;
export declare function getRubberBandContext(): RubberBandContextValue;
export declare function intersects(
  a: RubberBandRect,
  b: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  },
): boolean;
