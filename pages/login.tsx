import { NextPage } from "next";
import styled from "styled-components";
import TitleComponent from "@/components/title";
import Input from "@/components/input";
import Button from "@/components/button";

const Page = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    
    p.subtitle {
        margin-top: 20px;
        margin-bottom: 50px;
        font-weight: normal;
        font-size: 18px;
        line-height: 22px;
    }
    
    input {
        margin-bottom: 20px;
    }
    
    button {
        width: 100%;
    }
`;

const LoginPage: NextPage = () => {
    return <Page>
        <TitleComponent>Welcome Back!</TitleComponent>
        <p className="subtitle">Please, sign in to your account</p>
        <Input placeholder="Email"/>
        <Input placeholder="Password" type="password"/>
        <Button>Login</Button>
    </Page>;
}

export default LoginPage;
