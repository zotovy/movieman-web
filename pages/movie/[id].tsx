import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import MenuComponent from "@/components/menu";
import FormatHelper from "@/helpers/format-helper";
import Button from "@/components/button";
import TitleComponent from "@/components/title";
import ReviewComponent from "@/components/review";
import FadeInWhenVisible from "@/components/utils/animate-when-visible";
import MovieService from "../../services/movie-service";

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
                color: ${props => props.theme.colors.text};
            }

            p.detail-info {
                margin-top: 10px;

                span {
                    font-weight: normal;
                    margin-right: 20px;
                    color: ${props => props.theme.colors.textSecondary};

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
                color: ${props => props.theme.colors.primary};
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

const MovieDetailPage: NextPage<Props> = ({ movie }) => {
    if (!movie) return <h1>404</h1>;

    movie.reviews.forEach((x, i) => {
        movie.reviews[i].createdAt = new Date(x.createdAt);
    })
    const ratingColor = FormatHelper.getRatingColor(movie.rating);

    return <React.Fragment>
        <MenuComponent/>
        <motion.div
                key={typeof window !== "undefined" ? location.pathname : undefined}
                initial="initial"
                animate="in"
                exit="exit"
                variants={pageVariants}>
            <Page className="movie-detail-page">
                <img
                        src={movie.poster}
                        alt={movie.title}
                        className="poster"/>


                <section className="information">
                    <div className="info">
                        <motion.h1
                                transition={{ delay: 0.2 }}
                                initial={animation.text.from}
                                animate={animation.text.to}>
                            {movie.title}
                        </motion.h1>
                        <motion.p
                                transition={{ delay: 0.25 }}
                                initial={animation.text.from}
                                animate={animation.text.to}
                                className="detail-info">
                            <span className="rating" style={{ color: ratingColor }}>{movie.rating}</span>
                            <span className="genres">{movie.genres.slice(0, 3).join(", ")}</span>
                            <span className="year">{movie.year}</span>
                        </motion.p>
                    </div>
                    <motion.div
                            transition={{ delay: 0.2 }}
                            initial={animation.text.from}
                            animate={animation.text.to}
                            className="buttons">
                        <Button
                                onClick={() => window.open(`https://www.kinopoisk.ru/index.php?kp_query=${movie.title}`)}>
                            Найти на Кинопоиске
                        </Button>
                        <Button type="secondary">Оставить отзыв</Button>
                    </motion.div>
                </section>

                <section className="reviews">
                    <div className="header">
                        <TitleComponent>Отзывы Пользователей</TitleComponent>
                        <span className="write-review">Написать отзыв</span>
                    </div>
                    <div className="review-grid">
                        {
                            movie.reviews.map(review => <FadeInWhenVisible>
                                        <ReviewComponent
                                                {...review}
                                                user={review.author}
                                        />
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
    return {
        props: {
            movie: await MovieService.fetchMovie(context.params?.id as string ?? 1) as Props["movie"] | undefined,
        }
    }
}


export default MovieDetailPage;