import { createContext, useMemo } from "react";

import { useFetchMovies } from '../Hooks/useFetchMovies';
import { HandleScroll } from '../Hooks/useScrollHandle';
import { UseState } from "../Hooks/useState";

export const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // Fetch movies and state
    const {
        movies,
        filteredMovies,
        setFilteredMovies,
        currentPage,
        setCurrentPage,
        totalItems,
        loading,
        error,
    } = useFetchMovies();

    // Scroll handling
    const { contentRef } = HandleScroll();

    // UI and page state
    const {
        videoPage,
        setVideoPage,
        photoPage,
        setPhotoPage,
        genrePage,
        setGenrePage,
        sideBarTap,
        setSideBarTap,
    } = UseState();

    // Memoized Context Value
    const combinedData = useMemo(() => ({
        movies,
        filteredMovies,
        setFilteredMovies,
        currentPage,
        setCurrentPage,
        totalItems,
        loading,
        error,
        contentRef,
        videoPage,
        setVideoPage,
        photoPage,
        setPhotoPage,
        genrePage,
        setGenrePage,
        sideBarTap,
        setSideBarTap,
    }), [
        movies,
        filteredMovies,
        currentPage,
        totalItems,
        loading,
        error,
        contentRef,
        videoPage,
        photoPage,
        genrePage,
        sideBarTap,
    ]);

    return (
        <stateContext.Provider value={combinedData}>
            {children}
        </stateContext.Provider>
    );
};
