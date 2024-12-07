import React, { memo, useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Card, CardBody, Chip } from "@nextui-org/react";
import { Clapperboard, ImageDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { stateContext } from '../../context/StateContext';
import { HomeVideoList } from '../Home';
import { useNavigate } from 'react-router-dom';
import { useGetAllVideosQuery } from '../../services/api/AllVideos';
const HomeTap = ({ homeMenu, HomeTapActive, setHomeTapActive }) => {
    const { setFilteredMovies, movies, setVideoPage, setPhotoPage } = useContext(stateContext);
    const [todayVideosCount, setTodayVideosCount] = useState(0);
    const { data } = useGetAllVideosQuery();
    // console.log(todayVideosCount)
    const nav = useNavigate();

    useEffect(() => {
        localStorage.setItem('HomeTapActive', HomeTapActive);
        setFilteredMovies(movies?.data);
        if (HomeTapActive === 'Video') {
            setVideoPage(true);
            setPhotoPage(false);
        } else if (HomeTapActive === 'Photo') {
            setPhotoPage(true);
            setVideoPage(false);
        }


        // Filter videos uploaded today
        if (data) {
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

            const uploadedToday = movies.data.filter(movie => {
                const movieDate = new Date(movie.posted_date).toISOString().split('T')[0]; // Assuming `uploadedAt` is the timestamp of when video was uploaded
                return movieDate === today;
            });

            setTodayVideosCount(uploadedToday.length);
        } else {
            setTodayVideosCount(0); // If no movies or data, set count to 0
        }

    }, [HomeTapActive,movies, setFilteredMovies, setVideoPage, setPhotoPage])


    return (
        <div className="flex w-full flex-col">
            <Tabs size="md" aria-label="Options"
                selectedKey={HomeTapActive}
                onSelectionChange={setHomeTapActive}

                items={homeMenu}
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#007c8e]"
                }}

            >
                {(item) => (
                    <Tab
                        key={item.path}
                        title={
                            <div className="flex items-center space-x-2">
                                {item?.icon}
                                <span>{item?.path}</span>
                                {item.path === "Video" && todayVideosCount > 0 && (
                                    <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: [-5, 0, -5] }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <Chip
                                            size="sm"
                                            className="border-0 text-[#c3c6c3] bg-transparent"
                                            variant="faded"
                                        >
                                            {todayVideosCount}
                                        </Chip>
                                    </motion.div>
                                )}

                            </div>
                        }
                    >
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default memo(HomeTap);
