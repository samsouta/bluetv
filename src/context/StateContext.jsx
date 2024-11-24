import { createContext } from "react";

import { useFetchMovies } from '../Hooks/useFetchMovies'
import {HandleScroll} from '../Hooks/useScrollHandle'
import { UseState } from "../Hooks/useState";
export const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // Use the custom hook to get movie data and state
    const { movies, filteredMovies,setFilteredMovies, currentPage, setCurrentPage, totalItems, loading, error } = useFetchMovies();
    const {contentRef} = HandleScroll();
    const {videoPage,setVideoPage,photoPage,setPhotoPage,genrePage,setGenrePage,sideBarTap, setSideBarTap} =UseState()

    const combinedData = {
        movies,
        filteredMovies,
        setFilteredMovies,
        currentPage,
        setCurrentPage,
        totalItems,
        loading,
        error,
        //
        contentRef,
        //
        videoPage,
        setVideoPage,
        photoPage,
        setPhotoPage,
        genrePage,
        setGenrePage,
        sideBarTap, 
        setSideBarTap
    };


    return (
        <stateContext.Provider value={combinedData}>
            {children}
        </stateContext.Provider>
    );
}