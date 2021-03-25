import React from "react";
import { NextPage } from "next";
import { FormikProps, withFormik } from "formik";
import Layout from "@/components/auth-layout";
import TitleComponent from "@/components/title";
import Input from "@/components/input";
import Button from "@/components/button";
import ValidationHelper from "@/helpers/validation-helper";

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
                onBlur={props.handleBlur}
                value={props.values.name}
                error={props.errors.name} />
        <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                error={props.errors.email}/>
        <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                error={props.errors.password}/>
        <Input
                name="confirmPassword"
                type="password"
                placeholder="Password Confirm"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
                error={props.errors.confirmPassword}
                needPasswordHiddenButton={false}/>
        <Button
                htmlType="submit"
                disabled={ props.isSubmitting }>Signup</Button>
    </form>
}

const Form = withFormik<{}, FormValues>({
    mapPropsToValues: () => ({
        confirmPassword: "",
        email: "",
        name: "",
        password: "",
    }),
    validationSchema: ValidationHelper.validateSignupForm,
    handleSubmit: values => {
        console.log(values)
    },
})(InnerForm);

const SignupPage: NextPage = (props) => {
    return <Layout>
        <TitleComponent>Create new account</TitleComponent>
        <p className="subtitle">Please fill in the form to continue</p>
        <Form/>
    </Layout>
}

export default SignupPage;
