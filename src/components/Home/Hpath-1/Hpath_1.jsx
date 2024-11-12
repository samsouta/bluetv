import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../index.css'
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const data = [
  { id: 1, title: "Card 1", img: "https://cdn.pixabay.com/photo/2023/03/14/15/55/baby-7852589_1280.jpg" },
  { id: 2, title: "Card 2", img: "https://cdn.pixabay.com/photo/2023/03/14/15/55/baby-7852589_1280.jpg" },
  { id: 3, title: "Card 3", img: "https://cdn.pixabay.com/photo/2023/03/14/15/55/baby-7852589_1280.jpg" },
]

const Hpath_1 = () => {
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
            // when window width is <= 480px
            480: {
              slidesPerView: 1,  // Show 1 slide per view on small screens
              spaceBetween: 10,   // Add space between slides
            },
            // when window width is <= 768px
            768: {
              slidesPerView: 1.5,  // Show 1.5 slides per view on tablets
              spaceBetween: 20,    // Add space between slides
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 2,  // Show 2 slides per view on desktop
              spaceBetween: 30,  // Add space between slides
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 3,  // Show 3 slides per view on large desktop screens
              spaceBetween: 40,  // Add space between slides
            },
          }}
        >
          {data?.map((item) => (
            <SwiperSlide key={item?.id} className="w-full h-full">
              <img className="w-full h-auto" src={item?.img} alt={item?.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Hpath_1;
