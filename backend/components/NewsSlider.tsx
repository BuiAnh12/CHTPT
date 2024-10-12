import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const news = [
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    title: "Phòng khách Thương gia",
    desc: "Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/Upload/hanhly_xachtay.jpg",
    title: "Tra cứu thông tin hành lý",
    desc: "Tra cứu tiêu chuẩn hành lý của PTIT Airlines.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Lamthutuc_online.jpg",
    title: "Làm thủ tục trực tuyến",
    desc: "Chủ động làm thủ tục trên website hoặc ứng dụng di động của PTIT Airlines.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    title: "Phòng khách Thương gia",
    desc: "Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    title: "Phòng khách Thương gia",
    desc: "Trải nghiệm phòng chờ sang trọng, yên tĩnh và đầy đủ tiện nghi trước giờ khởi hành.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/overview01.jpg",
    title: "Ẩm thực hạng Thương gia",
    desc: "Trải nghiệm “ẩm thực trên mây” tiêu chuẩn 4 sao.",
  },
  {
    img: "	https://www.vietnamairlines.com/~/media/ContentImage/Hightlight/Trendoitac_hangkhong.jpg",
    title: "Tích lũy dặm trên chuyến bay",
    desc: "Tích lũy dặm khi bay cùng PTIT Airlines và các đối tác hàng không tham gia chương trình.",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/Upload/hanhly_xachtay.jpg",
    title: "Tra cứu thông tin hành lý",
    desc: "Tra cứu tiêu chuẩn hành lý của PTIT Airlines.",
  },
];

type Props = {};

const Slider = (props: Props) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={25}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Navigation]}
      className='inf-slider'
    >
      {news.map((item, index) => (
        <SwiperSlide key={index}>
          <div className='relative h-[280px] cursor-pointer rounded-sm overflow-hidden'>
            <img src={item.img} className='object-cover h-[180px] w-full mt-[2%]' alt={item.title} />
            <div
              style={{
                position: "absolute",
                bottom: "0%",
                left: "0",
                backgroundImage:
                  "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/other/pattern_xanh.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "250px",
                backgroundColor: "#dcf2f8",
                overflow: "hidden",
                width: "100%",
                height: "95px",
                border: "1px solid transparent",
              }}
            >
              <h3 className='text-[20px] text-[#006c98] font-semibold mb-[6px] mt-[13px] px-[15px] text-left'>
                {item.title}
              </h3>
              <p className='text-[13px] text-[#333] font-semibold px-[15px] text-left'>{item.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
