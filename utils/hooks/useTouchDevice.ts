import { useEffect, useState } from "react";

export default function useTouchDevice(): boolean {
    const [isTouchable, setIsTouchable] = useState<boolean>(false);

    useEffect(() => {
        if ("ontouchstart" in document.documentElement) {
            setIsTouchable(true);
        }
    }, []);
    return isTouchable;
}
