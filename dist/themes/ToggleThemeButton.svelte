<script lang="ts">
  import { Sun, Moon } from "@lucide/svelte";
  import { Button } from "../components";
  import { themeState } from "./theme.svelte";
</script>

<Button onclick={() => themeState.toggle()}>
  {#if themeState.current === "dark"}
    <Sun />
  {:else if themeState.current === "light"}
    <Moon />
  {/if}
</Button>
