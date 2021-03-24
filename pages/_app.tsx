import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import { ThemeProvider } from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";
import theme from "@/utils/theme";
import EnvHelper from "@/helpers/env-helper";
import "../styles/globals.css"


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    EnvHelper.validateEnv();

    return <ThemeProvider theme={theme}>
        <SkeletonTheme color={theme.colors.lightBg} highlightColor={theme.colors.skeletonHighlight}>
            <Component {...pageProps} />
        </SkeletonTheme>
    </ThemeProvider>
}

export default wrapper.withRedux(App);
