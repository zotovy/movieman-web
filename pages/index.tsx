import React, { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import { motion } from "framer-motion";
import cookie from "cookie";
import MenuComponent from "../components/menu";
import MovieHorizontalList from "../components/movie-horizontal-list";
import MovieService from "../services/movie-service";
import TitleComponent from "@/components/title";
import CategoryItem from "@/components/category-item";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGenreAction, setMoviesFetchedByGenre } from "@/redux/actions/discover-action";
import { State } from "@/redux/reducers/root";
import UserService from "../services/user-service";
import SSRHelper from "@/helpers/ssr-helper";
import Head from "next/head";
import { setFoundedMovies } from "@/redux/actions/search-action";

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
    userData: User | { name: string, profileImagePath?: string } | null;
}

const usedGenres: MovieGenre[] = ["Fantasy", "Crime", "Adventure", "Family", "Comedy", "Western", "Science Fiction", "Thriller"]

const HomePage: NextPage<Props> = (props) => {
    const [selectedGenre, setSelectedGenre] = useState<MovieGenre>(usedGenres[0]);
    const dispatch = useDispatch();
    let genreMovies = useSelector<State, Movie[]>(state => state.discoverReducer.moviesFetchedByGenre[selectedGenre]);
    const foundedMovies = useSelector<State, Movie[]>(state => state.searchReducer.foundedMovies);
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


    let searchString = "";
    const searchMovie = (q: string) => {
        searchString = q;
        if (q === "") return;
        setTimeout(async () => {
            if (q !== searchString || q === "") return;
            const movies = await MovieService.searchMovie(q);
            if (!movies) return;
            dispatch(setFoundedMovies(movies));
        }, 1000);
    }

    return <React.Fragment>
        <Head>
            <title>Movieman</title>
        </Head>

        <MenuComponent
                user={ props.userData }
                foundedMovies={ foundedMovies }
                onSearch={ searchMovie }
                loading={ false }/>

        <Page className="home-page">
            <MovieHorizontalList movies={ props.popularMovies }/>

            <motion.div transition={ { delay: 0.75 } } initial={ { opacity: 0 } } animate={ { opacity: 1 } }>
                <TitleComponent>Search by categories</TitleComponent>
            </motion.div>
            <motion.div transition={ { delay: 0.75 } } initial={ { opacity: 0 } } animate={ { opacity: 1 } }
                        className="genre-container">
                {
                    usedGenres.map(x => <CategoryItem
                            key={ x }
                            onClick={ () => setSelectedGenre(x) }
                            selected={ selectedGenre === x }>
                        { x }
                    </CategoryItem>)
                }
            </motion.div>

            <MovieHorizontalList loading={ isLoading } type="tall" movies={ genreMovies }/>
        </Page>
    </React.Fragment>
}
export default HomePage;
