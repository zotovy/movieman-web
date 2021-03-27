import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import Layout from "@/components/layout";
import MenuComponent from "@/components/menu";
import UserService from "@/services/user-service";
import MovieService from "@/services/movie-service";
import ReviewComponent from "@/components/review";
import Input from "@/components/input";
import Comment from "@/components/comment";

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
            max-width: 984px;
        }
    }
`;

type Props = {
    user: User | { name: string, profileImagePath?: string, id: number } | null;
    movie?: {
        genres: string[],
        poster: string,
        title: string,
        year: string,
        rating: number,
        id: number,
        kpId: number,
        reviews: {
            rating: number,
            content: string,
            author: User | { name: string, profileImagePath?: string },
            comments: ReviewComment[],
            createdAt: Date | any,
            id: number,
            movie: number,
        }[],
    },
    review: Review | null,
}

const ReviewDetailPage: NextPage<Props> = (props) => {

    if (!props.movie || !props.review) return <h1>404</h1>

    const author = props.review.author as User;
    const comments = props.review.comments as ReviewComment[];

    return <React.Fragment>
        <MenuComponent user={props.user}/>
        <Layout withMenu maxWidth="1024px">
            <Page>
                <img src={props.movie.poster} alt="" className="poster"/>
                <ReviewComponent
                        user={author}
                        rating={props.review.rating}
                        content={props.review.content}
                        comments={comments}/>

                {
                    comments.map(comment => <Comment
                            key={`comment-${comment.id}`}
                            user={comment.author as User}
                            content={comment.content}/>
                    )
                }

                <div className="write-comment-container">
                    <Input placeholder="Enter your comment"/>
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
            movie: await MovieService.fetchMovie(context.params?.id as string ?? 1) as Props["movie"] | undefined,
            review: await MovieService.fetchReview(reviewId, movieId)
        }
    }
}

export default ReviewDetailPage;
