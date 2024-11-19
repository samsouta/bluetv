import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../services/api/DetailApi';
import { useIncrementViewMutation } from '../../services/api/ViewCount';
import TvLoader from '../Ui/TvLoader';
import LazyLoad from 'react-lazyload';
import { Button } from '@nextui-org/react';
import { FaEye, FaHeart, FaRegClock, FaRegShareSquare } from 'react-icons/fa';
import ShareModel from '../Ui/ShareModel';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { formatViews } from '../../Utils/Formatview';
import Voting from '../Ui/Voting';
import { formatDuration } from '../../Utils/FormatDuration';
import { calculateRatingPercentage } from '../../Utils/CalculateRatingPercentage';
import RelatedVideo from '../Ui/RelatedVideo';
import { formatDistanceToNow, parseISO } from 'date-fns';

const HomeDetail = () => {
    const { id: movieId } = useParams();
    const [relativeDate, setRelativeDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, error, isLoading } = useGetMovieByIdQuery(movieId);
    const [incrementView] = useIncrementViewMutation();
    const postedDate = data?.movie.posted_date;

    // posted date calculation
    useEffect(() => {
        if (postedDate) {
            const dateString = `${postedDate}T00:00:00`; // Ensure it's in a valid ISO format
            const parsedDate = parseISO(dateString);
            const diffInDays = Math.floor((new Date() - parsedDate) / (1000 * 60 * 60 * 24)); // Difference in days

            if (diffInDays >= 7 && diffInDays < 14) {
                setRelativeDate("1 week ago");
            } else if (diffInDays >= 14 && diffInDays < 21) {
                setRelativeDate("2 weeks ago");
            } else if (diffInDays >= 21 && diffInDays < 28) {
                setRelativeDate("3 weeks ago");
            } else if (diffInDays >= 28) {
                const weeksAgo = Math.floor(diffInDays / 7);
                setRelativeDate(`${weeksAgo} weeks ago`);
            } else {
                const relative = formatDistanceToNow(parsedDate, { addSuffix: true });
                setRelativeDate(relative);
            }
        } else {
            setRelativeDate("Date not available");
        }
    }, [postedDate]);

    const ratingPercentage = calculateRatingPercentage(data?.movie.rating_total, data?.movie.rating_count);

    // Calculate height based on width and aspect ratio
    // video frame
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    const width = '100%'; // Full width
    const height = `${(aspectRatio * 100).toFixed(2)}vw`; // Using viewport width

    const handleShareClick = () => {
        setIsModalOpen(true);
    };

  

    const handleVideoPlayed = (videoId) => {
        // Trigger incrementView mutation when the video plays
        incrementView(videoId);
    };

    ///// loading 
    if (isLoading) return <TvLoader />;
    if (error) return <p>An error occurred: {error.message}</p>;
    return (
        <div className=" text-gray-100">
            {/* Hero Section */}
            <div >
                <div className='flex xl:justify-between'>
                    <div className="relative w-full xl:w-[1000px] ">
                        <LazyLoad
                            offset={100}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <div style={{ width: width, height: height }} >
                                <iframe
                                    src={data?.movie.url}
                                    width="100%"
                                    height="100%"
                                    title="Video Player"
                                    allowFullScreen
                                    onLoad={() => handleVideoPlayed(data?.movie.id)} 
                                ></iframe>
                            </div>
                        </LazyLoad>
                        <div className=' cursor-not-allowed absolute bottom-0 z-50 right-14 bg-transparent w-28 h-8' ></div>
                    </div>
                </div>
                <div className=" p-1 md:p-8  xl:max-w-[66%]  from-gray-900 ">
                    <p className="text-white p-text text-lg  mb-5">{data?.movie.title}</p>
                    <div className="container w-full">
                        <div className=" w-full flex justify-between items-center flex-wrap md:mt-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-4">
                                <span className="flex items-center montserrat "><FaHeart className=" text-2xl text-[#7d8f8b] mr-2" /> {ratingPercentage}</span>
                                <span className="flex items-center montserrat "><FaEye className=" text-2xl text-[#6b8784] mr-2" /> {formatViews(data?.movie.view_count)}</span>
                                <span className="flex items-center montserrat "><FaRegClock className=" text-2xl text-[#6b8784] mr-2" /> {formatDuration(data?.movie.duration)}</span>
                                <span className="flex items-center montserrat "><IoCalendarNumberOutline className=" text-2xl text-[#6b8784] mr-2" /> {relativeDate}</span>
                            </div>
                            <div className=' flex items-center justify-end gap-x-4 h-14'>
                                <Voting />
                                <Button onClick={handleShareClick} color='danger' className=" bg-white/5 montserrat flex items-center">
                                    <FaRegShareSquare className=" text-white w-4 h-4 md:w-5 md:h-5 mr-2" /> Share
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* Related Videos */}
            <div className=' mt-10 mx-auto mb-20' >
                <h2 className="text-xl md:text-2xl head-font  text-white mb-4">Related Videos</h2>
                <div className=" flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                    {data?.relatedMovies.map((item) => (
                        <RelatedVideo key={item.id} item={item}
                            id={item.id}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            </div>

            {/* Share Modal */}
            {isModalOpen && (
                <ShareModel setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};

export default HomeDetail;

