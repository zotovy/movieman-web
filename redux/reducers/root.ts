import { AnyAction, combineReducers } from "redux";


import signupReducer, { State as SignupState } from "@/redux/reducers/signup-reducer";

const rootReducer = combineReducers({
    signupReducer: signupReducer
});

export type State = {
    signupReducer: SignupState,
}

export default rootReducer;
