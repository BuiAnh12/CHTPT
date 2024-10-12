"use client";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeftLong, FaChevronDown, FaChevronUp, FaRegClock } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";
import { HiOutlineTicket } from "react-icons/hi2";
import { RiLuggageDepositFill } from "react-icons/ri";
import { PiFlowerLotusBold } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import FindTicketModal from "../../../components/FindTicketModal";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  const [expandDetail, setExpandDetail] = useState(false);
  const [findFlights, setFindFlights] = useState(false);

  return (
    <div>
      <div className={`relative h-full  ${findFlights && "!pt-[20px] !pb-[35px]"}`}>
        <div
          className={`w-[75%] mx-auto rounded-b-[4px] px-[20px] py-[10px] bg-[#fbf9f2] ${!findFlights && "hidden"}`}
          style={{
            boxShadow: "0 6px 10px rgba(0,0,0,.175)",
          }}
        >
          <FindTicketModal />
        </div>

        <div
          className='absolute bottom-[-28px] right-[50%] w-[50px] h-[50px] rounded-full bg-[#e0e0e0] flex items-start justify-center cursor-pointer z-2'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px",
          }}
          onClick={() => setFindFlights(!findFlights)}
        >
          {!findFlights ? (
            <FaAngleDown className='text-[22px] pt-[5px]' />
          ) : (
            <FaAngleUp className='text-[22px] pt-[5px]' />
          )}
        </div>
      </div>

      <div className='relative w-full h-[210px] z-3'>
        <img
          src='https://booking.vietnamairlines.com/statics/applications/booking/dynamicContent/1.0.78/assets/img/background/SGN/large.jpg'
          alt=''
          className='w-full h-full object-cover'
        />

        <div className='absolute top-[30%] right-[35%] bg-white px-[30px] py-[20px] rounded-[10px] text-[#005F6E] text-center'>
          <h1 className='font-bold text-[22px] mb-[5px]'>Lựa chọn của quý khách</h1>
          <h2 className='font-medium text-[20px]'>Hà Nội đến TP. Hồ Chí Minh</h2>
        </div>
      </div>

      <div className='w-[75%] my-[20px] mx-auto'>
        <div
          className=' rounded-[15px] overflow-hidden px-[20px] pt-[20px] bg-[#fff]'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.176) -2px 0px 12px",
          }}
        >
          <div className='border-b-[1px] border-[#00648A] flex gap-2 pb-[10px]'>
            <h4 className='font-semibold'>TP. Hồ Chí Minh đến Hà Nội</h4>
            <span>-</span>
            <span>Thứ Bảy, 12 tháng 10, 2024</span>
          </div>

          <div className='grid grid-cols-12 w-full'>
            <div className='col-span-9 grid grid-cols-12 items-center my-0 h-[160px] '>
              <div className='col-span-8  py-[10px] pr-[30px] ml-[8px] mr-[15px]'>
                <div className='flex flex-row h-[21px] items-center justify-between'>
                  <span className='text-[17px]'>05:00</span>
                  <div className='relative flex flex-col gap-1 items-center mx-[2px] justify-center h-[2rem] w-[205px]'>
                    <span className='absolute top-[0px] text-[12px]'>Bay thẳng</span>
                    <div className=''>
                      ...............................................................................................
                    </div>
                  </div>
                  <span className='text-[17px]'>07:15</span>
                </div>

                <div className='flex flex-row justify-between'>
                  <span className='text-[14px]'>HAN</span>
                  <span className='text-[14px]'>SGN</span>
                </div>

                <div className='flex flex-row justify-between'>
                  <span className='text-[14px] text-[#0062a9]'>Nhà ga 1</span>
                  <span className='text-[14px] text-[#0062a9]'>Nhà ga 1</span>
                </div>
              </div>

              <div className='col-span-4  py-[10px] pr-[30px] ml-[8px] mr-[15px]'>
                <div className='flex flex-col justify-between'>
                  <div className='flex items-center gap-2'>
                    <FaRegClock className='text-[12px]' />
                    <span className='text-[12px]'>Thời gian bay 2 giờ 15 phút</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <MdOutlineFlightTakeoff className='text-[12px]' />
                    <span className='text-[12px]'>VN 205 Khai thác bởi Vietnam Airlines</span>
                  </div>
                  <span className='pt-[4px] text-[12px] underline px-[20px] text-[#00607d] hover:text-[#e6b441] cursor-pointer'>
                    Chi tiết hành trình
                  </span>
                </div>
              </div>
            </div>

            <div
              className='col-span-3 bg-[#fff] flex items-center justify-center cursor-pointer'
              onClick={() => setExpandDetail(!expandDetail)}
            >
              <div className='flex items-center justify-center gap-4 text-[#00648a]'>
                <span className='font-semibold'>Phổ thông tiết kiệm</span>

                {expandDetail ? <FaChevronUp className='' /> : <FaChevronDown className='' />}
              </div>
            </div>
          </div>

          {expandDetail && (
            <div className=' h-full text-[#222222] flex flex-col'>
              <div className='grid grid-cols-12 w-full h-full'>
                <div className='col-span-6'>
                  <div className='w-full  pb-[10px] pt-[15px]'>
                    <h4 className='font-bold text-[18px] text-center text-[#005F6E] py-[10px]'>Chi tiết hành trình</h4>

                    <div className='relative grid grid-cols-12'>
                      <span className='col-span-2'>2 giờ 15 phút</span>

                      <div className='col-span-10'>
                        <div className='flex flex-col mb-[10px]'>
                          <h4 className='text-[18px] font-semibold text-[#005F6E]'>16:00 TP. Hồ Chí Minh</h4>
                          <p>Sân bay Tân Sơn Nhất, Việt Nam</p>
                          <p className='text-[12px]'>Nhà ga 1</p>
                        </div>

                        <div className='flex flex-col'>
                          <h4 className='text-[18px] font-semibold text-[#005F6E]'>18:15Hà Nội</h4>
                          <p>Sân bay Nội Bài, Việt Nam</p>
                          <p className='text-[12px]'>Nhà ga 1</p>
                        </div>
                      </div>

                      <div className='absolute top-[0px] left-[65px] w-[3px] h-[135px] bg-[#005572]'></div>
                      <div className='absolute top-[-8px] left-[64px] w-[5px] h-[5px] rounded-full bg-[#005572]'></div>
                      <div className='absolute bottom-[-8px] left-[64px] w-[5px] h-[5px] rounded-full bg-[#005572]'></div>
                    </div>

                    <div className='mt-[15px]'>
                      <div className='text-[13px]'>
                        <span>Số hiệu chuyến bay</span> <span className='font-bold'>VN 216</span>
                      </div>
                      <p className='text-[13px]'>Khai thác bởi Vietnam Airlines</p>
                      <p className='text-[13px]'>Boeing 787</p>
                    </div>
                  </div>
                </div>

                <div className='col-span-6'>
                  <div className='w-full   pb-[10px] pt-[15px]'>
                    <h4 className='font-bold text-[18px] text-center text-[#005F6E] py-[10px]'>Giá vé của Quý khách</h4>

                    <div className='border-l-[3px] border-[#D0D5DD] px-[20px]'>
                      <p className='font-semibold text-center text-[#005F6E] '>Phổ Thông Tiết Kiệm</p>

                      <div className='flex gap-[6px] mb-[4px]'>
                        <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] border-[1px] flex items-center justify-center'>
                          <TiTicket className='text-[#275e6c] text-[20px] ' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[13px]'>Thay đổi vé</span>
                          <span className='text-[13px]'>Phí đổi vé tối đa 1.000.000 VND mỗi hành khách</span>
                        </div>
                      </div>

                      <div className='flex gap-[6px] mb-[4px]'>
                        <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                          <HiOutlineTicket className='text-[#275e6c] text-[20px]' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[13px]'>Hoàn vé</span>
                          <span className='text-[13px]'>Phí hoàn vé tối đa 1.000.000 VND mỗi hành khách</span>
                        </div>
                      </div>

                      <div className='flex gap-[6px] mb-[4px]'>
                        <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                          <MdLuggage className='text-[#275e6c] text-[20px] ' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[13px]'>Hành lý ký gửi</span>
                          <span className='text-[13px]'>1 x 23 kg</span>
                        </div>
                      </div>

                      <div className='flex gap-[6px] mb-[4px]'>
                        <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                          <RiLuggageDepositFill className='text-[#275e6c] text-[20px] ' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[13px]'>Hành lý xách tay</span>
                          <span className='text-[13px]'>Không quá 12 kg</span>
                        </div>
                      </div>

                      <div className='flex gap-[6px] mb-[4px]'>
                        <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                          <PiFlowerLotusBold className='text-[#275e6c] text-[20px] ' />
                        </div>
                        <div className='flex flex-col'>
                          <span className='font-bold text-[13px]'>Số dặm đạt được</span>
                          <span className='text-[13px]'>Tích lũy 60% số dặm</span>
                        </div>
                      </div>

                      <div className='mt-[20px] ml-[10px] mb-[10px] text-[12px] text-[#008000] underline cursor-pointer flex gap-1 items-center'>
                        <span>Chi tiết</span>
                        <FaExternalLinkAlt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='my-[20px] text-left w-full block'>
                <Link
                  href='/booking/flight'
                  className='text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[5px] px-[15px] w-fit font-medium '
                >
                  XÁC NHẬN VÀ TIẾP TỤC
                </Link>
              </div>

              <div className='w-full border-t-[1px] border-[#00607d]' onClick={() => setExpandDetail(false)}>
                <FaChevronUp className='text-[18px]  my-[10px] text-center w-full block cursor-pointer' />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-[75%] my-[20px] mx-auto text-right '>
        <span className='text-[20px] text-[#005F6E]'>Tổng số tiền:</span>{" "}
        <span className='font-bold text-[24px] text-[#005F6E]'>2.134.000</span>{" "}
        <span className='text-[20px] text-[#005F6E]'>VND</span>
      </div>

      <div className='w-[75%] my-[20px] mx-auto flex justify-end'>
        <Link
          href='/booking'
          className='mr-[10px] text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[25px] w-fit font-medium  flex items-center justify-center'
        >
          <FaArrowLeftLong />
        </Link>

        <Link
          href='/booking/traveler'
          className='mr-[10px] text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[15px] w-fit font-medium '
        >
          TIẾP TỤC
        </Link>

        <Link
          href='/booking/traveler'
          className='text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[15px] w-fit font-medium '
        >
          ĐĂNG NHẬP VÀ TIẾP TỤC
        </Link>
      </div>
    </div>
  );
};

export default page;
