import { combineReducers } from "redux";

import discoverReducer, { State as DiscoverState } from "@/redux/reducers/discover-reducer";
import reviewReducer, { State as ReviewState } from "@/redux/reducers/review-reducer";
import searchReducer, { State as SearchReducer } from "@/redux/reducers/search-reducer";

const rootReducer = combineReducers({
    discoverReducer: discoverReducer,
    reviewReducer: reviewReducer,
    searchReducer: searchReducer,
});

export type State = {
    discoverReducer: DiscoverState,
    reviewReducer: ReviewState,
    searchReducer: SearchReducer,
}

export default rootReducer;
