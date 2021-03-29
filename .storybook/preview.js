import {addDecorator} from "@storybook/react";
import {ThemeProvider} from "styled-components";
import {SkeletonTheme} from "react-loading-skeleton";
import React from "react";
import theme from "../utils/theme";

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
}

addDecorator(storyfn => <ThemeProvider theme={ theme }>{ storyfn() }</ThemeProvider>);
addDecorator(storyfn => <SkeletonTheme
        color={ theme.colors.lightBg }
        highlightColor={ theme.colors.skeletonHighlight }>
    { storyfn() }
</SkeletonTheme>);
