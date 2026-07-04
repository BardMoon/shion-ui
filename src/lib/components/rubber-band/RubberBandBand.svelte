<script lang="ts">
  import type { RubberBandRect } from "./rubber-band-context";

  type Props = {
    rect: RubberBandRect | null;
  };

  let { rect }: Props = $props();
</script>

{#if rect}
  <div
    class={["rb-band", "absolute"]}
    style:left={`${rect.x}px`}
    style:top={`${rect.y}px`}
    style:width={`${rect.w}px`}
    style:height={`${rect.h}px`}
    aria-hidden="true"
  ></div>
{/if}

<style>
  .rb-band {
    pointer-events: none;
    background: var(--color-primary-level1);
    border: 1px solid var(--color-primary);
    border-radius: var(--border-radius);
    will-change: left, top, width, height;
  }
</style>
