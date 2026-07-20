<script lang="ts">
  type Props = {
    tag?: string;
  };
  let { tag }: Props = $props();
</script>

<span class={["tag", "inline-flex px-1.5 py-0.5"]}>{tag}</span>

<style>
  .tag {
    align-items: center;
    font-size: 11px;
    background: var(--color-primary-level2);
    color: var(--color-primary);
    border: 1px solid rgba(61, 174, 233, 0.3);
    border-radius: var(--border-radius);
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
</style>
