import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { State } from "@/redux/reducers/root";
import MovieService from "../../services/movie-service";
import { createAction } from "@reduxjs/toolkit";
import { DiscoverTypes } from "@/redux/types";

export type DiscoverThunkAction<T> = ThunkAction<T, State, unknown, AnyAction>;

export const setMoviesFetchedByGenre =
  createAction<{ genre: MovieGenre, movies: Movie[] }>(DiscoverTypes.SET_MOVIES_FETCHED_BY_GENRE);


// ---------- Async actions ----------

export function fetchMoviesByGenreAction(genre: MovieGenre): DiscoverThunkAction<void> {
    return async (dispatch, getState) => {
        const { discoverReducer } = getState();
        const movies = discoverReducer.moviesFetchedByGenre[genre].length === 0
          ? await MovieService.fetchMoviesByGenre(genre)
          : discoverReducer.moviesFetchedByGenre[genre];
        dispatch(setMoviesFetchedByGenre({
            movies,
            genre: genre as MovieGenre,
        }));
    }
}

