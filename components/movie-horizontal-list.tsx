import React, { useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import MovieTile from "./movie-tile";
import TallMovieTile from "@/components/tall-movie-tile";
import useWindowSize from "@/utils/hooks/useWindowSize";
import useTouchDevice from "@/utils/hooks/useTouchDevice";
import "react-responsive-carousel/lib/styles/carousel.css";

const Container = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;

    .carousel-root {
        max-width: 100%;

        &:not(&:hover) {
            .arrow-next, .arrow-prev {
                transform: scale(0);
            }
        }

        .arrow-next, .arrow-prev {
            transition: 200ms transform ease;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(5px);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            top: 115px;
            right: 25px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;

            img {
                width: 20px;
            }
        }

        .arrow-prev {
            right: auto;
            left: 25px;

            img {
                transform: rotate(180deg);
            }
        }

        .slide {
            padding: 10px;
            margin: 0 auto;
        }
    }

    .scroll-carousel {
        margin-top: 10px;
        width: 100%;
        white-space: nowrap;
        overflow-y: auto;
        display: flex;

        ::-webkit-scrollbar {
            display: none;
        }

        .movie-component, .tall-movie-component {
            flex: 0 0 auto;
            margin-right: 30px;
            padding: 10px;
        }
    }
`;

export type Props = {
    loading?: boolean,
    type?: MovieTileType,
    movies: Movie[],
}

const getTile = (i: number, loading: boolean | undefined, type: MovieTileType, movie: Movie, amountItemsOnSides: number): React.ReactElement => {
    if (type === "default") return <motion.div
            key={ `movie-${ movie.id }-${ type }` }
            initial={ { opacity: 0, x: 30 } }
            animate={ { opacity: 1, x: 0 } }
            transition={ { delay: i * 0.1 } }>
        <MovieTile isLoading={ loading } useFixedWidth={ amountItemsOnSides !== 0 } { ...movie } />
    </motion.div>
    return <motion.div
            key={ `movie-${ movie.id }-${ type }` }
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { delay: i * 0.075 } }>
        <TallMovieTile key={ `movie-${ movie.id }-${ type }` } isLoading={ loading } { ...movie } />
    </motion.div>
}

const MovieHorizontalList: React.FC<Props> = (props) => {
    const type = props.type ?? "default";
    let width = useWindowSize().width ?? 1920;
    const isTouchDevice = useTouchDevice();

    // Calculate center percentage for react-responsive-carousel
    const amountItemsOnOnePage = Math.floor((Math.min(1400, width) / (type === "default" ? 450 : 190)));
    let centerPercentage = 100 / amountItemsOnOnePage;

    // Amount of items on left and right sides (not their sum) from center tile
    const amountItemsOnSides = Math.floor(amountItemsOnOnePage / 2);

    console.log(amountItemsOnSides);

    const [currentSelectedMovie, setCurrentSelectedMovie] = useState(amountItemsOnSides);

    // make a decision to use custom carousel or carousel from react-responsive-carousel package
    const useCustomCarousel = ((isTouchDevice || width <= 968) && type === "tall")
            || (centerPercentage < 100 && centerPercentage > 34 && type == "default");

    // list of movie tiles used in carousel
    const tiles = props.movies.map((movie, i) => getTile(i, props.loading, type, movie, amountItemsOnSides));

    return <Container>
        {
            useCustomCarousel
                    ? <div className="scroll-carousel">{ tiles }</div>
                    : <Carousel
                            onChange={ (i) => setCurrentSelectedMovie(i) }
                            selectedItem={ currentSelectedMovie }
                            showThumbs={ false }
                            showIndicators={ false }
                            showStatus={ false }
                            swipeScrollTolerance={ type === "default" ? 100 : 30 }
                            centerMode={ true }
                            centerSlidePercentage={ centerPercentage }
                            renderArrowNext={ (clickHandler) => NextArrow(currentSelectedMovie, amountItemsOnSides, clickHandler) }
                            renderArrowPrev={ (clickHandler) => PrevArrow(currentSelectedMovie, amountItemsOnSides, clickHandler) }
                    >
                        {
                            tiles
                        }
                    </Carousel>

        }
    </Container>
}

const NextArrow = (i: number, amountItemsOnSides: number, clickHandler: () => void): React.ReactNode => {
    // this condition need to not render arrow when scrolled to the end
    if (i === 19 - amountItemsOnSides) return <React.Fragment/>;

    return <div className="arrow-next" onClick={ clickHandler }>
        <img src="/icons/arrow-right.png" alt="right"/>
    </div>
}

const PrevArrow = (i: number, amountItemsOnSides: number, clickHandler: () => void): React.ReactNode => {
    // this condition need to not render arrow when scrolled to the end
    if (i <= amountItemsOnSides) return <React.Fragment/>;

    return <div className="arrow-prev" onClick={ clickHandler }>
        <img src="/icons/arrow-right.png" alt="right"/>
    </div>
}

export default MovieHorizontalList;
