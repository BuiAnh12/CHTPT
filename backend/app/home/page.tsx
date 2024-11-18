"use client";
import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { IoAirplane } from "react-icons/io5";
import { VscNotebook } from "react-icons/vsc";
import { MdAirplaneTicket } from "react-icons/md";
import FindTicketModal from "../../components/FindTicketModal";
import Slider from "../../components/NewsSlider";

const popularFlights = [
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    from: "TP. Hồ Chí Minh",
    to: "Hà Nội",
    date: "20/12/2024",
    price: "1.540.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Ho-Chi-Minh-City-SGN.jpg",
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    date: "29/10/2024",
    price: "1.540.000",
    type: "Một chiều / Phổ thông",
    amount: "2/8",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa641d28f87_Da_Nang.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "TP. Hồ Chí Minh",
    to: "Đà Nẵng",
    date: "16/12/2024",
    price: "828.000",
    type: "Một chiều / Phổ thông",
    amount: "2/8",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa641d28f87_Da_Nang.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "Hà Nội",
    to: "Đà Nẵng",
    date: "11/12/2024",
    price: "860.000",
    type: "Một chiều / Phổ thông",
    amount: "4/8",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Ho-Chi-Minh-City-SGN.jpg",
    from: "Đà Nẵng",
    to: "TP. Hồ Chí Minh",
    date: "20/12/2024",
    price: "1.162.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    from: "Đà Nẵng",
    to: "Hà Nội",
    date: "09/12/2024",
    price: "860.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Vinh-VII.jpg",
    from: "TP. Hồ Chí Minh",
    to: "Vinh",
    date: "25/11/2024",
    price: "914.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa63d86c890_Hai_Phong.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "TP. Hồ Chí Minh",
    to: "Hải Phòng",
    date: "18/12/2024",
    price: "914.000",
    type: "Một chiều / Phổ thông",
  },
];

type Props = {};

