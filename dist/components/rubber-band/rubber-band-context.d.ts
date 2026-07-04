export type RubberBandRect = {
    x: number;
    y: number;
    w: number;
    h: number;
};
type RubberBandContextValue = {
    register: (id: symbol, el: HTMLElement) => () => void;
    isSelected: (id: symbol) => boolean;
};
export declare function setRubberBandContext(value: RubberBandContextValue): void;
export declare function getRubberBandContext(): RubberBandContextValue;
export declare function intersects(a: RubberBandRect, b: {
    left: number;
    right: number;
    top: number;
    bottom: number;
}): boolean;
export {};
