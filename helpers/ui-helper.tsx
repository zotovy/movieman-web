import { Slide, toast } from "react-toastify";
import React from "react";

export default class UiHelper {

    static showToast(message: string) {
        toast.error(
                message,
                {
                    closeButton: () => <React.Fragment/>,
                    transition: Slide,
                    hideProgressBar: true,
                    position: "bottom-center",
                }
        );
    }

    static getRatingColor(rating: number): string {
        if (rating === 0) return "#6B6F8C";
        if (rating < 4) return "#EE4C31";
        if (rating < 7) return "#F4942F";
        return "#66D35A";
    }
}
