import React, { useContext, useEffect, useRef } from 'react';
import { stateContext } from '../../context/StateContext';
import NoMovieFound from '../Ui/NoMoviesFound';
import HomeImagePage from './HomeImagePage';
import HomeChild from './HomeChild';
import TvLoader from '../Ui/TvLoader';
import Pangination from '../Ui/Pangination';
import LazyLoad from 'react-lazyload';

const HomeVideoList = () => {
    const { filteredMovies,
        currentPage,
        setCurrentPage, loading,
        videoPage, photoPage,
    } = useContext(stateContext);


    const prevPage = useRef(currentPage); // Track previous page

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
    }, [currentPage, setCurrentPage]);

    if (loading) {
        return <LazyLoad offset={100} style={{ height: '100%', width: '100%' }} ><TvLoader /></LazyLoad>
    }

    return (
        <div className="mt-5 mx-auto">
           
            {videoPage && (
                <div className=" px-2 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                    {filteredMovies?.length > 0 ? (
                        filteredMovies?.map((item) => (
                            <HomeChild key={item?.id} data={item} loading={loading} />
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            )}


            {photoPage && <HomeImagePage />}


            {/* //// NO MOVIES FOUND  */}

            {filteredMovies?.length === 0 && !loading && <NoMovieFound />}

            {/* // Pagination */}
            <Pangination/>
        </div>
    );
};

export default HomeVideoList;
