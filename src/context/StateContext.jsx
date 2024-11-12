import { useDisclosure } from '@nextui-org/react';
import * as React from 'react';
import { createContext } from 'react';
import { useLocation } from 'react-router-dom';

export const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [movies, setMovies] = React.useState([]); // State to store movies
    const [filteredMovies, setFilteredMovies] = React.useState([]); // Stores filtered movies
    const [loading, setLoading] = React.useState(true); // State for loading status
    const [error, setError] = React.useState(null);
    const [totalItems, setTotalItems] = React.useState(0); // Total pages, not total items
    const [currentPage, setCurrentPage] = React.useState(1); // Current page number
    const [videoPage, setVideoPage] = React.useState(false)
    const [photoPage, setPhotoPage] = React.useState(false)
    const location = useLocation();
    // scroll ref 
    const contentRef = React.useRef(null);
    // Mapping of hashes to refs
    const sectionRefs = {
        '#contact-me': contentRef
    };
    // Function to scroll to the relevant section based on hash
    const scrollToSection = () => {
        const ref = sectionRefs[location.hash]; // Find the matching ref based on the hash
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    React.useEffect(() => {
        scrollToSection();
    }, [location]);

    // Fetch data whenever currentPage changes
    React.useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                // Include `currentPage` in the URL to fetch data for that specific page
                const response = await fetch(`http://chaw.giize.com/api/v1/movies?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setMovies(data); // Store the movie data
                setFilteredMovies(data); // Initially show all movies
                setCurrentPage(data.meta.current_page); // Update current page
                setTotalItems(data.meta.last_page); // Set total number of pages
            } catch (error) {
                setError(error); // Handle errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchMovies(); // Call the fetch function
    }, [currentPage]); // Re-run whenever currentPage changes

    // Provide state and setter functions to children components
    const data = {
        movies, loading, error, totalItems, currentPage, setCurrentPage, videoPage, setVideoPage, photoPage, setPhotoPage,
        filteredMovies, setFilteredMovies,contentRef
    };

    return (
        <stateContext.Provider value={data}>
            {children}
        </stateContext.Provider>
    );
};
