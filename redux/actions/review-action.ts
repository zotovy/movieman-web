import { createAction } from "@reduxjs/toolkit";
import { ReviewTypes } from "@/redux/types";

export const setCommentsAction = createAction<ReviewComment[]>(ReviewTypes.setComments);
export const addCommentAction = createAction<ReviewComment>(ReviewTypes.addComment);
