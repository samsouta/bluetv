import React, { useContext, useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { stateContext } from '../../context/StateContext';
import {useGetAllgenreQuery} from '../../services/api/GetAllGenre'
import {useGetAllVideosQuery} from '../../services/api/AllVideos'
const HomeCatagory = () => {
    const [activeId, setActiveId] = useState(() => localStorage.getItem('activeId') || 'video');
    const { movies, setFilteredMovies,setGenrePage,setVideoPage,setPhotoPage } = useContext(stateContext);
    const { currentData } = useGetAllgenreQuery();  
    const {data} = useGetAllVideosQuery();

    useEffect(() => {
        localStorage.setItem('activeId', 'video');
        const storedId = localStorage.getItem('activeId') || 'video';
        setActiveId(storedId);
        setFilteredMovies(movies?.data);
        
        // Update state based on active category
        if (storedId === 'video') {
            setVideoPage(true);
            setPhotoPage(false);
        } else if (storedId === 'photo') {
            setPhotoPage(true);
            setVideoPage(false);
        }
    }, [movies, setFilteredMovies, setVideoPage, setPhotoPage]);

    const handleGenre = (genre) => {
        setGenrePage(true)
        setActiveId(genre);
        localStorage.setItem('activeId', genre);
        setVideoPage(true);
        setPhotoPage(false);
        
        const filtered =data?.filter((movie) => movie.genre === genre);
        setFilteredMovies(filtered); // Filter by genre
    };
    const handleVideo = () => {
        window.location.reload();
        handleGenre('video');
        setGenrePage(false)
        setFilteredMovies(movies?.data); // Show all video movies
        setVideoPage(true);
        setPhotoPage(false);
    };

    const handlePhoto = () => {
        handleGenre('photo');
        setFilteredMovies(movies?.data.filter((movie) => movie.type === 'photo'));
        setVideoPage(false);
        setPhotoPage(true);
    };

    return (
        <div className="mt-3 grid gap-y-4">
            <div>
                <h1 className="text-2xl text-[var(--font-color)] custom-header ps-3">Categories</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-start gap-4 w-full">
                <div className="flex gap-4 w-full lg:w-auto">
                    <Button onClick={handleVideo} className={`montserrat font-semibold ${activeId === 'video' ? "bg-[var(--b-color)] border-b-4 border-b-[var(--navbar-color)]" : "bg-[var(--b-color)]"}`}>
                        <span className="text-[var(--font-color)]">Video</span>
                    </Button>
                    <Button onClick={handlePhoto} className={`montserrat font-semibold ${activeId === 'photo' ? "bg-[var(--b-color)] border-b-4 border-b-[var(--navbar-color)]" : "bg-[var(--b-color)]"}`}>
                        <span className="text-[var(--font-color)]">Photo</span>
                    </Button>
                </div>
                <div className="flex flex-wrap gap-4 lg:gap-4 w-full lg:w-auto">
                    {currentData?.genres.map((genre, index) => (
                        <div key={index} className="w-auto">
                            <Button onClick={() => handleGenre(genre)} className={`montserrat font-semibold ${activeId === genre ? "bg-[var(--b-color)] border-b-4" : "bg-[var(--b-color)]"}`}>
                                <span className="text-[var(--font-color)]">{genre}</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeCatagory;
