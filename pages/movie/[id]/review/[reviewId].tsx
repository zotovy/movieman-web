import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAction, setCommentsAction } from "@/redux/actions/review-action";
import { State } from "@/redux/reducers/root";
import Layout from "@/layouts/base-layout";
import MenuComponent from "@/components/menu";
import ReviewComponent from "@/components/review";
import Input from "@/components/input";
import Comment from "@/components/comment";
import ReviewService from "@/services/review-service";
import UserService from "@/services/user-service";
import MovieService from "@/services/movie-service";
import AppRoutes from "@/utils/app-routes";

const Page = styled.div`
    width: 100%;
    height: 100%;
    padding: 50px 0;
    justify-content: center;

    img.poster {
        width: 100%;
        border-radius: 20px;
        border: 1px solid #27283C;
        box-shadow: 1px 5px 20px rgb(0, 0, 26);
    }

    .review-component {
        cursor: initial;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .comment-component {
        margin-top: 20px;
    }

    .write-comment-container {
        position: fixed;
        bottom: 10px;
        width: 100vw;
        display: flex;
        justify-content: center;
        left: 0;

        .input-component {
            max-width: 913px;
        }

        button {
            flex: 0 0 56px;
            width: 56px;
            height: 56px;
            margin-left: 15px;
            border-radius: 10px;
            background-color: ${ props => props.theme.colors.primary };
            border: none;
            outline: none;
            box-shadow: 1px 3px 10px rgba(76, 100, 205, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            padding: 12px;

            img {
                width: 100%;
            }
        }
        
        @media screen and (max-width: 960px) {
            padding: 0 20px
        }
    }
`;

type Props = {
    user: User | { name: string, profileImagePath?: string, id: number } | null;
    movie: Movie | null,
    review: Review | null,
}

const ReviewDetailPage: NextPage<Props> = (props) => {
    const router = useRouter();

    if (!props.movie || !props.review) {
        router.push(AppRoutes.error404);
        return <h1>404</h1>;
    }

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCommentsAction(props.review?.comments as ReviewComment[]));
    }, []);


    const writeComment = (e: any) => {
        if (e.key && e.key !== "Enter") return;
        if (message === "") return;
        const reviewId = props.review?.id as number;

        const comment: ReviewComment = {
            id: -1,
            content: message,
            author: props.user as User,
            createdAt: new Date(),
            review: reviewId,
        }

        dispatch(addCommentAction(comment));

        const createCommentRequest = { ...comment, author: (comment.author as User).id };
        ReviewService.writeComment(reviewId, createCommentRequest);
        setMessage("");
    }


    const author = props.review.author as User;
    const comments = useSelector<State, ReviewComment[]>(state => state.reviewReducer.comments);

    return <React.Fragment>
        <Head>
            <title>{ props.movie.title } review</title>
        </Head>

        <MenuComponent user={ props.user }/>

        <Layout withMenu styles={ { maxWidth: "1024px", height: "initial", paddingBottom: "60px" } }>
            <Page>

                <img src={ props.movie.poster } alt="" className="poster"/>

                <ReviewComponent
                        user={ author }
                        rating={ props.review.rating }
                        content={ props.review.content }
                        comments={ comments }/>

                {
                    comments.map(comment => <Comment
                            key={ `comment-${ comment.id }` }
                            user={ comment.author as User }
                            content={ comment.content }/>
                    )
                }

                <div className="write-comment-container">
                    <Input
                            pattern=""
                            onKeyDown={ writeComment }
                            value={ message }
                            onChange={ (e) => setMessage(e.target.value) }
                            placeholder="Enter your comment"/>
                    <button
                            onClick={ writeComment }>
                        <img src="/icons/sent.png" alt=""/>
                    </button>
                </div>

            </Page>
        </Layout>
    </React.Fragment>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const user = await UserService.fetchUserServerSide(context);

    const movieId = context.params?.id as string,
            reviewId = parseInt(context.params?.reviewId as string);

    return {
        props: {
            user,
            movie: await MovieService.fetchMovie(movieId),
            review: await MovieService.fetchReview(reviewId)
        }
    }
}

export default ReviewDetailPage;
