import { combineReducers } from "redux";


import signupReducer, { State as SignupState } from "@/redux/reducers/signup-reducer";
import discoverReducer, { State as DiscoverState } from "@/redux/reducers/discover-reducer";

const rootReducer = combineReducers({
    discoverReducer: discoverReducer,
    signupReducer: signupReducer
});

export type State = {
    signupReducer: SignupState,
    discoverReducer: DiscoverState,
}

export default rootReducer;
