import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import MenuComponent from "../components/menu";
import MovieHorizontalList from "../components/movie-horizontal-list";
import MovieService from "../services/movie-service";
import TitleComponent from "@/components/title";
import CategoryItem from "@/components/category-item";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGenreAction, setMoviesFetchedByGenre } from "@/redux/actions/discover-action";
import { State } from "@/redux/reducers/root";

const Page = styled.main`
    max-width: 1400px;
    margin: 50px auto 0;
    
    h2 {
        padding: 0 10px;
        margin-top: 50px;
    }
    
    .genre-container {
        padding: 0 10px;
        margin-top: 15px;
        height: 28px;
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow-y: auto;

        ::-webkit-scrollbar {
            display: none;
        }
        
        .category-item {
            margin-right: 21px;
        }
    }
    
    @media screen and (max-width: 1400px) {
        
    }
`;

type Props = {
    popularMovies: Movie[];
    genreMovies: Movie[];
}

const usedGenres: MovieGenre[] = ["Fantasy", "Crime", "Adventure", "Family", "Comedy", "Western", "Science Fiction", "Thriller"]

const HomePage: NextPage<Props> = (props) => {
    const [selectedGenre, setSelectedGenre] = useState<MovieGenre>(usedGenres[0]);
    const dispatch = useDispatch();
    let genreMovies = useSelector<State, Movie[]>(state => state.discoverReducer.moviesFetchedByGenre[selectedGenre]);
    if (genreMovies.length === 0) genreMovies = props.genreMovies;
    const isLoading = useSelector<State, boolean>(state => state.discoverReducer.isGenresMoviesLoading);

    useEffect(() => {
        dispatch(setMoviesFetchedByGenre({
            movies: props.genreMovies,
            genre: usedGenres[0],
        }));
    }, []);

    useEffect(() => {
        if (selectedGenre === usedGenres[0]) return;
        dispatch(fetchMoviesByGenreAction(selectedGenre));
    }, [selectedGenre]);

    return <React.Fragment>
        <MenuComponent/>
        <Page className="home-page">
            <MovieHorizontalList movies={props.popularMovies} />

            <TitleComponent>Поиск по категориям</TitleComponent>
            <div className="genre-container">
                {
                    usedGenres.map(x => <CategoryItem
                            onClick={() => setSelectedGenre(x)}
                            selected={selectedGenre === x}>
                        { x }
                    </CategoryItem>)
                }
            </div>

            <MovieHorizontalList loading={isLoading} type="tall" movies={genreMovies} />
        </Page>
    </React.Fragment>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            popularMovies: await MovieService.fetchPopularMovies(),
            genreMovies: await MovieService.fetchMoviesByGenre(usedGenres[0]),
        }
    }
}

export default HomePage;
