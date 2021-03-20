import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import "../styles/globals.css"
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        primary: "#4C63CD",
        bg: "#060D2E",
        lightBg: "#171A36",
        text: "#FFFFFF",
        textSecondary: "#A2A4AF",
        textDisabled: "#6B6F8C",
        borderColor: "#27283C"
    }
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
    </ThemeProvider>
}

export default wrapper.withRedux(App);
