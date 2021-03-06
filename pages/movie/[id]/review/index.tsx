import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import Layout from "@/layouts/base-layout";
import { ToastContainer } from "react-toastify";
import UserService from "@/services/user-service";
import MenuComponent from "@/components/menu";
import MovieService from "@/services/movie-service";
import TitleComponent from "@/components/title";
import Textarea from "@/components/textarea";
import { FormikProps, withFormik } from "formik";
import UiHelper from "@/helpers/ui-helper";
import ValidationHelper from "@/helpers/validation-helper";
import RatingPicker from "@/components/rating-picker";
import Button from "@/components/button";
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import Head from "next/head";


const Page = styled.div`
    img.poster {
        width: 100%;
        border-radius: 20px;
        border: 1px solid #27283C;
        box-shadow: 1px 5px 20px rgb(0, 0, 26);
    }

    h2 {
        font-size: 28px;
        width: 100%;
        text-align: left;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    textarea {
        max-height: 500px;
        min-height: 200px;
        resize: vertical;
    }

    .rating-picker-component {
        margin-top: 15px;
        width: 100%;
    }

    button {
        margin-top: 20px;
    }
`;

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
    return <form onSubmit={ (event) => {
        console.log(props.values.rating);
        props.handleSubmit(event);
        if (props.values.rating === -1) UiHelper.showToast("Please, rate this film");
    } }>
        <Textarea
                name="review"
                placeholder="Write your review here"
                onChange={ props.handleChange }
                error={ props.touched.review ? props.errors.review : undefined }
                maxLength={ 2048 }/>
        <RatingPicker onChange={ i => props.setFieldValue("rating", i) }/>
        <Button
                htmlType="submit"
                disabled={ !(props.isValid && props.dirty) }>
            Write review
        </Button>
    </form>
}

type FormValues = {
    review: string;
    rating: number;
}

type FormProps = WithRouterProps & Props;

const Form = withRouter(withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
        review: "",
        rating: -1,
    }),
    handleSubmit: async (values, { props }) => {
        if (!props.movie || !props.user) return;
        await MovieService.writeReview(props.movie.id, values.review, props.user.id, values.rating);
        props.router.back();
    },
    validationSchema: ValidationHelper.validateWriteReview,
})(InnerForm));

type Props = {
    user: User | { name: string, profileImagePath?: string, id: number } | null;
    movie: Movie | null,
}

const WriteReviewPage: NextPage<Props> = (props) => {
    if (!props.movie) return <h1>404</h1>;

    return <React.Fragment>
        <Head>
            <title>Write review for { props.movie.title }</title>
        </Head>
        <Page>
            <MenuComponent user={ props.user }/>
            <Layout withMenu styles={ { maxWidth: "768px" } }>
                <img src={ props.movie.poster } alt="" className="poster"/>
                <TitleComponent>{ props.movie.title }</TitleComponent>
                <Form { ...props } />
            </Layout>
        </Page>
        <ToastContainer/>
    </React.Fragment>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const user = await UserService.fetchUserServerSide(context);

    const movieId = context.params?.id as string;

    return {
        props: {
            user,
            movie: await MovieService.fetchMovie(movieId),
        }
    }
}

export default WriteReviewPage;
