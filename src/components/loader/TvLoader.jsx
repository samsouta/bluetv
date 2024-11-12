import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const TvLoader = () => {
    return (
        <>
            <div className='flex justify-center items-center fixed inset-0 z-10 bg-opacity-50 bg-gray-800'>
                <div className='flex justify-center items-center'>
                    
                    <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        strokeColor="#e7efff"
                        strokeWidth="4"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
    );
}

export default TvLoader;
