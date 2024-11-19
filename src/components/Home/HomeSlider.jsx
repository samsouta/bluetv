import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const data = [
  { id: 1, title: "Card 1", img: "https://i.pinimg.com/736x/84/82/25/8482257f25cb135fb3cec7267f8caec7.jpg" },
  { id: 2, title: "Card 2", img: "https://i.pinimg.com/736x/cb/8d/50/cb8d5005f0d65cbbceff9e916859fce8.jpg" },
  { id: 3, title: "Card 3", img: "https://i.pinimg.com/736x/dd/3a/6e/dd3a6ea13f65b3079298f778b17952a5.jpg" },
];

const HomeSlider = () => {
  return (
    <div className="mt-3 mx-3">
      <div>
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper overflow-hidden rounded-3xl w-full"
          breakpoints={{
            // For mobile and tablet
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            // For all larger screens, ensure slidesPerView is set to 2
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {data?.map((item) => (
            <SwiperSlide key={item?.id} className="w-full h-full relative ">
              {/* Lazy Load with Skeleton */}
              <LazyLoad
                offset={100}
                placeholder={<Skeleton style={{ height: '100%', width: '100%' }} />}  // Full viewport height for the skeleton
                style={{ height: '100%', width: '100%' }}
              >
                <img className="w-full h-[300px] object-cover" src={item?.img} alt={item?.title} />
              </LazyLoad>

              {/* Title overlaid on the image */}
              <h1 className='absolute bottom-20 left-[20px] text-3xl text-[var(--font-color)] kanit-medium'>
                လူကြီးမင်းတို့ကြော်ညာများကို ဒီနေရာတွေထည့်သွင်းနိုင်ပါသည်
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;
