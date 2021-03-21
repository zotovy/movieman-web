import React from "react";
import Link from "next/link";
import styled from "styled-components";
import FormatHelper from "../helpers/format_helper";

const Container = styled.div`
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


`;

export type Props = {
    id: number;
    poster: string;
    title: string;
    year: string;
    genres: string[];
    rating: number;
}

const MovieTile: React.FC<Props> = (props) => {
    const ratColor = FormatHelper.getRatingColor(props.rating);

    return <Link href={`/movie/${props.id}`}>
        <Container>
            <div className="poster" style={{ backgroundImage: `url(${props.poster})` }}/>
            <div className="title">
                <h4>{props.title}</h4>
                <span className="rating" style={{ color: ratColor }}>{props.rating}</span>
            </div>
            <div className="subtitle">
                <span className="year">{props.year}</span>
                <div className="dot"/>
                <span className="genre">{props.genres[0]}</span>
            </div>
        </Container>
    </Link>;
}

export default MovieTile;
