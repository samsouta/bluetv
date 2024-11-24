import { Pagination } from '@nextui-org/react'
import React, { useContext } from 'react'
import { stateContext } from '../../context/StateContext';

const Pangination = () => {
    const { filteredMovies, totalItems,
        currentPage, genrePage,
        setCurrentPage, loading,
        videoPage,
        sideBarTap
    } = useContext(stateContext);
  return (
    <>
        {/* // Pagination */}
        <div className={`
             ${videoPage ? " visible" : " hidden"}
             ${filteredMovies?.length === 0 ? " hidden" : " visible"} 
             ${genrePage === "All" ? " visible" : " hidden"} 
             ${sideBarTap ? " hidden" : " visible"} 
             ${loading ? " hidden" : " visible"} 
                
             my-10 flex justify-center w-full`
            }>
                <Pagination
                    showControls
                    variant="bordered"
                    total={totalItems}
                    initialPage={1}
                    page={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    classNames={{
                        cursor: 'text-[#ffffff]  bg-[#007c8e]',
                        item: " text-[#6b8784] border-[#6b8784]",
                    }}
                />
            </div>
    </>
  )
}

export default Pangination