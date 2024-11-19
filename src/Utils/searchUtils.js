// Utility function to handle search
export const HandleSearch = (searchQuery, data, setFilteredMovies,setSearchQuery) => {
    // Check if the search query is empty or just spaces
    if (searchQuery.trim() === "") {
        // If empty, show all movies
        setFilteredMovies(data);
        return; 
    }

    // Normalize the query and filter movies based on the title
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = data.filter(movie =>
        movie.title.toLowerCase().includes(normalizedQuery)  // case insensitive filtering
    );

    // Update the state with the filtered movies
    setFilteredMovies(filtered);
    setSearchQuery(""); 
    // Scroll the page down by 200px smoothly
    window.scrollTo({ top: window.scrollY + 200, behavior: 'smooth' });
};


