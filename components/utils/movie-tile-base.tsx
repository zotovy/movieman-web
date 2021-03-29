import styled, { css } from "styled-components";

/**
 * This styles is shared for MovieTile and TallMovieTile components
 */

const MovieTileBaseStyles = css`
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
`

export default MovieTileBaseStyles;
