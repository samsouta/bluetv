import React, { useRef } from 'react';
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { homeDetail } from '../../../services/Feature/HomeSlice/HomeSlice';

const HChild_3 = ({ data }) => {
    const { id, url, title, duration } = data;
    const aspectRatio = 9 / 16;
    const width = '100%';
    const height = `${(aspectRatio * 100).toFixed(2)}vw`;

    const dispatch = useDispatch();
    const nav = useNavigate();

    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            // Return format "HH:MM:SS"
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        } else {
            // Return format "MM:SS"
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }

    const HomeDetailHandle = (e) => {
        e.preventDefault();
        dispatch(homeDetail(data));
        nav(`/detail/${id}`);
    }

    return (
        <>
            <Card
                className='bg-[#675680]  p-2 md:p-4 h-full w-full overflow-hidden '
                imgAlt="hello"
            >
                <div className=' relative' style={{ width: width, height: height }}>
                    <iframe
                        src={url}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="TVBLUE"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    ></iframe>
                    <h5 className="text-xl Montserrat font-semibold absolute bottom-2 left-4 tracking-tight text-white">
                        {formatDuration(duration)}
                    </h5>
                </div>


                <div className='mb-6'>
                    <p className="w-full px-2 text-xl font-normal kanit-light text-[#a7aabd] line-clamp-2">
                        {title}
                    </p>
                </div>
                <div
                    onClick={HomeDetailHandle}
                    className='bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2'
                ></div>
            </Card>
        </>
    );
}

export default HChild_3;
