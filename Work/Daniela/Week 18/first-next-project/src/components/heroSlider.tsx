import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


export default function HeroSlider() {
    return (
        <div className="w-full max-w-[600px] mx-auto h-[600px] justify-center items-center pt-5">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-128"
            >
                <SwiperSlide>
                    <div className="h-110 w-auto bg-contain bg-center flex items-center justify-center"
                    style={{backgroundImage: `url(${})`}}></div>
                </SwiperSlide>
                
                <SwiperSlide>
                    <div className="h-120 w-auto bg-contain bg-center flex items-center justify-center"
                    style={{backgroundImage: `url(${})`}}></div>
                </SwiperSlide>

                  <SwiperSlide>
                    <div className="h-120 w-auto bg-contain bg-center flex items-center justify-center"
                    style={{backgroundImage: `url(${})`}}></div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}