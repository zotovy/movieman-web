import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { State } from "@/redux/reducers/discover-reducer";
import MovieService from "../../services/movie-service";
import { createAction } from "@reduxjs/toolkit";
import { DiscoverTypes } from "@/redux/types";

export type DiscoverThunkAction<T> = ThunkAction<T, State, unknown, AnyAction>;

export const setMoviesFetchedByGenre =
  createAction<{ genre: MovieGenre, movies: Movie[] }>(DiscoverTypes.SET_MOVIES_FETCHED_BY_GENRE);


// ---------- Async actions ----------

export function fetchMoviesByGenreAction(genre: string): DiscoverThunkAction<void> {
    return async (dispatch) => {
        const movies = await MovieService.fetchMoviesByGenre(genre);
        dispatch(setMoviesFetchedByGenre({
            movies,
            genre: genre as MovieGenre,
        }));
    }
}

