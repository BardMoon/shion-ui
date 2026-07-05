import type { Snippet } from "svelte";

export type SortDirection = "asc" | "desc";

export type TableColumn<T> = {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  format?: (row: T) => string;
  cell?: Snippet<[T]>;
};
