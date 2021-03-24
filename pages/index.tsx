import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import MenuComponent from "../components/menu";
import MovieHorizontalList from "../components/movie-horizontal-list";
import MovieService from "../services/movie-service";
import TitleComponent from "@/components/title";
import CategoryItem from "@/components/category-item";

const Page = styled.main`
    max-width: 1400px;
    margin: 50px auto 0;
    
    h2 {
        margin-top: 50px;
    }
    
    .genre-container {
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
        padding: 0 20px;
    }
`;

type Props = {
    popularMovies: Movie[];
}

const usedGenres: MovieGenre[] = ["Fantasy", "Crime", "Adventure", "Family", "Comedy", "Western", "Science Fiction", "Thriller"]

const HomePage: NextPage<Props> = (props) => {
    const [selectedGenre, setSelectedGenre] = useState<MovieGenre>(usedGenres[0]);
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

            <MovieHorizontalList type="tall" movies={props.popularMovies} />
        </Page>
    </React.Fragment>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    return {
        props: {
            popularMovies: await MovieService.fetchPopularMovies(),
        }
    }
}

export default HomePage;
