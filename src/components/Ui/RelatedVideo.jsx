import React, { memo } from 'react';
import LazyLoad from 'react-lazyload';
import { Card, CardFooter } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../Utils/FormatDuration';
import TvLoader from './TvLoader';

const RelatedVideo = ({ isLoading, id, item }) => {
    const nav = useNavigate();

    const HomeDetailHandle = () => {
        nav(`/video/${id}`);
        window.location.reload()
    };

    if (isLoading) {
        return <TvLoader />;
    }

    return (
        <div className='px-2'>
            <LazyLoad height={100} offset={100} once>
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none rounded-lg bg-[#6b8784] w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out"
                >
                    <iframe
                        src={`${item?.url}?autoplay=0`}
                        className="w-full h-full"
                        title="Video Player"
                        allowFullScreen
                    ></iframe>

                    <CardFooter className="before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                        <div className="w-full h-full">
                            <h5 className="text-[1rem] custom-header text-[#ffffff]">
                                {formatDuration(item?.duration)}
                            </h5>
                            <div>
                                <p className="w-full text-sm p-text text-white line-clamp-2">
                                    {item?.title}
                                </p>
                            </div>
                        </div>
                    </CardFooter>

                    <div
                        onClick={HomeDetailHandle}
                        className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        aria-label={`Go to detail page for ${item?.title}`}
                    ></div>
                </Card>
            </LazyLoad>
        </div>
    );
};

// Wrap the component with memo to memoize the component
export default memo(RelatedVideo);