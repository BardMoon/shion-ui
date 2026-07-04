<script lang="ts">
  import { Minus, Square, X } from "@lucide/svelte";
  import { Button } from "../../components";

  type Props = {
    onminimize?: () => void;
    onmaximize?: () => void;
    onclose?: () => void;
  };
  let { onminimize, onmaximize, onclose }: Props = $props();
</script>

<!-- TODO: Additional Menu -->
<div class="flex h-full">
  <Button
    fullWidth
    class="w-7 h-full flex items-center justify-center text-(--color-text) hover:bg-(--color-hover-bg)"
    onclick={onminimize}
    aria-label="Minimal"
  >
    <Minus size={14} aria-hidden="true" />
  </Button>
  <Button
    fullWidth
    class="w-7 h-full flex items-center justify-center text-(--color-text) hover:bg-(--color-hover-bg)"
    onclick={onmaximize}
    aria-label="Maximum"
  >
    <Square size={14} aria-hidden="true" />
  </Button>
  <Button
    fullWidth
    tone="danger"
    class="w-7 h-full flex items-center justify-center"
    onclick={onclose}
    aria-label="Close"
  >
    <X size={14} aria-hidden="true" />
  </Button>
</div>
