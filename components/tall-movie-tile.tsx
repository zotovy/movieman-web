import React from "react";
import styled from "styled-components";
import { basicMovieTileStyles, Props as MovieTileProps } from "./movie-tile";
import Link from "next/link";
import { LoadingMovieTile } from "@/components/loading-movie-tile";

export type Props = MovieTileProps;

const Container = styled.div`
    ${basicMovieTileStyles};
    min-height: 320px;
    width: 183px;

    .poster {
        width: 182px;
        height: 270px;
    }

    .title {
        height: auto;
        margin-bottom: 5px;

        h4 {
            font-size: 16px;
            margin-bottom: 0;
            text-align: left;
        }
    }

    .subtitle span {
        font-size: 13px;
    }
    
`;

const TallMovieTile: React.FC<Props> = (props) => {
    if (typeof props.isLoading === "undefined" || props.isLoading) return <LoadingMovieTile type="tall" />

    let title = props.title;
    if (title.length > 45) {
        title = props.title.substr(0, 40) + "...";
    }

    return <Link href={`/movie/${props.id}`}>
        <Container className="tall-movie-component" data-testid="tmt-container">
            <div className="poster" style={{ backgroundImage: `url(${props.poster})`, }} data-testid="tmt-poster"/>
            <div className="title" data-testid="tmt-title">
                <h4>{title}</h4>
            </div>
            <div className="subtitle">
                <span className="year" data-testid="tmt-year">{props.year}</span>
                <div className="dot"/>
                <span className="genre" data-testid="tmt-genre">{props.genres[0]}</span>
            </div>
        </Container>
    </Link>
}

export default TallMovieTile;


