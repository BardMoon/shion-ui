export type Orientation = "horizontal" | "vertical";

export interface SplitViewProps {
  size: number;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  orientation?: Orientation;
  overlay?: boolean;
}

export type ResizeEvent = CustomEvent<number>;
