"use client";
import Link from "next/link";
import React from "react";
import { FaAngleDown, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra, MdFeed } from "react-icons/md";

type Props = {};

const page = ({ params }) => {
  const { flight_id } = params;

  return (
    <div className='w-[75%] my-[20px] mx-auto '>
      <div
        className='p-[20px] bg-white rounded-md'
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,.175)",
        }}
      >
        <h4 className='font-semibold text-[#8f7028]'>Lưu ý:</h4>
        <span className='text-[13px]'>
          PTIT Airlines đặt trụ sở tại Việt Nam. Tùy theo chính sách của mình, ngân hàng phát hành thẻ có thể thu phí
          trên mỗi giao dịch của Qúy khách. PTIT Airlines tuyệt đối không chịu chách nhiệm khi phát sinh bất kỳ khoản
          phí nào liên quan đến việc sử dụng để thanh toán tại website của PTIT Airlines. Qúy khách nên trực tiếp liên
          hệ với ngân hàng phát hành thẻ để có đầy đủ thông tin về chi phí phát sinh.
        </span>
      </div>

      <h1 className='font-semibold text-[24px] text-[#007390] my-[20px] '>THANH TOÁN</h1>

      <div className='grid grid-cols-12 gap-[15px]'>
        <div className='col-span-8'>
          <div
            className=' bg-white  rounded-md overflow-hidden'
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,.175)",
            }}
          >
            <div className='border-b-[2px] border-[#0980A0] px-[10px] py-[15px] bg-[#cce3e0]'>
              <div className=' flex items-center gap-3'>
                <h3 className='text-[#007390] font-semibold text-[20px] '>Chọn hình thức thanh toán</h3>
                <div className=''>
                  <span className='font-bold text-[17px] text-[#007390] mr-[4px]'>1,077,000</span>
                  <span className='text-[13px] text-[#007390]'>VND</span>
                </div>
              </div>
              <p className='text-[13px] mt-[6px]'>Quý khách lựa chọn hình thức thanh toán dưới đây</p>
            </div>

            <div className=' px-[10px] py-[15px] flex  justify-end'>
              <Link
                href={`/booking/seat/${flight_id}`}
                className='mr-[10px] text-[16px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
              >
                <FaArrowLeftLong />
              </Link>

              <Link
                href='/booking/traveler'
                className='mr-[10px] text-[16px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[4px] px-[6px] w-fit font-medium flex justify-end'
              >
                TIẾP TỤC
              </Link>
            </div>
          </div>
        </div>

        <div className='col-span-4'>
          <div
            className=' bg-white rounded-md overflow-hidden'
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,.175)",
            }}
          >
            <h3 className='font-semibold text-[20px] text-[#007390] border-b-[2px] border-[#0980A0] px-[10px] py-[15px] m-0'>
              Chi tiết chuyến bay
            </h3>

            <div className=''>
              <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <IoAirplaneSharp className='text-[#007390]' />
                  <div className='flex items-center gap-1'>
                    <span className='text-[13px]'>HAN</span>
                    <FaArrowRightLong className='text-[#007390]' />
                    <span className='text-[13px]'>SGN</span>
                  </div>
                </div>

                <div className='flex gap-1'>
                  <span className='font-bold text-[17px] text-[#007390]'>469,000</span>
                  <span className='text-[13px] text-[#007390]'>VND</span>

                  <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
                </div>
              </div>

              <div className=''>
                <div className='px-[10px] py-[6px] bg-[#fdfae9] flex gap-1'>
                  <span className='font-bold text-[#007390]'>Khởi hành</span>
                  <span>22:30, 21 tháng 10 2024</span>
                </div>

                <div className='p-[10px] flex flex-col'>
                  <div className='flex items-center gap-1'>
                    <span className='font-bold text-[14px]'>Hà Nội (HAN)</span>
                    <FaArrowRightLong className='font-bold text-[14px]' />
                    <span className='font-bold text-[14px]'>Tp. Hồ Chí Minh (SGN)</span>
                  </div>
                  <p className='text-[13px] my-[2px]'>Thời gian: 2 tiếng 15 phút / Bay thẳng</p>
                  <p className='text-[13px] my-[2px]'>VN 269 Airbus A321</p>
                  <p className='text-[13px] my-[2px] text-[#007390]'>Hãng khai thác PTIT Airlines</p>
                </div>

                <div className='px-[10px] py-[6px] bg-[#fdfae9] flex flex-col'>
                  <div className='flex justify-between items-center'>
                    <span className='font-bold text-[13px] text-[#007390]'>Người lớn x 1</span>
                    <span className=''>
                      <span className='font-bold text-[17px] text-[#007390] mr-[4px]'>469,000</span>
                      <span className='text-[13px] text-[#007390]'>VND</span>
                    </span>
                  </div>
                  <span className='text-[13px]'>A1 - NGUYEN NGOC DAT</span>
                </div>
              </div>
            </div>

            <div className=''>
              <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <MdAirlineSeatReclineExtra className='text-[#007390]' />
                  <div className='flex items-center gap-1'>
                    <span className='text-[13px]'>Chỗ ngồi</span>
                  </div>
                </div>

                <div className='flex gap-1'>
                  <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
                </div>
              </div>

              <div className=''>
                <div className='p-[10px] flex flex-col'>
                  <p className='font-bold text-[13px] my-[2px]'>Ghế: A1</p>
                </div>
              </div>
            </div>

            <div className=''>
              <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <MdFeed className='text-[#007390]' />
                  <div className='flex items-center gap-1'>
                    <span className='text-[13px]'>Thuế, phí và các khoản thu</span>
                  </div>
                </div>

                <div className='flex gap-1'>
                  <span className='font-bold text-[17px] text-[#007390]'>608,000</span>
                  <span className='text-[13px] text-[#007390]'>VND</span>
                  <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
                </div>
              </div>

              <div className=''>
                <div className='p-[10px] flex flex-col'>
                  <div className='flex items-center justify-between mb-[4px]'>
                    <span className='text-[13px]'>Thuế giá trị gia tăng, Việt Nam</span>

                    <div className='flex gap-1'>
                      <span className='font-bold text-[#007390]'>38,000</span>
                      <span className='text-[#007390]'>VND</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between mb-[4px]'>
                    <span className='text-[13px]'>Phí soi chiếu an ninh hành khách và hành lý, Việt Nam</span>

                    <div className='flex gap-1'>
                      <span className='font-bold text-[#007390]'>20,000</span>
                      <span className='text-[#007390]'>VND</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between mb-[4px]'>
                    <span className='text-[13px]'>Phí dịch vụ hành khách chặng nội địa, Việt Nam</span>

                    <div className='flex gap-1'>
                      <span className='font-bold text-[#007390]'>100,000</span>
                      <span className='text-[#007390]'>VND</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-[13px]'>Phụ thu quản trị hệ thống</span>

                    <div className='flex gap-1'>
                      <span className='font-bold text-[#007390]'>450,000</span>
                      <span className='text-[#007390]'>VND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-[10px] border-t-[3px] border-[#eee] flex justify-between items-center'>
              <h4 className='font-bold text-[18px]'>TỔNG SỐ TIỀN</h4>

              <div className='flex gap-1'>
                <span className='font-bold text-[17px] text-[#007390]'>1,077,000</span>
                <span className='text-[13px] text-[#007390]'>VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
