const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    "stories": [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-addon-styled-component-theme/dist/preset"
    ],
    webpackFinal: async (config) => {
        config.resolve.plugins.push(new TsconfigPathsPlugin({}));
        return config;
    },
}
