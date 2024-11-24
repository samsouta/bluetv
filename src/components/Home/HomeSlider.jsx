import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { motion, AnimatePresence } from 'framer-motion'


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
    {
        id: 1,
        title: 'Grow Your Business With Us!',
        description: 'Reach your target audience directly on BLUETV. With our high-traffic pages and engaged community, your ad can be front and center where it matters most.',
        image: 'https://i.pinimg.com/736x/84/82/25/8482257f25cb135fb3cec7267f8caec7.jpg',
    },
    {
        id: 2,
        title: 'သင့်ကြော်ငြာကို ဒီနေရာမှာ ထည့်သွင်းပြီး လူထုထိတွေ့မှုကို တိုးမြှင့်ပါ!',
        description: 'ကြော်ငြာနဲ့ ပတ်သက်ပြီး အသေးစိတ် သိရှိလိုပါက [Menu icon] ကို နှိပ်ပြီး contactကို နှိပ်ခြင်းဖြင့်ဆက်သွယ်နိုင်ပါသည်',
        image: 'https://i.pinimg.com/736x/cb/8d/50/cb8d5005f0d65cbbceff9e916859fce8.jpg',
    },
    {
        id: 3,
        title: 'Iklan Anda Layak Dapatkan Perhatian!',
        description: 'Ruang iklan terbaik untuk mencapai pelanggan anda secara langsung. Tempah slot sekarang untuk memperkenalkan jenama anda kepada komuniti kami!',
        image: 'https://i.pinimg.com/736x/dd/3a/6e/dd3a6ea13f65b3079298f778b17952a5.jpg',
    },
]

const HomeSlider = () => {
    return (
        <div className=" mt-3 px-2 ">
            <Swiper
                modules={[EffectFade, Navigation,Autoplay, Pagination]}
                effect="fade"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full max-w-4xl"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {({ isActive }) => (
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="absolute inset-0 w-full h-full object-bottom object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-8">
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="sm:text-4xl text-xl font-bold text-white mb-2 glow"
                                            >
                                                {slide.title}
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                className="sm:text-xl text-sm text-gray-200"
                                            >
                                                {slide.description}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </SwiperSlide>
                ))}
               
            </Swiper>
        </div>

    )
}

export default HomeSlider;