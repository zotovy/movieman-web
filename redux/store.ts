import { createStore } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer, { State } from "./reducers/root";

const initialState: State = {
    signupReducer: {},
};

const makeStore: MakeStore<State> = (context: Context) => createStore(rootReducer, initialState);

export const wrapper = createWrapper<State>(makeStore, {
   debug: process.env.MODE !== "production",
});

