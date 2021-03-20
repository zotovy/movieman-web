import { createStore } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer from "./reducers/root";
import { State as SignupState } from "./reducers/signup-reducer";

export type State = {
    signupReducer: SignupState,
}


const makeStore: MakeStore<State> = (context: Context) => createStore(rootReducer, {
    signupReducer: { counter: 0},
});

export const wrapper = createWrapper<State>(makeStore, {
   debug: process.env.MODE !== "production",
});

