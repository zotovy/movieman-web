import React from "react";
import { NextPage } from "next";
import { withRouter } from "next/router";
import { FormikProps, withFormik } from "formik";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/layouts/base-layout";
import TitleComponent from "@/components/title";
import Input from "@/components/input";
import Button from "@/components/button";
import ValidationHelper from "@/helpers/validation-helper";
import UserService from "../services/user-service";
import { WithRouterProps } from "next/dist/client/with-router";
import UiHelper from "@/helpers/ui-helper";
import Head from "next/head";

export type FormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Input
                name="name"
                type="name"
                placeholder="Full name"
                onChange={props.handleChange}
                value={props.values.name}
                error={props.touched.name ? props.errors.name : undefined}/>
        <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={props.handleChange}
                value={props.values.email}
                error={props.touched.email ? props.errors.email : undefined}/>
        <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={props.handleChange}
                value={props.values.password}
                error={props.touched.password ? props.errors.password : undefined}/>
        <Input
                name="confirmPassword"
                type="password"
                placeholder="Password Confirm"
                onChange={props.handleChange}
                value={props.values.confirmPassword}
                error={props.touched.confirmPassword ? props.errors.confirmPassword : undefined}
                needPasswordHiddenButton={false}/>
        <Button
                htmlType="submit"
                disabled={props.isSubmitting}>Signup</Button>
    </form>
}


const Form = withRouter(withFormik<WithRouterProps, FormValues>({
    mapPropsToValues: () => ({
        confirmPassword: "",
        email: "",
        name: "",
        password: "",
    }),
    handleSubmit: async (values, { props }) => {
        const response = await UserService.signupUser(values);
        if (response !== "ok") return UiHelper.showToast(
                response === "email_not_unique_error"
                        ? "This email is already in use"
                        : "Invalid error happened. Please, try later"
        );
        props.router.push("/");
    },
    validationSchema: ValidationHelper.validateSignupForm,
})(InnerForm));

const SignupPage: NextPage = (props) => {
    return <React.Fragment>
        <Head>
            <title>Signup</title>
        </Head>

        <Layout>
            <TitleComponent>Create new account</TitleComponent>
            <p className="subtitle">Please fill in the form to continue</p>
            <Form/>
        </Layout>
        <ToastContainer/>
    </React.Fragment>;
}

export default SignupPage;
