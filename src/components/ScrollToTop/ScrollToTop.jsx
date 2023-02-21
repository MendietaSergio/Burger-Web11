import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scroll({
            top: 0,
            letf: 0,
            behavior: 'smooth'
        });
    }, [location.pathname])
    return null;
}

