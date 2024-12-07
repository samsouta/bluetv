// src/hooks/useFetchMovies.js
import { useEffect, useState } from 'react';

export const useFetchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);  // Initially loading is true
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);  // Start loading
            try {
                const response = await fetch(`https://bluetv.x10.mx/api/v1/movies?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data); // Store movie data
                setFilteredMovies(data); // Initially show all movies
                setCurrentPage(data.meta.current_page || 1); 
                setTotalItems(data.meta.last_page); // Set total number of pages
            } catch (error) {
                setError(error); // Handle error
            } finally {
                setLoading(false);  // Set loading to false once fetching is done
            }
        };
        fetchMovies();
    }, [currentPage]);

    return { movies, filteredMovies, setFilteredMovies, currentPage, setCurrentPage, totalItems, loading, error };
};
