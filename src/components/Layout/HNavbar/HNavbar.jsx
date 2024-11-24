import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navbar } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// utils
import { HandleSearch } from '../../../Utils/searchUtils';
import { stateContext } from '../../../context/StateContext';
import { useGetAllVideosQuery } from '../../../services/api/AllVideos';
import { Input } from '@mantine/core';
import SideBar from '../SideBar';

const HNavbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const { data } = useGetAllVideosQuery();
    const { setFilteredMovies } = useContext(stateContext) || {}; // Ensure context exists
    const location = useLocation();
    const navigate = useNavigate();

    // Ref for the search input to handle outside click detection
    const searchInputRef = useRef(null);

    const isFilterPage = location.pathname.startsWith('/detail') || location.pathname.startsWith('/about') || location.pathname.startsWith('/contact');

    // Handle search input changes
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
       
    };

     // Handle keypress event to trigger search on Enter
     const handleSearchKeyDown = (e) => {
        // Check if Enter (key code 13) is pressed
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if any
            HandleSearch(searchQuery, data, setFilteredMovies,setSearchQuery );
        }
    };

    // Handle search execution
    const handleSearchExecution = () => {
        setIsSearchVisible(true); // Show search input when the icon is clicked
    };

    const goHome = () => {
        navigate(`/home`);
    };


    // Close the search input when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setIsSearchVisible(false); // Close the search input if click is outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Navbar className="w-full bg-[var(--navbar-color)]">
            <Navbar.Brand onClick={goHome}>
                <span className="self-center cursor-pointer kablammo whitespace-nowrap text-xl font-semibold text-[var(--font-color)]">
                    BlueTV
                </span>
            </Navbar.Brand>
            <div
                className={` gap-x-6 flex items-center`}
            >
                {!isFilterPage && (
                    <div className="flex items-center relative ">
                        {isSearchVisible && (
                            <motion.div
                                initial={{ opacity: 0, x: 30 }} // Initial state: hidden and to the right
                                animate={{
                                    opacity: isSearchVisible ? 1 : 0, // Fade in/out
                                    x: isSearchVisible ? 0 : 30, // Slide in/out
                                }}
                                transition={{ duration: isSearchVisible ? 0.5 : 2  , delay: isSearchVisible ? 0 : 2 }} // Smooth animation duration
                                className="absolute right-0"
                                ref={searchInputRef} // Attach the ref to the search input container
                            >
                                <Input
                                    size="md"
                                    className="w-[200px] xl:w-[300px]"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchKeyDown} // Listen for key press
                                    radius="md"
                                    rightSection={<FiSearch className=' text-xl' />}
                                />
                            </motion.div>
                        )}

                        <FiSearch
                            onClick={handleSearchExecution}
                            className={` ${isSearchVisible ? " hidden" : " visible"} cursor-pointer text-[30px] text-white`}
                            aria-label="Search Icon"
                        />
                    </div>
                )}
                <SideBar />
            </div>

        </Navbar>
    );
};

export default HNavbar;