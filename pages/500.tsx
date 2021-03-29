import React from "react";
import { NextPage } from "next";
import AppRoutes from "@/utils/app-routes";
import StatusCodeLayout from "@/layouts/status-code-layout";

const Page500: NextPage = () => {
    return <StatusCodeLayout
            statusCode={500}
            subtitle="Hmm... It seems our services is unavailable now. Please, try later"
            buttonText="Report"
            pushTo={AppRoutes.authorLinks.instagram} />
}

export default Page500;
