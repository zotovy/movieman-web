import { NextPage } from "next";
import Layout from "@/components/auth-layout";
import TitleComponent from "@/components/title";
import Input from "@/components/input";
import Button from "@/components/button";


const LoginPage: NextPage = () => {
    return <Layout>
        <TitleComponent>Welcome Back!</TitleComponent>
        <p className="subtitle">Please, sign in to your account</p>
        <Input placeholder="Email"/>
        <Input placeholder="Password" type="password"/>
        <Button>Login</Button>
    </Layout>;
}

export default LoginPage;
