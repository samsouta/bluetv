import React, { useContext, useState, useEffect, useRef } from 'react';
import { Pagination } from "@nextui-org/react";
import { stateContext } from '../../context/StateContext';
import NoMovieFound from '../Ui/NoMoviesFound';
import HomeImagePage from './HomeImagePage';
import HomeChild from './HomeChild';
import TvLoader from '../Ui/TvLoader';

const HomeVideoList = () => {
    const [isShow, setIsShow] = useState(true);
    const { filteredMovies, totalItems, currentPage, genrePage, setCurrentPage, loading, videoPage, photoPage } = useContext(stateContext);

    const prevPage = useRef(currentPage); // Track previous page

    useEffect(() => {
        if (filteredMovies?.length === 0) {
            setIsShow(false);
        } else {
            setIsShow(true);
        }
    }, [filteredMovies]);

    useEffect(() => {
        // Only scroll to top if the page has changed
        if (prevPage.current !== currentPage) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
            prevPage.current = currentPage; // Update the previous page to current
        }
    }, [currentPage]);

    if (loading) {
        return <TvLoader />;
    }

    return (
        <div className="mt-5 mx-auto">
            {videoPage && (
                <div className=" flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                    {filteredMovies?.length > 0 ? (
                        filteredMovies.map((item) => (
                            <HomeChild key={item?.id} data={item} />
                        ))
                    ) : (
                        <NoMovieFound/>
                    )}
                </div>
            )}
            {/* // video pangination */}
            {
                !genrePage &&
                <div className={`${isShow ? "visible" : "hidden"}  mt-6 flex justify-center w-full`}>
                    <Pagination
                        classNames={{
                            wrapper: "gap-0  overflow-visible h-8 rounded border-[#c3c6c3] border-1",
                            item: "w-8 h-8 text-small text-white rounded-none bg-transparent",
                            cursor:
                                "bg-gradient-to-b shadow-lg from-[#c3c6c3] to-[#7d8f8b] text-white font-bold",
                        }}
                        total={totalItems}
                        initialPage={1}
                        page={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            }

            {photoPage && <HomeImagePage/>}
        </div>
    );
};

export default HomeVideoList;
