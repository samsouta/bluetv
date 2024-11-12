import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegClock, FaHeart, FaCopy, FaEye } from "react-icons/fa";
import { IoCalendarNumberOutline, IoLogoFacebook, IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";
import { Button } from '@nextui-org/react';
import { Card } from 'flowbite-react';
import { stateContext } from '../../../context/StateContext';
import { useNavigate } from 'react-router-dom';
import { homeDetail } from '../../../services/Feature/HomeSlice/HomeSlice';
import { formatDistanceToNow, parseISO } from 'date-fns';
import Voting from './Voting';
import { useIncrementViewMutation } from '../../../services/api/ViewCount';
import { formatViews } from '../../formatview/Formatview';



const HomeDetail = () => {
    const data = useSelector((state) => state.home.data);
    const [incrementView] = useIncrementViewMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { movies } = useContext(stateContext);

    const relativeDate = formatDistanceToNow(parseISO(data.posted_date), { addSuffix: true });

    const dispatch = useDispatch();
    const nav = useNavigate();

    // Share video handle    
    const handleShareClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCopy = () => {
        const textToCopy = `Visit our website: http://localhost:5173/`;

        // Check for the Clipboard API for modern browsers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert("Website link copied to clipboard!"))
                .catch((error) => console.error("Failed to copy text: ", error));
        } else {
            // Fallback for older devices and browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            try {
                document.execCommand('copy');
                alert("Website link copied to clipboard!");
            } catch (error) {
                console.error("Fallback: Oops, unable to copy", error);
            }

            document.body.removeChild(textArea);
        }
    };
    const websiteUrl = `http://localhost:5173/`;
    const whatsappShare = `whatsapp://send?text=${encodeURIComponent(websiteUrl)}`;
    const twitterShare = `twitter://post?message=${encodeURIComponent(websiteUrl)}`;
    const facebookShare = `fb://share?u=${encodeURIComponent(websiteUrl)}`;
    /////// ------------------------------

    // Math duration 
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
    // Match view and count 
    const calculateRatingPercentage = (ratingTotal, ratingCount) => {
        if (ratingCount === 0) {
            return "0%"; // No ratings, 0%
        }

        const averageRating = ratingTotal / ratingCount;
        const ratingPercentage = (averageRating / 5) * 100;

        return `${Math.round(ratingPercentage)}%`; // Round to the nearest whole number
    };
    const ratingPercentage = calculateRatingPercentage(data?.rating_total, data?.rating_count);
    // video frame
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    const width = '100%'; // Full width
    // Calculate height based on width and aspect ratio
    const height = `${(aspectRatio * 100).toFixed(2)}vw`; // Using viewport width

    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
    }, []);

    const HomeDetailHandle = (id, data) => {
        dispatch(homeDetail(data));
        // Refresh the current page
        window.location.reload();
        // Delay navigation until after refresh
        setTimeout(() => {
            nav(`/detail/${id}`);
        }, 100); // Adjust the delay as needed
    };

    // Trigger the view count increment when the iframe is loaded or the video starts
    const handleVideoPlay = () => {
        // Call the API to increment view count for the video
        incrementView(data?.id);
    };


    return (
        <div className=" text-gray-100">
            {/* Hero Section */}
            <div >
                <div className='flex xl:justify-between p-2'>
                    <div className="relative w-full pb-[56.25%] md:pb-[45%] lg:pb-[40%] xl:max-w-[900px] xl:pb-[35.25%]"> {/* 16:9 aspect ratio */}
                        <iframe
                            src={data?.url}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="tv"
                            frameBorder="0"
                            className="absolute top-0 left-0 w-full h-full"
                            onLoad={handleVideoPlay}
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>

                    {/* ADS (visible only on xl screens) */}
                    <div className='hidden xl:flex px-4 bg-red-600 h-[500px] w-[35%] justify-center items-center'>
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">ADS</h2>
                    </div>
                </div>



                <div className=" p-1 md:p-8  from-gray-900 ">
                    <p className="text-gray-300 kanit-normal text-lg  mb-5">{data?.title}</p>
                    <div className="container w-full">
                        <div className=" w-full flex justify-between items-center flex-wrap md:mt-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-4">
                                <span className="flex items-center montserrat "><FaHeart className=" text-2xl text-[#FF00FF] mr-2" /> {ratingPercentage}</span>
                                <span className="flex items-center montserrat "><FaEye className=" text-2xl text-gray-400 mr-2" /> {formatViews(data?.view_count)}</span>
                                <span className="flex items-center montserrat "><FaRegClock className=" text-2xl text-gray-400 mr-2" /> {formatDuration(data.duration)}</span>
                                <span className="flex items-center montserrat "><IoCalendarNumberOutline className=" text-2xl text-gray-400 mr-2" /> {relativeDate}</span>
                            </div>
                            <div className=' flex items-center justify-end gap-x-4 h-14'>
                                <Voting />
                                <Button onClick={handleShareClick} color='danger' className=" bg-white/5 montserrat flex items-center">
                                    <FaRegShareSquare className=" text-[#00ac90] w-4 h-4 md:w-5 md:h-5 mr-2" /> Share
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className=' px-4 bg-red-600 h-[400px] flex justify-center items-center' >
                    {/* ads */}
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">ADS</h2>

                </div>
            </div>
            {/* Related Videos */}
            <div className=' mt-10 mb-20' >
                <h2 className="text-xl md:text-2xl montserrat text-[#a7aabd] font-medium mb-4">Related Videos</h2>
                <div className=" flex flex-wrap justify-start w-full">
                    {movies.data?.map((item) => (
                        <div key={item.id} className='w-full md:h-[400px] lg:w-[500px] md:w-[400px] xl:w-[420px] 2xl:w-[510px] relative flex flex-wrap  p-2 md:p-4'>
                            <Card
                                className='bg-[#675680] h-full w-full  overflow-hidden'
                                imgAlt="hello"
                            >
                                <div className=' relative' style={{ width: width, height: height }}>
                                    <iframe
                                        src={item.url}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title="TVBLUE"
                                        frameBorder="0"
                                        width="100%"
                                        height="100%"
                                    ></iframe>
                                    <h5 className="text-xl Montserrat font-semibold absolute bottom-2 left-4 tracking-tight text-white">
                                        {formatDuration(item.duration)}
                                    </h5>
                                </div>
                                <div className='mb-6'>
                                    <p className="w-full px-2 text-xl font-normal kanit-light text-[#a7aabd] line-clamp-2">
                                        {item.title}
                                    </p>
                                </div>
                                <div
                                    onClick={() => HomeDetailHandle(item.id, item)}
                                    className='bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2'
                                ></div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg w-11/12 max-w-md text-black">
                        <h2 className="text-lg font-semibold mb-3">Share this video</h2>
                        <div className="flex flex-wrap justify-between mb-3">
                            <button
                                className="flex items-center gap-2 bg-green-500 p-2 rounded-lg text-white"
                                onClick={() => window.open(whatsappShare, '_blank')}
                            >
                                <IoLogoWhatsapp /> WhatsApp
                            </button>
                            <button
                                className="flex items-center gap-2 bg-blue-500 p-2 rounded-lg text-white"
                                onClick={() => window.open(twitterShare, '_blank')}
                            >
                                <IoLogoTwitter /> Twitter
                            </button>
                            <button
                                className="flex items-center gap-2 bg-blue-600 p-2 rounded-lg text-white"
                                onClick={() => window.open(facebookShare, '_blank')}
                            >
                                <IoLogoFacebook /> Facebook
                            </button>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg w-full justify-center"
                            onClick={handleCopy}
                        >
                            <FaCopy /> Copy Link
                        </button>
                        <button
                            className="mt-3 bg-red-500 p-2 rounded-lg text-white w-full"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className=' px-4 bg-red-600 h-[400px] flex justify-center items-center' >
                <h2 className="text-xl md:text-2xl font-semibold mb-4">ADS</h2>
            </div>
        </div>
    );
};

export default HomeDetail;
