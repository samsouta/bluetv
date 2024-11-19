import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const HandleScroll = () => {
    const location = useLocation();
    // Function to handle scroll to section based on URL hash
    const contentRef = useRef(null);
    const sectionRefs = {
        '#contact-me': contentRef
    };
    
    const scrollToSection = () => {
        const ref = sectionRefs[location.hash];
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToSection();
    }, [location]);


    return {contentRef} ;
}