const page = (props: Props) => {
  const [key, setKey] = useState<string>("link-1");

  useEffect(() => {
    localStorage.removeItem("passengerDetails");
  }, []);

  return (
    <>
      <Hero />

      <div className='!mt-[-52px] min-h-[120px]'>
        <div className='pt-[11px] max-w-[850px] relative z-10 m-auto'>
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k ?? "")}>
            <Row>
              <Col sm={12}>
                <Nav
                  variant='tabs'
                  defaultActiveKey='link-1'
                  className='w-full d-flex rounded-t-md overflow-hidden border-none'
                >
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-1'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <IoAirplane />
                      <span>MUA VÉ</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-2'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <VscNotebook />
                      <span>QUẢN LÝ ĐẶT CHỖ</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-3'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <MdAirplaneTicket />
                      <span>LÀM THỦ TỤC</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content
                  className='rounded-b-[4px] px-[20px] py-[10px] h-auto w-full bg-[#fbf9f2]'
                  style={{
                    boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                  }}
                >
                  <Tab.Pane eventKey='link-1' className='h-auto '>
                    <FindTicketModal />
                  </Tab.Pane>
                  <Tab.Pane eventKey='link-2'>
                    <button className='bg-[#0980A0] text-[#fff] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                      Mã đặt chỗ/Số vé điện tử
                    </button>
                    <div className='mb-[30px] flex items-center gap-3 w-full'>
                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Mã đặt chỗ/Số vé điện tử
                        </label>
                      </div>

                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Họ
                        </label>
                      </div>

                      <button className='w-[160px] h-[40px] rounded-[4px] text-[#000] bg-[#e6b441] hover:bg-[#fff] border-[2px] border-[#e6b441]'>
                        <span className='font-semibold'>TÌM KIẾM</span>
                      </button>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey='link-3'>
                    <span className='text-[#006885] text-[14px] mb-[10px]'>
                      Quý khách có thể làm thủ tục trực tuyến từ 24 đến 01 tiếng trước chuyến bay
                    </span>
                    <div className='flex gap-2'>
                      <button className='bg-[#0980A0] text-[#fff] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Mã đặt chỗ (PNR)
                      </button>
                      <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Số điện tử
                      </button>
                      <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Số thẻ FFP
                      </button>
                    </div>
                    <div className='mb-[30px] flex items-center gap-3 w-full'>
                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Mã đặt chỗ
                        </label>
                      </div>

                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Họ
                        </label>
                      </div>

                      <button className='w-[160px] h-[40px] rounded-[4px] text-[#000] bg-[#e6b441] hover:bg-[#fff] border-[2px] border-[#e6b441]'>
                        <span className='font-semibold'>LÀM THỦ TỤC</span>
                      </button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <ul
          className='my-[25px] rounded-[3px] flex'
          style={{
            backgroundImage:
              "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/pages/home/bg_menu_header_bottom.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_bag.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>
                HÀNH LÝ
                <br />
                TRẢ TRƯỚC
              </div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_plane.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>
                NÂNG HẠNG
                <br />& CHỌN CHỖ
              </div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='	https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_shopping.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>MUA SẮM</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_hotel.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>KHÁCH SẠN & TOUR</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_care.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>BẢO HIỂM</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='	https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_service_support.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>DỊCH VỤ KHÁC</div>
            </div>
          </li>
        </ul>
      </div>

      <div className='w-[75%] m-auto'>
        <h2 className='p-[5px] border-l-[12px] border-[#1B95B8] text-[38px] mt-[20px] mb-[10px]'>
          Khám Phá Các Chuyến Bay Phổ Biến Nhất Của Chúng Tôi
        </h2>

        <div className='flex flex-row items-center mb-[20px] flex-wrap gap-[10px]'>
          {popularFlights.slice(0, 8).map((popular, index) => (
            <div className='relative h-[400px] cursor-pointer basis-[24%]' key={index}>
              <img src={popular.img} className='object-cover h-full w-full' alt='' />
              <div className='absolute bottom-[0px] px-[15px] pt-[10px] pb-[10px] w-full z-2 bg-[#076981c7]'>
                <div className='flex flex-col'>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.from} đến</span>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.to}</span>
                  <span className='text-[14px] text-[#fff] font-semibold'>{popular.date}</span>
                </div>
                <div className='flex flex-col items-end mt-[30px]'>
                  <span className='text-[11px] text-[#fff] font-semibold'>Từ</span>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.price} VND*</span>
                  <span className='text-[11px] text-[#fff] font-semibold'>Đã xem: 11 phút trước</span>
                  <span className='text-[11px] text-[#fff] font-semibold'>{popular.type}</span>
                </div>
              </div>

              <span className='absolute top-[10px] right-[10px] py-[1px] px-[10px] bg-[#0000009d] text-[#fff] text-[12px] rounded-[10px]'>
                {index + 1}/8
              </span>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center'>
          <button className='text-[13px] border-[2px] border-[#cc990e] text-[#cc990e] hover:bg-[#cc990e] hover:text-[#fff] rounded-[5px] w-[250px] h-[40px] !my-auto !mt-[5px] !mb-[15px] font-bold !text-center'>
            XEM THÊM
          </button>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <h2 className='p-[5px] border-l-[12px] border-[#1B95B8] text-[38px] mt-[20px] mb-[10px]'>KHÁM PHÁ ĐIỂM ĐẾN</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[5px] mb-[20px]'>
          <div className='relative h-[495px] group cursor-pointer'>
            <img
              src='https://www.vietnamairlines.com/vn/vi/~/media/1B2961B388074C069FB6C065C63F2FBC.ashx'
              className='object-cover h-full w-full'
              alt=''
            />
            <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
              <p className='text-[22px] text-[#fff] mb-[5px]'>Tokyo – Thủ đô của hiện đại và truyền thống</p>
              <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                KHÁM PHÁ
              </button>
            </div>
            <div
              className='absolute top-0 w-full h-full z-1'
              style={{
                background:
                  "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
              }}
            ></div>
          </div>

          <div className='relative h-[495px] group cursor-pointer'>
            <img
              src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
              className='object-cover h-full w-full'
              alt=''
            />
            <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
              <p className='text-[22px] text-[#fff] mb-[5px]'>Phú Quốc – Hòn ngọc quý</p>
              <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                KHÁM PHÁ
              </button>
            </div>
            <div
              className='absolute top-0 w-full h-full z-1'
              style={{
                background:
                  "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
              }}
            ></div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='relative h-[245px] group cursor-pointer'>
              <img
                src='https://www.vietnamairlines.com/~/media/7E9F34DB11A14845BF6CE6D6F0EFE52C.ashx'
                className='object-cover h-full w-full'
                alt=''
              />
              <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
                <p className='text-[22px] text-[#fff] mb-[5px]'>Bangkok – Thiên đường ăn chơi và mua sắm Đông Nam Á</p>
                <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                  KHÁM PHÁ
                </button>
              </div>
              <div
                className='absolute top-0 w-full h-full z-1'
                style={{
                  background:
                    "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
                }}
              ></div>
            </div>

            <div className='relative h-[245px] group cursor-pointer'>
              <img
                src='https://www.vietnamairlines.com/~/media/01436F67953546C19F8EFAAEBC5A9932.ashx'
                className='object-cover h-full w-full'
                alt=''
              />
              <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
                <p className='text-[22px] text-[#fff] mb-[5px]'>Đà Lạt – Một Paris thu nhỏ</p>
                <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                  KHÁM PHÁ
                </button>
              </div>
              <div
                className='absolute top-0 w-full h-full z-1'
                style={{
                  background:
                    "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button className='text-[13px] border-[2px] border-[#cc990e] text-[#cc990e] hover:bg-[#cc990e] hover:text-[#fff] rounded-[5px] w-[250px] h-[40px] !my-auto !mt-[5px] !mb-[15px] font-bold !text-center'>
            KHÁM PHÁ TẤT CẢ ĐIỂM ĐẾN
          </button>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <div className='mt-[35px] text-center relative overflow-hidden'>
          <h2 className='relative font-normal text-[35px] text-[#1f1f1f] px-[10px] text-center bg-[#fff] w-fit inline-block z-10'>
            Thông tin nổi bật
          </h2>
          <hr className='absolute top-[25%] left-0 w-full transform -translate-y-[8px] p-0 h-0 border-[#303030] border-t-[1px]' />
        </div>
        <Slider />
      </div>
    </>
  );
};

export default page;
