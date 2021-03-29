import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "@/layouts/base-layout";
import Button from "@/components/button";

const Text404 = styled.h1`
    font-size: 120px;
    font-weight: bold;
    color: ${ props => props.theme.colors.text };
    letter-spacing: 20px;
    user-select: none;
`;

const Subtitle = styled.p`
    margin-top: 60px;
    margin-bottom: 30px;
    color: ${ props => props.theme.colors.textSecondary };
    text-align: center;
    width: 70%;
    letter-spacing: 1px;
`;

type Props = {
    statusCode: number;
    subtitle: string;
    buttonText: string;
    pushTo: string;
}

const StatusCodeLayout: React.FC<Props> = (props) => {
    return <Layout>
        <Text404>{ props.statusCode }</Text404>
        <Subtitle>{ props.subtitle }</Subtitle>
        <Link href={ props.pushTo }>
            <Button style={{ width: "180px" }} type="secondary">{ props.buttonText }</Button>
        </Link>
    </Layout>
}

export default StatusCodeLayout;
