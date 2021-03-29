import React from "react";
import { NextPage } from "next";
import AppRoutes from "@/utils/app-routes";
import StatusCodeLayout from "@/layouts/status-code-layout";

const Page404: NextPage = () => {
    return <StatusCodeLayout
            statusCode={404}
            subtitle="Hmm... It seems we couldn't find anything suitable for you"
            buttonText="Go home"
            pushTo={AppRoutes.homepage} />
}

export default Page404;
