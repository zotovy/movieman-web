import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import React from "react";

const theme = {
    colors: {
        primary: "#4C63CD",
        bg: "#060D2E",
        lightBg: "#171A36",
        text: "#FFFFFF",
        textSecondary: "#A2A4AF",
        textDisabled: "#6B6F8C",
        borderColor: "#27283C"
    },
    centerContent: "margin: 15px auto 0;\n    max-width: 1400px;",
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themes = [theme];
addDecorator(withThemesProvider(themes), ThemeProvider);
// addDecorator(storyfn => <ThemeProvider theme={theme}>{ storyfn() }</ThemeProvider>);

// const decorator = storyfn => <ThemeProvider theme={theme}>{ storyfn() }</ThemeProvider>;
// export const decorators = [decorator]
