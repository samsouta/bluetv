import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LazyLoad from 'react-lazyload';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardFooter } from "@nextui-org/react";
import { formatDuration } from '../../Utils/FormatDuration';
import { homeDetail } from '../../services/Feature/HomeSlice/HomeSlice';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import TVSkeleton from '../Ui/TVSkeleton';

const HomeChild = ({ data, loading }) => {
    const { id, url, title, duration } = data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle navigation to detail page
    const handleDetailNavigation = useCallback((e) => {
        e.preventDefault();
        // Dispatch Redux action
        dispatch(homeDetail(id));
        navigate(`/video/${id}`);
    });

    return (
        <>
            {
                loading ? (
                    <TVSkeleton />
                ) : (
                    <LazyLoad height={100} offset={100} once>
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className={`border-none rounded-lg bg-transparent w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out`}
                        >
                            <iframe
                                src={`${url}?autoplay=0`}
                                className="w-full h-full"
                                title={title}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                aria-label="Video Player"
                            ></iframe>

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
                    </LazyLoad>
                )
            }
        </>

    );
};

HomeChild.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired
};
export default React.memo(HomeChild);