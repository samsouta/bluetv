import React, { useContext, useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { stateContext } from '../../../context/StateContext';

const Hpath_2 = () => {
    const [activeId, setActiveId] = useState(() => localStorage.getItem('activeId') || 'video');
    const { movies, setFilteredMovies, setVideoPage, setPhotoPage } = useContext(stateContext);

    const uniqueGenres = new Set();

    useEffect(() => {
        localStorage.setItem('activeId', 'video');
        const storedId = localStorage.getItem('activeId') || 'video';
        setActiveId(storedId);
        setFilteredMovies(movies?.data); // Filter video movies
        // Update state based on the active category
        if (storedId === 'video') {
            setVideoPage(true);
            setPhotoPage(false);
        } else if (storedId === 'photo') {
            setPhotoPage(true);
            setVideoPage(false);
        } 
    }, [setVideoPage, setPhotoPage, setFilteredMovies, movies]);

    // Set the active category and save it to localStorage
    const handleGenre = (id, genre) => {
        console.log(genre);
        setActiveId(id);
        localStorage.setItem('activeId', id);
        setVideoPage(true)
        setPhotoPage(false);
        // const storedId = localStorage.getItem('activeId') || 'video';
        const filterGen = movies.data?.filter((movie) => movie.genre === genre)
        setFilteredMovies(filterGen); // Filter by genre
    };

    // Handlers for category buttons
    const handleVideo = () => {
        handleGenre('video');
        setPhotoPage(false);
        setVideoPage(true);
        setFilteredMovies(movies?.data); // Filter video movies
    };

    const handlePhoto = () => {
        handleGenre('photo');
        setVideoPage(false);
        setPhotoPage(true);
        setFilteredMovies(movies?.data.filter((movie) => movie.type === 'photo')); // Filter photo movies
    };

    return (
        <div className="mt-3 grid gap-y-4">
            <div>
                <h1 className="text-2xl text-[#a7aabd] montserrat font-medium ps-3">Categories</h1>
            </div>
            <div className="flex justify-around">
                <Button
                    onClick={handleVideo}
                    className={`montserrat font-semibold ${activeId === 'video' ? "bg-[#675680] border-b-4 border-b-[#c891bf]" : "bg-[#675680]"}`}
                >
                    <span className=' text-[#fbb0da]' >Video</span>
                </Button>
                <Button
                    onClick={handlePhoto}
                    className={`montserrat font-semibold ${activeId === 'photo' ? "bg-[#675680] border-b-4 border-b-[#c891bf]" : "bg-[#675680]"}`}
                >
                    <span className=' text-[#fbb0da]' >Photo</span>
                </Button>
                <>
                    {movies?.data?.map((item) => {
                        if (!uniqueGenres.has(item?.genre)) {
                            uniqueGenres.add(item?.genre);
                            return (
                                <Button
                                    onClick={() => handleGenre(item?.id, item?.genre)} // Pass both id and genre
                                    key={item?.id}
                                    className={`montserrat font-semibold ${activeId === item?.id ? "bg-[#675680] border-b-4 border-b-[#c891bf]" : "bg-[#675680]"}`}
                                >
                                    <span className=' text-[#fbb0da]' >{item?.genre}</span>
                                </Button>
                            );
                        }
                        return null;
                    })}
                </>
            </div>
        </div>
    );
};

export default Hpath_2;