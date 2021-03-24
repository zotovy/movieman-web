import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import React from "react";
import theme from "../utils/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const themes = [theme];
// addDecorator(withThemesProvider(themes), ThemeProvider);
// addDecorator(withThemesProvider(themes), ThemeProvider);
addDecorator(storyfn => <ThemeProvider theme={theme}>{ storyfn() }</ThemeProvider>);
addDecorator(storyfn => <SkeletonTheme color={theme.colors.lightBg} highlightColor={theme.colors.skeletonHighlight} >{ storyfn() }</SkeletonTheme>);

// const decorator = storyfn => <ThemeProvider theme={theme}>{ storyfn() }</ThemeProvider>;
// export const decorators = [decorator]
