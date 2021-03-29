import React from "react";
import Link from "next/link";
import styled from "styled-components";
import UiHelper from "@/helpers/ui-helper";
import MovieTileBaseStyles from "@/components/utils/movie-tile-base";
import { LoadingMovieTile } from "@/components/loading-movie-tile";
import AppRoutes from "@/utils/app-routes";

const Container = styled.div`${MovieTileBaseStyles}`;

export type Props = Omit<Movie, "reviews"> & {
    isLoading?: false;
    useFixedWidth?: boolean;
} | {
    isLoading: true;
}

const MovieTile: React.FC<Props> = (props) => {
    if (typeof props.isLoading !== "undefined" || props.isLoading) {
        return <LoadingMovieTile type="default" />
    }

    const ratColor = UiHelper.getRatingColor(props.rating);
    let useFixedWidth = props.useFixedWidth ?? true;

    return <Link href={AppRoutes.movieDetail(props.id)} passHref>
        <Container
                className="movie-component"
                style={{ width: useFixedWidth ? "420px" : "initial" }}
                data-testid="mt-container">
            <div className="poster" style={{ backgroundImage: `url(${props.poster})` }} data-testid="mt-poster"/>
            <div className="title" data-testid="mt-title">
                <h4>{props.title}</h4>
                <span className="rating" data-testid="mt-rating" style={{ color: ratColor }}>{props.rating.toFixed(0)}</span>
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
