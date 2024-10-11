import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className='max-h-screen !h-[58vh]'>
      <div className='relative overflow-hidden max-h-screen !h-[58vh] mb-[-15.5%]'>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <>
              <Link href={`/`}>
                <img
                  src='https://www.vietnamairlines.com/~/media/8E433D91E88A40B4B139B3616BD64F5C.ashx'
                  alt=''
                  className='w-full h-full object-cover bg-[#303030bb]'
                />
              </Link>

              <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#505050] to-transparent z-[10]' />
            </>
          </SwiperSlide>
          <SwiperSlide>
            <>
              <Link href={`/`}>
                <img
                  src='https://www.vietnamairlines.com/~/media/79386C81E05A493684891B3A86BBD547.ashx'
                  alt=''
                  className='w-full h-full object-cover bg-[#303030bb]'
                />
              </Link>

              <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#505050] to-transparent z-[10]' />
            </>
          </SwiperSlide>
          <SwiperSlide>
            <>
              <Link href={`/`}>
                <img
                  src='https://www.vietnamairlines.com/vn/vi/~/media/5BC370B28D6C475EAD2551167D09DB73.ashx'
                  alt=''
                  className='w-full h-full object-cover bg-[#303030bb]'
                />
              </Link>

              <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#505050] to-transparent z-[10]' />
            </>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
