import { AnyAction } from "redux";
import { setIsGenresMoviesLoading, setMoviesFetchedByGenre } from "@/redux/actions/discover-action";

export type State = {
    moviesFetchedByGenre: {
        Action: Movie[]
        Adventure: Movie[]
        Animation: Movie[]
        Comedy: Movie[]
        Crime: Movie[]
        Documentary: Movie[]
        Drama: Movie[]
        Family: Movie[]
        Fantasy: Movie[]
        History: Movie[]
        Horror: Movie[]
        Music: Movie[]
        Mystery: Movie[]
        Romance: Movie[]
        "Science Fiction": Movie[]
        "TV Movie": Movie[]
        Thriller: Movie[]
        War: Movie[]
        Western: Movie[],
    },
    isGenresMoviesLoading: boolean,
    foundedMovies: Movie[],
}

export const InitialState: State = {
    moviesFetchedByGenre: {
        Action: [],
        Adventure: [],
        Animation: [],
        Comedy: [],
        Crime: [],
        Documentary: [],
        Drama: [],
        Family: [],
        Fantasy: [],
        History: [],
        Horror: [],
        Music: [],
        Mystery: [],
        Romance: [],
        "Science Fiction": [],
        "TV Movie": [],
        Thriller: [],
        War: [],
        Western: [],
    },
    isGenresMoviesLoading: false,
    foundedMovies: [],
}

const reducer = (state: State = InitialState, action: AnyAction): State => {
    if (setMoviesFetchedByGenre.match(action)) {
        state.moviesFetchedByGenre[action.payload.genre] = action.payload.movies;
        return {
            ...state,
        }
    }
    if (setIsGenresMoviesLoading.match(action)) {
        return  {
            ...state,
            isGenresMoviesLoading: action.payload,
        }
    }

    return state;
}

export default reducer;
