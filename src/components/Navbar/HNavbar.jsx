import React, { useContext, useState } from 'react';
import { Button, Navbar } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import { Input } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/StateContext';

const HNavbar = () => {
    // State for the search query
    const [searchQuery, setSearchQuery] = useState("");

    const { movies, setFilteredMovies } = useContext(stateContext);

    const location = useLocation()
    const nav = useNavigate()
    // Hide search bar on the detail page
    const isFliterPage = location.pathname.startsWith('/detail') || location.pathname.startsWith('/about') || location.pathname.startsWith('/contact');

    // Handle the search action
    const SearchHandle = () => {
        if (searchQuery.trim() === "") {
            setFilteredMovies(movies?.data); // Show all movies if the search query is empty
            return;
        }

        // Normalize the search query and movie titles (convert to lowercase and trim)
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const filtered = movies?.data.filter(movie => {
            // Normalize movie title (convert to lowercase and trim)
            const normalizedTitle = movie.title.toLowerCase().trim();
            return normalizedTitle.includes(normalizedQuery);
        });

        setFilteredMovies(filtered); // Update the filtered movies state
    };

    // scroll to content-me 
    const scrollToContent = () => {
        nav('/about#contact-me');
        console.log('work');
      }; 

    return (
        <div>
            <Navbar fluid rounded className=' bg-[#e7efff]'>
                <Navbar.Brand href="">
                    <Link to={`/home`}>
                        <span className="self-center kablammo whitespace-nowrap text-xl font-semibold dark:text-white">BlueTV</span>
                    </Link>
                </Navbar.Brand>
                <div className={`${isFliterPage ? " justify-end" : "items-center justify-between"} flex w-[300px]  md:order-2 md:justify-center`}>
                    {!isFliterPage &&
                        <div className='flex items-center relative'>
                            <Input
                                size="md"
                                radius="xl"
                                placeholder="Search by title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update the state as the user types
                            />
                            <FiSearch onClick={SearchHandle} className='absolute right-3 cursor-pointer text-3xl' />
                        </div>

                    }

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link to={`/home`} ><Navbar.Link className='bg-[#fbb0da] text-[#434d6d] montserrat font-normal md:bg-transparent'>
                        Home
                    </Navbar.Link></Link>
                    
                    <Link to={`/about`} >
                        <Navbar.Link className='text-[#434d6d] montserrat font-normal md:bg-transparent' >About</Navbar.Link>
                    </Link>

                    <Navbar.Link onClick={scrollToContent} className='text-[#434d6d] montserrat cursor-pointer font-normal md:bg-transparent'>Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default HNavbar;
