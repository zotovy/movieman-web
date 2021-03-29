import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { withFormik, FormikProps } from "formik";
import styled from "styled-components";
import MenuComponent from "@/components/menu";
import Layout from "@/layouts/base-layout";
import Input from "@/components/input";
import Button from "@/components/button";
import ValidationHelper from "@/helpers/validation-helper";
import UserService from "../services/user-service";
import ApiRoutes from "@/utils/api/routes";
import UiHelper from "@/helpers/ui-helper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserAvatar = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 50px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    
    .overflow {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
        opacity: 0;
        transition: opacity 200ms ease;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    
    &:hover .overflow {
        opacity: 1;
    }
    
`;

export type FormValues = {
    name: string;
    email: string;
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
        <Button
                htmlType="submit"
                disabled={props.isSubmitting}>Save</Button>
    </form>
}

type FormProps = FormValues & { id: number };

const Form = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
        email: props.email,
        name: props.name,
    }),
    handleSubmit: async (values, { props }) => {
        const res = await UserService.updateUser(props.id, values);
        if (res === "ok") return;
        if (res === "invalid_error") return UiHelper.showToast("Invalid error happened");
        if (res === "email_not_unique_error") return UiHelper.showToast("This email is already in used");
        if (res === "email_format_error") return UiHelper.showToast("Email badly formatted");
        if (res === "name_too_long") return UiHelper.showToast("Your name is too long");
    },
    validationSchema: ValidationHelper.validateProfileForm,
})(InnerForm);

type Props = {
    user: User,
};

const ProfilePage: NextPage<Props> = (props) => {
    const [userAvatar, setUserAvatar] = useState(props.user.profileImagePath ?? "/images/user-avatar.png");

    const changeUserAvatar = async (file: File) => {

        const status = await UserService.setAvatar(props.user.id, file);
        if (status === "invalid_size") return UiHelper.showToast("Please, select image with size less than 1mb");
        if (status === "invalid_error") return UiHelper.showToast("Invalid error happened. Please, try later");
        setUserAvatar(ApiRoutes.userAvatar(props.user.id) + `?a=${Math.random()}`);
    }

    return <React.Fragment>
        <MenuComponent user={props.user}/>
        <Layout withMenu>
            <UserAvatar style={{ backgroundImage: `url(${userAvatar})` }}>
                <input
                        type="file"
                        accept="image/*"
                        onChange={e => e.target.files ? changeUserAvatar(e.target.files[0]) : null} />
                <div className="overflow">Change image</div>
            </UserAvatar>
            <Form
                    id={props.user.id}
                    email={props.user.email}
                    name={props.user.name}
            />
        </Layout>
        <ToastContainer/>
    </React.Fragment>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const user = await UserService.fetchUserServerSide(ctx);

    return {
        props: {
            user: user,
        }
    }
}

export default ProfilePage;
