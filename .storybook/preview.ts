import type { Preview } from "@storybook/svelte-vite";
import "../src/lib/styles/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          // { id: "color-contrast", enabled: false },
        ],
      },
      // "off" | "todo" | "error"
      test: "todo",
    },
    backgrounds: {
      options: {
        light: { name: "Light", value: "#eff0f1" },
        dark: { name: "Dark", value: "#232629" },
      },
    },
    initialGlobals: {
      backgrounds: { value: "dark" },
    },
  },
  decorators: [
    (story, context) => {
      const bg = context.globals.backgrounds?.value;
      if (bg === "dark") document.documentElement.dataset.theme = "dark";
      else document.documentElement.dataset.theme = "light";
      return story();
    },
  ],
};

export default preview;
