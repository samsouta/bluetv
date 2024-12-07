import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../services/api/DetailApi';
import { useIncrementViewMutation } from '../../services/api/ViewCount';
import TvLoader from '../Ui/TvLoader';
import LazyLoad from 'react-lazyload';
import ShareModel from '../Ui/ShareModel';
import { calculateRatingPercentage } from '../../Utils/CalculateRatingPercentage';
import RelatedVideo from '../Ui/RelatedVideo';
import formatRelativeDate from '../../Utils/formatRelativeDate';
import CommentUI from '../Ui/CommentBtn/CommentUI';

const HomeDetail = () => {
    const { id: movieId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, error } = useGetMovieByIdQuery(movieId);
    const [incrementView] = useIncrementViewMutation();
    const postedDate = data?.movie?.posted_date;

    // Handle error and loading
    if (isLoading) {
        return <TvLoader />;
    }

    if (error || !data) {
        return <div className=' text-red-600' >Error fetching movie data</div>;
    }

    // Calculate relative date and rating percentage
    const relativeDate = formatRelativeDate(postedDate);
    const ratingPercentage = calculateRatingPercentage(data?.movie.rating_total, data?.movie.rating_count);

    const handleShareClick = () => {
        setIsModalOpen(true);
    };

    const handleVideoPlayed = (videoId) => {
        incrementView(videoId);
    };

    return (
        <div className="text-gray-100">
            {/* Hero Section */}
            <div>
                <div className='flex xl:justify-between'>
                    <div className=" w-full p-2">
                        <LazyLoad height={100} offset={100} once>
                            <div className='relative shadow-sm rounded-xl overflow-hidden w-full h-[250px] md:h-[500px] lg:h-[400px] xl:w-[900px] xl:h-[600px]'>
                                <iframe
                                    src={data?.movie.url}
                                    width="100%"
                                    height="100%"
                                    title="Video Player"
                                    allowFullScreen
                                    onLoad={data?.movie.id ? () => handleVideoPlayed(data?.movie.id) : undefined}
                                ></iframe>
                                <div className='cursor-not-allowed absolute bottom-0 z-50 right-14 rounded-md bg-transparent w-8 h-8'></div>
                            </div>
                        </LazyLoad>
                    </div>
                </div>

                <CommentUI movieId={movieId} ratingPercentage={ratingPercentage} relativeDate={relativeDate} handleShareClick={handleShareClick} mdata={data} />
            </div>

            {/* Related Videos */}
            <div className='mt-10 mx-auto mb-20'>
                <h2 className="text-xl md:text-2xl head-font text-white mb-4">Related Videos</h2>
                <div className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                    {data?.relatedMovies.map((item) => (
                        <RelatedVideo key={item.id} isLoading={isLoading} item={item} id={item.id} />
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

export default React.memo(HomeDetail);
