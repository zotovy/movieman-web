import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import "../styles/globals.css"
import { ThemeProvider } from "styled-components";
import theme from "@/utils/theme";
import EnvHelper from "@/helpers/env-helper";


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    EnvHelper.validateEnv();

    return <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
    </ThemeProvider>
}

export default wrapper.withRedux(App);
