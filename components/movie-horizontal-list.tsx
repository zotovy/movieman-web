import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { useWindowWidth } from "@react-hook/window-size";
import MovieTile from "./movie-tile";
import "react-responsive-carousel/lib/styles/carousel.css";

const Container = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;
    max-width: 1400px;
    margin: 50px auto 0;

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
    
`;

export type Props = {}

const movie = {
    genres: ["Драма"],
    poster: "https://planetakino.ua/res/get-poster/00000000000000000000000000002169/am_cartaz.regular_30cm_BREVE.jpg",
    title: "Маленькие женщины",
    year: "2019",
    rating: 7.7,
    id: 12,
}

const MovieHorizontalList: React.FC<Props> = (props) => {

    let width = useWindowWidth();
    width = width == 0 ? 1920 : width;
    let centerPercentage = 100 / Math.floor((Math.min(1400, width) / 450));
    // if (width < 1400) centerPercentage = 50;
    // if (width < 768) centerPercentage = 100;

    return <Container>
        <Carousel
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                swipeable={width <= 968}
                emulateTouch={true}
                swipeScrollTolerance={20}
                centerMode={true}
                centerSlidePercentage={centerPercentage}
                renderArrowNext={NextArrow}
                renderArrowPrev={PrevArrow}
            >
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
            <MovieTile useFixedWidth={false} {...movie} />
        </Carousel>
    </Container>
}

const NextArrow = (clickHandler: () => void, hasNext: boolean): React.ReactNode => {
    if (!hasNext) return <React.Fragment/>;
    return <div className="arrow-next" onClick={clickHandler}>
        <img src="/icons/arrow-right.png" alt="right"  />
    </div>
}

const PrevArrow = (clickHandler: () => void, hasNext: boolean): React.ReactNode => {
    if (!hasNext) return <React.Fragment/>;
    return <div className="arrow-prev" onClick={clickHandler}>
        <img src="/icons/arrow-right.png" alt="right"  />
    </div>
}

export default MovieHorizontalList;
