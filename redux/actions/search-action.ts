import { createAction } from "@reduxjs/toolkit";
import { SearchTypes } from "@/redux/types";

export const setFoundedMovies = createAction<Movie[]>(SearchTypes.setFoundedMovies);
