import { AnyAction } from "redux";
import { addCommentAction, setCommentsAction } from "@/redux/actions/review-action";

export type State = {
    comments: ReviewComment[],
}

export const InitialState: State = {
    comments: [],
}

const reducer = (state: State = InitialState, action: AnyAction): State => {

    if (setCommentsAction.match(action)) {
        return {
            ...state,
            comments: action.payload,
        }
    }

    if (addCommentAction.match(action)) {
        const comments = state.comments;
        comments.push(action.payload);
        console.log(comments);
        return { ...state, ...comments };
    }

    return state;
}

export default reducer;
