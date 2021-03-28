import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer, { State } from "./reducers/root";

import { InitialState as DiscoverState } from "@/redux/reducers/discover-reducer";
import { InitialState as ReviewState } from "@/redux/reducers/review-reducer";
import { InitialState as SearchState } from "@/redux/reducers/search-reducer";


const initialState: State = {
    discoverReducer: DiscoverState,
    reviewReducer: ReviewState,
    searchReducer: SearchState,
};

const makeStore: MakeStore<State> = (context: Context) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export const wrapper = createWrapper<State>(makeStore, {
   debug: process.env.MODE !== "production",
});

