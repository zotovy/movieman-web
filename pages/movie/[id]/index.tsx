import React from "react";
import Link from "next/link"
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { motion } from "framer-motion";
import MenuComponent from "@/components/menu";
import UiHelper from "@/helpers/ui-helper";
import Button from "@/components/button";
import TitleComponent from "@/components/title";
import ReviewComponent from "@/components/review";
import FadeInWhenVisible from "@/components/utils/animate-when-visible";
import MovieService from "@/services/movie-service";
import UserService from "@/services/user-service";
import AppRoutes from "@/utils/app-routes";
import Head from "next/head";

const Page = styled.main`
    width: 100%;
    height: calc(100vh - 75px);

    ::-webkit-scrollbar-track {
        background: red;
    }

    img.poster {
        margin: 30px auto 0;
        width: 100%;
    }

    section {
        margin: 0 auto;
        max-width: 1400px;
        width: 100%;
        padding: 0 20px;
    }

    section.information {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;

        .info {
            h1 {
                font-weight: bold;
                font-size: 36px;
                line-height: 43px;
                color: ${ props => props.theme.colors.text };
            }

            p.detail-info {
                margin-top: 10px;

                span {
                    font-weight: normal;
                    margin-right: 20px;
                    color: ${ props => props.theme.colors.textSecondary };

                    &.rating {
                        font-weight: bold;
                    }
                }
            }
        }

        .buttons {
            display: flex;
            align-items: center;

            button.primary {
                margin-right: 30px;
            }
        }
    }

    section.reviews {
        margin-top: 60px;
        padding-bottom: 100px;
        width: 100%;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span.write-review {
                font-size: 18px;
                line-height: 22px;
                color: ${ props => props.theme.colors.primary };
                cursor: pointer;

                &:hover {
                    color: #5970da;
                }
            }
        }

        .review-grid {
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 50px;
            grid-row-gap: 50px;
        }
    }
`;

type Props = {
    movie: Movie | null,
    user: User | { name: string, profileImagePath?: string } | null;
}

// Animation
const animation = {
    text: {
        from: {
            y: 20,
            opacity: 0,
        },
        to: {
            y: 0,
            opacity: 1,
        },
        transition: {
            delay: 0.3,
        }
    }
}

const pageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
}

const MovieDetailPage: NextPage<Props> = ({ movie, user }) => {
    if (!movie) return <h1>404</h1>;

    const ratingColor = UiHelper.getRatingColor(movie.rating);

    return <React.Fragment>
        <Head>
            <title>{ movie.title }</title>
        </Head>

        <MenuComponent user={ user }/>

        <motion.div
                key={ typeof window !== "undefined" ? location.pathname : undefined }
                initial="initial"
                animate="in"
                exit="exit"
                variants={ pageVariants }>
            <Page className="movie-detail-page">
                <img
                        src={ movie.poster }
                        alt={ movie.title }
                        className="poster"/>


                <section className="information">
                    <div className="info">
                        <motion.h1
                                transition={ { delay: 0.2 } }
                                initial={ animation.text.from }
                                animate={ animation.text.to }>
                            { movie.title }
                        </motion.h1>
                        <motion.p
                                transition={ { delay: 0.25 } }
                                initial={ animation.text.from }
                                animate={ animation.text.to }
                                className="detail-info">
                            <span className="rating"
                                  style={ { color: ratingColor } }>
                                { parseFloat(movie.rating.toFixed(1)) }
                            </span>
                            <span className="genres">{ movie.genres.slice(0, 3).join(", ") }</span>
                            <span className="year">{ movie.year }</span>
                        </motion.p>
                    </div>

                    <motion.div
                            transition={ { delay: 0.2 } }
                            initial={ animation.text.from }
                            animate={ animation.text.to }
                            className="buttons">
                        <Button
                                onClick={ () => window.open(`https://www.kinopoisk.ru/index.php?kp_query=${ movie.title }`) }>
                            Найти на Кинопоиске
                        </Button>
                        <Link href={ AppRoutes.writeReview(movie.id) }>
                            <Button type="secondary">Оставить отзыв</Button>
                        </Link>
                    </motion.div>
                </section>

                <section className="reviews">
                    <div className="header">
                        <TitleComponent>Отзывы Пользователей</TitleComponent>
                        <Link href={ AppRoutes.writeReview(movie.id) }>
                            <span className="write-review">Написать отзыв</span>
                        </Link>
                    </div>

                    <div className="review-grid">
                        {
                            movie.reviews.map(review => <FadeInWhenVisible key={ `review-${ review.id }` }>
                                        <Link href={ AppRoutes.reviewDetail(movie.id, review.id) }>
                                            <a>
                                                <ReviewComponent
                                                        { ...review }
                                                        user={ review.author }
                                                />
                                            </a>
                                        </Link>
                                    </FadeInWhenVisible>
                            )
                        }
                    </div>
                </section>
            </Page>
        </motion.div>
    </React.Fragment>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const user = await UserService.fetchUserServerSide(context);

    const movieId = context.params?.id as string ?? "1";
    const movie = await MovieService.fetchMovie(movieId);

    return {
        props: {
            user,
            movie,
        }
    }
}


export default MovieDetailPage;
