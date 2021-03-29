import { NextPage } from "next";
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/layouts/base-layout";
import TitleComponent from "@/components/title";
import Input from "@/components/input";
import Button from "@/components/button";
import React from "react";
import UserService from "../services/user-service";
import ValidationHelper from "@/helpers/validation-helper";


const showToast = (status: string) => toast.error(
        status === "invalid_credentials"
                ? "Invalid login or email"
                : "Invalid error. Please, try later.",
        {
            position: "bottom-center",
            hideProgressBar: true,
            transition: Slide,
            closeButton: () => <React.Fragment/>
        });

const LoginPage: NextPage = () => {
    const router = useRouter();
    let email = "", password = "";
    let lastTryWasAt: Date | undefined = undefined;

    const login = async () => {
        if (!ValidationHelper.EmailValidator.test(email)) return showToast("invalid_credentials");
        if (!ValidationHelper.PasswordValidator.test(password)) return showToast("invalid_credentials");

        // @ts-ignore

        if (typeof lastTryWasAt !== "undefined") {
            if (new Date().getTime() - lastTryWasAt.getTime() < 3000) return;
        }

        lastTryWasAt = new Date();
        const status = await UserService.loginUser(email, password);
        if (status !== "ok") return showToast(status);
        router.push("/");
    }

    return <React.Fragment>
        <Layout>
            <TitleComponent>Welcome Back!</TitleComponent>
            <p className="subtitle">Please, sign in to your account</p>
            <Input placeholder="Email" onChange={v => {
                console.log(v.target.value);
                email = v.target.value
            }}/>
            <Input placeholder="Password" type="password" onChange={v => password = v.target.value}/>
            <Button onClick={login}>Login</Button>
        </Layout>
        <ToastContainer/>
    </React.Fragment>;
}

export default LoginPage;
