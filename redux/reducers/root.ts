import { combineReducers } from "redux";

import discoverReducer, { State as DiscoverState } from "@/redux/reducers/discover-reducer";
import reviewReducer, { State as ReviewState } from "@/redux/reducers/review-reducer";

const rootReducer = combineReducers({
    discoverReducer: discoverReducer,
    reviewReducer: reviewReducer,
});

export type State = {
    discoverReducer: DiscoverState,
    reviewReducer: ReviewState,
}

export default rootReducer;
