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

}
