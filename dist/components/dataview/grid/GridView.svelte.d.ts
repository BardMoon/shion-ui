import type { Snippet } from "svelte";
import type { ClassValue } from "svelte/elements";

declare function $$render<
  T extends {
    id: string | number;
  },
>(): {
  props: {
    items: T[];
    cell: Snippet<[T]>;
    getKey?: (item: T) => string | number;
    class?: ClassValue;
    minCellWidth?: number;
    gap?: number;
  };
  exports: {};
  bindings: "";
  slots: {};
  events: {};
};
declare class __sveltets_Render<
  T extends {
    id: string | number;
  },
> {
  props(): ReturnType<typeof $$render<T>>["props"];
  events(): ReturnType<typeof $$render<T>>["events"];
  slots(): ReturnType<typeof $$render<T>>["slots"];
  bindings(): "";
  exports(): {};
}
interface $$IsomorphicComponent {
  new <
    T extends {
      id: string | number;
    },
  >(
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
  <
    T extends {
      id: string | number;
    },
  >(
    internal: unknown,
    props: ReturnType<__sveltets_Render<T>["props"]> & {},
  ): ReturnType<__sveltets_Render<T>["exports"]>;
  z_$$bindings?: ReturnType<__sveltets_Render<any>["bindings"]>;
}
declare const GridView: $$IsomorphicComponent;
type GridView<
  T extends {
    id: string | number;
  },
> = InstanceType<typeof GridView<T>>;
export default GridView;
