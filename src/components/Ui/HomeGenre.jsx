import React, { useContext, useEffect } from 'react';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { stateContext } from '../../context/StateContext';
import { useGetAllVideosQuery } from '../../services/api/AllVideos';

const HomeGenre = ({ currentData, HomeGernActive, setHomeGernActive ,setHomeTapActive}) => {
    const {
        setFilteredMovies,
        setGenrePage,
        setVideoPage,
        setPhotoPage,
        movies
    } = useContext(stateContext);
    const { data } = useGetAllVideosQuery();

    
    useEffect(() => {
        localStorage.setItem('HomeGernActive', HomeGernActive);
        setVideoPage(true);
        setPhotoPage(false);
        setHomeTapActive('Video')
        setGenrePage(HomeGernActive)

        if (HomeGernActive === "All") {
            // Show all movies if "All" is selected
            setFilteredMovies(movies?.data);
        } else {
            // Filter movies by selected genre
            const filtered = data?.filter((movie) => movie.genre === HomeGernActive);
            setFilteredMovies(filtered);
        }
    }, [HomeGernActive, data,setFilteredMovies, setPhotoPage, setVideoPage]);

    return (
        <Breadcrumbs
            size="lg"
            onAction={(key) => setHomeGernActive(key)}
            classNames={{
                list: "gap-2",
            }}
            itemClasses={{
                item: [
                    "px-2 py-0.5 border-small text-[#ffffff] border-default-500 rounded-small",
                    "data-[current=true]:border-[#007c8e] data-[current=true]:bg-[#2b4242] data-[current=true]:text-[#007c8e] transition-colors",
                ],
                separator: "hidden",
            }}
        >
            {/* Add a custom "All" button */}
            <BreadcrumbItem key="All" isCurrent={HomeGernActive === "All"}>
                All
            </BreadcrumbItem>

            {/* Render genre buttons */}
            {currentData?.genres.map((genre) => (
                <BreadcrumbItem key={genre} isCurrent={HomeGernActive === genre}>
                    {genre}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
};

export default HomeGenre;
