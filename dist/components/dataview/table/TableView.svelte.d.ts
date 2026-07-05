import type { TableColumn } from "./types.js";

declare function $$render<T>(): {
  props: {
    columns: TableColumn<T>[];
    rows: T[];
    getKey: (row: T) => string | number;
    selectable?: boolean;
    pageSize?: number;
    showPagination?: boolean;
    emptyText?: string;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selected: T[]) => void;
  };
  exports: {};
  bindings: "";
  slots: {};
  events: {};
};
declare class __sveltets_Render<T> {
  props(): ReturnType<typeof $$render<T>>["props"];
  events(): ReturnType<typeof $$render<T>>["events"];
  slots(): ReturnType<typeof $$render<T>>["slots"];
  bindings(): "";
  exports(): {};
}
interface $$IsomorphicComponent {
  new <T>(
    options: import("svelte").ComponentConstructorOptions<
      ReturnType<__sveltets_Render<T>["props"]>
    >,
  ): import("svelte").SvelteComponent<
    ReturnType<__sveltets_Render<T>["props"]>,
    ReturnType<__sveltets_Render<T>["events"]>,
    ReturnType<__sveltets_Render<T>["slots"]>
  > & {
    $$bindings?: ReturnType<__sveltets_Render<T>["bindings"]>;
  } & ReturnType<__sveltets_Render<T>["exports"]>;
  <T>(
    internal: unknown,
    props: ReturnType<__sveltets_Render<T>["props"]> & {},
  ): ReturnType<__sveltets_Render<T>["exports"]>;
  z_$$bindings?: ReturnType<__sveltets_Render<any>["bindings"]>;
}
declare const TableView: $$IsomorphicComponent;
type TableView<T> = InstanceType<typeof TableView<T>>;
export default TableView;
