import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
    const location = useLocation();

    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem(location.key);

        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }
        
        const handleScroll = () => {
            sessionStorage.setItem(location.key, window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location]);
};

export default useScrollRestoration;