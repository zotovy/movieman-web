import React from "react";
import Link from "next/link";
import styled from "styled-components";
import FormatHelper from "../helpers/format-helper";
import { LoadingMovieTile } from "@/components/loading-movie-tile";

export const basicMovieTileStyles = `
    width: 410px;

    .poster {
        width: 100%;
        height: 230px;
        border-radius: 20px;
        margin-bottom: 10px;
        background-size: cover;
        background-position: center;
        cursor: pointer;
        transition: transform 200ms ease;

        &:hover {
            transform: scale(1.025);
        }
    }

    .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
        height: 27px;
        width: 100%;

        h4 {
            margin-top: 0;
            font-size: 22px;
            color: white;
            font-weight: 600;
            cursor: pointer;
        }

        span.rating {
            font-size: 15px;
            font-weight: 600;
        }
    }

    .subtitle {
        display: flex;
        align-items: center;
        cursor: pointer;

        .dot {
            background-color: var(--textSecondary);
            width: 3px;
            height: 3px;
            border-radius: 50%;
            margin: 0 10px;
        }

        span {
            font-size: 14px;
            color: var(--textSecondary);
        }
    }

    @media screen and (max-width: 960px) {
        &:not(.tall-movie-component) {
            width: 100%;
       
            .poster {
                height: 420px;
            }
        }
    }
`;

const Container = styled.div`${basicMovieTileStyles}`;

export type Props = Omit<Movie, "reviews"> & {
    isLoading?: false;
    useFixedWidth?: boolean;
} | {
    isLoading: true;
}

const MovieTile: React.FC<Props> = (props) => {
    if (typeof props.isLoading === "undefined" || props.isLoading) {
        console.log('123');
        return <LoadingMovieTile type="default" />
    }

    const ratColor = FormatHelper.getRatingColor(props.rating);
    let useFixedWidth = props.useFixedWidth ?? true;

    return <Link href={`/movie/${props.id}`}>
        <Container
                className="movie-component"
                style={{ width: useFixedWidth ? "420px" : "initial" }}
                data-testid="mt-container">
            <div className="poster" style={{ backgroundImage: `url(${props.poster})` }} data-testid="mt-poster"/>
            <div className="title" data-testid="mt-title">
                <h4>{props.title}</h4>
                <span className="rating" data-testid="mt-rating" style={{ color: ratColor }}>{props.rating}</span>
            </div>
            <div className="subtitle">
                <span className="year" data-testid="mt-year">{props.year}</span>
                <div className="dot"/>
                <span className="genre" data-testid="mt-genre">{props.genres[0]}</span>
            </div>
        </Container>
    </Link>;
}


export default MovieTile;
