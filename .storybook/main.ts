import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],
  core: {
    disableTelemetry: true,
  },
  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  viteFinal: (config) => {
    config.base = "/shiola-ui/";
    return config;
  },
};
export default config;
