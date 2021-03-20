import { AnyAction } from "redux";

export type State = {
    counter: number
}

const reducer = (state: State = { counter: 0 }, action: AnyAction) => {
    switch (action.type) {
        case "increment":
            return {
                ...state,
                counter: state.counter + 1,
            }
        case "decrement":
            return {
                ...state,
                counter: state.counter - 1,
            }
        default:
            return { ...state };
    }
}

export default reducer;
