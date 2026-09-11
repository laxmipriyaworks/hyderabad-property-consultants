import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there's no hash, always scroll to the very top instantly
        if (!hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
