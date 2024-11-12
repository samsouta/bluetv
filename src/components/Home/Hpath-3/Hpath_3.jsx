import React, { useContext, useState, useEffect } from 'react';
import HChild_3 from './HChild_3';
import { stateContext } from '../../../context/StateContext';
import { Pagination } from "@nextui-org/react";
import HChildImage_3 from './HChildImage_3';
import NoMovieFound from '../../error/NoMoviesFound';
import TvLoader from '../../loader/TvLoader';

const Hpath_3 = () => {
    const [isShow, setIsShow] = useState(true);
    const { filteredMovies, totalItems, currentPage, setCurrentPage, loading, videoPage, photoPage } = useContext(stateContext);
    useEffect(() => {
        // Ensure isShow state is updated whenever filteredMovies changes
        if (filteredMovies?.length === 0) {
            setIsShow(false);
        } else {
            setIsShow(true); // Reset isShow to true if there are movies
        }
    }, [filteredMovies]); // This useEffect will run whenever filteredMovies is updated

    if (loading) return (
        <TvLoader/>
    ); // Display loading text while fetching

    return (
        <div className='mt-5'>
            {videoPage && (
                <div className='flex flex-wrap'>
                    {filteredMovies?.length > 0 ? (
                        filteredMovies.map((item) => (
                            <div key={item?.id} className='w-full md:h-[400px] lg:w-[500px] md:w-[400px] xl:w-[420px] 2xl:w-[510px] relative flex flex-wrap p-2 md:p-4'>
                                <HChild_3 data={item} />
                            </div>
                        ))
                    ) : (
                        <div className='w-full'>
                            <NoMovieFound />
                        </div>
                    )}
                </div>
            )}

            {/* Centered Pagination */}
            <div className={`${isShow ? " visible" : " hidden"}  mt-6 flex justify-center w-full`}>
                <Pagination
                    color={"danger"}
                    total={totalItems} // Total number of pages
                    initialPage={1}
                    page={currentPage} // Current page
                    onChange={(page) => setCurrentPage(page)} // Update the current page
                />
            </div>

            {photoPage && <HChildImage_3 />}
        </div>
    );
};

export default Hpath_3;
