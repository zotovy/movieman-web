import React from "react";
import styled from "styled-components";
import FormatHelper from "@/helpers/format-helper";

const Container = styled.div`
    position: absolute;
    top: 0;
    border-radius: 7px;
    padding: 15px;
    background-color: ${ props => props.theme.colors.lightBg };
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
    box-shadow: 1px 5px 25px rgba(0, 0, 26, 0.15);
    transition: transform 200ms ease, opacity 200ms ease;
    
    &.closed {
        pointer-events: none;
        opacity: 0;
        transform: translateX(-30%);
    }
`;

const Tile = styled.div`
    height: 55px;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

const Avatar = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 15px;
`;

const MovieTitle = styled.span`
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    letter-spacing: 0.03em;
    font-weight: normal;
`

const MovieSubtitle = styled.p`
    margin-top: 5px;
    color: ${ props => props.theme.colors.textSecondary };
    font-size: 15px;
    
    p {
        display: inline-block;
        margin-right: 10px;
    }
    
    .rating {
        font-weight: bold;
    }
`;

export type Props = {
    isOpen: boolean;
    movies: Movie[];
    inputHeight?: number;
}

const MovieTile: React.FC<Movie> = (props) => {
    const ratingColor = FormatHelper.getRatingColor(props.rating);

    return <Tile className="movie-tile">
        <Avatar style={{ backgroundImage: `url(${ props.poster })` }}/>
        <div>
            <MovieTitle>{ props.title }</MovieTitle>
            <MovieSubtitle>
                <p className="rating" style={{ color: ratingColor }} >{ props.rating }</p>
                <p>{ props.genres[0] }</p>
                <p>{ props.year }</p>
            </MovieSubtitle>
        </div>
    </Tile>
}

const SearchElements: React.FC<Props> = (props) => {
    const inputHeight = props.inputHeight ?? 45;
    const className = props.isOpen ? "" : "closed";

    return <Container className={className} style={{ marginTop: `${inputHeight + 10}px` }}>
        {
            props.movies.map(e => <MovieTile {...e} />)
        }
    </Container>
}

export default SearchElements;
