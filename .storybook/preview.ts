import type { Preview } from "@storybook/sveltekit";

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
  },
};

export default preview;
