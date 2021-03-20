import React from "react";
import { AppProps } from "next/app";
import { wrapper } from "@/redux/store";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps}/>;
}

export default wrapper.withRedux(App);
