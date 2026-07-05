<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import RubberBandArea from "./RubberBandArea.svelte";
  import RubberBandSelectable from "./RubberBandSelectable.svelte";

  const { Story } = defineMeta({
    title: "Components/RubberBand/RubberBandArea",
    component: RubberBandArea,
    tags: ["autodocs"],
  });

  const items = Array.from({ length: 9 }, (_, i) => `item-${i}`);
</script>

<Story name="Default">
  {#snippet template()}
    <div style="width: 480px; height: 320px; border: 1px solid #ccc;">
      <RubberBandArea>
        <div
          style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px;"
        >
          {#each items as key (key)}
            <RubberBandSelectable {key}>
              {#snippet children({ selected })}
                <div
                  style={`height: 64px; display:flex; align-items:center; justify-content:center;
                    border-radius: 6px; border: 1px solid #999;
                    background: ${selected ? "#3b82f622" : "#f5f5f5"};
                    outline: ${selected ? "2px solid #3b82f6" : "none"};`}
                >
                  {key}
                </div>
              {/snippet}
            </RubberBandSelectable>
          {/each}
        </div>
      </RubberBandArea>
    </div>
  {/snippet}
</Story>
