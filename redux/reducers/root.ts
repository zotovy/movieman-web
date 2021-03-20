import { AnyAction, combineReducers } from "redux";
import signupReducer from "@/redux/reducers/signup-reducer";

const rootReducer = combineReducers({
    signupReducer: signupReducer
});

// const rootReducer = (state: State = { counter: 0 }, action: AnyAction) => {
//     return {
//         signupReducer: signupReducer(state, action),
//     }
// }

export default rootReducer;
