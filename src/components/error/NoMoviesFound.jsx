import React from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const NoMovieFound = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // Navigate back to the home page or another page of your choice
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white px-4 sm:px-10 md:px-20">
            {/* Main Content Section */}
            <div className="text-center py-16">
                <h1 className="text-4xl sm:text-5xl montserrat font-semibold text-[#fbb0da]">Oops! No Movie Found</h1>
                <p className="mt-4 text-lg kanit-regular sm:text-xl text-[#e7efff]">
                    We couldn't find any movies matching your search. Try exploring other options.
                </p>
            </div>

            {/* Image or Illustration */}
            <div className="flex justify-center mt-8">
                <img
                    src="https://i.pinimg.com/564x/28/ce/a0/28cea02753d52d0bac38aa3cdbb7d7eb.jpg"
                    alt="No Movies Found"
                    className="w-[300px] h-[300px] rounded-lg shadow-xl object-cover"
                />
            </div>


            {/* Back Button */}
            <div className="mt-8">
                <Button
                    auto
                    color="gradient"
                    onClick={handleBack}
                    className="font-semibold text-[#004d6f] bg-[#fbb0da] hover:bg-[#e7efff] transition-all duration-300"
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NoMovieFound;