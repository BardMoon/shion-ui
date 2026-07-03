import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
  stories: [
    // "../src/**/*.mdx",
    // "../src/**/*.stories.@(js|ts|svelte)",
    "../packages/shiola-ui/src/**/*.stories.@(js|ts|svelte)",
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    "@storybook/addon-svelte-csf",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  viteFinal: (config) => {
    config.base = "/shiola-ui/";
    return config;
  },
};
export default config;
