import { AnyAction } from "redux";

export type State = {

}

export const InitialState: State = {

}

const reducer = (state: State = InitialState, action: AnyAction) => {
    switch (action.type) {
        default:
            return { ...state };
    }
}

export default reducer;
