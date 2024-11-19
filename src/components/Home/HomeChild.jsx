import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LazyLoad from 'react-lazyload';
import 'react-loading-skeleton/dist/skeleton.css';
import { useGetMovieByIdQuery } from '../../services/api/DetailApi';
import { Card, CardFooter } from "@nextui-org/react";
import ReactPlayer from 'react-player';
import { formatDuration } from '../../Utils/FormatDuration'
import { homeDetail } from '../../services/Feature/HomeSlice/HomeSlice';
import TvLoader from '../Ui/TvLoader';

const HomeChild = ({ data }) => {
    const { id, url, title, duration } = data;
    const { loading } = useGetMovieByIdQuery();
    const [isIframeSupported, setIsIframeSupported] = useState(true);

    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        // Check if the video URL works with iframe
        const testIframe = document.createElement('iframe');
        testIframe.src = url;
        testIframe.onload = () => setIsIframeSupported(true);
        testIframe.onerror = () => setIsIframeSupported(false);
    }, [data]);

    const HomeDetailHandle = (e) => {
        e.preventDefault();
        if (loading) return <TvLoader />;
        dispatch(homeDetail(id));
        nav(`/detail/${id}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
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
                {isIframeSupported ? (
                    <LazyLoad offset={100} style={{ height: '100%', width: '100%' }}>
                        <iframe
                            src={url}
                            className="w-full h-full"
                            title="Video Player"
                            allowFullScreen
                        ></iframe>
                    </LazyLoad>
                ) : (
                    <LazyLoad offset={100} style={{ height: '100%', width: '100%' }}>
                        <ReactPlayer
                            url={url}
                            className="react-player w-full h-full"
                            controls={true}
                            width="100%"
                            height="100%"
                        />
                    </LazyLoad>
                )}

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

                <div
                    onClick={HomeDetailHandle}
                    className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2"
                ></div>
            </Card>

        </>
    );
}

export default HomeChild;