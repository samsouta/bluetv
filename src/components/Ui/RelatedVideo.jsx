import React from 'react';
import LazyLoad from 'react-lazyload';
import { Card, CardFooter } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import TvLoader from './TvLoader';
import { formatDuration } from '../../Utils/FormatDuration';
const RelatedVideo = ({ id, item, isLoading }) => {
    const nav = useNavigate()
    const HomeDetailHandle = () => {
        if (isLoading) return <TvLoader />;
        nav(`/detail/${id}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth', // This enables smooth scrolling
        });
    };
    return (
        <>
            <Card
                onLoad={false}
                isFooterBlurred
                radius="lg"
                className="border-none rounded-none bg-[#6b8784] w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out"
            >
                    <LazyLoad offset={100} style={{ height: '100%', width: '100%' }}>
                        <iframe
                            src={item?.url}
                            className="w-full h-full"
                            title="Video Player"
                            allowFullScreen
                        ></iframe>
                    </LazyLoad>

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
                    className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2"
                ></div>
            </Card>
        </>
    );
}

export default RelatedVideo;
