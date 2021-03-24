import React, { useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import MovieTile from "./movie-tile";
import "react-responsive-carousel/lib/styles/carousel.css";
import TallMovieTile from "@/components/tall-movie-tile";
import useWindowSize from "@/utils/hooks/useWindowSize";
import useTouchDevice from "@/utils/hooks/useTouchDevice";

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
            margin: 0 auto  ;
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
    type?: "default" | "tall",
    movies: Movie[],
}


const MovieHorizontalList: React.FC<Props> = (props) => {
    const type: "default" | "tall" = props.type ?? "default";
    let { width } = useWindowSize();
    width = width ?? 1920;
    const isTouchDevice = useTouchDevice();


    const amountItemsOnOnePage = Math.floor((Math.min(1400, width) / (type === "default" ? 450 : 190)));
    let centerPercentage = 100 / amountItemsOnOnePage;

    const amountItemsOnSides = Math.floor(amountItemsOnOnePage / 2);
    const [currentSelectedMovie, setCurrentSelectedMovie] = useState(amountItemsOnSides);

    return <Container>
        {
            ((isTouchDevice || width <= 968) && type === "tall") || (centerPercentage < 100 && centerPercentage > 34 && type == "default")
                    ? <div className="scroll-carousel">
                        {
                            props.movies.map(movie => {
                                if (type === "default") return <MovieTile {...movie} />;
                                return <TallMovieTile {...movie} />
                            })
                        }
                    </div>
                    : <Carousel
                            onChange={(i) => setCurrentSelectedMovie(i)}
                            selectedItem={currentSelectedMovie}
                            showThumbs={false}
                            showIndicators={false}
                            showStatus={false}
                            swipeScrollTolerance={type === "default" ? 100 : 30}
                            centerMode={true}
                            centerSlidePercentage={centerPercentage}
                            renderArrowNext={(clickHandler) => NextArrow(currentSelectedMovie, amountItemsOnSides, clickHandler)}
                            renderArrowPrev={(clickHandler) => PrevArrow(currentSelectedMovie, amountItemsOnSides, clickHandler)}
                    >
                        {
                            props.movies.map(movie => {
                                if (type === "default") return <MovieTile useFixedWidth={false} {...movie} />;
                                return <TallMovieTile {...movie} />
                            })
                        }
                    </Carousel>

        }
    </Container>
}

const NextArrow = (i: number, amountItemsOnSides: number,  clickHandler: () => void): React.ReactNode => {
    if (i === 19 - amountItemsOnSides) return <React.Fragment/>;
    return <div className="arrow-next" onClick={clickHandler}>
        <img src="/icons/arrow-right.png" alt="right"  />
    </div>
}

const PrevArrow = (i: number, amountItemsOnSides: number, clickHandler: () => void): React.ReactNode => {
    // if (i === 0) clickHandler();
    if (i <= amountItemsOnSides) return <React.Fragment/>;
    return <div className="arrow-prev" onClick={clickHandler}>
        <img src="/icons/arrow-right.png" alt="right"  />
    </div>
}

export default MovieHorizontalList;
