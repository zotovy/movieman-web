import { AnyAction } from "redux";
import { setFoundedMovies } from "@/redux/actions/search-action";

export type State = {
    foundedMovies: Movie[],
}

export const InitialState: State = {
    foundedMovies: [],
}

const reducer = (state: State = InitialState, action: AnyAction): State => {
    if (setFoundedMovies.match(action)) {
        return {
            ...state,
            foundedMovies: action.payload
        }
    }

    return state;
}

export default reducer;
