import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LazyLoad from 'react-lazyload';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardFooter } from "@nextui-org/react";
import { formatDuration } from '../../Utils/FormatDuration';
import { homeDetail } from '../../services/Feature/HomeSlice/HomeSlice';

const HomeChild = ({ data }) => {
    const { id, url, title, duration } = data;

    // Use API Query

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle navigation to detail page
    const handleDetailNavigation = (e) => {
        e.preventDefault();
        // Dispatch Redux action
        dispatch(homeDetail(id));
        navigate(`/detail/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className={`border-none rounded-lg bg-transparent w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out`}
        >
            
            <LazyLoad offset={100} style={{ height: '100%', width: '100%' }}>
                    <iframe
                        src={`${url}?autoplay=0`}
                        className="w-full h-full"
                        title={title}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        aria-label="Video Player"
                    ></iframe>
            </LazyLoad>

            {/* Footer Section */}
            <CardFooter className="before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                <div className="w-full h-full">
                    <h5 className="text-[1rem] custom-header text-[#ffffff]">
                        {formatDuration(duration)}
                    </h5>
                    <div>
                        <p className="w-full text-sm p-text text-white line-clamp-2">
                            {title}
                        </p>
                    </div>
                </div>
            </CardFooter>

            {/* Invisible Overlay for Navigation */}
            <div
                onClick={handleDetailNavigation}
                className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
                aria-label={`Go to detail page for ${title}`}
            ></div>
        </Card>
    );
};

export default HomeChild;