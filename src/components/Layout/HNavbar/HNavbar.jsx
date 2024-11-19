// HNavbar.jsx - Component File
import React, { useContext, useState } from 'react';
import { Navbar } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import { Input } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// utils
import { HandleSearch } from '../../../Utils/searchUtils'; 
import { stateContext } from '../../../context/StateContext';
import { useGetAllVideosQuery } from '../../../services/api/AllVideos';

const HNavbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data } = useGetAllVideosQuery();
    const { setFilteredMovies } = useContext(stateContext);
    const location = useLocation();
    const nav = useNavigate();

    const isFilterPage = location.pathname.startsWith('/detail') || location.pathname.startsWith('/about') || location.pathname.startsWith('/contact');

    const SearchHandle = (e) => {
        const query = e.target.value;
        setSearchQuery(query); 
        HandleSearch(searchQuery, data, setFilteredMovies,setSearchQuery ); // Use the imported function
    };

    const scrollToContent = () => {
        nav('/about#contact-me');
        console.log('work');
    };

    const GoHome = () => {
        nav(`/home`)
        window.location.reload()
    }

    return (
        <Navbar className=' w-full bg-[var(--navbar-color)]'>
                <Navbar.Brand onClick={ GoHome} >
                        <span className="self-center cursor-pointer kablammo whitespace-nowrap text-xl font-semibold text-[var(--font-color)] ">BlueTV</span>
                </Navbar.Brand>
                <div className={`${isFilterPage ? " justify-end" : "items-center justify-end gap-4 sm:gap-x-10"}
                 flex  md:order-2 md:justify-center`
                 }>
                    {!isFilterPage &&
                        <div className='flex items-cente relative'>
                            <Input
                                radius="md"
                                placeholder="Search.."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update the state as the user types
                                className=" w-full"
                                rightSection={
                                    <FiSearch  className=' text-[var(--a-color)]  text-xl' />
                                }
                            />
                            <div onClick={SearchHandle} className='cursor-pointer bg-transparent w-7 h-7 absolute right-1 top-1 ' ></div>
                        </div>

                    }

                    <Navbar.Toggle className=' hover:bg-[var(--a-color)] focus:ring-0 ' />
                </div>
                <Navbar.Collapse>
                    <Link to={`/home`} ><Navbar.Link className='bg-[var(--a-color)] text-[var(--font-color)] head-font md:bg-transparent'>
                        Home
                    </Navbar.Link></Link>
                    
                    <Link to={`/about`} >
                        <Navbar.Link className='text-[var(--font-color)] montserrat head-font md:bg-transparent' >About</Navbar.Link>
                    </Link>

                    <Navbar.Link onClick={scrollToContent} className='text-[var(--font-color)] montserrat cursor-pointer head-font md:bg-transparent'>Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default HNavbar;